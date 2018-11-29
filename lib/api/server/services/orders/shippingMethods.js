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
var _shippingMethodsLight = require('./shippingMethodsLight');
var _shippingMethodsLight2 = _interopRequireDefault(_shippingMethodsLight);
var _paymentMethods = require('./paymentMethods');
var _paymentMethods2 = _interopRequireDefault(_paymentMethods);
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
var ShippingMethodsService = (function() {
	function ShippingMethodsService() {
		_classCallCheck(this, ShippingMethodsService);
	}
	_createClass(ShippingMethodsService, [
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
									filter['$and'] = [];
									filter['$and'].push({
										$or: [
											{
												'conditions.weight_total_min': 0
											},

											{
												'conditions.weight_total_min': {
													$lte: order.weight_total
												}
											}
										]
									});

									filter['$and'].push({
										$or: [
											{
												'conditions.weight_total_max': 0
											},

											{
												'conditions.weight_total_max': {
													$gte: order.weight_total
												}
											}
										]
									});

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

									if (
										order.shipping_address.state &&
										order.shipping_address.state.length > 0
									) {
										filter['$and'].push({
											$or: [
												{
													'conditions.states': {
														$size: 0
													}
												},

												{
													'conditions.states': order.shipping_address.state
												}
											]
										});
									}

									if (
										order.shipping_address.city &&
										order.shipping_address.city.length > 0
									) {
										filter['$and'].push({
											$or: [
												{
													'conditions.cities': {
														$size: 0
													}
												},

												{
													'conditions.cities': order.shipping_address.city
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
					return _shippingMethodsLight2.default.getMethods(filter);
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
					.collection('shippingMethods')
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
					.collection('shippingMethods')
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
			value: async function deleteMethod(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var methodObjectID = new _mongodb.ObjectID(id);
				var deleteResponse = await _mongo.db
					.collection('shippingMethods')
					.deleteOne({ _id: methodObjectID });

				await _paymentMethods2.default.pullShippingMethod(id);
				return deleteResponse.deletedCount > 0;
			}
		},
		{
			key: 'getShippingMethodConditions',
			value: function getShippingMethodConditions(conditions) {
				return conditions
					? {
							countries:
								_parse2.default.getArrayIfValid(conditions.countries) || [],
							states: _parse2.default.getArrayIfValid(conditions.states) || [],
							cities: _parse2.default.getArrayIfValid(conditions.cities) || [],
							subtotal_min:
								_parse2.default.getNumberIfPositive(conditions.subtotal_min) ||
								0,
							subtotal_max:
								_parse2.default.getNumberIfPositive(conditions.subtotal_max) ||
								0,
							weight_total_min:
								_parse2.default.getNumberIfPositive(
									conditions.weight_total_min
								) || 0,
							weight_total_max:
								_parse2.default.getNumberIfPositive(
									conditions.weight_total_max
								) || 0
					  }
					: {
							countries: [],
							states: [],
							cities: [],
							subtotal_min: 0,
							subtotal_max: 0,
							weight_total_min: 0,
							weight_total_max: 0
					  };
			}
		},
		{
			key: 'getFields',
			value: function getFields(fields) {
				if (fields && Array.isArray(fields) && fields.length > 0) {
					return fields.map(function(field) {
						return {
							key: _parse2.default.getString(field.key),
							label: _parse2.default.getString(field.label),
							required: _parse2.default.getBooleanIfValid(field.required, false)
						};
					});
				} else {
					return [];
				}
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var method = {
					// 'logo': '',
					// 'app_id': null,
					// 'app_settings': {}
				};

				method.name = _parse2.default.getString(data.name);
				method.description = _parse2.default.getString(data.description);
				method.position =
					_parse2.default.getNumberIfPositive(data.position) || 0;
				method.enabled = _parse2.default.getBooleanIfValid(data.enabled, true);
				method.price = _parse2.default.getNumberIfPositive(data.price) || 0;
				method.conditions = this.getShippingMethodConditions(data.conditions);
				method.fields = this.getFields(data.fields);

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

				if (data.price !== undefined) {
					method.price = _parse2.default.getNumberIfPositive(data.price) || 0;
				}

				if (data.conditions !== undefined) {
					method.conditions = this.getShippingMethodConditions(data.conditions);
				}

				if (data.fields !== undefined) {
					method.fields = this.getFields(data.fields);
				}

				return method;
			}
		}
	]);
	return ShippingMethodsService;
})();
exports.default = new ShippingMethodsService();
