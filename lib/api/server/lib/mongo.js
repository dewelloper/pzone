'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.db = undefined;
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _mongodb = require('mongodb');
var _settings = require('./settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mongodbConnection = _settings2.default.mongodbServerUrl;
var mongoPathName = _url2.default.parse(mongodbConnection).pathname;
var dbName = mongoPathName.substring(mongoPathName.lastIndexOf('/') + 1);

var RECONNECT_INTERVAL = 1000;
var CONNECT_OPTIONS = {
	reconnectTries: 3600,
	reconnectInterval: RECONNECT_INTERVAL,
	useNewUrlParser: true
};

var onClose = function onClose() {
	_winston2.default.info('MongoDB connection was closed');
};

var onReconnect = function onReconnect() {
	_winston2.default.info('MongoDB reconnected');
};

var db = (exports.db = null);

var connectWithRetry = function connectWithRetry() {
	_mongodb.MongoClient.connect(
		mongodbConnection,
		CONNECT_OPTIONS,
		function(err, client) {
			if (err) {
				_winston2.default.error(
					'MongoDB connection was failed: ' + err.message,
					err.message
				);

				setTimeout(connectWithRetry, RECONNECT_INTERVAL);
			} else {
				exports.db = db = client.db(dbName);
				db.on('close', onClose);
				db.on('reconnect', onReconnect);
				_winston2.default.info('MongoDB connected successfully');
			}
		}
	);
};

connectWithRetry();
