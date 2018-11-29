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
var _tokens = require('../services/security/tokens');
var _tokens2 = _interopRequireDefault(_tokens);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var SecurityTokensRoute = (function() {
	function SecurityTokensRoute(router) {
		_classCallCheck(this, SecurityTokensRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(SecurityTokensRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/security/tokens',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.getTokens.bind(this)
				);

				this.router.get(
					'/v1/security/tokens/blacklist',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.getTokensBlacklist.bind(this)
				);

				this.router.post(
					'/v1/security/tokens',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.addToken.bind(this)
				);

				this.router.get(
					'/v1/security/tokens/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.getSingleToken.bind(this)
				);

				this.router.put(
					'/v1/security/tokens/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.updateToken.bind(this)
				);

				this.router.delete(
					'/v1/security/tokens/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.ADMIN
					),
					this.deleteToken.bind(this)
				);

				this.router.post(
					'/v1/authorize',
					this.sendDashboardSigninUrl.bind(this)
				);
			}
		},
		{
			key: 'getTokens',
			value: function getTokens(req, res, next) {
				_tokens2.default
					.getTokens(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getTokensBlacklist',
			value: function getTokensBlacklist(req, res, next) {
				_tokens2.default
					.getTokensBlacklist()
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleToken',
			value: function getSingleToken(req, res, next) {
				_tokens2.default
					.getSingleToken(req.params.id)
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
			key: 'addToken',
			value: function addToken(req, res, next) {
				_tokens2.default
					.addToken(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateToken',
			value: function updateToken(req, res, next) {
				_tokens2.default
					.updateToken(req.params.id, req.body)
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
			key: 'deleteToken',
			value: function deleteToken(req, res, next) {
				_tokens2.default
					.deleteToken(req.params.id)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'sendDashboardSigninUrl',
			value: function sendDashboardSigninUrl(req, res, next) {
				_tokens2.default
					.sendDashboardSigninUrl(req)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return SecurityTokensRoute;
})();
exports.default = SecurityTokensRoute;
