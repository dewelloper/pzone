'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _list = require('modules/customers/list');
var _list2 = _interopRequireDefault(_list);
var _list3 = require('modules/customerGroups/list');
var _list4 = _interopRequireDefault(_list3);
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
			_react2.default.createElement(_list4.default, {
				showAll: true,
				showRoot: false,
				showManage: true
			})
		),

		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height'
			},
			_react2.default.createElement(_list2.default, null)
		)
	);
};
