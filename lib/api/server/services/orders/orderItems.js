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
var _products = require('../products/products');
var _products2 = _interopRequireDefault(_products);
var _stock = require('../products/stock');
var _stock2 = _interopRequireDefault(_stock);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrderItemsService = (function() {
	function OrderItemsService() {
		_classCallCheck(this, OrderItemsService);
	}
	_createClass(OrderItemsService, [
		{
			key: 'addItem',
			value: async function addItem(order_id, data) {
				if (!_mongodb.ObjectID.isValid(order_id)) {
					return Promise.reject('Invalid identifier');
				}

				var newItem = this.getValidDocumentForInsert(data);
				var orderItem = await this.getOrderItemIfExists(
					order_id,
					newItem.product_id,
					newItem.variant_id
				);

				if (orderItem) {
					await this.updateItemQuantityIfAvailable(
						order_id,
						orderItem,
						newItem
					);
				} else {
					await this.addNewItem(order_id, newItem);
				}

				return _orders2.default.getSingleOrder(order_id);
			}
		},
		{
			key: 'updateItemQuantityIfAvailable',
			value: async function updateItemQuantityIfAvailable(
				order_id,
				orderItem,
				newItem
			) {
				var quantityNeeded = orderItem.quantity + newItem.quantity;
				var availableQuantity = await this.getAvailableProductQuantity(
					newItem.product_id,
					newItem.variant_id,
					quantityNeeded
				);

				if (availableQuantity > 0) {
					await this.updateItem(order_id, orderItem.id, {
						quantity: availableQuantity
					});
				}
			}
		},
		{
			key: 'addNewItem',
			value: async function addNewItem(order_id, newItem) {
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var availableQuantity = await this.getAvailableProductQuantity(
					newItem.product_id,
					newItem.variant_id,
					newItem.quantity
				);

				if (availableQuantity > 0) {
					newItem.quantity = availableQuantity;
					await _mongo.db.collection('orders').updateOne(
						{
							_id: orderObjectID
						},

						{
							$push: {
								items: newItem
							}
						}
					);

					await this.calculateAndUpdateItem(order_id, newItem.id);
					await _stock2.default.handleAddOrderItem(order_id, newItem.id);
				}
			}
		},
		{
			key: 'getAvailableProductQuantity',
			value: async function getAvailableProductQuantity(
				product_id,
				variant_id,
				quantityNeeded
			) {
				var product = await _products2.default.getSingleProduct(
					product_id.toString()
				);

				if (!product) {
					return 0;
				} else if (product.discontinued) {
					return 0;
				} else if (product.stock_backorder) {
					return quantityNeeded;
				} else if (product.variable && variant_id) {
					var variant = this.getVariantFromProduct(product, variant_id);
					if (variant) {
						return variant.stock_quantity >= quantityNeeded
							? quantityNeeded
							: variant.stock_quantity;
					} else {
						return 0;
					}
				} else {
					return product.stock_quantity >= quantityNeeded
						? quantityNeeded
						: product.stock_quantity;
				}
			}
		},
		{
			key: 'getOrderItemIfExists',
			value: async function getOrderItemIfExists(
				order_id,
				product_id,
				variant_id
			) {
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var order = await _mongo.db.collection('orders').findOne(
					{
						_id: orderObjectID
					},

					{
						items: 1
					}
				);

				if (order && order.items && order.items.length > 0) {
					return order.items.find(function(item) {
						return (
							item.product_id.toString() === product_id.toString() &&
							(item.variant_id || '').toString() ===
								(variant_id || '').toString()
						);
					});
				} else {
					return null;
				}
			}
		},
		{
			key: 'updateItem',
			value: async function updateItem(order_id, item_id, data) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(item_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var itemObjectID = new _mongodb.ObjectID(item_id);
				var item = this.getValidDocumentForUpdate(data);

				if (_parse2.default.getNumberIfPositive(data.quantity) === 0) {
					// delete item
					return this.deleteItem(order_id, item_id);
				} else {
					// update
					await _stock2.default.handleDeleteOrderItem(order_id, item_id);
					await _mongo.db.collection('orders').updateOne(
						{
							_id: orderObjectID,
							'items.id': itemObjectID
						},

						{
							$set: item
						}
					);

					await this.calculateAndUpdateItem(order_id, item_id);
					await _stock2.default.handleAddOrderItem(order_id, item_id);
					return _orders2.default.getSingleOrder(order_id);
				}
			}
		},
		{
			key: 'getVariantFromProduct',
			value: function getVariantFromProduct(product, variantId) {
				if (product.variants && product.variants.length > 0) {
					return product.variants.find(function(variant) {
						return variant.id.toString() === variantId.toString();
					});
				} else {
					return null;
				}
			}
		},
		{
			key: 'getOptionFromProduct',
			value: function getOptionFromProduct(product, optionId) {
				if (product.options && product.options.length > 0) {
					return product.options.find(function(item) {
						return item.id.toString() === optionId.toString();
					});
				} else {
					return null;
				}
			}
		},
		{
			key: 'getOptionValueFromProduct',
			value: function getOptionValueFromProduct(product, optionId, valueId) {
				var option = this.getOptionFromProduct(product, optionId);
				if (option && option.values && option.values.length > 0) {
					return option.values.find(function(item) {
						return item.id.toString() === valueId.toString();
					});
				} else {
					return null;
				}
			}
		},
		{
			key: 'getOptionNameFromProduct',
			value: function getOptionNameFromProduct(product, optionId) {
				var option = this.getOptionFromProduct(product, optionId);
				return option ? option.name : null;
			}
		},
		{
			key: 'getOptionValueNameFromProduct',
			value: function getOptionValueNameFromProduct(
				product,
				optionId,
				valueId
			) {
				var value = this.getOptionValueFromProduct(product, optionId, valueId);
				return value ? value.name : null;
			}
		},
		{
			key: 'getVariantNameFromProduct',
			value: function getVariantNameFromProduct(product, variantId) {
				var variant = this.getVariantFromProduct(product, variantId);
				if (variant) {
					var optionNames = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (
							var _iterator = variant.options[Symbol.iterator](), _step;
							!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
							_iteratorNormalCompletion = true
						) {
							var option = _step.value;
							var optionName = this.getOptionNameFromProduct(
								product,
								option.option_id
							);

							var optionValueName = this.getOptionValueNameFromProduct(
								product,
								option.option_id,
								option.value_id
							);

							optionNames.push(optionName + ': ' + optionValueName);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
					return optionNames.join(', ');
				}

				return null;
			}
		},
		{
			key: 'calculateAndUpdateItem',
			value: async function calculateAndUpdateItem(orderId, itemId) {
				// TODO: tax_total, discount_total

				var orderObjectID = new _mongodb.ObjectID(orderId);
				var itemObjectID = new _mongodb.ObjectID(itemId);

				var order = await _orders2.default.getSingleOrder(orderId);

				if (order && order.items && order.items.length > 0) {
					var item = order.items.find(function(i) {
						return i.id.toString() === itemId.toString();
					});
					if (item) {
						var itemData = await this.getCalculatedData(item);
						await _mongo.db.collection('orders').updateOne(
							{
								_id: orderObjectID,
								'items.id': itemObjectID
							},

							{
								$set: itemData
							}
						);
					}
				}
			}
		},
		{
			key: 'getCalculatedData',
			value: async function getCalculatedData(item) {
				var product = await _products2.default.getSingleProduct(
					item.product_id.toString()
				);

				if (item.custom_price && item.custom_price > 0) {
					// product with custom price - can set on client side
					return {
						'items.$.sku': product.sku,
						'items.$.name': product.name,
						'items.$.variant_name': item.custom_note || '',
						'items.$.price': item.custom_price,
						'items.$.tax_class': product.tax_class,
						'items.$.tax_total': 0,
						'items.$.weight': product.weight || 0,
						'items.$.discount_total': 0,
						'items.$.price_total': item.custom_price * item.quantity
					};
				} else if (item.variant_id) {
					// product with variant
					var variant = this.getVariantFromProduct(product, item.variant_id);
					var variantName = this.getVariantNameFromProduct(
						product,
						item.variant_id
					);

					var variantPrice =
						variant.price && variant.price > 0 ? variant.price : product.price;

					if (variant) {
						return {
							'items.$.sku': variant.sku,
							'items.$.name': product.name,
							'items.$.variant_name': variantName,
							'items.$.price': variantPrice,
							'items.$.tax_class': product.tax_class,
							'items.$.tax_total': 0,
							'items.$.weight': variant.weight || 0,
							'items.$.discount_total': 0,
							'items.$.price_total': variantPrice * item.quantity
						};
					} else {
						// variant not exists
						return null;
					}
				} else {
					// normal product
					return {
						'items.$.sku': product.sku,
						'items.$.name': product.name,
						'items.$.variant_name': '',
						'items.$.price': product.price,
						'items.$.tax_class': product.tax_class,
						'items.$.tax_total': 0,
						'items.$.weight': product.weight || 0,
						'items.$.discount_total': 0,
						'items.$.price_total': product.price * item.quantity
					};
				}
			}
		},
		{
			key: 'calculateAndUpdateAllItems',
			value: async function calculateAndUpdateAllItems(order_id) {
				var order = await _orders2.default.getSingleOrder(order_id);

				if (order && order.items) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
					try {
						for (
							var _iterator2 = order.items[Symbol.iterator](), _step2;
							!(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
							_iteratorNormalCompletion2 = true
						) {
							var item = _step2.value;
							await this.calculateAndUpdateItem(order_id, item.id);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
					return _orders2.default.getSingleOrder(order_id);
				} else {
					// order.items is empty
					return null;
				}
			}
		},
		{
			key: 'deleteItem',
			value: async function deleteItem(order_id, item_id) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(item_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var itemObjectID = new _mongodb.ObjectID(item_id);

				await _stock2.default.handleDeleteOrderItem(order_id, item_id);
				await _mongo.db.collection('orders').updateOne(
					{
						_id: orderObjectID
					},

					{
						$pull: {
							items: {
								id: itemObjectID
							}
						}
					}
				);

				return _orders2.default.getSingleOrder(order_id);
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var item = {
					id: new _mongodb.ObjectID(),
					product_id: _parse2.default.getObjectIDIfValid(data.product_id),
					variant_id: _parse2.default.getObjectIDIfValid(data.variant_id),
					quantity: _parse2.default.getNumberIfPositive(data.quantity) || 1
				};

				if (data.custom_price) {
					item.custom_price = _parse2.default.getNumberIfPositive(
						data.custom_price
					);
				}

				if (data.custom_note) {
					item.custom_note = _parse2.default.getString(data.custom_note);
				}

				return item;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var item = {};

				if (data.variant_id !== undefined) {
					item['items.$.variant_id'] = _parse2.default.getObjectIDIfValid(
						data.variant_id
					);
				}

				if (data.quantity !== undefined) {
					item['items.$.quantity'] = _parse2.default.getNumberIfPositive(
						data.quantity
					);
				}

				return item;
			}
		}
	]);
	return OrderItemsService;
})();
exports.default = new OrderItemsService();
