'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Buttons = function Buttons() {
	return _react2.default.createElement(
		'span',
		null,
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: '/admin/settings/payments/add' },
			_react2.default.createElement(
				_IconButton2.default,
				{
					touch: true,
					tooltipPosition: 'bottom-left',
					tooltip: _text2.default.settings_addPaymentMethod
				},

				_react2.default.createElement(
					_FontIcon2.default,
					{ color: '#fff', className: 'material-icons' },
					'add'
				)
			)
		)
	);
};
exports.default = Buttons;
