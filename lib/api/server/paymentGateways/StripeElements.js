'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _stripe = require('stripe');
var _stripe2 = _interopRequireDefault(_stripe);
var _orders = require('../services/orders/orders');
var _orders2 = _interopRequireDefault(_orders);
var _orderTransactions = require('../services/orders/orderTransactions');
var _orderTransactions2 = _interopRequireDefault(_orderTransactions);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var getPaymentFormSettings = function getPaymentFormSettings(options) {
	var gateway = options.gateway,
		gatewaySettings = options.gatewaySettings,
		order = options.order,
		amount = options.amount,
		currency = options.currency;
	var formSettings = {
		order_id: order.id,
		amount: amount,
		currency: currency,
		email: order.email,
		public_key: gatewaySettings.public_key
	};

	return Promise.resolve(formSettings);
};

var processOrderPayment = async function processOrderPayment(_ref) {
	var order = _ref.order,
		gatewaySettings = _ref.gatewaySettings,
		settings = _ref.settings;
	try {
		var stripe = (0, _stripe2.default)(gatewaySettings.secret_key);
		var charge = await stripe.charges.create({
			amount: order.grand_total * 100,
			currency: settings.currency_code,
			description: 'Order #' + order.number,
			statement_descriptor: 'Order #' + order.number,
			metadata: {
				order_id: order.id
			},

			source: order.payment_token
		});

		// status: succeeded, pending, failed
		var paymentSucceeded =
			charge.status === 'succeeded' || charge.paid === true;

		if (paymentSucceeded) {
			await _orders2.default.updateOrder(order.id, {
				paid: true,
				date_paid: new Date()
			});
		}

		await _orderTransactions2.default.addTransaction(order.id, {
			transaction_id: charge.id,
			amount: charge.amount / 100,
			currency: charge.currency,
			status: charge.status,
			details: charge.outcome.seller_message,
			success: paymentSucceeded
		});

		return paymentSucceeded;
	} catch (err) {
		// handle errors
		return false;
	}
};
exports.default = {
	getPaymentFormSettings: getPaymentFormSettings,
	processOrderPayment: processOrderPayment
};
