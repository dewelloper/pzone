'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isCurrentTokenValid = exports.checkTokenFromUrl = exports.validateCurrentToken = undefined;
var _text = require('./text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var LOGIN_PATH = '/admin/apps/login';
var HOME_PATH = '/admin/apps';

var getParameterByName = function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

var validateCurrentToken = (exports.validateCurrentToken = function validateCurrentToken() {
	if (location.pathname !== LOGIN_PATH) {
		if (!isCurrentTokenValid()) {
			location.replace(LOGIN_PATH);
		}
	}
});

var checkTokenFromUrl = (exports.checkTokenFromUrl = function checkTokenFromUrl() {
	if (location.pathname === LOGIN_PATH) {
		var token = getParameterByName('webstoretoken');
		if (token && token !== '') {
			var tokenData = parseJWT(token);

			if (tokenData) {
				var expiration_date = tokenData.exp * 1000;
				if (expiration_date > Date.now()) {
					saveToken({
						token: token,
						email: tokenData.email,
						expiration_date: expiration_date
					});
					location.replace(HOME_PATH);
				} else {
					alert(_text2.default.tokenExpired);
				}
			} else {
				alert(_text2.default.tokenInvalid);
			}
		} else {
			if (isCurrentTokenValid()) {
				location.replace(HOME_PATH);
			}
		}
	}
});

var parseJWT = function parseJWT(jwt) {
	try {
		var payload = jwt.split('.')[1];
		var tokenData = JSON.parse(atob(payload));
		return tokenData;
	} catch (e) {
		return null;
	}
};

var saveToken = function saveToken(data) {
	localStorage.setItem('webstore_token', data.token);
	localStorage.setItem('webstore_email', data.email);
	localStorage.setItem('webstore_exp', data.expiration_date);
};

var isCurrentTokenValid = (exports.isCurrentTokenValid = function isCurrentTokenValid() {
	var expiration_date = localStorage.getItem('webstore_exp');
	return (
		localStorage.getItem('webstore_token') &&
		expiration_date &&
		expiration_date > Date.now()
	);
});
