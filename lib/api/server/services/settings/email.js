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
var _mongo = require('../../lib/mongo');
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var EmailSettingsService = (function() {
	function EmailSettingsService() {
		_classCallCheck(this, EmailSettingsService);
		this.defaultSettings = {
			host: '',
			port: '',
			user: '',
			pass: 0,
			from_name: '',
			from_address: ''
		};
	}
	_createClass(EmailSettingsService, [
		{
			key: 'getEmailSettings',
			value: function getEmailSettings() {
				var _this = this;
				return _mongo.db
					.collection('emailSettings')
					.findOne()
					.then(function(settings) {
						return _this.changeProperties(settings);
					});
			}
		},
		{
			key: 'updateEmailSettings',
			value: function updateEmailSettings(data) {
				var _this2 = this;
				var settings = this.getValidDocumentForUpdate(data);
				return this.insertDefaultSettingsIfEmpty().then(function() {
					return _mongo.db
						.collection('emailSettings')
						.updateOne(
							{},
							{
								$set: settings
							},

							{ upsert: true }
						)
						.then(function(res) {
							return _this2.getEmailSettings();
						});
				});
			}
		},
		{
			key: 'insertDefaultSettingsIfEmpty',
			value: function insertDefaultSettingsIfEmpty() {
				var _this3 = this;
				return _mongo.db
					.collection('emailSettings')
					.countDocuments({})
					.then(function(count) {
						if (count === 0) {
							return _mongo.db
								.collection('emailSettings')
								.insertOne(_this3.defaultSettings);
						} else {
							return;
						}
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var settings = {};

				if (data.host !== undefined) {
					settings.host = _parse2.default.getString(data.host).toLowerCase();
				}

				if (data.port !== undefined) {
					settings.port = _parse2.default.getNumberIfPositive(data.port);
				}

				if (data.user !== undefined) {
					settings.user = _parse2.default.getString(data.user);
				}

				if (data.pass !== undefined) {
					settings.pass = _parse2.default.getString(data.pass);
				}

				if (data.from_name !== undefined) {
					settings.from_name = _parse2.default.getString(data.from_name);
				}

				if (data.from_address !== undefined) {
					settings.from_address = _parse2.default.getString(data.from_address);
				}

				return settings;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(settings) {
				if (settings) {
					delete settings._id;
				} else {
					return this.defaultSettings;
				}

				return settings;
			}
		}
	]);
	return EmailSettingsService;
})();
exports.default = new EmailSettingsService();
