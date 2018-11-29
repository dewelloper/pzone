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
	var app = _ref.app;
	return _react2.default.createElement(_item2.default, {
		path: '/admin/apps/app/' + app.key,
		coverUrl: app.coverUrl,
		title: app.name
	});
};
exports.default = ServiceItem;
