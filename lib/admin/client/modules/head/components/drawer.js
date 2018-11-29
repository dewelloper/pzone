'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);

var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _Drawer = require('material-ui/Drawer');
var _Drawer2 = _interopRequireDefault(_Drawer);
var _Menu = require('material-ui/Menu');
var _Menu2 = _interopRequireDefault(_Menu);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
var _AppBar = require('material-ui/AppBar');
var _AppBar2 = _interopRequireDefault(_AppBar);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var menuItems = [
	{
		title: _text2.default.drawer_home,
		url: '/admin/',
		icon: 'home'
	},

	{
		title: _text2.default.drawer_products,
		url: '/admin/products',
		icon: 'local_offer'
	},

	{
		title: _text2.default.drawer_orders,
		url: '/admin/orders',
		icon: 'shopping_cart'
	},

	{
		title: _text2.default.drawer_customers,
		url: '/admin/customers',
		icon: 'person'
	},

	{
		title: _text2.default.settings_pages,
		url: '/admin/pages',
		icon: 'description'
	},

	{
		title: _text2.default.files,
		url: '/admin/files',
		icon: 'folder'
	},

	{
		title: '-',
		url: 'settings'
	},

	{
		title: _text2.default.drawer_settings,
		url: '/admin/settings',
		icon: 'settings'
	},

	{
		title: _text2.default.apps,
		url: '/admin/apps',
		icon: 'apps'
	},

	{
		title: _text2.default.drawer_logout,
		url: '/admin/logout',
		icon: 'exit_to_app'
	}
];

var styles = {
	link: {
		display: 'block',
		color: 'rgba(0,0,0,0.82)',
		textDecoration: 'none'
	},

	linkActive: {
		color: 'rgb(25, 118, 210)',
		backgroundColor: 'rgba(0,0,0,0.05)'
	},

	icon: {
		left: 12,
		color: 'rgba(0,0,0,0.54)'
	},

	iconActive: {
		left: 12,
		color: 'inherit'
	},

	itemInnerDiv: {
		paddingLeft: 76,
		fontSize: 14,
		fontWeight: 500,
		color: 'inherit'
	},

	item: {
		color: 'inherit'
	},

	appBar: {
		backgroundColor: '#fff',
		paddingLeft: 28
	},

	appBarTitle: {
		color: '#777',
		fontSize: 18
	},

	menu: {
		paddingTop: 0
	}
};

var DrawerMenu = function DrawerMenu(_ref) {
	var open = _ref.open,
		onClose = _ref.onClose,
		currentUrl = _ref.currentUrl;
	var items = menuItems.map(function(item, index) {
		return item.title === '-'
			? _react2.default.createElement(_Divider2.default, { key: index })
			: _react2.default.createElement(
					_reactRouterDom.NavLink,
					{
						to: item.url,
						key: index,
						exact: true,
						style: styles.link,
						activeStyle: styles.linkActive
					},

					_react2.default.createElement(_MenuItem2.default, {
						onClick: onClose,
						primaryText: item.title,
						innerDivStyle: styles.itemInnerDiv,
						style: styles.item,
						leftIcon: _react2.default.createElement(
							_FontIcon2.default,
							{
								style:
									item.url === currentUrl ? styles.iconActive : styles.icon,

								className: 'material-icons'
							},

							item.icon
						)
					})
			  );
	});

	return _react2.default.createElement(
		_Drawer2.default,
		{ docked: false, width: 280, open: open, onRequestChange: onClose },
		_react2.default.createElement(_AppBar2.default, {
			title: _text2.default.drawer_title,
			style: styles.appBar,
			titleStyle: styles.appBarTitle,
			zDepth: 0,
			iconElementLeft: _react2.default.createElement(
				_IconButton2.default,
				{ onClick: onClose },
				_react2.default.createElement(
					_FontIcon2.default,
					{ color: '#9e9e9e', className: 'material-icons' },
					'menu'
				)
			)
		}),

		_react2.default.createElement(
			_Menu2.default,
			{ listStyle: styles.menu, disableAutoFocus: true },
			items
		)
	);
};
exports.default = DrawerMenu;
