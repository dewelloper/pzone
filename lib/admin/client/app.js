'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');

var _head = require('modules/head');
var _head2 = _interopRequireDefault(_head);
var _login = require('routes/login');
var _login2 = _interopRequireDefault(_login);
var _logout = require('routes/logout');
var _logout2 = _interopRequireDefault(_logout);
var _home = require('routes/home');
var _home2 = _interopRequireDefault(_home);
var _notFound = require('routes/notFound');
var _notFound2 = _interopRequireDefault(_notFound);
var _products = require('routes/products');
var _products2 = _interopRequireDefault(_products);
var _edit = require('routes/products/edit');
var _edit2 = _interopRequireDefault(_edit);
var _categories = require('routes/products/categories');
var _categories2 = _interopRequireDefault(_categories);
var _customers = require('routes/customers');
var _customers2 = _interopRequireDefault(_customers);
var _edit3 = require('routes/customers/edit');
var _edit4 = _interopRequireDefault(_edit3);
var _groups = require('routes/customers/groups');
var _groups2 = _interopRequireDefault(_groups);
var _orders = require('routes/orders');
var _orders2 = _interopRequireDefault(_orders);
var _edit5 = require('routes/orders/edit');
var _edit6 = _interopRequireDefault(_edit5);
var _statuses = require('routes/orders/statuses');
var _statuses2 = _interopRequireDefault(_statuses);
var _pages = require('routes/pages');
var _pages2 = _interopRequireDefault(_pages);
var _edit7 = require('routes/pages/edit');
var _edit8 = _interopRequireDefault(_edit7);
var _settings = require('routes/settings');
var _settings2 = _interopRequireDefault(_settings);
var _apps = require('routes/apps');
var _apps2 = _interopRequireDefault(_apps);
var _files = require('routes/files');
var _files2 = _interopRequireDefault(_files);

var _colors = require('material-ui/styles/colors');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');
var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
var _getMuiTheme = require('material-ui/styles/getMuiTheme');
var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var muiTheme = (0, _getMuiTheme2.default)({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: _colors.blue700,
		primary2Color: _colors.cyan700,
		primary3Color: _colors.grey400,
		accent1Color: _colors.pinkA200,
		accent2Color: _colors.grey100,
		accent3Color: _colors.blue700,
		textColor: _colors.darkBlack,
		alternateTextColor: _colors.white,
		canvasColor: _colors.white,
		borderColor: _colors.grey300,
		pickerHeaderColor: _colors.blue700,
		shadowColor: _colors.fullBlack
	},

	appBar: {}
});
exports.default = function() {
	return _react2.default.createElement(
		_reactRouterDom.BrowserRouter,
		null,
		_react2.default.createElement(
			_MuiThemeProvider2.default,
			{ muiTheme: muiTheme },
			_react2.default.createElement(
				'div',
				{ id: 'container' },
				_react2.default.createElement(
					'div',
					{ id: 'headContainer' },
					_react2.default.createElement(_head2.default, null)
				),

				_react2.default.createElement(
					'div',
					{ id: 'bodyContainer' },
					_react2.default.createElement(
						_reactRouterDom.Switch,
						null,
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/',
							exact: true,
							component: _home2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/login',
							component: _login2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/logout',
							component: _logout2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/products',
							exact: true,
							component: _products2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/products/categories',
							exact: true,
							component: _categories2.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/orders',
							exact: true,
							component: _orders2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/orders/statuses',
							exact: true,
							component: _statuses2.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/order/:orderId',
							exact: true,
							component: _edit6.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/customers',
							exact: true,
							component: _customers2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/customers/groups',
							exact: true,
							component: _groups2.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/customer/:customerId',
							exact: true,
							component: _edit4.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/product/:productId',
							component: _edit2.default
						}),

						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/pages',
							exact: true,
							component: _pages2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/pages/add',
							exact: true,
							component: _edit8.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/pages/:pageId',
							component: _edit8.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/settings',
							component: _settings2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/apps',
							component: _apps2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							path: '/admin/files',
							exact: true,
							component: _files2.default
						}),
						_react2.default.createElement(_reactRouterDom.Route, {
							component: _notFound2.default
						})
					)
				)
			)
		)
	);
};
