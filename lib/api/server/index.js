'use strict';
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _helmet = require('helmet');
var _helmet2 = _interopRequireDefault(_helmet);
var _bodyParser = require('body-parser');
var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _cookieParser = require('cookie-parser');
var _cookieParser2 = _interopRequireDefault(_cookieParser);
var _responseTime = require('response-time');
var _responseTime2 = _interopRequireDefault(_responseTime);
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _logger = require('./lib/logger');
var _logger2 = _interopRequireDefault(_logger);
var _settings = require('./lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _security = require('./lib/security');
var _security2 = _interopRequireDefault(_security);
var _mongo = require('./lib/mongo');
var _dashboardWebSocket = require('./lib/dashboardWebSocket');
var _dashboardWebSocket2 = _interopRequireDefault(_dashboardWebSocket);
var _ajaxRouter = require('./ajaxRouter');
var _ajaxRouter2 = _interopRequireDefault(_ajaxRouter);
var _apiRouter = require('./apiRouter');
var _apiRouter2 = _interopRequireDefault(_apiRouter);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
var app = (0, _express2.default)();

_security2.default.applyMiddleware(app);
app.set('trust proxy', 1);
app.use((0, _helmet2.default)());
app.all('*', function(req, res, next) {
	// CORS headers
	res.header(
		'Access-Control-Allow-Origin',
		_security2.default.getAccessControlAllowOrigin()
	);

	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization'
	);

	next();
});
app.use((0, _responseTime2.default)());
app.use((0, _cookieParser2.default)(_settings2.default.cookieSecretKey));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use('/ajax', _ajaxRouter2.default);
app.use('/api', _apiRouter2.default);
app.use(_logger2.default.sendResponse);

var server = app.listen(_settings2.default.apiListenPort, function() {
	var serverAddress = server.address();
	_winston2.default.info(
		'API running at http://localhost:' + serverAddress.port
	);
});

_dashboardWebSocket2.default.listen(server);
