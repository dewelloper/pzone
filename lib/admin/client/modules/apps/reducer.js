'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _actionTypes = require('./actionTypes');
var t = _interopRequireWildcard(_actionTypes);
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

var initialState = {
	account: null,
	services: [],
	service: null,
	serviceSettings: null,
	serviceLogs: null,
	loadingEnableDisableService: false
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.ACCOUNT_RECEIVE:
			return Object.assign({}, state, { account: action.account });
		case t.SERVICES_RECEIVE:
			return Object.assign({}, state, { services: action.services });
		case t.SERVICE_RECEIVE:
			return Object.assign({}, state, { service: action.service });
		case t.SERVICE_SETTINGS_REQUEST:
			return Object.assign({}, state, { serviceSettings: null });
		case t.SERVICE_SETTINGS_RECEIVE:
			return Object.assign({}, state, {
				serviceSettings: action.serviceSettings
			});

		case t.SERVICE_LOGS_RECEIVE:
			return Object.assign({}, state, { serviceLogs: action.serviceLogs });
		case t.SERVICE_ENABLE_REQUEST:
			return Object.assign({}, state, { loadingEnableDisableService: true });
		case t.SERVICE_ENABLE_RECEIVE:
			return Object.assign({}, state, { loadingEnableDisableService: false });
		default:
			return state;
	}
};
