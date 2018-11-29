'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _crypto = require('crypto');
var _crypto2 = _interopRequireDefault(_crypto);
var _nodeFetch = require('node-fetch');
var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
var _webhooks = require('../services/webhooks');
var _webhooks2 = _interopRequireDefault(_webhooks);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var trigger = async function trigger(_ref) {
	var event = _ref.event,
		payload = _ref.payload;
	var webhooks = await _webhooks2.default.getWebhooks();
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	try {
		for (
			var _iterator = webhooks[Symbol.iterator](), _step;
			!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
			_iteratorNormalCompletion = true
		) {
			var webhook = _step.value;
			if (webhook.events.includes(event)) {
				send({ event: event, payload: payload, webhook: webhook });
			}
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
};

var send = function send(_ref2) {
	var event = _ref2.event,
		payload = _ref2.payload,
		webhook = _ref2.webhook;
	if (
		webhook &&
		webhook.enabled === true &&
		webhook.url &&
		webhook.url.length > 0
	) {
		var data = JSON.stringify(payload);
		var signature = sign({ data: data, secret: webhook.secret });

		(0, _nodeFetch2.default)(webhook.url, {
			method: 'POST',
			body: data,
			redirect: 'manual',
			compress: true,
			headers: {
				'Content-Type': 'application/json',
				'X-Hook-Event': event,
				'X-Hook-Signature': signature
			}
		}).catch(function() {});
	}
};

var sign = function sign(_ref3) {
	var data = _ref3.data,
		secret = _ref3.secret;
	if (secret && secret.length > 0) {
		var hmac = _crypto2.default.createHmac('sha256', secret);
		hmac.update(data);
		var signature = hmac.digest('hex');
		return signature;
	} else {
		return '';
	}
};

var events = {
	ORDER_CREATED: 'order.created',
	ORDER_UPDATED: 'order.updated',
	ORDER_DELETED: 'order.deleted',
	TRANSACTION_CREATED: 'transaction.created',
	TRANSACTION_UPDATED: 'transaction.updated',
	TRANSACTION_DELETED: 'transaction.deleted',
	CUSTOMER_CREATED: 'customer.created',
	CUSTOMER_UPDATED: 'customer.updated',
	CUSTOMER_DELETED: 'customer.deleted'
};
exports.default = {
	trigger: trigger,
	events: events
};
