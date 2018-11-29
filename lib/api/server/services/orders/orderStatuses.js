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
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
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
var OrderStatusesService = (function() {
	function OrderStatusesService() {
		_classCallCheck(this, OrderStatusesService);
	}
	_createClass(OrderStatusesService, [
		{
			key: 'getStatuses',
			value: function getStatuses() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = {};
				var id = _parse2.default.getObjectIDIfValid(params.id);
				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}

				return _mongo.db
					.collection('orderStatuses')
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
			key: 'getSingleStatus',
			value: function getSingleStatus(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getStatuses({ id: id }).then(function(statuses) {
					return statuses.length > 0 ? statuses[0] : null;
				});
			}
		},
		{
			key: 'addStatus',
			value: function addStatus(data) {
				var _this2 = this;
				var status = this.getValidDocumentForInsert(data);
				return _mongo.db
					.collection('orderStatuses')
					.insertMany([status])
					.then(function(res) {
						return _this2.getSingleStatus(res.ops[0]._id.toString());
					});
			}
		},
		{
			key: 'updateStatus',
			value: function updateStatus(id, data) {
				var _this3 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var statusObjectID = new _mongodb.ObjectID(id);
				var status = this.getValidDocumentForUpdate(id, data);

				return _mongo.db
					.collection('orderStatuses')
					.updateOne(
						{
							_id: statusObjectID
						},

						{ $set: status }
					)
					.then(function(res) {
						return _this3.getSingleStatus(id);
					});
			}
		},
		{
			key: 'deleteStatus',
			value: function deleteStatus(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var statusObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('orderStatuses')
					.deleteOne({ _id: statusObjectID })
					.then(function(deleteResponse) {
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var status = {};

				status.name = _parse2.default.getString(data.name);
				status.description = _parse2.default.getString(data.description);
				status.color = _parse2.default.getString(data.color);
				status.bgcolor = _parse2.default.getString(data.bgcolor);
				status.is_public = _parse2.default.getBooleanIfValid(
					data.is_public,
					false
				);

				return status;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var status = {};

				if (data.name !== undefined) {
					status.name = _parse2.default.getString(data.name);
				}

				if (data.description !== undefined) {
					status.description = _parse2.default.getString(data.description);
				}

				if (data.color !== undefined) {
					status.color = _parse2.default.getString(data.color);
				}

				if (data.bgcolor !== undefined) {
					status.bgcolor = _parse2.default.getString(data.bgcolor);
				}

				if (data.is_public !== undefined) {
					status.is_public = _parse2.default.getBooleanIfValid(
						data.is_public,
						false
					);
				}

				return status;
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
	return OrderStatusesService;
})();
exports.default = new OrderStatusesService();
