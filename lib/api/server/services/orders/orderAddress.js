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
var OrderAddressService = (function() {
	function OrderAddressService() {
		_classCallCheck(this, OrderAddressService);
	}
	_createClass(OrderAddressService, [
		{
			key: 'updateBillingAddress',
			value: function updateBillingAddress(id, data) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(id);
				var billing_address = this.getValidDocumentForUpdate(
					id,
					data,
					'billing_address'
				);

				return _mongo.db
					.collection('orders')
					.updateOne(
						{
							_id: orderObjectID
						},

						{ $set: billing_address }
					)
					.then(function(res) {
						return _orders2.default.getSingleOrder(id);
					});
			}
		},
		{
			key: 'updateShippingAddress',
			value: function updateShippingAddress(id, data) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(id);
				var shipping_address = this.getValidDocumentForUpdate(
					id,
					data,
					'shipping_address'
				);

				return _mongo.db
					.collection('orders')
					.updateOne(
						{
							_id: orderObjectID
						},

						{ $set: shipping_address }
					)
					.then(function(res) {
						return _orders2.default.getSingleOrder(id);
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data, addressTypeName) {
				var keys = Object.keys(data);
				if (keys.length === 0) {
					return new Error('Required fields are missing');
				}

				var address = {};

				keys.forEach(function(key) {
					var value = data[key];
					if (key === 'coordinates' || key === 'details') {
						address[addressTypeName + '.' + key] = value;
					} else {
						address[addressTypeName + '.' + key] = _parse2.default.getString(
							value
						);
					}
				});

				return address;
			}
		}
	]);
	return OrderAddressService;
})();
exports.default = new OrderAddressService();
