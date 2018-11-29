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
var _lruCache = require('lru-cache');
var _lruCache2 = _interopRequireDefault(_lruCache);
var _mongo = require('../lib/mongo');
var _utils = require('../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
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

var REDIRECTS_CACHE_KEY = 'redirects';
var RedirectsService = (function() {
	function RedirectsService() {
		_classCallCheck(this, RedirectsService);
	}
	_createClass(RedirectsService, [
		{
			key: 'getRedirects',
			value: function getRedirects() {
				var _this = this;
				var redirectsFromCache = cache.get(REDIRECTS_CACHE_KEY);

				if (redirectsFromCache) {
					return Promise.resolve(redirectsFromCache);
				} else {
					return _mongo.db
						.collection('redirects')
						.find()
						.toArray()
						.then(function(items) {
							return items.map(function(item) {
								return _this.changeProperties(item);
							});
						})
						.then(function(items) {
							cache.set(REDIRECTS_CACHE_KEY, items);
							return items;
						});
				}
			}
		},
		{
			key: 'getSingleRedirect',
			value: function getSingleRedirect(id) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var redirectObjectID = new _mongodb.ObjectID(id);

				return _mongo.db
					.collection('redirects')
					.findOne({ _id: redirectObjectID })
					.then(function(item) {
						return _this2.changeProperties(item);
					});
			}
		},
		{
			key: 'addRedirect',
			value: function addRedirect(data) {
				var _this3 = this;
				var redirect = this.getValidDocumentForInsert(data);
				return _mongo.db
					.collection('redirects')
					.insertMany([redirect])
					.then(function(res) {
						cache.del(REDIRECTS_CACHE_KEY);
						return _this3.getSingleRedirect(res.ops[0]._id.toString());
					});
			}
		},
		{
			key: 'updateRedirect',
			value: function updateRedirect(id, data) {
				var _this4 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var redirectObjectID = new _mongodb.ObjectID(id);
				var redirect = this.getValidDocumentForUpdate(id, data);

				return _mongo.db
					.collection('redirects')
					.updateOne(
						{
							_id: redirectObjectID
						},

						{ $set: redirect }
					)
					.then(function(res) {
						cache.del(REDIRECTS_CACHE_KEY);
						return _this4.getSingleRedirect(id);
					});
			}
		},
		{
			key: 'deleteRedirect',
			value: function deleteRedirect(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var redirectObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('redirects')
					.deleteOne({ _id: redirectObjectID })
					.then(function(deleteResponse) {
						cache.del(REDIRECTS_CACHE_KEY);
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var redirect = {
					from: _parse2.default.getString(data.from),
					to: _parse2.default.getString(data.to),
					status: 301
				};

				return redirect;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var redirect = {};

				if (data.from !== undefined) {
					redirect.from = _parse2.default.getString(data.from);
				}

				if (data.to !== undefined) {
					redirect.to = _parse2.default.getString(data.to);
				}

				return redirect;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item) {
				if (item) {
					item.id = item._id.toString();
					delete item._id;
				}

				return item;
			}
		}
	]);
	return RedirectsService;
})();
exports.default = new RedirectsService();
