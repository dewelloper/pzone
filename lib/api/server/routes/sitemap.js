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
var _sitemap = require('../services/sitemap');
var _sitemap2 = _interopRequireDefault(_sitemap);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var SitemapRoute = (function() {
	function SitemapRoute(router) {
		_classCallCheck(this, SitemapRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(SitemapRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/sitemap',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_SITEMAP
					),
					this.getPaths.bind(this)
				);
			}
		},
		{
			key: 'getPaths',
			value: function getPaths(req, res, next) {
				if (req.query.path) {
					_sitemap2.default
						.getSinglePath(req.query.path, req.query.enabled)
						.then(function(data) {
							if (data) {
								res.send(data);
							} else {
								res.status(404).end();
							}
						})
						.catch(next);
				} else {
					_sitemap2.default
						.getPaths(req.query.enabled)
						.then(function(data) {
							res.send(data);
						})
						.catch(next);
				}
			}
		}
	]);
	return SitemapRoute;
})();
exports.default = SitemapRoute;
