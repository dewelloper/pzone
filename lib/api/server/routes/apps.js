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
var _settings = require('../services/apps/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var AppsRoute = (function() {
	function AppsRoute(router) {
		_classCallCheck(this, AppsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(AppsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/apps/:key/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getSettings.bind(this)
				);

				this.router.put(
					'/v1/apps/:key/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateSettings.bind(this)
				);
			}
		},
		{
			key: 'getSettings',
			value: function getSettings(req, res, next) {
				_settings2.default
					.getSettings(req.params.key)
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
					.updateSettings(req.params.key, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		}
	]);
	return AppsRoute;
})();
exports.default = AppsRoute;
