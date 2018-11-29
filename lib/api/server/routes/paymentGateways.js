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
var _paymentGateways = require('../services/settings/paymentGateways');
var _paymentGateways2 = _interopRequireDefault(_paymentGateways);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var PaymentGatewaysRoute = (function() {
	function PaymentGatewaysRoute(router) {
		_classCallCheck(this, PaymentGatewaysRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(PaymentGatewaysRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/payment_gateways/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PAYMENT_METHODS
					),
					this.getGateway.bind(this)
				);

				this.router.put(
					'/v1/payment_gateways/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAYMENT_METHODS
					),
					this.updateGateway.bind(this)
				);
			}
		},
		{
			key: 'getGateway',
			value: function getGateway(req, res, next) {
				_paymentGateways2.default
					.getGateway(req.params.name)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateGateway',
			value: function updateGateway(req, res, next) {
				_paymentGateways2.default
					.updateGateway(req.params.name, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return PaymentGatewaysRoute;
})();
exports.default = PaymentGatewaysRoute;
