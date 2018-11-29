'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);

var _List = require('material-ui/List');
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _general = require('modules/settings/general');
var _general2 = _interopRequireDefault(_general);
var _generalLogo = require('modules/settings/generalLogo');
var _generalLogo2 = _interopRequireDefault(_generalLogo);
var _theme = require('modules/settings/theme');
var _theme2 = _interopRequireDefault(_theme);
var _shipping = require('modules/settings/shipping');
var _shipping2 = _interopRequireDefault(_shipping);
var _shippingEdit = require('modules/settings/shippingEdit');
var _shippingEdit2 = _interopRequireDefault(_shippingEdit);
var _payments = require('modules/settings/payments');
var _payments2 = _interopRequireDefault(_payments);
var _paymentsEdit = require('modules/settings/paymentsEdit');
var _paymentsEdit2 = _interopRequireDefault(_paymentsEdit);
var _list = require('modules/settings/tokens/list');
var _list2 = _interopRequireDefault(_list);
var _edit = require('modules/settings/tokens/edit');
var _edit2 = _interopRequireDefault(_edit);
var _email = require('modules/settings/email');
var _email2 = _interopRequireDefault(_email);
var _smtp = require('modules/settings/smtp');
var _smtp2 = _interopRequireDefault(_smtp);
var _emailTemplates = require('modules/settings/emailTemplates');
var _emailTemplates2 = _interopRequireDefault(_emailTemplates);
var _checkout = require('modules/settings/checkout');
var _checkout2 = _interopRequireDefault(_checkout);
var _checkoutFields = require('modules/settings/checkoutFields');
var _checkoutFields2 = _interopRequireDefault(_checkoutFields);
var _list3 = require('modules/settings/webhooks/list');
var _list4 = _interopRequireDefault(_list3);
var _edit3 = require('modules/settings/webhooks/edit');
var _edit4 = _interopRequireDefault(_edit3);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var styles = {
	link: {
		color: 'inherit',
		textDecoration: 'none',
		fontWeight: 'inherit',
		display: 'block'
	},

	linkActive: {
		backgroundColor: 'rgba(0,0,0,0.1)'
	}
};

var SettingsMenu = function SettingsMenu() {
	return _react2.default.createElement(
		_List.List,
		null,
		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings',
				exact: true
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_general,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'settings'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/shipping'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_shipping,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'local_shipping'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/payments'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_payments,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'payment'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/theme'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_theme,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'palette'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/checkout'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_checkout,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'shopping_cart'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/email'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_emails,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'email'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/webhooks'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.webhooks,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'http'
				)
			})
		),

		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{
				style: styles.link,
				activeStyle: styles.linkActive,
				to: '/admin/settings/tokens'
			},

			_react2.default.createElement(_List.ListItem, {
				primaryText: _text2.default.settings_tokens,
				leftIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'vpn_key'
				)
			})
		)
	);
};

var Settings = function Settings(_ref) {
	var match = _ref.match;
	return _react2.default.createElement(
		'div',
		{ className: 'row row--no-gutter col-full-height' },
		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height'
			},
			_react2.default.createElement(SettingsMenu, null)
		),

		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height'
			},
			_react2.default.createElement(
				_reactRouterDom.Switch,
				null,
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings',
					exact: true,
					component: _general2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/general/logo',
					component: _generalLogo2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/theme',
					component: _theme2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/shipping',
					exact: true,
					component: _shipping2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/shipping/add',
					exact: true,
					component: _shippingEdit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/shipping/:methodId',
					component: _shippingEdit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/payments',
					exact: true,
					component: _payments2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/payments/add',
					exact: true,
					component: _paymentsEdit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/payments/:methodId',
					component: _paymentsEdit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/tokens',
					exact: true,
					component: _list2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/tokens/add',
					exact: true,
					component: _edit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/tokens/:tokenId',
					component: _edit2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/email',
					exact: true,
					component: _email2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/email/smtp',
					component: _smtp2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/email/templates/:templateName',
					component: _emailTemplates2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/checkout',
					exact: true,
					component: _checkout2.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/checkout/fields/:fieldName',
					component: _checkoutFields2.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/webhooks',
					exact: true,
					component: _list4.default
				}),
				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/webhooks/add',
					exact: true,
					component: _edit4.default
				}),

				_react2.default.createElement(_reactRouterDom.Route, {
					path: '/admin/settings/webhooks/:webhookId',
					component: _edit4.default
				})
			)
		)
	);
};
exports.default = Settings;
