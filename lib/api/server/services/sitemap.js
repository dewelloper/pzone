'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slicedToArray = (function() {
	function sliceIterator(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return']) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
	return function(arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			);
		}
	};
})();
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
var _mongo = require('../lib/mongo');
var _parse = require('../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}
		return arr2;
	} else {
		return Array.from(arr);
	}
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var SitemapService = (function() {
	function SitemapService() {
		_classCallCheck(this, SitemapService);
	}
	_createClass(SitemapService, [
		{
			key: 'getPaths',
			value: function getPaths(onlyEnabled) {
				var slug = null;
				onlyEnabled = _parse2.default.getBooleanIfValid(onlyEnabled, false);

				return Promise.all([
					this.getSlugArrayFromReserved(),
					this.getSlugArrayFromProductCategories(slug, onlyEnabled),
					this.getSlugArrayFromProducts(slug, onlyEnabled),
					this.getSlugArrayFromPages(slug, onlyEnabled)
				]).then(function(_ref) {
					var _ref2 = _slicedToArray(_ref, 4),
						reserved = _ref2[0],
						productCategories = _ref2[1],
						products = _ref2[2],
						pages = _ref2[3];
					var paths = [].concat(
						_toConsumableArray(reserved),
						_toConsumableArray(productCategories),
						_toConsumableArray(products),
						_toConsumableArray(pages)
					);
					return paths;
				});
			}
		},
		{
			key: 'getPathsWithoutSlashes',
			value: function getPathsWithoutSlashes(slug, onlyEnabled) {
				return Promise.all([
					this.getSlugArrayFromReserved(),
					this.getSlugArrayFromProductCategories(slug, onlyEnabled),
					this.getSlugArrayFromPages(slug, onlyEnabled)
				]).then(function(_ref3) {
					var _ref4 = _slicedToArray(_ref3, 3),
						reserved = _ref4[0],
						productCategories = _ref4[1],
						pages = _ref4[2];
					var paths = [].concat(
						_toConsumableArray(reserved),
						_toConsumableArray(productCategories),
						_toConsumableArray(pages)
					);
					return paths;
				});
			}
		},
		{
			key: 'getPathsWithSlash',
			value: function getPathsWithSlash(slug, onlyEnabled) {
				return Promise.all([
					this.getSlugArrayFromProducts(slug, onlyEnabled),
					this.getSlugArrayFromPages(slug, onlyEnabled)
				]).then(function(_ref5) {
					var _ref6 = _slicedToArray(_ref5, 2),
						products = _ref6[0],
						pages = _ref6[1];
					var paths = [].concat(
						_toConsumableArray(products),
						_toConsumableArray(pages)
					);
					return paths;
				});
			}
		},
		{
			key: 'getSlugArrayFromReserved',
			value: function getSlugArrayFromReserved() {
				var paths = [];

				paths.push({ path: '/api', type: 'reserved' });
				paths.push({ path: '/ajax', type: 'reserved' });
				paths.push({ path: '/assets', type: 'reserved' });
				paths.push({ path: '/images', type: 'reserved' });
				paths.push({ path: '/admin', type: 'reserved' });
				paths.push({ path: '/signin', type: 'reserved' });
				paths.push({ path: '/signout', type: 'reserved' });
				paths.push({ path: '/signup', type: 'reserved' });
				paths.push({ path: '/post', type: 'reserved' });
				paths.push({ path: '/posts', type: 'reserved' });
				paths.push({ path: '/public', type: 'reserved' });
				paths.push({ path: '/rss', type: 'reserved' });
				paths.push({ path: '/feed', type: 'reserved' });
				paths.push({ path: '/setup', type: 'reserved' });
				paths.push({ path: '/tag', type: 'reserved' });
				paths.push({ path: '/tags', type: 'reserved' });
				paths.push({ path: '/user', type: 'reserved' });
				paths.push({ path: '/users', type: 'reserved' });
				paths.push({ path: '/sitemap.xml', type: 'reserved' });
				paths.push({ path: '/robots.txt', type: 'reserved' });
				paths.push({ path: '/settings', type: 'reserved' });
				paths.push({ path: '/find', type: 'reserved' });
				paths.push({ path: '/account', type: 'reserved' });

				paths.push({ path: '/search', type: 'search' });

				return paths;
			}
		},
		{
			key: 'getSlugArrayFromProducts',
			value: function getSlugArrayFromProducts(slug, onlyEnabled) {
				var categoriesFilter = {};
				var productFilter = {};

				if (slug) {
					var slugParts = slug.split('/');
					categoriesFilter.slug = slugParts[0];
					productFilter.slug = slugParts[1];
				}

				if (onlyEnabled === true) {
					productFilter.enabled = true;
				}

				return Promise.all([
					_mongo.db
						.collection('productCategories')
						.find(categoriesFilter)
						.project({ slug: 1 })
						.toArray(),
					_mongo.db
						.collection('products')
						.find(productFilter)
						.project({ slug: 1, category_id: 1 })
						.toArray()
				]).then(function(_ref7) {
					var _ref8 = _slicedToArray(_ref7, 2),
						categories = _ref8[0],
						products = _ref8[1];
					return products.map(function(product) {
						var category = categories.find(function(c) {
							return (
								c._id.toString() === (product.category_id || '').toString()
							);
						});

						var categorySlug = category ? category.slug : '-';
						return {
							path: '/' + categorySlug + '/' + product.slug,
							type: 'product',
							resource: product._id
						};
					});
				});
			}
		},
		{
			key: 'getSlugArrayFromPages',
			value: function getSlugArrayFromPages(slug, onlyEnabled) {
				var filter = this.getFilterWithoutSlashes(slug);
				if (onlyEnabled === true) {
					filter.enabled = true;
				}

				return _mongo.db
					.collection('pages')
					.find(filter)
					.project({ slug: 1 })
					.toArray()
					.then(function(items) {
						return items.map(function(item) {
							return {
								path: '/' + item.slug,
								type: 'page',
								resource: item._id
							};
						});
					});
			}
		},
		{
			key: 'getSlugArrayFromProductCategories',
			value: function getSlugArrayFromProductCategories(slug, onlyEnabled) {
				var filter = this.getFilterWithoutSlashes(slug);
				if (onlyEnabled === true) {
					filter.enabled = true;
				}

				return _mongo.db
					.collection('productCategories')
					.find(filter)
					.project({ slug: 1 })
					.toArray()
					.then(function(items) {
						return items.map(function(item) {
							return {
								path: '/' + item.slug,
								type: 'product-category',
								resource: item._id
							};
						});
					});
			}
		},
		{
			key: 'getFilterWithoutSlashes',
			value: function getFilterWithoutSlashes(slug) {
				if (slug) {
					return { slug: slug };
				} else {
					return {};
				}
			}
		},
		{
			key: 'getSinglePath',
			value: function getSinglePath(path) {
				var onlyEnabled =
					arguments.length > 1 && arguments[1] !== undefined
						? arguments[1]
						: false;
				onlyEnabled = _parse2.default.getBooleanIfValid(onlyEnabled, false);
				// convert path to slash (remove first slash)
				var slug = path.substr(1);
				if (slug.includes('/')) {
					// slug = category-slug/product-slug
					return this.getPathsWithSlash(slug, onlyEnabled).then(function(
						paths
					) {
						return paths.find(function(e) {
							return e.path === path;
						});
					});
				} else {
					// slug = slug
					return this.getPathsWithoutSlashes(slug, onlyEnabled).then(function(
						paths
					) {
						return paths.find(function(e) {
							return e.path === path;
						});
					});
				}
			}
		}
	]);
	return SitemapService;
})();
exports.default = new SitemapService();
