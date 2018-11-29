'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _scope;
var _jsonwebtoken = require('jsonwebtoken');
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _expressJwt = require('express-jwt');
var _expressJwt2 = _interopRequireDefault(_expressJwt);
var _settings = require('./settings');
var _settings2 = _interopRequireDefault(_settings);
var _tokens = require('../services/security/tokens');
var _tokens2 = _interopRequireDefault(_tokens);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

var DEVELOPER_MODE = _settings2.default.developerMode === true;
var SET_TOKEN_AS_REVOKEN_ON_EXCEPTION = true;

var PATHS_WITH_OPEN_ACCESS = [
	'/api/v1/authorize',
	/\/api\/v1\/notifications/i,
	/\/ajax\//i
];

var scope = ((_scope = {
	ADMIN: 'admin',
	DASHBOARD: 'dashboard',
	READ_PRODUCTS: 'read:products',
	WRITE_PRODUCTS: 'write:products',
	READ_PRODUCT_CATEGORIES: 'read:product_categories',
	WRITE_PRODUCT_CATEGORIES: 'write:product_categories',
	READ_ORDERS: 'read:orders',
	WRITE_ORDERS: 'write:orders',
	READ_CUSTOMERS: 'read:customers',
	WRITE_CUSTOMERS: 'write:customers',
	READ_CUSTOMER_GROUPS: 'read:customer_groups',
	WRITE_CUSTOMER_GROUPS: 'write:customer_groups',
	READ_PAGES: 'read:pages',
	WRITE_PAGES: 'write:pages',
	READ_MARKS: 'read:marks'
}),
_defineProperty(_scope, 'READ_MARKS', 'write:marks'),
_defineProperty(_scope, 'READ_MODELS', 'read:models'),
_defineProperty(_scope, 'READ_MODELS', 'write:models'),
_defineProperty(_scope, 'READ_YEARS', 'read:years'),
_defineProperty(_scope, 'READ_YEARS', 'write:years'),
_defineProperty(_scope, 'READ_ENGINES', 'read:engines'),
_defineProperty(_scope, 'READ_ENGINES', 'write:engines'),
_defineProperty(_scope, 'READ_FUELS', 'read:fuels'),
_defineProperty(_scope, 'READ_FUELS', 'write:fuels'),
_defineProperty(_scope, 'READ_PCATEGORIES', 'read:pcategories'),
_defineProperty(_scope, 'READ_PCATEGORIES', 'write:pcategories'),
_defineProperty(_scope, 'READ_ORDER_STATUSES', 'read:order_statuses'),
_defineProperty(_scope, 'WRITE_ORDER_STATUSES', 'write:order_statuses'),
_defineProperty(_scope, 'READ_THEME', 'read:theme'),
_defineProperty(_scope, 'WRITE_THEME', 'write:theme'),
_defineProperty(_scope, 'READ_SITEMAP', 'read:sitemap'),
_defineProperty(_scope, 'READ_SHIPPING_METHODS', 'read:shipping_methods'),
_defineProperty(_scope, 'WRITE_SHIPPING_METHODS', 'write:shipping_methods'),
_defineProperty(_scope, 'READ_PAYMENT_METHODS', 'read:payment_methods'),
_defineProperty(_scope, 'WRITE_PAYMENT_METHODS', 'write:payment_methods'),
_defineProperty(_scope, 'READ_SETTINGS', 'read:settings'),
_defineProperty(_scope, 'WRITE_SETTINGS', 'write:settings'),
_defineProperty(_scope, 'READ_FILES', 'read:files'),
_defineProperty(_scope, 'WRITE_FILES', 'write:files'),
_defineProperty(_scope, 'READ_IMPORTER', 'read:importer'),
_defineProperty(_scope, 'READ_IMPORTER', 'write:importer'),
_scope);

var checkUserScope = function checkUserScope(requiredScope, req, res, next) {
	if (DEVELOPER_MODE === true) {
		next();
	} else if (
		req.user &&
		req.user.scopes &&
		req.user.scopes.length > 0 &&
		(req.user.scopes.includes(scope.ADMIN) ||
			req.user.scopes.includes(requiredScope))
	) {
		next();
	} else {
		res.status(403).send({ error: true, message: 'Forbidden' });
	}
};

var verifyToken = function verifyToken(token) {
	return new Promise(function(resolve, reject) {
		_jsonwebtoken2.default.verify(
			token,
			_settings2.default.jwtSecretKey,
			function(err, decoded) {
				if (err) {
					reject(err);
				} else {
					// check on blacklist
					resolve(decoded);
				}
			}
		);
	});
};

var checkTokenInBlacklistCallback = async function checkTokenInBlacklistCallback(
	req,
	payload,
	done
) {
	try {
		var jti = payload.jti;
		var blacklist = await _tokens2.default.getTokensBlacklist();
		var tokenIsRevoked = blacklist.includes(jti);
		return done(null, tokenIsRevoked);
	} catch (e) {
		done(e, SET_TOKEN_AS_REVOKEN_ON_EXCEPTION);
	}
};

var applyMiddleware = function applyMiddleware(app) {
	if (DEVELOPER_MODE === false) {
		app.use(
			(0, _expressJwt2.default)({
				secret: _settings2.default.jwtSecretKey,
				isRevoked: checkTokenInBlacklistCallback
			}).unless({ path: PATHS_WITH_OPEN_ACCESS })
		);
	}
};

var getAccessControlAllowOrigin = function getAccessControlAllowOrigin() {
	return _settings2.default.storeBaseUrl || '*';
};
exports.default = {
	checkUserScope: checkUserScope,
	scope: scope,
	verifyToken: verifyToken,
	applyMiddleware: applyMiddleware,
	getAccessControlAllowOrigin: getAccessControlAllowOrigin,
	DEVELOPER_MODE: DEVELOPER_MODE
};
