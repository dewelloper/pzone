'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fetchFiles = fetchFiles;
exports.uploadFiles = uploadFiles;
exports.deleteFile = deleteFile;
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
function receiveFiles(files) {
	return { type: t.FILES_RECEIVE, files: files };
}
function filesUploadStart() {
	return { type: t.FILES_UPLOAD_START };
}
function filesUploadEnd() {
	return { type: t.FILES_UPLOAD_END };
}
function fetchFiles() {
	return function(dispatch, getState) {
		return _api2.default.files
			.list()
			.then(function(_ref) {
				var status = _ref.status,
					json = _ref.json;
				dispatch(receiveFiles(json));
			})
			.catch(function(error) {});
	};
}
function uploadFiles(form) {
	return function(dispatch, getState) {
		dispatch(filesUploadStart());
		return _api2.default.files
			.upload(form)
			.then(function() {
				dispatch(filesUploadEnd());
				dispatch(fetchFiles());
			})
			.catch(function(error) {
				dispatch(filesUploadEnd());
			});
	};
}
function deleteFile(fileName) {
	return function(dispatch, getState) {
		return _api2.default.files
			.delete(fileName)
			.then(function() {
				dispatch(fetchFiles());
			})
			.catch(function(error) {});
	};
}
