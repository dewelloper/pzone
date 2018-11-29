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
var _products = require('../services/products/products');
var _products2 = _interopRequireDefault(_products);
var _options = require('../services/products/options');
var _options2 = _interopRequireDefault(_options);
var _optionValues = require('../services/products/optionValues');
var _optionValues2 = _interopRequireDefault(_optionValues);
var _variants = require('../services/products/variants');
var _variants2 = _interopRequireDefault(_variants);
var _images = require('../services/products/images');
var _images2 = _interopRequireDefault(_images);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ProductsRoute = (function() {
	function ProductsRoute(router) {
		_classCallCheck(this, ProductsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(ProductsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/products',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getProducts.bind(this)
				);

				this.router.post(
					'/v1/products',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.addProduct.bind(this)
				);

				this.router.get(
					'/v1/products/:productId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getSingleProduct.bind(this)
				);

				this.router.put(
					'/v1/products/:productId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.updateProduct.bind(this)
				);

				this.router.delete(
					'/v1/products/:productId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.deleteProduct.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/images',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getImages.bind(this)
				);

				this.router.post(
					'/v1/products/:productId/images',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.addImage.bind(this)
				);

				this.router.put(
					'/v1/products/:productId/images/:imageId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.updateImage.bind(this)
				);

				this.router.delete(
					'/v1/products/:productId/images/:imageId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.deleteImage.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/sku',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.isSkuExists.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/slug',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.isSlugExists.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/options',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getOptions.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/options/:optionId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getSingleOption.bind(this)
				);

				this.router.post(
					'/v1/products/:productId/options',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.addOption.bind(this)
				);

				this.router.put(
					'/v1/products/:productId/options/:optionId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.updateOption.bind(this)
				);

				this.router.delete(
					'/v1/products/:productId/options/:optionId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.deleteOption.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/options/:optionId/values',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getOptionValues.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/options/:optionId/values/:valueId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getSingleOptionValue.bind(this)
				);

				this.router.post(
					'/v1/products/:productId/options/:optionId/values',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.addOptionValue.bind(this)
				);

				this.router.put(
					'/v1/products/:productId/options/:optionId/values/:valueId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.updateOptionValue.bind(this)
				);

				this.router.delete(
					'/v1/products/:productId/options/:optionId/values/:valueId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.deleteOptionValue.bind(this)
				);

				this.router.get(
					'/v1/products/:productId/variants',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PRODUCTS
					),
					this.getVariants.bind(this)
				);

				this.router.post(
					'/v1/products/:productId/variants',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.addVariant.bind(this)
				);

				this.router.put(
					'/v1/products/:productId/variants/:variantId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.updateVariant.bind(this)
				);

				this.router.delete(
					'/v1/products/:productId/variants/:variantId',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.deleteVariant.bind(this)
				);

				this.router.put(
					'/v1/products/:productId/variants/:variantId/options',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_PRODUCTS
					),
					this.setVariantOption.bind(this)
				);
			}
		},
		{
			key: 'getProducts',
			value: function getProducts(req, res, next) {
				_products2.default
					.getProducts(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleProduct',
			value: function getSingleProduct(req, res, next) {
				_products2.default
					.getSingleProduct(req.params.productId)
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
			key: 'addProduct',
			value: function addProduct(req, res, next) {
				_products2.default
					.addProduct(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateProduct',
			value: function updateProduct(req, res, next) {
				_products2.default
					.updateProduct(req.params.productId, req.body)
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
			key: 'deleteProduct',
			value: function deleteProduct(req, res, next) {
				_products2.default
					.deleteProduct(req.params.productId)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'getImages',
			value: function getImages(req, res, next) {
				_images2.default
					.getImages(req.params.productId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'addImage',
			value: async function addImage(req, res, next) {
				await _images2.default.addImage(req, res, next);
			}
		},
		{
			key: 'updateImage',
			value: function updateImage(req, res, next) {
				_images2.default
					.updateImage(req.params.productId, req.params.imageId, req.body)
					.then(function(data) {
						res.end();
					});
			}
		},
		{
			key: 'deleteImage',
			value: function deleteImage(req, res, next) {
				_images2.default
					.deleteImage(req.params.productId, req.params.imageId)
					.then(function(data) {
						res.end();
					});
			}
		},
		{
			key: 'isSkuExists',
			value: function isSkuExists(req, res, next) {
				_products2.default
					.isSkuExists(req.query.sku, req.params.productId)
					.then(function(exists) {
						res.status(exists ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'isSlugExists',
			value: function isSlugExists(req, res, next) {
				_products2.default
					.isSlugExists(req.query.slug, req.params.productId)
					.then(function(exists) {
						res.status(exists ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'getOptions',
			value: function getOptions(req, res, next) {
				_options2.default
					.getOptions(req.params.productId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleOption',
			value: function getSingleOption(req, res, next) {
				_options2.default
					.getSingleOption(req.params.productId, req.params.optionId)
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
			key: 'addOption',
			value: function addOption(req, res, next) {
				_options2.default
					.addOption(req.params.productId, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateOption',
			value: function updateOption(req, res, next) {
				_options2.default
					.updateOption(req.params.productId, req.params.optionId, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'deleteOption',
			value: function deleteOption(req, res, next) {
				_options2.default
					.deleteOption(req.params.productId, req.params.optionId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getOptionValues',
			value: function getOptionValues(req, res, next) {
				_optionValues2.default
					.getOptionValues(req.params.productId, req.params.optionId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleOptionValue',
			value: function getSingleOptionValue(req, res, next) {
				_optionValues2.default
					.getSingleOptionValue(
						req.params.productId,
						req.params.optionId,
						req.params.valueId
					)
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
			key: 'addOptionValue',
			value: function addOptionValue(req, res, next) {
				_optionValues2.default
					.addOptionValue(req.params.productId, req.params.optionId, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateOptionValue',
			value: function updateOptionValue(req, res, next) {
				_optionValues2.default
					.updateOptionValue(
						req.params.productId,
						req.params.optionId,
						req.params.valueId,
						req.body
					)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'deleteOptionValue',
			value: function deleteOptionValue(req, res, next) {
				_optionValues2.default
					.deleteOptionValue(
						req.params.productId,
						req.params.optionId,
						req.params.valueId
					)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getVariants',
			value: function getVariants(req, res, next) {
				_variants2.default
					.getVariants(req.params.productId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'addVariant',
			value: function addVariant(req, res, next) {
				_variants2.default
					.addVariant(req.params.productId, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateVariant',
			value: function updateVariant(req, res, next) {
				_variants2.default
					.updateVariant(req.params.productId, req.params.variantId, req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'deleteVariant',
			value: function deleteVariant(req, res, next) {
				_variants2.default
					.deleteVariant(req.params.productId, req.params.variantId)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'setVariantOption',
			value: function setVariantOption(req, res, next) {
				_variants2.default
					.setVariantOption(
						req.params.productId,
						req.params.variantId,
						req.body
					)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return ProductsRoute;
})();
exports.default = ProductsRoute;
