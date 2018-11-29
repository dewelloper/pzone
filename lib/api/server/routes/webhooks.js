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
var _webhooks = require('../services/webhooks');
var _webhooks2 = _interopRequireDefault(_webhooks);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var WebhooksRoute = (function() {
	function WebhooksRoute(router) {
		_classCallCheck(this, WebhooksRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(WebhooksRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/webhooks',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getWebhooks.bind(this)
				);

				this.router.post(
					'/v1/webhooks',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.addWebhook.bind(this)
				);

				this.router.get(
					'/v1/webhooks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getSingleWebhook.bind(this)
				);

				this.router.put(
					'/v1/webhooks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateWebhook.bind(this)
				);

				this.router.delete(
					'/v1/webhooks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.deleteWebhook.bind(this)
				);
			}
		},
		{
			key: 'getWebhooks',
			value: function getWebhooks(req, res, next) {
				_webhooks2.default
					.getWebhooks(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleWebhook',
			value: function getSingleWebhook(req, res, next) {
				_webhooks2.default
					.getSingleWebhook(req.params.id)
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
			key: 'addWebhook',
			value: function addWebhook(req, res, next) {
				_webhooks2.default
					.addWebhook(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateWebhook',
			value: function updateWebhook(req, res, next) {
				_webhooks2.default
					.updateWebhook(req.params.id, req.body)
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
			key: 'deleteWebhook',
			value: function deleteWebhook(req, res, next) {
				_webhooks2.default
					.deleteWebhook(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return WebhooksRoute;
})();
exports.default = WebhooksRoute;
