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
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ThemeAssetsService = (function() {
	function ThemeAssetsService() {
		_classCallCheck(this, ThemeAssetsService);
	}
	_createClass(ThemeAssetsService, [
		{
			key: 'deleteFile',
			value: function deleteFile(fileName) {
				return new Promise(function(resolve, reject) {
					var filePath = _path2.default.resolve(
						_settings2.default.themeAssetsUploadPath + '/' + fileName
					);

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
				var _this = this;
				var uploadDir = _path2.default.resolve(
					_settings2.default.themeAssetsUploadPath
				);

				var form = new _formidable2.default.IncomingForm(),
					file_name = null,
					file_size = 0;

				form.uploadDir = uploadDir;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						file.path = uploadDir + '/' + file.name;
					})
					.on('file', function(field, file) {
						// every time a file has been uploaded successfully,
						file_name = file.name;
						file_size = file.size;
					})
					.on('error', function(err) {
						res.status(500).send(_this.getErrorMessage(err));
					})
					.on('end', function() {
						//Emitted when the entire request has been received, and all contained files have finished flushing to disk.
						if (file_name) {
							res.send({ file: file_name, size: file_size });
						} else {
							res
								.status(400)
								.send(_this.getErrorMessage('Required fields are missing'));
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
	return ThemeAssetsService;
})();
exports.default = new ThemeAssetsService();
