'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.selectStatus = selectStatus;
exports.deselectStatus = deselectStatus;
exports.fetchStatusesIfNeeded = fetchStatusesIfNeeded;
exports.updateStatus = updateStatus;
exports.createStatus = createStatus;
exports.deleteStatus = deleteStatus;
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
function requestStatuses() {
	return { type: t.STATUSES_REQUEST };
}
function receiveStatuses(items) {
	return { type: t.STATUSES_RECEIVE, items: items };
}
function receiveErrorStatuses(error) {
	return { type: t.STATUSES_FAILURE, error: error };
}
function selectStatus(id) {
	return { type: t.STATUSES_SELECT, selectedId: id };
}
function deselectStatus() {
	return { type: t.STATUSES_DESELECT };
}
function requestUpdateStatus(id) {
	return { type: t.STATUS_UPDATE_REQUEST };
}
function receiveUpdateStatus() {
	return { type: t.STATUS_UPDATE_SUCCESS };
}
function errorUpdateStatus(error) {
	return { type: t.STATUS_UPDATE_FAILURE, error: error };
}
function successCreateStatus(id) {
	return { type: t.STATUS_CREATE_SUCCESS };
}
function successDeleteStatus(id) {
	return { type: t.STATUS_DELETE_SUCCESS };
}
function fetchStatuses() {
	return function(dispatch) {
		dispatch(requestStatuses());
		return _api2.default.orderStatuses
			.list()
			.then(function(_ref) {
				var status = _ref.status,
					json = _ref.json;
				json = json.sort(function(a, b) {
					return a.position - b.position;
				});
				json.forEach(function(element, index, theArray) {
					if (theArray[index].name === '') {
						theArray[index].name = '<' + _text2.default.draft + '>';
					}
				});
				dispatch(receiveStatuses(json));
			})
			.catch(function(error) {
				dispatch(receiveErrorStatuses(error));
			});
	};
}
function shouldFetchStatuses(state) {
	var statuses = state.orderStatuses;
	if (statuses.isFetched || statuses.isFetching) {
		return false;
	} else {
		return true;
	}
}
function fetchStatusesIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchStatuses(getState())) {
			return dispatch(fetchStatuses());
		}
	};
}
function updateStatus(data) {
	return function(dispatch, getState) {
		dispatch(requestUpdateStatus(data.id));
		return _api2.default.orderStatuses
			.update(data.id, data)
			.then(function(_ref2) {
				var status = _ref2.status,
					json = _ref2.json;
				dispatch(receiveUpdateStatus());
				dispatch(fetchStatuses());
			})
			.catch(function(error) {
				dispatch(errorUpdateStatus(error));
			});
	};
}
function createStatus(data) {
	return function(dispatch, getState) {
		return _api2.default.orderStatuses
			.create(data)
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				dispatch(successCreateStatus(json.id));
				dispatch(fetchStatuses());
				dispatch(selectStatus(json.id));
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function deleteStatus(id) {
	return function(dispatch, getState) {
		return _api2.default.orderStatuses
			.delete(id)
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				if (status === 200) {
					dispatch(successDeleteStatus(id));
					dispatch(deselectStatus());
					dispatch(fetchStatuses());
				} else {
					throw status;
				}
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
