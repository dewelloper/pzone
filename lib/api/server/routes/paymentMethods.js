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
var _paymentMethods = require('../services/orders/paymentMethods');
var _paymentMethods2 = _interopRequireDefault(_paymentMethods);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var PaymentMethodsRoute = (function() {
	function PaymentMethodsRoute(router) {
		_classCallCheck(this, PaymentMethodsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(PaymentMethodsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/payment_methods',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PAYMENT_METHODS
					),
					this.getMethods.bind(this)
				);

				this.router.post(
					'/v1/payment_methods',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAYMENT_METHODS
					),
					this.addMethod.bind(this)
				);

				this.router.get(
					'/v1/payment_methods/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PAYMENT_METHODS
					),
					this.getSingleMethod.bind(this)
				);

				this.router.put(
					'/v1/payment_methods/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAYMENT_METHODS
					),
					this.updateMethod.bind(this)
				);

				this.router.delete(
					'/v1/payment_methods/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAYMENT_METHODS
					),
					this.deleteMethod.bind(this)
				);
			}
		},
		{
			key: 'getMethods',
			value: function getMethods(req, res, next) {
				_paymentMethods2.default
					.getMethods(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleMethod',
			value: function getSingleMethod(req, res, next) {
				_paymentMethods2.default
					.getSingleMethod(req.params.id)
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
			key: 'addMethod',
			value: function addMethod(req, res, next) {
				_paymentMethods2.default
					.addMethod(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateMethod',
			value: function updateMethod(req, res, next) {
				_paymentMethods2.default
					.updateMethod(req.params.id, req.body)
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
			key: 'deleteMethod',
			value: function deleteMethod(req, res, next) {
				_paymentMethods2.default
					.deleteMethod(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return PaymentMethodsRoute;
})();
exports.default = PaymentMethodsRoute;
