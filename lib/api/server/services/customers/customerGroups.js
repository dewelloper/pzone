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
var CustomerGroupsService = (function() {
	function CustomerGroupsService() {
		_classCallCheck(this, CustomerGroupsService);
	}
	_createClass(CustomerGroupsService, [
		{
			key: 'getGroups',
			value: function getGroups() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				return _mongo.db
					.collection('customerGroups')
					.find()
					.toArray()
					.then(function(items) {
						return items.map(function(item) {
							return _this.changeProperties(item);
						});
					});
			}
		},
		{
			key: 'getSingleGroup',
			value: function getSingleGroup(id) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var groupObjectID = new _mongodb.ObjectID(id);

				return _mongo.db
					.collection('customerGroups')
					.findOne({ _id: groupObjectID })
					.then(function(item) {
						return _this2.changeProperties(item);
					});
			}
		},
		{
			key: 'addGroup',
			value: function addGroup(data) {
				var _this3 = this;
				var group = this.getValidDocumentForInsert(data);
				return _mongo.db
					.collection('customerGroups')
					.insertMany([group])
					.then(function(res) {
						return _this3.getSingleGroup(res.ops[0]._id.toString());
					});
			}
		},
		{
			key: 'updateGroup',
			value: function updateGroup(id, data) {
				var _this4 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var groupObjectID = new _mongodb.ObjectID(id);
				var group = this.getValidDocumentForUpdate(id, data);

				return _mongo.db
					.collection('customerGroups')
					.updateOne(
						{
							_id: groupObjectID
						},

						{ $set: group }
					)
					.then(function(res) {
						return _this4.getSingleGroup(id);
					});
			}
		},
		{
			key: 'deleteGroup',
			value: function deleteGroup(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var groupObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('customerGroups')
					.deleteOne({ _id: groupObjectID })
					.then(function(deleteResponse) {
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var group = {
					date_created: new Date()
				};

				group.name = _parse2.default.getString(data.name);
				group.description = _parse2.default.getString(data.description);

				return group;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var group = {
					date_updated: new Date()
				};

				if (data.name !== undefined) {
					group.name = _parse2.default.getString(data.name);
				}

				if (data.description !== undefined) {
					group.description = _parse2.default.getString(data.description);
				}

				return group;
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
	return CustomerGroupsService;
})();
exports.default = new CustomerGroupsService();
