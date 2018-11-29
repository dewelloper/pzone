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

var WEBHOOKS_CACHE_KEY = 'webhooks';
var WebhooksService = (function() {
	function WebhooksService() {
		_classCallCheck(this, WebhooksService);
	}
	_createClass(WebhooksService, [
		{
			key: 'getWebhooks',
			value: async function getWebhooks() {
				var _this = this;
				var webhooksFromCache = cache.get(WEBHOOKS_CACHE_KEY);

				if (webhooksFromCache) {
					return webhooksFromCache;
				} else {
					var items = await _mongo.db
						.collection('webhooks')
						.find()
						.toArray();
					var result = items.map(function(item) {
						return _this.changeProperties(item);
					});
					cache.set(WEBHOOKS_CACHE_KEY, result);
					return result;
				}
			}
		},
		{
			key: 'getSingleWebhook',
			value: async function getSingleWebhook(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var webhookObjectID = new _mongodb.ObjectID(id);

				var item = await _mongo.db
					.collection('webhooks')
					.findOne({ _id: webhookObjectID });
				var result = this.changeProperties(item);
				return result;
			}
		},
		{
			key: 'addWebhook',
			value: async function addWebhook(data) {
				var webhook = this.getValidDocumentForInsert(data);
				var res = await _mongo.db.collection('webhooks').insertMany([webhook]);
				cache.del(WEBHOOKS_CACHE_KEY);
				var newWebhookId = res.ops[0]._id.toString();
				var newWebhook = await this.getSingleWebhook(newWebhookId);
				return newWebhook;
			}
		},
		{
			key: 'updateWebhook',
			value: async function updateWebhook(id, data) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var webhookObjectID = new _mongodb.ObjectID(id);
				var webhook = this.getValidDocumentForUpdate(id, data);

				var res = await _mongo.db.collection('webhooks').updateOne(
					{
						_id: webhookObjectID
					},

					{
						$set: webhook
					}
				);

				cache.del(WEBHOOKS_CACHE_KEY);
				var newWebhook = await this.getSingleWebhook(id);
				return newWebhook;
			}
		},
		{
			key: 'deleteWebhook',
			value: async function deleteWebhook(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var webhookObjectID = new _mongodb.ObjectID(id);
				var res = await _mongo.db
					.collection('webhooks')
					.deleteOne({ _id: webhookObjectID });
				cache.del(WEBHOOKS_CACHE_KEY);
				return res.deletedCount > 0;
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var webhook = {
					date_created: new Date()
				};

				webhook.description = _parse2.default.getString(data.description);
				webhook.url = _parse2.default.getString(data.url);
				webhook.secret = _parse2.default.getString(data.secret);
				webhook.enabled = _parse2.default.getBooleanIfValid(
					data.enabled,
					false
				);
				webhook.events = _parse2.default.getArrayIfValid(data.events) || [];

				return webhook;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var webhook = {
					date_updated: new Date()
				};

				if (data.description !== undefined) {
					webhook.description = _parse2.default.getString(data.description);
				}

				if (data.url !== undefined) {
					webhook.url = _parse2.default.getString(data.url);
				}

				if (data.secret !== undefined) {
					webhook.secret = _parse2.default.getString(data.secret);
				}

				if (data.enabled !== undefined) {
					webhook.enabled = _parse2.default.getBooleanIfValid(
						data.enabled,
						false
					);
				}

				if (data.events !== undefined) {
					webhook.events = _parse2.default.getArrayIfValid(data.events) || [];
				}

				return webhook;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item) {
				if (item) {
					item.id = item._id.toString();
					item._id = undefined;
				}

				return item;
			}
		}
	]);
	return WebhooksService;
})();
exports.default = new WebhooksService();
