'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _jsonwebtoken = require('jsonwebtoken');
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _pzClient = require('pz-client');
var _pzClient2 = _interopRequireDefault(_pzClient);
var _settings = require('./lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
var ajaxRouter = _express2.default.Router();

var TOKEN_PAYLOAD = { email: 'store', scopes: ['admin'] };
var STORE_ACCESS_TOKEN = _jsonwebtoken2.default.sign(
	TOKEN_PAYLOAD,
	_settings2.default.jwtSecretKey
);

var api = new _pzClient2.default({
	apiBaseUrl: _settings2.default.apiBaseUrl,
	apiToken: STORE_ACCESS_TOKEN
});

var DEFAULT_CACHE_CONTROL = 'public, max-age=60';
var PRODUCTS_CACHE_CONTROL = 'public, max-age=60';
var PRODUCT_DETAILS_CACHE_CONTROL = 'public, max-age=60';

var getCartCookieOptions = function getCartCookieOptions(isHttps) {
	return {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
		httpOnly: true,
		signed: true,
		secure: isHttps,
		sameSite: 'strict'
	};
};

var getIP = function getIP(req) {
	var ip = req.get('x-forwarded-for') || req.ip;

	if (ip && ip.includes(', ')) {
		ip = ip.split(', ')[0];
	}

	if (ip && ip.includes('::ffff:')) {
		ip = ip.replace('::ffff:', '');
	}

	return ip;
};

var getUserAgent = function getUserAgent(req) {
	return req.get('user-agent');
};

var getVariantFromProduct = function getVariantFromProduct(product, variantId) {
	if (product.variants && product.variants.length > 0) {
		return product.variants.find(function(variant) {
			return variant.id.toString() === variantId.toString();
		});
	} else {
		return null;
	}
};

var fillCartItemWithProductData = function fillCartItemWithProductData(
	products,
	cartItem
) {
	var product = products.find(function(p) {
		return p.id === cartItem.product_id;
	});
	if (product) {
		cartItem.image_url =
			product.images && product.images.length > 0
				? product.images[0].url
				: null;
		cartItem.path = product.path;
		cartItem.stock_backorder = product.stock_backorder;
		cartItem.stock_preorder = product.stock_preorder;
		if (cartItem.variant_id && cartItem.variant_id.length > 0) {
			var variant = getVariantFromProduct(product, cartItem.variant_id);
			cartItem.stock_quantity = variant ? variant.stock_quantity : 0;
		} else {
			cartItem.stock_quantity = product.stock_quantity;
		}
	}
	return cartItem;
};

var fillCartItems = function fillCartItems(cartResponse) {
	var cart = cartResponse.json;
	if (cart && cart.items && cart.items.length > 0) {
		var productIds = cart.items.map(function(item) {
			return item.product_id;
		});
		return api.products
			.list({
				ids: productIds,
				fields:
					'images,enabled,stock_quantity,variants,path,stock_backorder,stock_preorder'
			})
			.then(function(_ref) {
				var status = _ref.status,
					json = _ref.json;
				var newCartItem = cart.items.map(function(cartItem) {
					return fillCartItemWithProductData(json.data, cartItem);
				});

				cartResponse.json.items = newCartItem;
				return cartResponse;
			});
	} else {
		return Promise.resolve(cartResponse);
	}
};

ajaxRouter.get('/products', function(req, res, next) {
	var filter = req.query;
	filter.enabled = true;
	api.products.list(filter).then(function(_ref2) {
		var status = _ref2.status,
			json = _ref2.json;
		res
			.status(status)
			.header('Cache-Control', PRODUCTS_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/products/:id', function(req, res, next) {
	api.products.retrieve(req.params.id).then(function(_ref3) {
		var status = _ref3.status,
			json = _ref3.json;
		res
			.status(status)
			.header('Cache-Control', PRODUCT_DETAILS_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/cart', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		api.orders
			.retrieve(order_id)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				json.browser = undefined;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.post('/cart/items', function(req, res, next) {
	var isHttps = req.protocol === 'https';
	var CART_COOKIE_OPTIONS = getCartCookieOptions(isHttps);

	var order_id = req.signedCookies.order_id;
	var item = req.body;
	if (order_id) {
		api.orders.items
			.create(order_id, item)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				res.status(status).send(json);
			});
	} else {
		var orderDraft = {
			draft: true,
			referrer_url: req.signedCookies.referrer_url,
			landing_url: req.signedCookies.landing_url,
			browser: {
				ip: getIP(req),
				user_agent: getUserAgent(req)
			},

			shipping_address: {}
		};

		api.settings
			.retrieve()
			.then(function(settingsResponse) {
				var storeSettings = settingsResponse.json;
				orderDraft.shipping_address.country =
					storeSettings.default_shipping_country;
				orderDraft.shipping_address.state =
					storeSettings.default_shipping_state;
				orderDraft.shipping_address.city = storeSettings.default_shipping_city;
				return orderDraft;
			})
			.then(function(orderDraft) {
				api.orders.create(orderDraft).then(function(orderResponse) {
					var orderId = orderResponse.json.id;
					res.cookie('order_id', orderId, CART_COOKIE_OPTIONS);
					api.orders.items
						.create(orderId, item)
						.then(function(cartResponse) {
							return fillCartItems(cartResponse);
						})
						.then(function(_ref6) {
							var status = _ref6.status,
								json = _ref6.json;
							res.status(status).send(json);
						});
				});
			});
	}
});

ajaxRouter.delete('/cart/items/:item_id', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	var item_id = req.params.item_id;
	if (order_id && item_id) {
		api.orders.items
			.delete(order_id, item_id)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref7) {
				var status = _ref7.status,
					json = _ref7.json;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.put('/cart/items/:item_id', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	var item_id = req.params.item_id;
	var item = req.body;
	if (order_id && item_id) {
		api.orders.items
			.update(order_id, item_id, item)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref8) {
				var status = _ref8.status,
					json = _ref8.json;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.put('/cart/checkout', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		api.orders
			.checkout(order_id)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref9) {
				var status = _ref9.status,
					json = _ref9.json;
				res.clearCookie('order_id');
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.put('/cart', async function(req, res, next) {
	var cartData = req.body;
	var shippingAddress = cartData.shipping_address,
		billingAddress = cartData.billing_address;
	var orderId = req.signedCookies.order_id;
	if (orderId) {
		if (shippingAddress) {
			await api.orders.updateShippingAddress(orderId, shippingAddress);
		}
		if (billingAddress) {
			await api.orders.updateBillingAddress(orderId, billingAddress);
		}

		await api.orders
			.update(orderId, cartData)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref10) {
				var status = _ref10.status,
					json = _ref10.json;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.put('/cart/shipping_address', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		api.orders
			.updateShippingAddress(order_id, req.body)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref11) {
				var status = _ref11.status,
					json = _ref11.json;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.put('/cart/billing_address', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		api.orders
			.updateBillingAddress(order_id, req.body)
			.then(function(cartResponse) {
				return fillCartItems(cartResponse);
			})
			.then(function(_ref12) {
				var status = _ref12.status,
					json = _ref12.json;
				res.status(status).send(json);
			});
	} else {
		res.end();
	}
});

ajaxRouter.post('/cart/charge', async function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		var client = api.orders.client;
		var chargeResponse = await client.post('/orders/' + order_id + '/charge');
		res.status(chargeResponse.status).send(chargeResponse.json);
	} else {
		res.end();
	}
});

ajaxRouter.get('/pages', function(req, res, next) {
	api.pages.list(req.query).then(function(_ref13) {
		var status = _ref13.status,
			json = _ref13.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/pages/:id', function(req, res, next) {
	api.pages.retrieve(req.params.id).then(function(_ref14) {
		var status = _ref14.status,
			json = _ref14.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/marks', function(req, res, next) {
	api.marks.list(req.query).then(function(_ref15) {
		var status = _ref15.status,
			json = _ref15.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/marks/:id', function(req, res, next) {
	api.marks.retrieve(req.params.id).then(function(_ref16) {
		var status = _ref16.status,
			json = _ref16.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/models', function(req, res, next) {
	api.models.list(req.query).then(function(_ref17) {
		var status = _ref17.status,
			json = _ref17.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/years', function(req, res, next) {
	api.years.list(req.query).then(function(_ref18) {
		var status = _ref18.status,
			json = _ref18.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/engines', function(req, res, next) {
	api.engines.list(req.query).then(function(_ref19) {
		var status = _ref19.status,
			json = _ref19.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/fuels', function(req, res, next) {
	api.fuels.list(req.query).then(function(_ref20) {
		var status = _ref20.status,
			json = _ref20.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/pcategories', function(req, res, next) {
	api.pcategories.list(req.query).then(function(_ref21) {
		var status = _ref21.status,
			json = _ref21.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/xmlimporter', function(req, res, next) {
	api.xmlimporter.retrieve(req.query).then(function(_ref22) {
		var status = _ref22.status,
			json = _ref22.json;
		res
			.status(status)
			.header('Cache-Control', DEFAULT_CACHE_CONTROL)
			.send(json);
	});
});

ajaxRouter.get('/test', function(req, res, next) {
	res.send("{insane:'insan'}");
});

ajaxRouter.get('/sitemap', async function(req, res, next) {
	var result = null;
	var filter = req.query;
	filter.enabled = true;

	var sitemapResponse = await api.sitemap.retrieve(req.query);
	if (sitemapResponse.status !== 404 || sitemapResponse.json) {
		result = sitemapResponse.json;

		if (result.type === 'product') {
			var productResponse = await api.products.retrieve(result.resource);
			result.data = productResponse.json;
		} else if (result.type === 'page') {
			var pageResponse = await api.pages.retrieve(result.resource);
			result.data = pageResponse.json;
		}
	}

	res
		.status(sitemapResponse.status)
		.header('Cache-Control', DEFAULT_CACHE_CONTROL)
		.send(result);
});

ajaxRouter.get('/payment_methods', function(req, res, next) {
	var filter = {
		enabled: true,
		order_id: req.signedCookies.order_id
	};

	api.paymentMethods.list(filter).then(function(_ref23) {
		var status = _ref23.status,
			json = _ref23.json;
		var methods = json.map(function(item) {
			delete item.conditions;
			return item;
		});

		res.status(status).send(methods);
	});
});

ajaxRouter.get('/shipping_methods', function(req, res, next) {
	var filter = {
		enabled: true,
		order_id: req.signedCookies.order_id
	};

	api.shippingMethods.list(filter).then(function(_ref24) {
		var status = _ref24.status,
			json = _ref24.json;
		res.status(status).send(json);
	});
});

ajaxRouter.get('/payment_form_settings', function(req, res, next) {
	var order_id = req.signedCookies.order_id;
	if (order_id) {
		api.orders.getPaymentFormSettings(order_id).then(function(_ref25) {
			var status = _ref25.status,
				json = _ref25.json;
			res.status(status).send(json);
		});
	} else {
		res.end();
	}
});
exports.default = ajaxRouter;
