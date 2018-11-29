'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.selectGroup = selectGroup;
exports.deselectGroup = deselectGroup;
exports.fetchGroupsIfNeeded = fetchGroupsIfNeeded;
exports.updateGroup = updateGroup;
exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
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
function requestGroups() {
	return { type: t.GROUPS_REQUEST };
}
function receiveGroups(items) {
	return { type: t.GROUPS_RECEIVE, items: items };
}
function receiveErrorGroups(error) {
	return { type: t.GROUPS_FAILURE, error: error };
}
function selectGroup(id) {
	return { type: t.GROUPS_SELECT, selectedId: id };
}
function deselectGroup() {
	return { type: t.GROUPS_DESELECT };
}
function requestUpdateGroup(id) {
	return { type: t.GROUP_UPDATE_REQUEST };
}
function receiveUpdateGroup() {
	return { type: t.GROUP_UPDATE_SUCCESS };
}
function errorUpdateGroup(error) {
	return { type: t.GROUP_UPDATE_FAILURE, error: error };
}
function successCreateGroup(id) {
	return { type: t.GROUP_CREATE_SUCCESS };
}
function successDeleteGroup(id) {
	return { type: t.GROUP_DELETE_SUCCESS };
}
function fetchGroups() {
	return function(dispatch) {
		dispatch(requestGroups());
		return _api2.default.customerGroups
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
				dispatch(receiveGroups(json));
			})
			.catch(function(error) {
				dispatch(receiveErrorGroups(error));
			});
	};
}
function shouldFetchGroups(state) {
	var groups = state.customerGroups;
	if (groups.isFetched || groups.isFetching) {
		return false;
	} else {
		return true;
	}
}
function fetchGroupsIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchGroups(getState())) {
			return dispatch(fetchGroups());
		}
	};
}
function updateGroup(data) {
	return function(dispatch, getState) {
		dispatch(requestUpdateGroup(data.id));
		return _api2.default.customerGroups
			.update(data.id, data)
			.then(function(_ref2) {
				var status = _ref2.status,
					json = _ref2.json;
				dispatch(receiveUpdateGroup());
				dispatch(fetchGroups());
			})
			.catch(function(error) {
				dispatch(errorUpdateGroup(error));
			});
	};
}
function createGroup(data) {
	return function(dispatch, getState) {
		return _api2.default.customerGroups
			.create(data)
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				dispatch(successCreateGroup(json.id));
				dispatch(fetchGroups());
				dispatch(selectGroup(json.id));
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function deleteGroup(id) {
	return function(dispatch, getState) {
		return _api2.default.customerGroups
			.delete(id)
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				if (status === 200) {
					dispatch(successDeleteGroup(id));
					dispatch(deselectGroup());
					dispatch(fetchGroups());
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
