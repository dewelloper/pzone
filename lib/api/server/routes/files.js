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
var _security = require('../lib/security');
var _security2 = _interopRequireDefault(_security);
var _files = require('../services/files');
var _files2 = _interopRequireDefault(_files);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var FilesRoute = (function() {
	function FilesRoute(router) {
		_classCallCheck(this, FilesRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(FilesRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/files',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_FILES
					),
					this.getFiles.bind(this)
				);

				this.router.post(
					'/v1/files',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_FILES
					),
					this.uploadFile.bind(this)
				);

				this.router.delete(
					'/v1/files/:file',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_FILES
					),
					this.deleteFile.bind(this)
				);
			}
		},
		{
			key: 'getFiles',
			value: function getFiles(req, res, next) {
				_files2.default
					.getFiles()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'uploadFile',
			value: function uploadFile(req, res, next) {
				_files2.default.uploadFile(req, res, next);
			}
		},
		{
			key: 'deleteFile',
			value: function deleteFile(req, res, next) {
				_files2.default
					.deleteFile(req.params.file)
					.then(function() {
						res.end();
					})
					.catch(next);
			}
		}
	]);
	return FilesRoute;
})();
exports.default = FilesRoute;
