'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _item = require('./item');
var _item2 = _interopRequireDefault(_item);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ServiceItem = function ServiceItem(_ref) {
	var service = _ref.service;
	return _react2.default.createElement(_item2.default, {
		path: '/admin/apps/service/' + service.id,
		coverUrl: service.cover_url,
		title: service.name,
		developer: service.developer.name,
		enabled: service.enabled
	});
};
exports.default = ServiceItem;
