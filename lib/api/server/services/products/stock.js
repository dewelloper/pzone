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
var _products = require('./products');
var _products2 = _interopRequireDefault(_products);
var _variants = require('./variants');
var _variants2 = _interopRequireDefault(_variants);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ProductStockService = (function() {
	function ProductStockService() {
		_classCallCheck(this, ProductStockService);
	}
	_createClass(ProductStockService, [
		{
			key: 'handleOrderCheckout',
			value: async function handleOrderCheckout(orderId) {
				var order = await this.getOrder(orderId);
				if (order && order.items.length > 0) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (
							var _iterator = order.items[Symbol.iterator](), _step;
							!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
							_iteratorNormalCompletion = true
						) {
							var item = _step.value;
							await this.decrementStockQuantity(
								item.product_id,
								item.variant_id,
								item.quantity
							);
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
				}
			}
		},
		{
			key: 'handleCancelOrder',
			value: async function handleCancelOrder(orderId) {
				var order = await this.getOrder(orderId);
				if (order && order.items.length > 0) {
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
							await this.incrementStockQuantity(
								item.product_id,
								item.variant_id,
								item.quantity
							);
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
				}
			}
		},
		{
			key: 'handleAddOrderItem',
			value: async function handleAddOrderItem(orderId, itemId) {
				var item = await this.getOrderItem(orderId, itemId);
				if (item) {
					await this.decrementStockQuantity(
						item.product_id,
						item.variant_id,
						item.quantity
					);
				}
			}
		},
		{
			key: 'handleDeleteOrderItem',
			value: async function handleDeleteOrderItem(orderId, itemId) {
				var item = await this.getOrderItem(orderId, itemId);
				if (item) {
					await this.incrementStockQuantity(
						item.product_id,
						item.variant_id,
						item.quantity
					);
				}
			}
		},
		{
			key: 'incrementStockQuantity',
			value: async function incrementStockQuantity(
				productId,
				variantId,
				quantity
			) {
				await this.changeStockQuantity(productId, variantId, quantity);
			}
		},
		{
			key: 'decrementStockQuantity',
			value: async function decrementStockQuantity(
				productId,
				variantId,
				quantity
			) {
				await this.changeStockQuantity(productId, variantId, quantity * -1);
			}
		},
		{
			key: 'changeStockQuantity',
			value: async function changeStockQuantity(
				productId,
				variantId,
				quantity
			) {
				var product = await _products2.default.getSingleProduct(productId);
				if (product && this.isStockTrackingEnabled(product)) {
					// change product stock quantity
					var productQuantity = product.stock_quantity || 0;
					var newProductQuantity = productQuantity + quantity;
					await _products2.default.updateProduct(productId, {
						stock_quantity: newProductQuantity
					});

					if (this.isVariant(variantId)) {
						// change variant stock quantity
						var variantQuantity = this.getVariantQuantityFromProduct(
							product,
							variantId
						);

						var newVariantQuantity = variantQuantity + quantity;
						await _variants2.default.updateVariant(productId, variantId, {
							stock_quantity: newVariantQuantity
						});
					}
				}
			}
		},
		{
			key: 'getVariantQuantityFromProduct',
			value: function getVariantQuantityFromProduct(product, variantId) {
				var variants = product.variants;
				if (variants && variants.length > 0) {
					var variant = variants.find(function(v) {
						return v.id.toString() === variantId.toString();
					});

					if (variant) {
						return variant.stock_quantity || 0;
					}
				}

				return 0;
			}
		},
		{
			key: 'isStockTrackingEnabled',
			value: function isStockTrackingEnabled(product) {
				return product.stock_tracking === true;
			}
		},
		{
			key: 'isVariant',
			value: function isVariant(variantId) {
				return variantId && variantId !== '';
			}
		},
		{
			key: 'getOrder',
			value: async function getOrder(orderId) {
				var filter = {
					_id: new _mongodb.ObjectID(orderId),
					draft: false
				};

				var order = await _mongo.db.collection('orders').findOne(filter);
				return order;
			}
		},
		{
			key: 'getOrderItem',
			value: async function getOrderItem(orderId, itemId) {
				var order = await this.getOrder(orderId);
				if (order && order.items.length > 0) {
					return order.items.find(function(item) {
						return item.id.toString() === itemId.toString();
					});
				} else {
					return null;
				}
			}
		}
	]);
	return ProductStockService;
})();
exports.default = new ProductStockService();
