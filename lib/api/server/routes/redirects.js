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
var _redirects = require('../services/redirects');
var _redirects2 = _interopRequireDefault(_redirects);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var RedirectsRoute = (function() {
	function RedirectsRoute(router) {
		_classCallCheck(this, RedirectsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(RedirectsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/redirects',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getRedirects.bind(this)
				);

				this.router.post(
					'/v1/redirects',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.addRedirect.bind(this)
				);

				this.router.get(
					'/v1/redirects/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SETTINGS
					),
					this.getSingleRedirect.bind(this)
				);

				this.router.put(
					'/v1/redirects/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.updateRedirect.bind(this)
				);

				this.router.delete(
					'/v1/redirects/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_SETTINGS
					),
					this.deleteRedirect.bind(this)
				);
			}
		},
		{
			key: 'getRedirects',
			value: function getRedirects(req, res, next) {
				_redirects2.default
					.getRedirects(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleRedirect',
			value: function getSingleRedirect(req, res, next) {
				_redirects2.default
					.getSingleRedirect(req.params.id)
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
			key: 'addRedirect',
			value: function addRedirect(req, res, next) {
				_redirects2.default
					.addRedirect(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateRedirect',
			value: function updateRedirect(req, res, next) {
				_redirects2.default
					.updateRedirect(req.params.id, req.body)
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
			key: 'deleteRedirect',
			value: function deleteRedirect(req, res, next) {
				_redirects2.default
					.deleteRedirect(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return RedirectsRoute;
})();
exports.default = RedirectsRoute;
