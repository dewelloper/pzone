'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _list = require('modules/pages/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function() {
	return _react2.default.createElement(
		'div',
		{ className: 'row row--no-gutter col-full-height scroll' },
		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2'
			},
			_react2.default.createElement(_list2.default, null)
		)
	);
};
