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
	items: [],
	isFetched: false,
	isFetching: false,
	isSaving: false,
	uploadingImage: false,
	errorFetch: null,
	errorUpdate: null,
	selectedId: 'all'
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.CATEGORIES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case t.CATEGORIES_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				isFetched: true,
				items: action.items
			});

		case t.CATEGORIES_FAILURE:
			return Object.assign({}, state, {
				errorFetch: action.error
			});

		case t.CATEGORIES_SELECT:
			return Object.assign({}, state, {
				selectedId: action.selectedId
			});

		case t.CATEGORIES_DESELECT:
			return Object.assign({}, state, {
				selectedId: null
			});

		case t.CATEGORY_UPDATE_REQUEST:
			return Object.assign({}, state, {
				isSaving: true
			});

		case t.CATEGORY_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				isSaving: false
			});

		case t.CATEGORY_UPDATE_FAILURE:
			return Object.assign({}, state, {
				isSaving: false,
				errorUpdate: action.error
			});

		case t.CATEGORY_IMAGE_UPLOAD_START:
			return Object.assign({}, state, {
				uploadingImage: true
			});

		case t.CATEGORY_IMAGE_UPLOAD_END:
			return Object.assign({}, state, {
				uploadingImage: false
			});

		case t.CATEGORY_CREATE_SUCCESS:
		case t.CATEGORY_DELETE_SUCCESS:
		case t.CATEGORY_MOVE_UPDOWN_SUCCESS:
		default:
			return state;
	}
};
