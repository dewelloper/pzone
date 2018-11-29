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
var NotificationsRoute = (function() {
	function NotificationsRoute(router) {
		_classCallCheck(this, NotificationsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(NotificationsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.post(
					'/v1/notifications/:gateway',
					this.paymentNotification.bind(this)
				);
			}
		},
		{
			key: 'paymentNotification',
			value: function paymentNotification(req, res, next) {
				_paymentGateways2.default.paymentNotification(
					req,
					res,
					req.params.gateway
				);
			}
		}
	]);
	return NotificationsRoute;
})();
exports.default = NotificationsRoute;
