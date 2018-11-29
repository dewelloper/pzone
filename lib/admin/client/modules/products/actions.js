'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.cancelProductEdit = cancelProductEdit;
exports.selectProduct = selectProduct;
exports.deselectProduct = deselectProduct;
exports.deselectAllProduct = deselectAllProduct;
exports.selectAllProduct = selectAllProduct;
exports.setFilter = setFilter;
exports.fetchProducts = fetchProducts;
exports.fetchMoreProducts = fetchMoreProducts;
exports.deleteCurrentProduct = deleteCurrentProduct;
exports.deleteProducts = deleteProducts;
exports.setCategory = setCategory;
exports.updateProduct = updateProduct;
exports.createProduct = createProduct;
exports.fetchProduct = fetchProduct;
exports.fetchImages = fetchImages;
exports.fetchOptions = fetchOptions;
exports.fetchVariants = fetchVariants;
exports.createVariant = createVariant;
exports.updateVariant = updateVariant;
exports.setVariantOption = setVariantOption;
exports.createOptionValue = createOptionValue;
exports.createOption = createOption;
exports.updateOptionValue = updateOptionValue;
exports.updateOption = updateOption;
exports.deleteOptionValue = deleteOptionValue;
exports.deleteOption = deleteOption;
exports.deleteVariant = deleteVariant;
exports.deleteImage = deleteImage;
exports.updateImage = updateImage;
exports.updateImages = updateImages;
exports.uploadImages = uploadImages;
var _actionTypes = require('./actionTypes');
var t = _interopRequireWildcard(_actionTypes);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
function requestProduct() {
	return { type: t.PRODUCT_DETAIL_REQUEST };
}
function receiveProduct(item) {
	return { type: t.PRODUCT_DETAIL_RECEIVE, item: item };
}
function receiveProductError(error) {
	return { type: t.PRODUCT_DETAIL_FAILURE, error: error };
}
function receiveImages(images) {
	return { type: t.PRODUCT_IMAGES_RECEIVE, images: images };
}
function receiveVariants(variants) {
	return { type: t.PRODUCT_VARIANTS_RECEIVE, variants: variants };
}
function receiveOptions(options) {
	return { type: t.PRODUCT_OPTIONS_RECEIVE, options: options };
}
function cancelProductEdit() {
	return { type: t.PRODUCT_DETAIL_ERASE };
}
function requestProducts() {
	return { type: t.PRODUCTS_REQUEST };
}
function requestMoreProducts() {
	return { type: t.PRODUCTS_MORE_REQUEST };
}
function receiveProductsMore(_ref) {
	var has_more = _ref.has_more,
		total_count = _ref.total_count,
		data = _ref.data;
	return {
		type: t.PRODUCTS_MORE_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveProducts(_ref2) {
	var has_more = _ref2.has_more,
		total_count = _ref2.total_count,
		data = _ref2.data;
	return {
		type: t.PRODUCTS_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveProductsError(error) {
	return { type: t.PRODUCTS_FAILURE, error: error };
}
function selectProduct(id) {
	return { type: t.PRODUCTS_SELECT, productId: id };
}
function deselectProduct(id) {
	return { type: t.PRODUCTS_DESELECT, productId: id };
}
function deselectAllProduct() {
	return { type: t.PRODUCTS_DESELECT_ALL };
}
function selectAllProduct() {
	return { type: t.PRODUCTS_SELECT_ALL };
}
function setFilter(filter) {
	return { type: t.PRODUCTS_SET_FILTER, filter: filter };
}
function deleteProductsSuccess() {
	return { type: t.PRODUCT_DELETE_SUCCESS };
}
function setCategorySuccess() {
	return { type: t.PRODUCT_SET_CATEGORY_SUCCESS };
}
function requestUpdateProduct() {
	return { type: t.PRODUCT_UPDATE_REQUEST };
}
function receiveUpdateProduct(item) {
	return { type: t.PRODUCT_UPDATE_SUCCESS, item: item };
}
function errorUpdateProduct(error) {
	return { type: t.PRODUCT_UPDATE_FAILURE, error: error };
}
function successCreateProduct(id) {
	return { type: t.PRODUCT_CREATE_SUCCESS };
}
function imagesUploadStart() {
	return { type: t.PRODUCT_IMAGES_UPLOAD_START };
}
function imagesUploadEnd() {
	return { type: t.PRODUCT_IMAGES_UPLOAD_END };
}
var getFilter = function getFilter(state) {
	var offset =
		arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var searchTerm = state.products.filter.search;
	var sortOrder = searchTerm && searchTerm.length > 0 ? 'search' : 'name';
	var filter = {
		limit: 50,
		fields:
			'id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,url',
		search: searchTerm,
		offset: offset,
		sort: sortOrder
	};
	if (
		state.productCategories.selectedId !== null &&
		state.productCategories.selectedId !== 'all'
	) {
		filter.category_id = state.productCategories.selectedId;
	}
	if (state.products.filter.stockStatus !== null) {
		filter.stock_status = state.products.filter.stockStatus;
	}
	if (state.products.filter.enabled !== null) {
		filter.enabled = state.products.filter.enabled;
	}
	if (state.products.filter.discontinued !== null) {
		filter.discontinued = state.products.filter.discontinued;
	}
	if (state.products.filter.onSale !== null) {
		filter.on_sale = state.products.filter.onSale;
	}
	return filter;
};
function fetchProducts() {
	return function(dispatch, getState) {
		var state = getState();
		if (state.products.loadingItems) {
			// do nothing
		} else {
			dispatch(requestProducts());
			dispatch(deselectAllProduct());
			var filter = getFilter(state);
			return _api2.default.products
				.list(filter)
				.then(function(_ref3) {
					var status = _ref3.status,
						json = _ref3.json;
					dispatch(receiveProducts(json));
				})
				.catch(function(error) {
					dispatch(receiveProductsError(error));
				});
		}
	};
}
function fetchMoreProducts() {
	return function(dispatch, getState) {
		var state = getState();
		if (!state.products.loadingItems) {
			dispatch(requestMoreProducts());
			var offset = state.products.items.length;
			var filter = getFilter(state, offset);
			return _api2.default.products
				.list(filter)
				.then(function(_ref4) {
					var status = _ref4.status,
						json = _ref4.json;
					dispatch(receiveProductsMore(json));
				})
				.catch(function(error) {
					dispatch(receiveProductsError(error));
				});
		}
	};
}
function deleteCurrentProduct() {
	return function(dispatch, getState) {
		var state = getState();
		var product = state.products.editProduct;
		if (product && product.id) {
			return _api2.default.products
				.delete(product.id)
				.then(function() {})
				.catch(function(err) {
					console.log(err);
				});
		}
	};
}
function deleteProducts() {
	return function(dispatch, getState) {
		var state = getState();
		var promises = state.products.selected.map(function(productId) {
			return _api2.default.products.delete(productId);
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(deleteProductsSuccess());
				dispatch(deselectAllProduct());
				dispatch(fetchProducts());
			})
			.catch(function(err) {
				console.log(err);
			});
	};
}
function setCategory(category_id) {
	return function(dispatch, getState) {
		var state = getState();
		var promises = state.products.selected.map(function(productId) {
			return _api2.default.products.update(productId, {
				category_id: category_id
			});
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(setCategorySuccess());
				dispatch(deselectAllProduct());
				dispatch(fetchProducts());
			})
			.catch(function(err) {
				console.log(err);
			});
	};
}
function updateProduct(data) {
	return function(dispatch, getState) {
		dispatch(requestUpdateProduct());
		return _api2.default.products
			.update(data.id, data)
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				var product = fixProductData(json);
				dispatch(receiveUpdateProduct(product));
			})
			.catch(function(error) {
				dispatch(errorUpdateProduct(error));
			});
	};
}
function createProduct(history) {
	return function(dispatch, getState) {
		var state = getState();
		var productDraft = {
			enabled: false,
			category_id: state.productCategories.selectedId
		};
		return _api2.default.products
			.create(productDraft)
			.then(function(_ref6) {
				var status = _ref6.status,
					json = _ref6.json;
				dispatch(successCreateProduct(json.id));
				history.push('/admin/product/' + json.id);
			})
			.catch(function(error) {});
	};
}
var fixProductData = function fixProductData(product) {
	var saleFrom = (0, _moment2.default)(product.date_sale_from);
	var saleTo = (0, _moment2.default)(product.date_sale_to);
	var stockExpected = (0, _moment2.default)(product.date_stock_expected);
	product.date_sale_from = saleFrom.isValid() ? saleFrom.toDate() : null;
	product.date_sale_to = saleTo.isValid() ? saleTo.toDate() : null;
	product.date_stock_expected = stockExpected.isValid()
		? stockExpected.toDate()
		: null;
	return product;
};
function fetchProduct(id) {
	return function(dispatch, getState) {
		dispatch(requestProduct());
		return _api2.default.products
			.retrieve(id)
			.then(function(_ref7) {
				var status = _ref7.status,
					json = _ref7.json;
				var product = fixProductData(json);
				dispatch(receiveProduct(product));
			})
			.catch(function(error) {
				dispatch(receiveProductError(error));
			});
	};
}
function fetchImages(productId) {
	return function(dispatch, getState) {
		return _api2.default.products.images
			.list(productId)
			.then(function(_ref8) {
				var status = _ref8.status,
					json = _ref8.json;
				dispatch(receiveImages(json));
			})
			.catch(function(error) {});
	};
}
function fetchOptions(productId) {
	return function(dispatch, getState) {
		return _api2.default.products.options
			.list(productId)
			.then(function(_ref9) {
				var status = _ref9.status,
					json = _ref9.json;
				dispatch(receiveOptions(json));
			})
			.catch(function(error) {});
	};
}
function fetchVariants(productId) {
	return function(dispatch, getState) {
		return _api2.default.products.variants
			.list(productId)
			.then(function(_ref10) {
				var status = _ref10.status,
					json = _ref10.json;
				dispatch(receiveVariants(json));
			})
			.catch(function(error) {});
	};
}
function createVariant(productId) {
	return function(dispatch, getState) {
		var state = getState();
		var _state$products$editP = state.products.editProduct,
			regular_price = _state$products$editP.regular_price,
			stock_quantity = _state$products$editP.stock_quantity,
			weight = _state$products$editP.weight;
		var variant = {
			price: regular_price,
			stock_quantity: stock_quantity,
			weight: weight
		};
		return _api2.default.products.variants
			.create(productId, variant)
			.then(function(_ref11) {
				var status = _ref11.status,
					json = _ref11.json;
				dispatch(receiveVariants(json));
			})
			.catch(function(error) {});
	};
}
function updateVariant(productId, variantId, variant) {
	return function(dispatch, getState) {
		return _api2.default.products.variants
			.update(productId, variantId, variant)
			.then(function(_ref12) {
				var status = _ref12.status,
					json = _ref12.json;
				dispatch(receiveVariants(json));
			})
			.catch(function(error) {});
	};
}
function setVariantOption(productId, variantId, optionId, valueId) {
	return function(dispatch, getState) {
		var option = { option_id: optionId, value_id: valueId };
		return _api2.default.products.variants
			.setOption(productId, variantId, option)
			.then(function(_ref13) {
				var status = _ref13.status,
					json = _ref13.json;
				dispatch(receiveVariants(json));
			})
			.catch(function(error) {});
	};
}
function createOptionValue(productId, optionId, valueName) {
	return function(dispatch, getState) {
		return _api2.default.products.options.values
			.create(productId, optionId, { name: valueName })
			.then(function(_ref14) {
				var status = _ref14.status,
					json = _ref14.json;
				dispatch(fetchOptions(productId));
			})
			.catch(function(error) {});
	};
}
function createOption(productId, option) {
	return function(dispatch, getState) {
		return _api2.default.products.options
			.create(productId, option)
			.then(function(_ref15) {
				var status = _ref15.status,
					json = _ref15.json;
				dispatch(receiveOptions(json));
			})
			.catch(function(error) {});
	};
}
function updateOptionValue(productId, optionId, valueId, valueName) {
	return function(dispatch, getState) {
		return _api2.default.products.options.values
			.update(productId, optionId, valueId, { name: valueName })
			.then(function(_ref16) {
				var status = _ref16.status,
					json = _ref16.json;
				dispatch(fetchOptions(productId));
			})
			.catch(function(error) {});
	};
}
function updateOption(productId, optionId, option) {
	return function(dispatch, getState) {
		return _api2.default.products.options
			.update(productId, optionId, option)
			.then(function(_ref17) {
				var status = _ref17.status,
					json = _ref17.json;
				dispatch(receiveOptions(json));
			})
			.catch(function(error) {});
	};
}
function deleteOptionValue(productId, optionId, valueId) {
	return function(dispatch, getState) {
		return _api2.default.products.options.values
			.delete(productId, optionId, valueId)
			.then(function(_ref18) {
				var status = _ref18.status,
					json = _ref18.json;
				dispatch(fetchOptions(productId));
			})
			.catch(function(error) {});
	};
}
function deleteOption(productId, optionId) {
	return function(dispatch, getState) {
		return _api2.default.products.options
			.delete(productId, optionId)
			.then(function(_ref19) {
				var status = _ref19.status,
					json = _ref19.json;
				dispatch(receiveOptions(json));
			})
			.catch(function(error) {});
	};
}
function deleteVariant(productId, variantId) {
	return function(dispatch, getState) {
		return _api2.default.products.variants
			.delete(productId, variantId)
			.then(function(_ref20) {
				var status = _ref20.status,
					json = _ref20.json;
				dispatch(receiveVariants(json));
			})
			.catch(function(error) {});
	};
}
function deleteImage(productId, imageId) {
	return function(dispatch, getState) {
		return _api2.default.products.images
			.delete(productId, imageId)
			.then(function(_ref21) {
				var status = _ref21.status,
					json = _ref21.json;
				dispatch(fetchImages(productId));
			})
			.catch(function(error) {});
	};
}
function updateImage(productId, image) {
	return function(dispatch, getState) {
		return _api2.default.products.images
			.update(productId, image.id, image)
			.then(function() {
				dispatch(fetchImages(productId));
			})
			.catch(function(error) {});
	};
}
function updateImages(productId, images) {
	return function(dispatch, getState) {
		var promises = images.map(function(image) {
			return _api2.default.products.images.update(productId, image.id, image);
		});
		return Promise.all(promises)
			.then(function() {
				dispatch(fetchImages(productId));
			})
			.catch(function(error) {});
	};
}
function uploadImages(productId, form) {
	return function(dispatch, getState) {
		dispatch(imagesUploadStart());
		return _api2.default.products.images
			.upload(productId, form)
			.then(function() {
				dispatch(imagesUploadEnd());
				dispatch(fetchImages(productId));
			})
			.catch(function(error) {
				dispatch(imagesUploadEnd());
			});
	};
}
