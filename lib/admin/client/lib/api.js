'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _pzClient = require('pz-client');
var _pzClient2 = _interopRequireDefault(_pzClient);
var _settings = require('lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var api = null;
var dashboardToken = localStorage.getItem('dashboard_token');
var webstoreToken = localStorage.getItem('webstore_token');

var DEVELOPER_MODE = _settings2.default.developerMode === true;

if (dashboardToken || DEVELOPER_MODE === true) {
	api = new _pzClient2.default({
		apiBaseUrl: _settings2.default.apiBaseUrl || '/api/v1',
		apiToken: dashboardToken,
		webstoreToken: webstoreToken
	});
}
exports.default = api;
