'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _ws = require('ws');
var _ws2 = _interopRequireDefault(_ws);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _security = require('./security');
var _security2 = _interopRequireDefault(_security);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var wss = null;

var listen = function listen(server) {
	wss = new _ws2.default.Server({
		path: '/ws/dashboard', //Accept only connections matching this path
		maxPayload: 1024, //The maximum allowed message size
		backlog: 100, //The maximum length of the queue of pending connections.
		verifyClient: verifyClient, //An hook to reject connections
		server: server //A pre-created HTTP/S server to use
	});

	wss.on('connection', onConnection);
	wss.broadcast = broadcastToAll;
};

var getTokenFromRequestPath = function getTokenFromRequestPath(requestPath) {
	try {
		var urlObj = _url2.default.parse(requestPath, true);
		return urlObj.query.token;
	} catch (e) {
		return null;
	}
};

var verifyClient = function verifyClient(info, done) {
	if (_security2.default.DEVELOPER_MODE === true) {
		done(true);
	} else {
		var requestPath = info.req.url;
		var token = getTokenFromRequestPath(requestPath);
		_security2.default
			.verifyToken(token)
			.then(function(tokenDecoded) {
				// TODO: check access to dashboard
				done(true);
			})
			.catch(function(err) {
				done(false, 401);
			});
	}
};

var onConnection = function onConnection(ws, req) {
	// TODO: ws.user = token.email
	ws.on('error', function() {});
};

var broadcastToAll = function broadcastToAll(data) {
	wss.clients.forEach(function(client) {
		if (client.readyState === _ws2.default.OPEN) {
			client.send(data, function(error) {});
		}
	});
};

var send = function send(_ref) {
	var event = _ref.event,
		payload = _ref.payload;
	wss.broadcast(JSON.stringify({ event: event, payload: payload }));
};

var events = {
	ORDER_CREATED: 'order.created',
	THEME_INSTALLED: 'theme.installed'
};
exports.default = {
	listen: listen,
	send: send,
	events: events
};
