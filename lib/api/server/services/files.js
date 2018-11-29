'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _fs = require('fs');
var _fs2 = _interopRequireDefault(_fs);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _formidable = require('formidable');
var _formidable2 = _interopRequireDefault(_formidable);
var _utils = require('../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _settings = require('../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var CONTENT_PATH = _path2.default.resolve(_settings2.default.filesUploadPath);
var FilesService = (function() {
	function FilesService() {
		_classCallCheck(this, FilesService);
	}
	_createClass(FilesService, [
		{
			key: 'getFileData',
			value: function getFileData(fileName) {
				var filePath = CONTENT_PATH + '/' + fileName;
				var stats = _fs2.default.statSync(filePath);
				if (stats.isFile()) {
					return {
						file: fileName,
						size: stats.size,
						modified: stats.mtime
					};
				} else {
					return null;
				}
			}
		},
		{
			key: 'getFilesData',
			value: function getFilesData(files) {
				var _this = this;
				return files
					.map(function(fileName) {
						return _this.getFileData(fileName);
					})
					.filter(function(fileData) {
						return fileData !== null;
					})
					.sort(function(a, b) {
						return a.modified - b.modified;
					});
			}
		},
		{
			key: 'getFiles',
			value: function getFiles() {
				var _this2 = this;
				return new Promise(function(resolve, reject) {
					_fs2.default.readdir(CONTENT_PATH, function(err, files) {
						if (err) {
							reject(err);
						} else {
							var filesData = _this2.getFilesData(files);
							resolve(filesData);
						}
					});
				});
			}
		},
		{
			key: 'deleteFile',
			value: function deleteFile(fileName) {
				return new Promise(function(resolve, reject) {
					var filePath = CONTENT_PATH + '/' + fileName;
					if (_fs2.default.existsSync(filePath)) {
						_fs2.default.unlink(filePath, function(err) {
							resolve();
						});
					} else {
						reject('File not found');
					}
				});
			}
		},
		{
			key: 'uploadFile',
			value: function uploadFile(req, res, next) {
				var _this3 = this;
				var uploadDir = CONTENT_PATH;

				var form = new _formidable2.default.IncomingForm(),
					file_name = null,
					file_size = 0;

				form.uploadDir = uploadDir;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						file.name = _utils2.default.getCorrectFileName(file.name);
						file.path = uploadDir + '/' + file.name;
					})
					.on('file', function(name, file) {
						// every time a file has been uploaded successfully,
						file_name = file.name;
						file_size = file.size;
					})
					.on('error', function(err) {
						res.status(500).send(_this3.getErrorMessage(err));
					})
					.on('end', function() {
						//Emitted when the entire request has been received, and all contained files have finished flushing to disk.
						if (file_name) {
							res.send({ file: file_name, size: file_size });
						} else {
							res
								.status(400)
								.send(_this3.getErrorMessage('Required fields are missing'));
						}
					});

				form.parse(req);
			}
		},
		{
			key: 'getErrorMessage',
			value: function getErrorMessage(err) {
				return { error: true, message: err.toString() };
			}
		}
	]);
	return FilesService;
})();
exports.default = new FilesService();
