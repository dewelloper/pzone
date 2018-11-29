'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.receivePage = receivePage;
exports.fetchPages = fetchPages;
exports.fetchPage = fetchPage;
exports.createPage = createPage;
exports.updatePage = updatePage;
exports.deletePage = deletePage;
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
function receivePages(pages) {
	return { type: t.PAGES_RECEIVE, pages: pages };
}
function receivePage(pageEdit) {
	return { type: t.PAGE_RECEIVE, pageEdit: pageEdit };
}
function fetchPages() {
	return function(dispatch, getState) {
		return _api2.default.pages
			.list()
			.then(function(_ref) {
				var status = _ref.status,
					json = _ref.json;
				dispatch(receivePages(json));
			})
			.catch(function(error) {});
	};
}
function fetchPage(id) {
	return function(dispatch, getState) {
		return _api2.default.pages
			.retrieve(id)
			.then(function(_ref2) {
				var status = _ref2.status,
					json = _ref2.json;
				dispatch(receivePage(json));
			})
			.catch(function(error) {});
	};
}
function createPage(page) {
	return function(dispatch, getState) {
		return _api2.default.pages
			.create(page)
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				dispatch(fetchPages());
			})
			.catch(function(error) {});
	};
}
function updatePage(page) {
	return function(dispatch, getState) {
		return _api2.default.pages
			.update(page.id, page)
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				dispatch(receivePage(json));
			})
			.catch(function(error) {});
	};
}
function deletePage(pageId) {
	return function(dispatch, getState) {
		return _api2.default.pages
			.delete(pageId)
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				dispatch(fetchPages());
			})
			.catch(function(error) {});
	};
}
