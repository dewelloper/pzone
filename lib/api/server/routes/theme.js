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
var _theme = require('../services/theme/theme');
var _theme2 = _interopRequireDefault(_theme);
var _settings = require('../services/theme/settings');
var _settings2 = _interopRequireDefault(_settings);
var _assets = require('../services/theme/assets');
var _assets2 = _interopRequireDefault(_assets);
var _placeholders = require('../services/theme/placeholders');
var _placeholders2 = _interopRequireDefault(_placeholders);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ThemeRoute = (function() {
	function ThemeRoute(router) {
		_classCallCheck(this, ThemeRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(ThemeRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/theme/export',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_THEME
					),
					this.exportTheme.bind(this)
				);

				this.router.post(
					'/v1/theme/install',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.installTheme.bind(this)
				);

				this.router.get(
					'/v1/theme/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_THEME
					),
					this.getSettings.bind(this)
				);

				this.router.put(
					'/v1/theme/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.updateSettings.bind(this)
				);

				this.router.get(
					'/v1/theme/settings_schema',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_THEME
					),
					this.getSettingsSchema.bind(this)
				);

				this.router.post(
					'/v1/theme/assets',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.uploadFile.bind(this)
				);

				this.router.delete(
					'/v1/theme/assets/:file',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.deleteFile.bind(this)
				);

				this.router.get(
					'/v1/theme/placeholders',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_THEME
					),
					this.getPlaceholders.bind(this)
				);

				this.router.post(
					'/v1/theme/placeholders',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.addPlaceholder.bind(this)
				);

				this.router.get(
					'/v1/theme/placeholders/:key',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_THEME
					),
					this.getSinglePlaceholder.bind(this)
				);

				this.router.put(
					'/v1/theme/placeholders/:key',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.updatePlaceholder.bind(this)
				);

				this.router.delete(
					'/v1/theme/placeholders/:key',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_THEME
					),
					this.deletePlaceholder.bind(this)
				);
			}
		},
		{
			key: 'exportTheme',
			value: function exportTheme(req, res, next) {
				_theme2.default.exportTheme(req, res);
			}
		},
		{
			key: 'installTheme',
			value: function installTheme(req, res, next) {
				_theme2.default.installTheme(req, res);
			}
		},
		{
			key: 'getSettings',
			value: function getSettings(req, res, next) {
				_settings2.default
					.getSettings()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateSettings',
			value: function updateSettings(req, res, next) {
				_settings2.default
					.updateSettings(req.body)
					.then(function() {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'getSettingsSchema',
			value: function getSettingsSchema(req, res, next) {
				_settings2.default
					.getSettingsSchema()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'uploadFile',
			value: function uploadFile(req, res, next) {
				_assets2.default.uploadFile(req, res, next);
			}
		},
		{
			key: 'deleteFile',
			value: function deleteFile(req, res, next) {
				_assets2.default
					.deleteFile(req.params.file)
					.then(function() {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'getPlaceholders',
			value: function getPlaceholders(req, res, next) {
				_placeholders2.default
					.getPlaceholders()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSinglePlaceholder',
			value: function getSinglePlaceholder(req, res, next) {
				_placeholders2.default
					.getSinglePlaceholder(req.params.key)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'addPlaceholder',
			value: function addPlaceholder(req, res, next) {
				_placeholders2.default
					.addPlaceholder(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updatePlaceholder',
			value: function updatePlaceholder(req, res, next) {
				_placeholders2.default
					.updatePlaceholder(req.params.key, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deletePlaceholder',
			value: function deletePlaceholder(req, res, next) {
				_placeholders2.default
					.deletePlaceholder(req.params.key)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return ThemeRoute;
})();
exports.default = ThemeRoute;
