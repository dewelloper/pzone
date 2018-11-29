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
	editProductImages: null,
	editProductOptions: null,
	editProductVariants: null,
	editProduct: null,
	items: [],
	selected: [],
	hasMore: false,
	totalCount: 0,

	isUpdating: false,
	loadingItems: false,
	uploadingImages: false,

	errorFetchEdit: null,
	errorLoadingItems: null,
	errorUpdate: null,

	filter: {
		search: '',
		enabled: null,
		discontinued: false,
		onSale: null,
		stockStatus: null
	}
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.PRODUCT_DETAIL_REQUEST:
			return Object.assign({}, state, {});
		case t.PRODUCT_DETAIL_RECEIVE:
			return Object.assign({}, state, {
				editProduct: action.item
			});

		case t.PRODUCT_DETAIL_ERASE:
			return Object.assign({}, state, {
				isUpdating: false,
				editProduct: null,
				editProductImages: null,
				editProductOptions: null,
				editProductVariants: null
			});

		case t.PRODUCT_DETAIL_FAILURE:
			return Object.assign({}, state, {
				errorFetchEdit: action.error
			});

		case t.PRODUCTS_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.PRODUCTS_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: action.data
			});

		case t.PRODUCTS_FAILURE:
			return Object.assign({}, state, {
				errorLoadingItems: action.error
			});

		case t.PRODUCTS_SELECT:
			return Object.assign({}, state, {
				selected: [].concat(_toConsumableArray(state.selected), [
					action.productId
				])
			});

		case t.PRODUCTS_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(function(id) {
					return id !== action.productId;
				})
			});

		case t.PRODUCTS_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});

		case t.PRODUCTS_SELECT_ALL:
			var selected = state.items.map(function(item) {
				return item.id;
			});
			return Object.assign({}, state, {
				selected: selected
			});

		case t.PRODUCTS_SET_FILTER:
			var newFilter = Object.assign({}, state.filter, action.filter);
			return Object.assign({}, state, {
				filter: newFilter
			});

		case t.PRODUCTS_MORE_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});

		case t.PRODUCTS_MORE_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: [].concat(
					_toConsumableArray(state.items),
					_toConsumableArray(action.data)
				)
			});

		case t.PRODUCT_UPDATE_REQUEST:
			return Object.assign({}, state, {
				isUpdating: true
			});

		case t.PRODUCT_VARIANTS_RECEIVE:
			return Object.assign({}, state, {
				editProductVariants: action.variants
			});

		case t.PRODUCT_OPTIONS_RECEIVE:
			return Object.assign({}, state, {
				editProductOptions: action.options
			});

		case t.PRODUCT_IMAGES_RECEIVE:
			return Object.assign({}, state, {
				editProductImages: action.images
			});

		case t.PRODUCT_UPDATE_FAILURE:
		case t.PRODUCT_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				isUpdating: false,
				editProduct: action.item
			});

		case t.PRODUCT_IMAGES_UPLOAD_START:
			return Object.assign({}, state, {
				uploadingImages: true
			});

		case t.PRODUCT_IMAGES_UPLOAD_END:
			return Object.assign({}, state, {
				uploadingImages: false
			});

		case t.PRODUCT_SET_CATEGORY_SUCCESS:
		case t.PRODUCT_DELETE_SUCCESS:
		default:
			return state;
	}
};
