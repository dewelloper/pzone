'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.connectToWebSocket = undefined;
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _settings = require('lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _actions = require('modules/settings/actions');
var _actions2 = require('modules/orders/actions');
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var AUTO_RECONNECT_INTERVAL = 1000; //1 seconds
var ORDER_CREATED = 'order.created';
var THEME_INSTALLED = 'theme.installed';
var store = null;

var connectToWebSocket = (exports.connectToWebSocket = function connectToWebSocket(
	reduxStore
) {
	store = reduxStore;
	connect();
});

var connect = function connect() {
	var wsUrl =
		_settings2.default.apiWebSocketUrl &&
		_settings2.default.apiWebSocketUrl.length > 0
			? _settings2.default.apiWebSocketUrl
			: getWebSocketUrlFromCurrentLocation();

	var token = localStorage.getItem('dashboard_token');
	var ws = new WebSocket(wsUrl + '/ws/dashboard?token=' + token);

	ws.onmessage = onMessage;
	ws.onopen = onOpen;
	ws.onclose = onClose;
	ws.onerror = onError;
};

var getWebSocketUrlFromCurrentLocation = function getWebSocketUrlFromCurrentLocation() {
	var wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	return wsProtocol + '//' + window.location.host;
};

var onMessage = function onMessage(event) {
	try {
		var message = JSON.parse(event.data);
		eventHandler(message);
	} catch (err) {}
};

var onOpen = function onOpen() {
	if (_settings2.default.developerMode === true) {
		console.log('Connection established.');
	}
};

var onError = function onError() {};

var onClose = function onClose(event) {
	if (event.code !== 1000) {
		if (_settings2.default.developerMode === true) {
			console.log('WebSocket connection closed with code: ' + event.code + '.');
		}
		// try to reconnect
		setTimeout(function() {
			connect();
		}, AUTO_RECONNECT_INTERVAL);
	}
};

var showNotification = function showNotification(title, body) {
	var requireInteraction =
		arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	var msg = new Notification(title, {
		body: body,
		tag: 'dashboard',
		requireInteraction: requireInteraction
	});

	msg.addEventListener('click', function(event) {
		parent.focus();
		event.target.close();
	});
};

var eventHandler = function eventHandler(_ref) {
	var event = _ref.event,
		payload = _ref.payload;
	switch (event) {
		case THEME_INSTALLED:
			var fileName = payload;
			store.dispatch((0, _actions.installReceive)());
			showNotification(
				_text2.default.settings_theme,
				_text2.default.themeInstalled
			);
			break;
		case ORDER_CREATED:
			var order = payload;
			store.dispatch((0, _actions2.fetchOrders)());
			showNotification(
				_text2.default.order + ' #' + order.number,
				order.shipping_address.full_name + ', ' + order.shipping_address.city,
				true
			);

			break;
		default:
			break;
	}
};
