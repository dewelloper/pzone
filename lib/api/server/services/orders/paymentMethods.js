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
var _paymentMethodsLight = require('./paymentMethodsLight');
var _paymentMethodsLight2 = _interopRequireDefault(_paymentMethodsLight);
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
var PaymentMethodsService = (function() {
	function PaymentMethodsService() {
		_classCallCheck(this, PaymentMethodsService);
	}
	_createClass(PaymentMethodsService, [
		{
			key: 'getFilter',
			value: function getFilter() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				return new Promise(function(resolve, reject) {
					var filter = {};
					var id = _parse2.default.getObjectIDIfValid(params.id);
					var enabled = _parse2.default.getBooleanIfValid(params.enabled);

					if (id) {
						filter._id = new _mongodb.ObjectID(id);
					}

					if (enabled !== null) {
						filter.enabled = enabled;
					}

					var order_id = _parse2.default.getObjectIDIfValid(params.order_id);

					if (order_id) {
						return _orders2.default
							.getSingleOrder(order_id)
							.then(function(order) {
								if (order) {
									var shippingMethodObjectID = _parse2.default.getObjectIDIfValid(
										order.shipping_method_id
									);

									filter['$and'] = [];
									filter['$and'].push({
										$or: [
											{
												'conditions.subtotal_min': 0
											},

											{
												'conditions.subtotal_min': {
													$lte: order.subtotal
												}
											}
										]
									});

									filter['$and'].push({
										$or: [
											{
												'conditions.subtotal_max': 0
											},

											{
												'conditions.subtotal_max': {
													$gte: order.subtotal
												}
											}
										]
									});

									if (
										order.shipping_address.country &&
										order.shipping_address.country.length > 0
									) {
										filter['$and'].push({
											$or: [
												{
													'conditions.countries': {
														$size: 0
													}
												},

												{
													'conditions.countries': order.shipping_address.country
												}
											]
										});
									}

									if (shippingMethodObjectID) {
										filter['$and'].push({
											$or: [
												{
													'conditions.shipping_method_ids': {
														$size: 0
													}
												},

												{
													'conditions.shipping_method_ids': shippingMethodObjectID
												}
											]
										});
									}
								}
								resolve(filter);
							});
					} else {
						resolve(filter);
					}
				});
			}
		},
		{
			key: 'getMethods',
			value: function getMethods() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				return this.getFilter(params).then(function(filter) {
					return _paymentMethodsLight2.default.getMethods(filter);
				});
			}
		},
		{
			key: 'getSingleMethod',
			value: function getSingleMethod(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getMethods({ id: id }).then(function(methods) {
					return methods.length > 0 ? methods[0] : null;
				});
			}
		},
		{
			key: 'addMethod',
			value: function addMethod(data) {
				var _this = this;
				var method = this.getValidDocumentForInsert(data);
				return _mongo.db
					.collection('paymentMethods')
					.insertMany([method])
					.then(function(res) {
						return _this.getSingleMethod(res.ops[0]._id.toString());
					});
			}
		},
		{
			key: 'updateMethod',
			value: function updateMethod(id, data) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var methodObjectID = new _mongodb.ObjectID(id);
				var method = this.getValidDocumentForUpdate(id, data);

				return _mongo.db
					.collection('paymentMethods')
					.updateOne(
						{
							_id: methodObjectID
						},

						{ $set: method }
					)
					.then(function(res) {
						return _this2.getSingleMethod(id);
					});
			}
		},
		{
			key: 'deleteMethod',
			value: function deleteMethod(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var methodObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('paymentMethods')
					.deleteOne({ _id: methodObjectID })
					.then(function(deleteResponse) {
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'pullShippingMethod',
			value: async function pullShippingMethod(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var methodObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('paymentMethods')
					.update(
						{},
						{ $pull: { 'conditions.shipping_method_ids': methodObjectID } },
						{ multi: true }
					);
			}
		},
		{
			key: 'getPaymentMethodConditions',
			value: function getPaymentMethodConditions(conditions) {
				var methodIds = conditions
					? _parse2.default.getArrayIfValid(conditions.shipping_method_ids) ||
					  []
					: [];
				var methodObjects = [];
				if (methodIds.length > 0) {
					methodObjects = methodIds.map(function(id) {
						return new _mongodb.ObjectID(id);
					});
				}

				return conditions
					? {
							countries:
								_parse2.default.getArrayIfValid(conditions.countries) || [],
							shipping_method_ids: methodObjects,
							subtotal_min:
								_parse2.default.getNumberIfPositive(conditions.subtotal_min) ||
								0,
							subtotal_max:
								_parse2.default.getNumberIfPositive(conditions.subtotal_max) ||
								0
					  }
					: {
							countries: [],
							shipping_method_ids: [],
							subtotal_min: 0,
							subtotal_max: 0
					  };
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var method = {};

				method.name = _parse2.default.getString(data.name);
				method.description = _parse2.default.getString(data.description);
				method.position =
					_parse2.default.getNumberIfPositive(data.position) || 0;
				method.enabled = _parse2.default.getBooleanIfValid(data.enabled, true);
				method.conditions = this.getPaymentMethodConditions(data.conditions);
				method.gateway = _parse2.default.getString(data.gateway);

				return method;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var method = {};

				if (data.name !== undefined) {
					method.name = _parse2.default.getString(data.name);
				}

				if (data.description !== undefined) {
					method.description = _parse2.default.getString(data.description);
				}

				if (data.position !== undefined) {
					method.position =
						_parse2.default.getNumberIfPositive(data.position) || 0;
				}

				if (data.enabled !== undefined) {
					method.enabled = _parse2.default.getBooleanIfValid(
						data.enabled,
						true
					);
				}

				if (data.conditions !== undefined) {
					method.conditions = this.getPaymentMethodConditions(data.conditions);
				}

				if (data.gateway !== undefined) {
					method.gateway = _parse2.default.getString(data.gateway);
				}

				return method;
			}
		}
	]);
	return PaymentMethodsService;
})();
exports.default = new PaymentMethodsService();
