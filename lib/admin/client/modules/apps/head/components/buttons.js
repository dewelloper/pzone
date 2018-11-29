'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);

var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _IconMenu = require('material-ui/IconMenu');
var _IconMenu2 = _interopRequireDefault(_IconMenu);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var WebStoreMenu = function WebStoreMenu() {
	return _react2.default.createElement(
		_IconMenu2.default,
		{
			iconButtonElement: _react2.default.createElement(
				_IconButton2.default,
				{ touch: true },
				_react2.default.createElement(
					_FontIcon2.default,
					{ color: '#fff', className: 'material-icons' },
					'more_vert'
				)
			),

			targetOrigin: { horizontal: 'right', vertical: 'top' },
			anchorOrigin: { horizontal: 'right', vertical: 'top' }
		},

		_react2.default.createElement(_MenuItem2.default, {
			containerElement: _react2.default.createElement(_reactRouterDom.Link, {
				to: '/admin/apps/account'
			}),
			primaryText: _text2.default.account
		})
	);
};
exports.default = WebStoreMenu;
