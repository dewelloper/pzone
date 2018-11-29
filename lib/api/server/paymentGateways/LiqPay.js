'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _crypto = require('crypto');
var _crypto2 = _interopRequireDefault(_crypto);
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
	var params = {
		sandbox: '0',
		action: 'pay',
		version: '3',
		amount: amount,
		currency: currency,
		description: 'Order: ' + order.number,
		order_id: order.id,
		public_key: gatewaySettings.public_key,
		language: gatewaySettings.language,
		server_url: gatewaySettings.server_url
	};

	var form = getForm(params, gatewaySettings.private_key);

	var formSettings = {
		data: form.data,
		signature: form.signature,
		language: gatewaySettings.language
	};

	return Promise.resolve(formSettings);
};

var paymentNotification = function paymentNotification(options) {
	var gateway = options.gateway,
		gatewaySettings = options.gatewaySettings,
		req = options.req,
		res = options.res;
	var params = req.body;
	var dataStr = Buffer.from(params.data, 'base64').toString();
	var data = JSON.parse(dataStr);

	res.status(200).end();

	var sign = getHashFromString(
		gatewaySettings.private_key + params.data + gatewaySettings.private_key
	);

	var signatureValid = sign === params.signature;
	var paymentSuccess = data.status === 'success';
	var orderId = data.order_id;

	if (signatureValid && paymentSuccess) {
		_orders2.default
			.updateOrder(orderId, {
				paid: true,
				date_paid: new Date()
			})
			.then(function() {
				_orderTransactions2.default.addTransaction(orderId, {
					transaction_id: data.transaction_id,
					amount: data.amount,
					currency: data.currency,
					status: data.status,
					details: data.paytype + ', ' + data.sender_card_mask2,
					success: true
				});
			});
	} else {
		// log
	}
};

var getForm = function getForm(params, private_key) {
	params = getFormParams(params);
	var data = new Buffer(JSON.stringify(params)).toString('base64');
	var signature = getHashFromString(private_key + data + private_key);

	return {
		data: data,
		signature: signature
	};
};

var getFormParams = function getFormParams(params) {
	if (!params.version) throw new Error('version is null');
	if (!params.amount) throw new Error('amount is null');
	if (!params.currency) throw new Error('currency is null');
	if (!params.description) throw new Error('description is null');

	return params;
};

var getHashFromString = function getHashFromString(str) {
	var sha1 = _crypto2.default.createHash('sha1');
	sha1.update(str);
	return sha1.digest('base64');
};
exports.default = {
	getPaymentFormSettings: getPaymentFormSettings,
	paymentNotification: paymentNotification
};
