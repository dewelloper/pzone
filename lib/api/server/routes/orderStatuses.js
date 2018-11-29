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
var _orderStatuses = require('../services/orders/orderStatuses');
var _orderStatuses2 = _interopRequireDefault(_orderStatuses);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrderStatusesRoute = (function() {
	function OrderStatusesRoute(router) {
		_classCallCheck(this, OrderStatusesRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(OrderStatusesRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/order_statuses',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_ORDER_STATUSES
					),
					this.getStatuses.bind(this)
				);

				this.router.post(
					'/v1/order_statuses',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDER_STATUSES
					),
					this.addStatus.bind(this)
				);

				this.router.get(
					'/v1/order_statuses/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_ORDER_STATUSES
					),
					this.getSingleStatus.bind(this)
				);

				this.router.put(
					'/v1/order_statuses/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDER_STATUSES
					),
					this.updateStatus.bind(this)
				);

				this.router.delete(
					'/v1/order_statuses/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_ORDER_STATUSES
					),
					this.deleteStatus.bind(this)
				);
			}
		},
		{
			key: 'getStatuses',
			value: function getStatuses(req, res, next) {
				_orderStatuses2.default
					.getStatuses(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleStatus',
			value: function getSingleStatus(req, res, next) {
				_orderStatuses2.default
					.getSingleStatus(req.params.id)
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
			key: 'addStatus',
			value: function addStatus(req, res, next) {
				_orderStatuses2.default
					.addStatus(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateStatus',
			value: function updateStatus(req, res, next) {
				_orderStatuses2.default
					.updateStatus(req.params.id, req.body)
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
			key: 'deleteStatus',
			value: function deleteStatus(req, res, next) {
				_orderStatuses2.default
					.deleteStatus(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return OrderStatusesRoute;
})();
exports.default = OrderStatusesRoute;
