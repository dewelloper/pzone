'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fetchServiceLogs = exports.updateServiceSettings = exports.fetchServiceSettings = exports.disableService = exports.enableService = exports.fetchService = exports.fetchServices = exports.updateDeveloperAccount = exports.updateAccount = exports.fetchAccount = undefined;
var _actionTypes = require('./actionTypes');
var t = _interopRequireWildcard(_actionTypes);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
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

var receiveAccount = function receiveAccount(account) {
	return {
		type: t.ACCOUNT_RECEIVE,
		account: account
	};
};

var receiveServices = function receiveServices(services) {
	return {
		type: t.SERVICES_RECEIVE,
		services: services
	};
};

var receiveService = function receiveService(service) {
	return {
		type: t.SERVICE_RECEIVE,
		service: service
	};
};

var requestEnableDisableService = function requestEnableDisableService() {
	return {
		type: t.SERVICE_ENABLE_REQUEST
	};
};

var receiveEnableDisableService = function receiveEnableDisableService() {
	return {
		type: t.SERVICE_ENABLE_RECEIVE
	};
};

var requestServiceSettings = function requestServiceSettings() {
	return {
		type: t.SERVICE_SETTINGS_REQUEST
	};
};

var receiveServiceSettings = function receiveServiceSettings(serviceSettings) {
	return {
		type: t.SERVICE_SETTINGS_RECEIVE,
		serviceSettings: serviceSettings
	};
};

var receiveServiceLogs = function receiveServiceLogs(serviceLogs) {
	return {
		type: t.SERVICE_LOGS_RECEIVE,
		serviceLogs: serviceLogs
	};
};

var fetchAccount = (exports.fetchAccount = function fetchAccount() {
	return function(dispatch, getState) {
		return _api2.default.webstore.account.retrieve().then(function(_ref) {
			var status = _ref.status,
				json = _ref.json;
			dispatch(receiveAccount(json));
		});
	};
});

var updateAccount = (exports.updateAccount = function updateAccount(account) {
	return function(dispatch, getState) {
		return _api2.default.webstore.account.update(account).then(function(_ref2) {
			var status = _ref2.status,
				json = _ref2.json;
			dispatch(receiveAccount(json));
		});
	};
});

var updateDeveloperAccount = (exports.updateDeveloperAccount = function updateDeveloperAccount(
	account
) {
	return function(dispatch, getState) {
		return _api2.default.webstore.account
			.updateDeveloper(account)
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				dispatch(receiveAccount(json));
			});
	};
});

var fetchServices = (exports.fetchServices = function fetchServices() {
	return function(dispatch, getState) {
		return _api2.default.webstore.services.list().then(function(_ref4) {
			var status = _ref4.status,
				json = _ref4.json;
			dispatch(receiveServices(json));
		});
	};
});

var fetchService = (exports.fetchService = function fetchService(serviceId) {
	return function(dispatch, getState) {
		return _api2.default.webstore.services
			.retrieve(serviceId)
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				var service = json;
				dispatch(receiveService(service));
				if (service.enabled) {
					dispatch(fetchServiceSettings(serviceId));
					dispatch(fetchServiceLogs(serviceId));
				}
			});
	};
});

var enableService = (exports.enableService = function enableService(serviceId) {
	return function(dispatch, getState) {
		dispatch(requestEnableDisableService());
		return _api2.default.webstore.services
			.enable(serviceId)
			.then(function(_ref6) {
				var status = _ref6.status,
					json = _ref6.json;
				dispatch(receiveEnableDisableService());
				dispatch(fetchService(serviceId));
			});
	};
});

var disableService = (exports.disableService = function disableService(
	serviceId
) {
	return function(dispatch, getState) {
		dispatch(requestEnableDisableService());
		return _api2.default.webstore.services
			.disable(serviceId)
			.then(function(_ref7) {
				var status = _ref7.status,
					json = _ref7.json;
				dispatch(receiveEnableDisableService());
				dispatch(fetchService(serviceId));
			});
	};
});

var fetchServiceSettings = (exports.fetchServiceSettings = function fetchServiceSettings(
	serviceId
) {
	return function(dispatch, getState) {
		dispatch(requestServiceSettings());
		return _api2.default.webstore.services.settings
			.retrieve(serviceId)
			.then(function(_ref8) {
				var status = _ref8.status,
					json = _ref8.json;
				var serviceSettings = json;
				dispatch(receiveServiceSettings(serviceSettings));
			})
			.catch(function(error) {});
	};
});

var updateServiceSettings = (exports.updateServiceSettings = function updateServiceSettings(
	serviceId,
	settings
) {
	return function(dispatch, getState) {
		return _api2.default.webstore.services.settings
			.update(serviceId, settings)
			.then(function(_ref9) {
				var status = _ref9.status,
					json = _ref9.json;
				dispatch(fetchServiceSettings(serviceId));
			})
			.catch(function(error) {});
	};
});

var fetchServiceLogs = (exports.fetchServiceLogs = function fetchServiceLogs(
	serviceId
) {
	return function(dispatch, getState) {
		return _api2.default.webstore.services.logs
			.list(serviceId)
			.then(function(_ref10) {
				var status = _ref10.status,
					json = _ref10.json;
				dispatch(receiveServiceLogs(json));
			})
			.catch(function(error) {});
	};
});
