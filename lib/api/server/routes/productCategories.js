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
var _productCategories = require('../services/products/productCategories');
var _productCategories2 = _interopRequireDefault(_productCategories);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ProductCategoriesRoute = (function() {
	function ProductCategoriesRoute(router) {
		_classCallCheck(this, ProductCategoriesRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(ProductCategoriesRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/product_categories',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCT_CATEGORIES
					),

					this.getCategories.bind(this)
				);

				this.router.post(
					'/v1/product_categories',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCT_CATEGORIES
					),

					this.addCategory.bind(this)
				);

				this.router.get(
					'/v1/product_categories/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCT_CATEGORIES
					),

					this.getSingleCategory.bind(this)
				);

				this.router.put(
					'/v1/product_categories/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCT_CATEGORIES
					),

					this.updateCategory.bind(this)
				);

				this.router.delete(
					'/v1/product_categories/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCT_CATEGORIES
					),

					this.deleteCategory.bind(this)
				);

				this.router.post(
					'/v1/product_categories/:id/image',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCT_CATEGORIES
					),

					this.uploadCategoryImage.bind(this)
				);

				this.router.delete(
					'/v1/product_categories/:id/image',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCT_CATEGORIES
					),

					this.deleteCategoryImage.bind(this)
				);
			}
		},
		{
			key: 'getCategories',
			value: function getCategories(req, res, next) {
				_productCategories2.default
					.getCategories(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleCategory',
			value: function getSingleCategory(req, res, next) {
				_productCategories2.default
					.getSingleCategory(req.params.id)
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
			key: 'addCategory',
			value: function addCategory(req, res, next) {
				_productCategories2.default
					.addCategory(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateCategory',
			value: function updateCategory(req, res, next) {
				_productCategories2.default
					.updateCategory(req.params.id, req.body)
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
			key: 'deleteCategory',
			value: function deleteCategory(req, res, next) {
				_productCategories2.default
					.deleteCategory(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'uploadCategoryImage',
			value: function uploadCategoryImage(req, res, next) {
				_productCategories2.default.uploadCategoryImage(req, res, next);
			}
		},
		{
			key: 'deleteCategoryImage',
			value: function deleteCategoryImage(req, res, next) {
				_productCategories2.default.deleteCategoryImage(req.params.id);
				res.end();
			}
		}
	]);
	return ProductCategoriesRoute;
})();
exports.default = ProductCategoriesRoute;
