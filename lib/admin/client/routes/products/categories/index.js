'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _edit = require('modules/productCategories/edit');
var _edit2 = _interopRequireDefault(_edit);
var _list = require('modules/productCategories/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function() {
	return _react2.default.createElement(
		'div',
		{ className: 'row row--no-gutter col-full-height' },
		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height'
			},
			_react2.default.createElement(_list2.default, {
				showAll: false,
				showTrash: false,
				showAdd: true
			})
		),

		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height'
			},
			_react2.default.createElement(_edit2.default, null)
		)
	);
};
