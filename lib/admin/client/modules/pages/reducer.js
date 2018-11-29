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
	pages: [],
	pageEdit: null
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.PAGES_RECEIVE:
			return Object.assign({}, state, { pages: action.pages });
		case t.PAGE_RECEIVE:
			return Object.assign({}, state, { pageEdit: action.pageEdit });
		default:
			return state;
	}
};
