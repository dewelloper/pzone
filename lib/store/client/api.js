'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _pzClient = require('pz-client');
var _pzClient2 = _interopRequireDefault(_pzClient);
var _settings = require('./settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var api = new _pzClient2.default({
	ajaxBaseUrl: _settings2.default.ajaxBaseUrl || '/ajax'
});
exports.default = api;
