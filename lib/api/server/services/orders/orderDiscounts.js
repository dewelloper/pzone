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
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _orders = require('./orders');
var _orders2 = _interopRequireDefault(_orders);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrdertDiscountsService = (function() {
	function OrdertDiscountsService() {
		_classCallCheck(this, OrdertDiscountsService);
	}
	_createClass(OrdertDiscountsService, [
		{
			key: 'addDiscount',
			value: function addDiscount(order_id, data) {
				if (!_mongodb.ObjectID.isValid(order_id)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var discount = this.getValidDocumentForInsert(data);

				return _mongo.db.collection('orders').updateOne(
					{
						_id: orderObjectID
					},

					{
						$push: {
							discounts: discount
						}
					}
				);
			}
		},
		{
			key: 'updateDiscount',
			value: function updateDiscount(order_id, discount_id, data) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(discount_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var discountObjectID = new _mongodb.ObjectID(discount_id);
				var discount = this.getValidDocumentForUpdate(data);

				return _mongo.db
					.collection('orders')
					.updateOne(
						{
							_id: orderObjectID,
							'discounts.id': discountObjectID
						},

						{ $set: discount }
					)
					.then(function(res) {
						return _orders2.default.getSingleOrder(order_id);
					});
			}
		},
		{
			key: 'deleteDiscount',
			value: function deleteDiscount(order_id, discount_id) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(discount_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var discountObjectID = new _mongodb.ObjectID(discount_id);

				return _mongo.db
					.collection('orders')
					.updateOne(
						{
							_id: orderObjectID
						},

						{
							$pull: {
								discounts: {
									id: discountObjectID
								}
							}
						}
					)
					.then(function(res) {
						return _orders2.default.getSingleOrder(order_id);
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				return {
					id: new _mongodb.ObjectID(),
					name: _parse2.default.getString(data.name),
					amount: _parse2.default.getNumberIfPositive(data.amount)
				};
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var discount = {};

				if (data.variant_id !== undefined) {
					discount['discounts.$.name'] = _parse2.default.getString(data.name);
				}

				if (data.quantity !== undefined) {
					discount['discounts.$.amount'] = _parse2.default.getNumberIfPositive(
						data.amount
					);
				}

				return discount;
			}
		}
	]);
	return OrdertDiscountsService;
})();
exports.default = new OrdertDiscountsService();
