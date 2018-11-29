'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _https = require('https');
var _https2 = _interopRequireDefault(_https);
var _queryString = require('query-string');
var _queryString2 = _interopRequireDefault(_queryString);
var _orders = require('../services/orders/orders');
var _orders2 = _interopRequireDefault(_orders);
var _orderTransactions = require('../services/orders/orderTransactions');
var _orderTransactions2 = _interopRequireDefault(_orderTransactions);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';

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
		env: gatewaySettings.env,
		client: gatewaySettings.client,
		size: gatewaySettings.size,
		shape: gatewaySettings.shape,
		color: gatewaySettings.color,
		notify_url: gatewaySettings.notify_url
	};

	return Promise.resolve(formSettings);
};

var paymentNotification = function paymentNotification(options) {
	var gateway = options.gateway,
		gatewaySettings = options.gatewaySettings,
		req = options.req,
		res = options.res;
	var settings = { allow_sandbox: true };
	var params = req.body;
	var orderId = params.custom;
	var paymentCompleted = params.payment_status === 'Completed';

	res.status(200).end();

	verify(params, settings)
		.then(function() {
			// TODO: Validate that the receiver's email address is registered to you.
			// TODO: Verify that the price, item description, and so on, match the transaction on your website.

			if (paymentCompleted) {
				_orders2.default
					.updateOrder(orderId, {
						paid: true,
						date_paid: new Date()
					})
					.then(function() {
						_orderTransactions2.default.addTransaction(orderId, {
							transaction_id: params.txn_id,
							amount: params.mc_gross,
							currency: params.mc_currency,
							status: params.payment_status,
							details:
								params.first_name +
								' ' +
								params.last_name +
								', ' +
								params.payer_email,

							success: true
						});
					});
			}
		})
		.catch(function(e) {
			console.error(e);
		});
};

var verify = function verify(params, settings) {
	return new Promise(function(resolve, reject) {
		if (!settings) {
			settings = {
				allow_sandbox: false
			};
		}

		if (!params || Object.keys(params).length === 0) {
			return reject('Params is empty');
		}

		params.cmd = '_notify-validate';
		var body = _queryString2.default.stringify(params);

		//Set up the request to paypal
		var req_options = {
			host: params.test_ipn ? SANDBOX_URL : REGULAR_URL,
			method: 'POST',
			path: '/cgi-bin/webscr',
			headers: { 'Content-Length': body.length }
		};

		if (params.test_ipn && !settings.allow_sandbox) {
			return reject(
				'Received request with test_ipn parameter while sandbox is disabled'
			);
		}

		var req = _https2.default.request(req_options, function(res) {
			var data = [];

			res.on('data', function(d) {
				data.push(d);
			});

			res.on('end', function() {
				var response = data.join('');

				//Check if IPN is valid
				if (response === 'VERIFIED') {
					return resolve(response);
				} else {
					return reject('IPN Verification status: ' + response);
				}
			});
		});

		//Add the post parameters to the request body
		req.write(body);
		//Request error
		req.on('error', reject);
		req.end();
	});
};
exports.default = {
	getPaymentFormSettings: getPaymentFormSettings,
	paymentNotification: paymentNotification
};
