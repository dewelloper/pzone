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
	editOrder: null,
	items: [],
	selected: [],
	hasMore: false,
	totalCount: 0,
	loadingItems: false,
	processingCheckout: false,
	errorLoadingItems: null,

	filter: {
		search: '',
		closed: null,
		cancelled: null,
		delivered: null,
		paid: null,
		hold: null,
		draft: false
		// status_id: null,
		// customer_id: null,
		// payment_method_id: null,
		// shipping_method_id: null,
		// grand_total_min: null,
		// grand_total_max: null,
		// date_created_min: null,
		// date_created_max: null,
		// date_closed_min: null,
		// date_closed_max: null
	}
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.ORDERS_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.ORDERS_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: action.data
			});

		case t.ORDERS_FAILURE:
			return Object.assign({}, state, {
				loadingItems: false,
				errorLoadingItems: action.error
			});

		case t.ORDERS_SELECT:
			return Object.assign({}, state, {
				selected: [].concat(_toConsumableArray(state.selected), [
					action.orderId
				])
			});

		case t.ORDERS_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(function(id) {
					return id !== action.orderId;
				})
			});

		case t.ORDERS_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});

		case t.ORDERS_SELECT_ALL:
			var selected = state.items.map(function(item) {
				return item.id;
			});
			return Object.assign({}, state, {
				selected: selected
			});

		case t.ORDERS_SET_FILTER:
			var newFilter = Object.assign({}, state.filter, action.filter);
			return Object.assign({}, state, {
				filter: newFilter
			});

		case t.ORDERS_MORE_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.ORDERS_MORE_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: [].concat(
					_toConsumableArray(state.items),
					_toConsumableArray(action.data)
				)
			});

		case t.ORDER_DETAIL_REQUEST:
			return Object.assign({}, state, {});
		case t.ORDER_DETAIL_RECEIVE:
			return Object.assign({}, state, {
				editOrder: action.item
			});

		case t.ORDER_CHECKOUT_REQUEST:
			return Object.assign({}, state, {
				processingCheckout: true
			});

		case t.ORDER_CHECKOUT_RECEIVE:
			return Object.assign({}, state, {
				processingCheckout: false
			});

		case t.ORDER_CHECKOUT_FAILURE:
			return Object.assign({}, state, {
				processingCheckout: false
			});

		case t.ORDER_UPDATE_REQUEST:
		case t.ORDER_UPDATE_SUCCESS:
		case t.ORDER_UPDATE_FAILURE:
		case t.ORDERS_BULK_UPDATE_REQUEST:
		case t.ORDERS_BULK_UPDATE_SUCCESS:
		case t.ORDERS_BULK_UPDATE_FAILURE:
		case t.ORDER_DELETE_SUCCESS:
		case t.ORDER_CREATE_SUCCESS:
		default:
			return state;
	}
};
