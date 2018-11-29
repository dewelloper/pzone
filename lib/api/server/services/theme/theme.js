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
var _child_process = require('child_process');
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _formidable = require('formidable');
var _formidable2 = _interopRequireDefault(_formidable);
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _dashboardWebSocket = require('../../lib/dashboardWebSocket');
var _dashboardWebSocket2 = _interopRequireDefault(_dashboardWebSocket);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ThemesService = (function() {
	function ThemesService() {
		_classCallCheck(this, ThemesService);
	}
	_createClass(ThemesService, [
		{
			key: 'exportTheme',
			value: function exportTheme(req, res) {
				var _this = this;
				var randomFileName = Math.floor(Math.random() * 10000);
				(0, _child_process.exec)(
					'npm --silent run theme:export -- ' + randomFileName + '.zip',
					function(error, stdout, stderr) {
						if (error) {
							_winston2.default.error('Exporting theme failed');
							res.status(500).send(_this.getErrorMessage(error));
						} else {
							_winston2.default.info(
								'Theme successfully exported to ' + randomFileName + '.zip'
							);
							if (stdout.includes('success')) {
								res.send({ file: '/' + randomFileName + '.zip' });
							} else {
								res
									.status(500)
									.send(
										_this.getErrorMessage('Something went wrong in scripts')
									);
							}
						}
					}
				);
			}
		},
		{
			key: 'installTheme',
			value: function installTheme(req, res) {
				var _this2 = this;
				this.saveThemeFile(req, res, function(err, fileName) {
					if (err) {
						res.status(500).send(_this2.getErrorMessage(err));
					} else {
						// run async NPM script
						_winston2.default.info('Installing theme...');
						(0, _child_process.exec)(
							'npm run theme:install ' + fileName,
							function(error, stdout, stderr) {
								_dashboardWebSocket2.default.send({
									event: _dashboardWebSocket2.default.events.THEME_INSTALLED,
									payload: fileName
								});

								if (error) {
									_winston2.default.error('Installing theme failed');
								} else {
									_winston2.default.info('Theme successfully installed');
								}
							}
						);
						// close request and don't wait result from NPM script
						res.status(200).end();
					}
				});
			}
		},
		{
			key: 'saveThemeFile',
			value: function saveThemeFile(req, res, callback) {
				var uploadDir = _path2.default.resolve(
					_settings2.default.filesUploadPath
				);

				var form = new _formidable2.default.IncomingForm(),
					file_name = null,
					file_size = 0;

				form.multiples = false;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						if (file.name.endsWith('.zip')) {
							file.path = uploadDir + '/' + file.name;
						}
						// else - will save to /tmp
					})
					.on('file', function(field, file) {
						// every time a file has been uploaded successfully,
						if (file.name.endsWith('.zip')) {
							file_name = file.name;
							file_size = file.size;
						}
					})
					.on('error', function(err) {
						callback(err);
					})
					.on('end', function() {
						//Emitted when the entire request has been received, and all contained files have finished flushing to disk.
						if (file_name) {
							callback(null, file_name);
						} else {
							callback('Cant upload file');
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
	return ThemesService;
})();
exports.default = new ThemesService();
