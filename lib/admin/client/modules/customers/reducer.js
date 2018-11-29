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
function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}
		return arr2;
	} else {
		return Array.from(arr);
	}
}

var initialState = {
	editCustomer: null,
	items: [],
	selected: [],
	hasMore: false,
	totalCount: 0,
	loadingItems: false,
	errorLoadingItems: null,
	search: ''
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.CUSTOMERS_DETAIL_REQUEST:
			return Object.assign({}, state, {});
		case t.CUSTOMERS_DETAIL_RECEIVE:
			return Object.assign({}, state, {
				editCustomer: action.item
			});

		case t.CUSTOMERS_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.CUSTOMERS_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: action.data
			});

		case t.CUSTOMERS_FAILURE:
			return Object.assign({}, state, {
				loadingItems: false,
				errorLoadingItems: action.error
			});

		case t.CUSTOMERS_SELECT:
			return Object.assign({}, state, {
				selected: [].concat(_toConsumableArray(state.selected), [
					action.customerId
				])
			});

		case t.CUSTOMERS_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(function(id) {
					return id !== action.customerId;
				})
			});

		case t.CUSTOMERS_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});

		case t.CUSTOMERS_SELECT_ALL:
			var selected = state.items.map(function(item) {
				return item.id;
			});
			return Object.assign({}, state, {
				selected: selected
			});

		case t.CUSTOMERS_FILTER_SET_SEARCH:
			return Object.assign({}, state, {
				search: action.search
			});

		case t.CUSTOMERS_MORE_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.CUSTOMERS_MORE_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: [].concat(
					_toConsumableArray(state.items),
					_toConsumableArray(action.data)
				)
			});

		case t.CUSTOMER_DELETE_SUCCESS:
		default:
			return state;
	}
};
