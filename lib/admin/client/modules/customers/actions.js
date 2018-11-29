'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.clearCustomerDetails = clearCustomerDetails;
exports.selectCustomer = selectCustomer;
exports.deselectCustomer = deselectCustomer;
exports.deselectAllCustomer = deselectAllCustomer;
exports.selectAllCustomer = selectAllCustomer;
exports.setFilterSearch = setFilterSearch;
exports.fetchCustomers = fetchCustomers;
exports.fetchMoreCustomers = fetchMoreCustomers;
exports.deleteCustomers = deleteCustomers;
exports.deleteCurrentCustomer = deleteCurrentCustomer;
exports.setGroup = setGroup;
exports.updateCustomer = updateCustomer;
exports.fetchCustomer = fetchCustomer;
exports.updateAddress = updateAddress;
exports.deleteAddress = deleteAddress;
exports.setDefaultBillingAddress = setDefaultBillingAddress;
exports.setDefaultShippingAddress = setDefaultShippingAddress;
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
var push = function push() {};
function requestCustomer() {
	return { type: t.CUSTOMERS_DETAIL_REQUEST };
}
function receiveCustomer(item) {
	return { type: t.CUSTOMERS_DETAIL_RECEIVE, item: item };
}
function clearCustomerDetails() {
	return receiveCustomer(null);
}
function requestCustomers() {
	return { type: t.CUSTOMERS_REQUEST };
}
function requestMoreCustomers() {
	return { type: t.CUSTOMERS_MORE_REQUEST };
}
function receiveCustomersMore(_ref) {
	var has_more = _ref.has_more,
		total_count = _ref.total_count,
		data = _ref.data;
	return {
		type: t.CUSTOMERS_MORE_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveCustomers(_ref2) {
	var has_more = _ref2.has_more,
		total_count = _ref2.total_count,
		data = _ref2.data;
	return {
		type: t.CUSTOMERS_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveCustomersError(error) {
	return { type: t.CUSTOMERS_FAILURE, error: error };
}
function selectCustomer(id) {
	return { type: t.CUSTOMERS_SELECT, customerId: id };
}
function deselectCustomer(id) {
	return { type: t.CUSTOMERS_DESELECT, customerId: id };
}
function deselectAllCustomer() {
	return { type: t.CUSTOMERS_DESELECT_ALL };
}
function selectAllCustomer() {
	return { type: t.CUSTOMERS_SELECT_ALL };
}
function setFilterSearch(value) {
	return { type: t.CUSTOMERS_FILTER_SET_SEARCH, search: value };
}
function deleteCustomersSuccess() {
	return { type: t.CUSTOMER_DELETE_SUCCESS };
}
function setGroupSuccess() {
	return { type: t.CUSTOMER_SET_GROUP_SUCCESS };
}
var getFilter = function getFilter(state) {
	var offset =
		arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var filter = { limit: 50, offset: offset };
	if (state.customers.search && state.customers.search !== '') {
		filter.search = state.customers.search;
	}
	if (state.customerGroups.selectedId) {
		filter.group_id = state.customerGroups.selectedId;
	}
	return filter;
};
function fetchCustomers() {
	return function(dispatch, getState) {
		var state = getState();
		if (!state.customers.loadingItems) {
			dispatch(requestCustomers());
			dispatch(deselectAllCustomer());
			var filter = getFilter(state);
			return _api2.default.customers
				.list(filter)
				.then(function(_ref3) {
					var status = _ref3.status,
						json = _ref3.json;
					dispatch(receiveCustomers(json));
				})
				.catch(function(error) {
					dispatch(receiveCustomersError(error));
				});
		}
	};
}
function fetchMoreCustomers() {
	return function(dispatch, getState) {
		var state = getState();
		if (!state.customers.loadingItems) {
			dispatch(requestMoreCustomers());
			var filter = getFilter(state, state.customers.items.length);
			return _api2.default.customers
				.list(filter)
				.then(function(_ref4) {
					var status = _ref4.status,
						json = _ref4.json;
					dispatch(receiveCustomersMore(json));
				})
				.catch(function(error) {
					dispatch(receiveCustomersError(error));
				});
		}
	};
}
function deleteCustomers() {
	return function(dispatch, getState) {
		var state = getState();
		var promises = state.customers.selected.map(function(customerId) {
			return _api2.default.customers.delete(customerId);
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(deleteCustomersSuccess());
				dispatch(deselectAllCustomer());
				dispatch(fetchCustomers());
			})
			.catch(function(err) {});
	};
}
function deleteCurrentCustomer() {
	return function(dispatch, getState) {
		var state = getState();
		var customer = state.customers.editCustomer;
		if (customer && customer.id) {
			return _api2.default.customers.delete(customer.id).catch(function(err) {
				console.log(err);
			});
		}
	};
}
function setGroup(group_id) {
	return function(dispatch, getState) {
		var state = getState();
		var promises = state.customers.selected.map(function(customerId) {
			return _api2.default.customers.update(customerId, { group_id: group_id });
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(setGroupSuccess());
				dispatch(deselectAllCustomer());
				dispatch(fetchCustomers());
			})
			.catch(function(err) {});
	};
}
function updateCustomer(data) {
	return function(dispatch, getState) {
		return _api2.default.customers
			.update(data.id, data)
			.then(function(customerResponse) {
				dispatch(receiveCustomer(customerResponse.json));
			})
			.catch(function(error) {});
	};
}
function fetchCustomer(customerId) {
	return function(dispatch, getState) {
		dispatch(requestCustomer());
		return _api2.default.customers
			.retrieve(customerId)
			.then(function(customerResponse) {
				dispatch(receiveCustomer(customerResponse.json));
			})
			.catch(function(error) {});
	};
}
function updateAddress(customerId, addressId, data) {
	return function(dispatch, getState) {
		return _api2.default.customers
			.updateAddress(customerId, addressId, data)
			.then(function(customerResponse) {
				dispatch(fetchCustomer(customerId));
			})
			.catch(function(error) {});
	};
}
function deleteAddress(customerId, addressId) {
	return function(dispatch, getState) {
		return _api2.default.customers
			.deleteAddress(customerId, addressId)
			.then(function(customerResponse) {
				dispatch(fetchCustomer(customerId));
			})
			.catch(function(error) {});
	};
}
function setDefaultBillingAddress(customerId, addressId) {
	return function(dispatch, getState) {
		return _api2.default.customers
			.setDefaultBillingAddress(customerId, addressId)
			.then(function(customerResponse) {
				dispatch(fetchCustomer(customerId));
			})
			.catch(function(error) {});
	};
}
function setDefaultShippingAddress(customerId, addressId) {
	return function(dispatch, getState) {
		return _api2.default.customers
			.setDefaultShippingAddress(customerId, addressId)
			.then(function(customerResponse) {
				dispatch(fetchCustomer(customerId));
			})
			.catch(function(error) {});
	};
}
