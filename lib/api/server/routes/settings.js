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
var _settings = require('../services/settings/settings');
var _settings2 = _interopRequireDefault(_settings);
var _email = require('../services/settings/email');
var _email2 = _interopRequireDefault(_email);
var _emailTemplates = require('../services/settings/emailTemplates');
var _emailTemplates2 = _interopRequireDefault(_emailTemplates);
var _checkoutFields = require('../services/settings/checkoutFields');
var _checkoutFields2 = _interopRequireDefault(_checkoutFields);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var SettingsRoute = (function() {
	function SettingsRoute(router) {
		_classCallCheck(this, SettingsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(SettingsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getSettings.bind(this)
				);

				this.router.put(
					'/v1/settings',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateSettings.bind(this)
				);

				this.router.get(
					'/v1/settings/email',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getEmailSettings.bind(this)
				);

				this.router.put(
					'/v1/settings/email',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateEmailSettings.bind(this)
				);

				this.router.get(
					'/v1/settings/email/templates/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getEmailTemplate.bind(this)
				);

				this.router.put(
					'/v1/settings/email/templates/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateEmailTemplate.bind(this)
				);

				this.router.get(
					'/v1/settings/checkout/fields',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getCheckoutFields.bind(this)
				);

				this.router.get(
					'/v1/settings/checkout/fields/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getCheckoutField.bind(this)
				);

				this.router.put(
					'/v1/settings/checkout/fields/:name',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateCheckoutField.bind(this)
				);

				this.router.post(
					'/v1/settings/logo',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.uploadLogo.bind(this)
				);

				this.router.delete(
					'/v1/settings/logo',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.deleteLogo.bind(this)
				);
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
			key: 'getEmailSettings',
			value: function getEmailSettings(req, res, next) {
				_email2.default
					.getEmailSettings()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateEmailSettings',
			value: function updateEmailSettings(req, res, next) {
				_email2.default
					.updateEmailSettings(req.body)
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
			key: 'getEmailTemplate',
			value: function getEmailTemplate(req, res, next) {
				_emailTemplates2.default
					.getEmailTemplate(req.params.name)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateEmailTemplate',
			value: function updateEmailTemplate(req, res, next) {
				_emailTemplates2.default
					.updateEmailTemplate(req.params.name, req.body)
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
			key: 'getCheckoutFields',
			value: function getCheckoutFields(req, res, next) {
				_checkoutFields2.default
					.getCheckoutFields()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getCheckoutField',
			value: function getCheckoutField(req, res, next) {
				_checkoutFields2.default
					.getCheckoutField(req.params.name)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateCheckoutField',
			value: function updateCheckoutField(req, res, next) {
				_checkoutFields2.default
					.updateCheckoutField(req.params.name, req.body)
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
			key: 'uploadLogo',
			value: function uploadLogo(req, res, next) {
				_settings2.default.uploadLogo(req, res, next);
			}
		},
		{
			key: 'deleteLogo',
			value: function deleteLogo(req, res, next) {
				_settings2.default.deleteLogo().then(function() {
					res.end();
				});
			}
		}
	]);
	return SettingsRoute;
})();
exports.default = SettingsRoute;
