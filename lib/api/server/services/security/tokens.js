'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _mongodb = require('mongodb');
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _jsonwebtoken = require('jsonwebtoken');
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var _uaParserJs = require('ua-parser-js');
var _uaParserJs2 = _interopRequireDefault(_uaParserJs);
var _handlebars = require('handlebars');
var _handlebars2 = _interopRequireDefault(_handlebars);
var _lruCache = require('lru-cache');
var _lruCache2 = _interopRequireDefault(_lruCache);
var _mongo = require('../../lib/mongo');
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mailer = require('../../lib/mailer');
var _mailer2 = _interopRequireDefault(_mailer);
var _settings3 = require('../settings/settings');
var _settings4 = _interopRequireDefault(_settings3);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var cache = (0, _lruCache2.default)({
	max: 10000,
	maxAge: 1000 * 60 * 60 * 24 // 24h
});

var BLACKLIST_CACHE_KEY = 'blacklist';
var SecurityTokensService = (function() {
	function SecurityTokensService() {
		_classCallCheck(this, SecurityTokensService);
	}
	_createClass(SecurityTokensService, [
		{
			key: 'getTokens',
			value: function getTokens() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = {
					is_revoked: false
				};

				var id = _parse2.default.getObjectIDIfValid(params.id);
				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}

				var email = _parse2.default.getString(params.email).toLowerCase();
				if (email && email.length > 0) {
					filter.email = email;
				}

				return _mongo.db
					.collection('tokens')
					.find(filter)
					.toArray()
					.then(function(items) {
						return items.map(function(item) {
							return _this.changeProperties(item);
						});
					});
			}
		},
		{
			key: 'getTokensBlacklist',
			value: function getTokensBlacklist() {
				var blacklistFromCache = cache.get(BLACKLIST_CACHE_KEY);

				if (blacklistFromCache) {
					return Promise.resolve(blacklistFromCache);
				} else {
					return _mongo.db
						.collection('tokens')
						.find(
							{
								is_revoked: true
							},

							{ _id: 1 }
						)
						.toArray()
						.then(function(items) {
							var blacklistFromDB = items.map(function(item) {
								return item._id.toString();
							});
							cache.set(BLACKLIST_CACHE_KEY, blacklistFromDB);
							return blacklistFromDB;
						});
				}
			}
		},
		{
			key: 'getSingleToken',
			value: function getSingleToken(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getTokens({ id: id }).then(function(items) {
					return items.length > 0 ? items[0] : null;
				});
			}
		},
		{
			key: 'getSingleTokenByEmail',
			value: function getSingleTokenByEmail(email) {
				return this.getTokens({ email: email }).then(function(items) {
					return items.length > 0 ? items[0] : null;
				});
			}
		},
		{
			key: 'addToken',
			value: function addToken(data) {
				var _this2 = this;
				return this.getValidDocumentForInsert(data)
					.then(function(tokenData) {
						return _mongo.db.collection('tokens').insertMany([tokenData]);
					})
					.then(function(res) {
						return _this2.getSingleToken(res.ops[0]._id.toString());
					})
					.then(function(token) {
						return _this2.getSignedToken(token).then(function(signedToken) {
							token.token = signedToken;
							return token;
						});
					});
			}
		},
		{
			key: 'updateToken',
			value: function updateToken(id, data) {
				var _this3 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var tokenObjectID = new _mongodb.ObjectID(id);
				var token = this.getValidDocumentForUpdate(id, data);

				return _mongo.db
					.collection('tokens')
					.updateOne(
						{
							_id: tokenObjectID
						},

						{ $set: token }
					)
					.then(function(res) {
						return _this3.getSingleToken(id);
					});
			}
		},
		{
			key: 'deleteToken',
			value: function deleteToken(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var tokenObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('tokens')
					.updateOne(
						{
							_id: tokenObjectID
						},

						{
							$set: {
								is_revoked: true,
								date_created: new Date()
							}
						}
					)
					.then(function(res) {
						cache.del(BLACKLIST_CACHE_KEY);
					});
			}
		},
		{
			key: 'checkTokenEmailUnique',
			value: function checkTokenEmailUnique(email) {
				if (email && email.length > 0) {
					return _mongo.db
						.collection('tokens')
						.count({ email: email, is_revoked: false })
						.then(function(count) {
							return count === 0
								? email
								: Promise.reject('Token email must be unique');
						});
				} else {
					return Promise.resolve(email);
				}
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var email = _parse2.default.getString(data.email);
				return this.checkTokenEmailUnique(email).then(function(email) {
					var token = {
						is_revoked: false,
						date_created: new Date()
					};

					token.name = _parse2.default.getString(data.name);
					if (email && email.length > 0) {
						token.email = email.toLowerCase();
					}
					token.scopes = _parse2.default.getArrayIfValid(data.scopes);
					token.expiration = _parse2.default.getNumberIfPositive(
						data.expiration
					);

					return token;
				});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var token = {
					date_updated: new Date()
				};

				if (data.name !== undefined) {
					token.name = _parse2.default.getString(data.name);
				}

				if (data.expiration !== undefined) {
					token.expiration = _parse2.default.getNumberIfPositive(
						data.expiration
					);
				}

				return token;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item) {
				if (item) {
					item.id = item._id.toString();
					delete item._id;
					delete item.is_revoked;
				}

				return item;
			}
		},
		{
			key: 'getSignedToken',
			value: function getSignedToken(token) {
				return new Promise(function(resolve, reject) {
					var jwtOptions = {};

					var payload = {
						scopes: token.scopes,
						jti: token.id
					};

					if (token.email && token.email.length > 0) {
						payload.email = token.email.toLowerCase();
					}

					if (token.expiration) {
						// convert hour to sec
						jwtOptions.expiresIn = token.expiration * 60 * 60;
					}

					_jsonwebtoken2.default.sign(
						payload,
						_settings2.default.jwtSecretKey,
						jwtOptions,
						function(err, token) {
							if (err) {
								reject(err);
							} else {
								resolve(token);
							}
						}
					);
				});
			}
		},
		{
			key: 'getDashboardSigninUrl',
			value: function getDashboardSigninUrl(email) {
				var _this4 = this;
				return _settings4.default.getSettings().then(function(generalSettings) {
					return _this4.getSingleTokenByEmail(email).then(function(token) {
						if (token) {
							return _this4.getSignedToken(token).then(function(signedToken) {
								var loginUrl = _url2.default.resolve(
									generalSettings.domain,
									_settings2.default.adminLoginUrl
								);

								return loginUrl + '?token=' + signedToken;
							});
						} else {
							return null;
						}
					});
				});
			}
		},
		{
			key: 'getIP',
			value: function getIP(req) {
				var ip = req.get('x-forwarded-for') || req.ip;

				if (ip && ip.includes(', ')) {
					ip = ip.split(', ')[0];
				}

				if (ip && ip.includes('::ffff:')) {
					ip = ip.replace('::ffff:', '');
				}

				if (ip === '::1') {
					ip = 'localhost';
				}

				return ip;
			}
		},
		{
			key: 'getTextFromHandlebars',
			value: function getTextFromHandlebars(text, context) {
				var template = _handlebars2.default.compile(text, { noEscape: true });
				return template(context);
			}
		},
		{
			key: 'getSigninMailSubject',
			value: function getSigninMailSubject() {
				return 'New sign-in from {{from}}';
			}
		},
		{
			key: 'getSigninMailBody',
			value: function getSigninMailBody() {
				return '<div style="color: #202020; line-height: 1.5;">\n      Your email address {{email}} was just used to request<br />a sign in email to {{domain}} dashboard.\n      <div style="padding: 60px 0px;"><a href="{{link}}" style="background-color: #3f51b5; color: #ffffff; padding: 12px 26px; font-size: 18px; border-radius: 28px; text-decoration: none;">Click here to sign in</a></div>\n      <b>Request from</b>\n      <div style="color: #727272; padding: 0 0 20px 0;">{{requestFrom}}</div>\n      If this was not you, you can safely ignore this email.<br /><br />\n      Best,<br />\n      pzone Robot';
			}
		},
		{
			key: 'sendDashboardSigninUrl',
			value: async function sendDashboardSigninUrl(req) {
				var email = req.body.email;
				var userAgent = (0, _uaParserJs2.default)(req.get('user-agent'));
				var country = req.get('cf-ipcountry') || '';
				var ip = this.getIP(req);
				var date = (0, _moment2.default)(new Date()).format(
					'dddd, MMMM DD, YYYY h:mm A'
				);
				var link = await this.getDashboardSigninUrl(email);

				if (link) {
					var linkObj = _url2.default.parse(link);
					var domain = linkObj.protocol + '//' + linkObj.host;
					var device = userAgent.device.vendor
						? userAgent.device.vendor + ' ' + userAgent.device.model + ', '
						: '';
					var requestFrom =
						'' +
						device +
						userAgent.os.name +
						', ' +
						userAgent.browser.name +
						'<br />\n      ' +
						date +
						'<br />\n      IP: ' +
						ip +
						'<br />\n      ' +
						country;

					var message = {
						to: email,
						subject: this.getTextFromHandlebars(this.getSigninMailSubject(), {
							from: userAgent.os.name
						}),

						html: this.getTextFromHandlebars(this.getSigninMailBody(), {
							link: link,
							email: email,
							domain: domain,
							requestFrom: requestFrom
						})
					};

					var emailSent = await _mailer2.default.send(message);
					return { sent: emailSent, error: null };
				} else {
					return { sent: false, error: 'Access Denied' };
				}
			}
		}
	]);
	return SecurityTokensService;
})();
exports.default = new SecurityTokensService();
