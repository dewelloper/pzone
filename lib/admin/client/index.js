'use strict';
require('../../../public/admin-assets/css/flexboxgrid.min.css');
require('../../../public/admin-assets/css/style.css');

var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _reactDom2 = _interopRequireDefault(_reactDom);
var _redux = require('redux');
var _reactRedux = require('react-redux');
var _reduxThunk = require('redux-thunk');
var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _actions = require('modules/settings/actions');
var _settings = require('lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _auth = require('lib/auth');
var auth = _interopRequireWildcard(_auth);
var _apiWebSocket = require('lib/apiWebSocket');
var _rootReducer = require('./rootReducer');
var _rootReducer2 = _interopRequireDefault(_rootReducer);
var _app = require('./app');
var _app2 = _interopRequireDefault(_app);
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

var DEVELOPER_MODE = _settings2.default.developerMode === true;
if (DEVELOPER_MODE === false) {
	auth.validateCurrentToken();
}

var store = (0, _redux.createStore)(
	_rootReducer2.default,
	(0, _redux.applyMiddleware)(_reduxThunk2.default)
);
store.dispatch((0, _actions.fetchSettings)());

if (window.WebSocket) {
	(0, _apiWebSocket.connectToWebSocket)(store);
} else {
	console.log('WebSocket is not supported by your browser.');
}

_reactDom2.default.render(
	_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(_app2.default, null)
	),

	document.getElementById('app')
);
