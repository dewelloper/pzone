'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slicedToArray = (function() {
	function sliceIterator(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return']) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
	return function(arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			);
		}
	};
})();
var _orders = require('../services/orders/orders');
var _orders2 = _interopRequireDefault(_orders);
var _settings = require('../services/settings/settings');
var _settings2 = _interopRequireDefault(_settings);
var _paymentGateways = require('../services/settings/paymentGateways');
var _paymentGateways2 = _interopRequireDefault(_paymentGateways);
var _PayPalCheckout = require('./PayPalCheckout');
var _PayPalCheckout2 = _interopRequireDefault(_PayPalCheckout);
var _LiqPay = require('./LiqPay');
var _LiqPay2 = _interopRequireDefault(_LiqPay);
var _StripeElements = require('./StripeElements');
var _StripeElements2 = _interopRequireDefault(_StripeElements);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var getOptions = function getOptions(orderId) {
	return Promise.all([
		_orders2.default.getSingleOrder(orderId),
		_settings2.default.getSettings()
	]).then(function(_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
			order = _ref2[0],
			settings = _ref2[1];
		if (order && order.payment_method_id) {
			return _paymentGateways2.default
				.getGateway(order.payment_method_gateway)
				.then(function(gatewaySettings) {
					var options = {
						gateway: order.payment_method_gateway,
						gatewaySettings: gatewaySettings,
						order: order,
						amount: order.grand_total,
						currency: settings.currency_code
					};

					return options;
				});
		}
	});
};

var getPaymentFormSettings = function getPaymentFormSettings(orderId) {
	return getOptions(orderId).then(function(options) {
		switch (options.gateway) {
			case 'paypal-checkout':
				return _PayPalCheckout2.default.getPaymentFormSettings(options);
			case 'liqpay':
				return _LiqPay2.default.getPaymentFormSettings(options);
			case 'stripe-elements':
				return _StripeElements2.default.getPaymentFormSettings(options);
			default:
				return Promise.reject('Invalid gateway');
		}
	});
};

var paymentNotification = function paymentNotification(req, res, gateway) {
	return _paymentGateways2.default
		.getGateway(gateway)
		.then(function(gatewaySettings) {
			var options = {
				gateway: gateway,
				gatewaySettings: gatewaySettings,
				req: req,
				res: res
			};

			switch (gateway) {
				case 'paypal-checkout':
					return _PayPalCheckout2.default.paymentNotification(options);
				case 'liqpay':
					return _LiqPay2.default.paymentNotification(options);
				default:
					return Promise.reject('Invalid gateway');
			}
		});
};

var processOrderPayment = async function processOrderPayment(order) {
	var orderAlreadyCharged = order.paid === true;
	if (orderAlreadyCharged) {
		return true;
	}

	var gateway = order.payment_method_gateway;
	var gatewaySettings = await _paymentGateways2.default.getGateway(gateway);
	var settings = await _settings2.default.getSettings();

	switch (gateway) {
		case 'stripe-elements':
			return _StripeElements2.default.processOrderPayment({
				order: order,
				gatewaySettings: gatewaySettings,
				settings: settings
			});

		default:
			return Promise.reject('Invalid gateway');
	}
};
exports.default = {
	getPaymentFormSettings: getPaymentFormSettings,
	paymentNotification: paymentNotification,
	processOrderPayment: processOrderPayment
};
