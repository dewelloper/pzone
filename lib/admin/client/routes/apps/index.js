'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _webstoreAuth = require('lib/webstoreAuth');
var auth = _interopRequireWildcard(_webstoreAuth);
var _notFound = require('routes/notFound');
var _notFound2 = _interopRequireDefault(_notFound);
var _login = require('routes/apps/login');
var _login2 = _interopRequireDefault(_login);
var _account = require('modules/apps/account');
var _account2 = _interopRequireDefault(_account);
var _services = require('modules/apps/services');
var _services2 = _interopRequireDefault(_services);
var _serviceDetails = require('modules/apps/serviceDetails');
var _serviceDetails2 = _interopRequireDefault(_serviceDetails);
var _appDetails = require('modules/apps/appDetails');
var _appDetails2 = _interopRequireDefault(_appDetails);
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function() {
	return _react2.default.createElement(
		_reactRouterDom.Switch,
		null,
		_react2.default.createElement(_reactRouterDom.Route, {
			path: '/admin/apps',
			exact: true,
			component: _services2.default
		}),
		_react2.default.createElement(_reactRouterDom.Route, {
			path: '/admin/apps/service/:serviceId',
			exect: true,
			component: _serviceDetails2.default
		}),

		_react2.default.createElement(_reactRouterDom.Route, {
			path: '/admin/apps/app/:appKey',
			exect: true,
			component: _appDetails2.default
		}),
		_react2.default.createElement(_reactRouterDom.Route, {
			path: '/admin/apps/login',
			exact: true,
			component: _login2.default
		}),
		_react2.default.createElement(_reactRouterDom.Route, {
			path: '/admin/apps/account',
			exact: true,
			component: _account2.default
		}),
		_react2.default.createElement(_reactRouterDom.Route, {
			component: _notFound2.default
		})
	);
};
