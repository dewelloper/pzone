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
var _security = require('../lib/security');
var _security2 = _interopRequireDefault(_security);
var _orders = require('../services/orders/orders');
var _orders2 = _interopRequireDefault(_orders);
var _orderAddress = require('../services/orders/orderAddress');
var _orderAddress2 = _interopRequireDefault(_orderAddress);
var _orderItems = require('../services/orders/orderItems');
var _orderItems2 = _interopRequireDefault(_orderItems);
var _orderTransactions = require('../services/orders/orderTransactions');
var _orderTransactions2 = _interopRequireDefault(_orderTransactions);
var _orderDiscounts = require('../services/orders/orderDiscounts');
var _orderDiscounts2 = _interopRequireDefault(_orderDiscounts);
var _settings = require('../services/settings/settings');
var _settings2 = _interopRequireDefault(_settings);
var _paymentGateways = require('../paymentGateways');
var _paymentGateways2 = _interopRequireDefault(_paymentGateways);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrdersRoute = (function() {
	function OrdersRoute(router) {
		_classCallCheck(this, OrdersRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(OrdersRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/orders',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_ORDERS
					),
					this.getOrders.bind(this)
				);

				this.router.post(
					'/v1/orders',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.addOrder.bind(this)
				);

				this.router.get(
					'/v1/orders/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_ORDERS
					),
					this.getSingleOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateOrder.bind(this)
				);

				this.router.delete(
					'/v1/orders/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.deleteOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/recalculate',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.recalculateOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/checkout',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.checkoutOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/cancel',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.cancelOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/close',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.closeOrder.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/billing_address',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateBillingAddress.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/shipping_address',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateShippingAddress.bind(this)
				);

				this.router.post(
					'/v1/orders/:id/items',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.addItem.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/items/:item_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateItem.bind(this)
				);

				this.router.delete(
					'/v1/orders/:id/items/:item_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.deleteItem.bind(this)
				);

				this.router.post(
					'/v1/orders/:id/transactions',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.addTransaction.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/transactions/:transaction_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateTransaction.bind(this)
				);

				this.router.delete(
					'/v1/orders/:id/transactions/:transaction_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.deleteTransaction.bind(this)
				);

				this.router.post(
					'/v1/orders/:id/discounts',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.addDiscount.bind(this)
				);

				this.router.put(
					'/v1/orders/:id/discounts/:discount_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.updateDiscount.bind(this)
				);

				this.router.delete(
					'/v1/orders/:id/discounts/:discount_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.deleteDiscount.bind(this)
				);

				this.router.get(
					'/v1/orders/:id/payment_form_settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_ORDERS
					),
					this.getPaymentFormSettings.bind(this)
				);

				this.router.post(
					'/v1/orders/:id/charge',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDERS
					),
					this.chargeOrder.bind(this)
				);
			}
		},
		{
			key: 'getOrders',
			value: function getOrders(req, res, next) {
				_orders2.default
					.getOrders(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleOrder',
			value: function getSingleOrder(req, res, next) {
				_orders2.default
					.getSingleOrder(req.params.id)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'addOrder',
			value: function addOrder(req, res, next) {
				_orders2.default
					.addOrder(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateOrder',
			value: function updateOrder(req, res, next) {
				_orders2.default
					.updateOrder(req.params.id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteOrder',
			value: function deleteOrder(req, res, next) {
				_orders2.default
					.deleteOrder(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'recalculateOrder',
			value: function recalculateOrder(req, res, next) {
				_orderItems2.default
					.calculateAndUpdateAllItems(req.params.id)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'checkoutOrder',
			value: function checkoutOrder(req, res, next) {
				_orders2.default
					.checkoutOrder(req.params.id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'cancelOrder',
			value: function cancelOrder(req, res, next) {
				_orders2.default
					.cancelOrder(req.params.id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'closeOrder',
			value: function closeOrder(req, res, next) {
				_orders2.default
					.closeOrder(req.params.id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateBillingAddress',
			value: function updateBillingAddress(req, res, next) {
				_orderAddress2.default
					.updateBillingAddress(req.params.id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'updateShippingAddress',
			value: function updateShippingAddress(req, res, next) {
				_orderAddress2.default
					.updateShippingAddress(req.params.id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'addItem',
			value: function addItem(req, res, next) {
				var order_id = req.params.id;
				_orderItems2.default
					.addItem(order_id, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateItem',
			value: function updateItem(req, res, next) {
				var order_id = req.params.id;
				var item_id = req.params.item_id;
				_orderItems2.default
					.updateItem(order_id, item_id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteItem',
			value: function deleteItem(req, res, next) {
				var order_id = req.params.id;
				var item_id = req.params.item_id;
				_orderItems2.default
					.deleteItem(order_id, item_id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'addTransaction',
			value: function addTransaction(req, res, next) {
				var order_id = req.params.id;
				_orderTransactions2.default
					.addTransaction(order_id, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateTransaction',
			value: function updateTransaction(req, res, next) {
				var order_id = req.params.id;
				var transaction_id = req.params.item_id;
				_orderTransactions2.default
					.updateTransaction(order_id, transaction_id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteTransaction',
			value: function deleteTransaction(req, res, next) {
				var order_id = req.params.id;
				var transaction_id = req.params.item_id;
				_orderTransactions2.default
					.deleteTransaction(order_id, transaction_id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'addDiscount',
			value: function addDiscount(req, res, next) {
				var order_id = req.params.id;
				_orderDiscounts2.default
					.addDiscount(order_id, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateDiscount',
			value: function updateDiscount(req, res, next) {
				var order_id = req.params.id;
				var discount_id = req.params.item_id;
				_orderDiscounts2.default
					.updateDiscount(order_id, discount_id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteDiscount',
			value: function deleteDiscount(req, res, next) {
				var order_id = req.params.id;
				var discount_id = req.params.item_id;
				_orderDiscounts2.default
					.deleteDiscount(order_id, discount_id)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getPaymentFormSettings',
			value: function getPaymentFormSettings(req, res, next) {
				var orderId = req.params.id;
				_paymentGateways2.default
					.getPaymentFormSettings(orderId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'chargeOrder',
			value: async function chargeOrder(req, res, next) {
				var orderId = req.params.id;
				try {
					var isSuccess = await _orders2.default.chargeOrder(orderId);
					res.status(isSuccess ? 200 : 500).end();
				} catch (err) {
					next(err);
				}
			}
		}
	]);
	return OrdersRoute;
})();
exports.default = OrdersRoute;
