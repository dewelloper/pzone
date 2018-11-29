'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _Subheader = require('material-ui/Subheader');
var _Subheader2 = _interopRequireDefault(_Subheader);
var _Checkbox = require('material-ui/Checkbox');
var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function(_ref) {
	var onSelectAll = _ref.onSelectAll;
	return _react2.default.createElement(
		_Subheader2.default,
		{ style: { paddingRight: 16 } },
		_react2.default.createElement(
			'div',
			{ className: 'row middle-xs' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-1' },
				_react2.default.createElement(_Checkbox2.default, {
					onCheck: function onCheck(event, isInputChecked) {
						onSelectAll(isInputChecked);
					}
				})
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5' },
				_text2.default.customers_name
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-3' },
				_text2.default.customers_location
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-1' },
				_text2.default.customers_orders
			),
			_react2.default.createElement(
				'div',
				{
					className: 'col-xs-2',
					style: { textAlign: 'right', paddingRight: 16 }
				},

				_text2.default.customers_totalSpent
			)
		)
	);
};
