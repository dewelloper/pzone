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
var _pages = require('../services/pages/pages');
var _pages2 = _interopRequireDefault(_pages);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var PagesRoute = (function() {
	function PagesRoute(router) {
		_classCallCheck(this, PagesRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(PagesRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/pages',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PAGES
					),
					this.getPages.bind(this)
				);

				this.router.post(
					'/v1/pages',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAGES
					),
					this.addPage.bind(this)
				);

				this.router.get(
					'/v1/pages/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PAGES
					),
					this.getSinglePage.bind(this)
				);

				this.router.put(
					'/v1/pages/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAGES
					),
					this.updatePage.bind(this)
				);

				this.router.delete(
					'/v1/pages/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PAGES
					),
					this.deletePage.bind(this)
				);
			}
		},
		{
			key: 'getPages',
			value: function getPages(req, res, next) {
				_pages2.default
					.getPages(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSinglePage',
			value: function getSinglePage(req, res, next) {
				_pages2.default
					.getSinglePage(req.params.id)
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
			key: 'addPage',
			value: function addPage(req, res, next) {
				_pages2.default
					.addPage(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updatePage',
			value: function updatePage(req, res, next) {
				_pages2.default
					.updatePage(req.params.id, req.body)
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
			key: 'deletePage',
			value: function deletePage(req, res, next) {
				_pages2.default
					.deletePage(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return PagesRoute;
})();
exports.default = PagesRoute;
