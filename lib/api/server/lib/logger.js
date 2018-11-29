'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
var LOGS_FILE = 'logs/server.log';

_winston2.default.configure({
	transports: [
		new _winston2.default.transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: _winston2.default.format.combine(
				_winston2.default.format.colorize(),
				_winston2.default.format.simple()
			)
		}),

		new _winston2.default.transports.File({
			level: 'info',
			handleExceptions: true,
			format: _winston2.default.format.json(),
			filename: LOGS_FILE
		})
	]
});

var getResponse = function getResponse(message) {
	return {
		error: true,
		message: message
	};
};

var logUnauthorizedRequests = function logUnauthorizedRequests(req) {
	// todo
};

var sendResponse = function sendResponse(err, req, res, next) {
	if (err && err.name === 'UnauthorizedError') {
		logUnauthorizedRequests(req);
		res.status(401).send(getResponse(err.message));
	} else if (err) {
		_winston2.default.error(err.stack);
		res.status(500).send(getResponse(err.message));
	} else {
		next();
	}
};
exports.default = {
	sendResponse: sendResponse
};
