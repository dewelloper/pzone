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
	files: [],
	uploading: false
};
exports.default = function() {
	var state =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: initialState;
	var action = arguments[1];
	switch (action.type) {
		case t.FILES_RECEIVE:
			return Object.assign({}, state, { files: action.files });
		case t.FILES_UPLOAD_START:
			return Object.assign({}, state, {
				uploading: true
			});

		case t.FILES_UPLOAD_END:
			return Object.assign({}, state, {
				uploading: false
			});

		default:
			return state;
	}
};
