'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _googleAnalytics = require('./google-analytics');
var GoogleAnalyticsApp = _interopRequireWildcard(_googleAnalytics);
var _siteVerification = require('./site-verification');
var SiteVerificationApp = _interopRequireWildcard(_siteVerification);
var _jivosite = require('./jivosite');
var JivositeApp = _interopRequireWildcard(_jivosite);
var _facebookSdk = require('./facebook-sdk');
var FacebookSDKApp = _interopRequireWildcard(_facebookSdk);
var _facebookCustomerChat = require('./facebook-customer-chat');
var FacebookCustomerChatApp = _interopRequireWildcard(_facebookCustomerChat);
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
exports.default = [
	GoogleAnalyticsApp,
	SiteVerificationApp,
	JivositeApp,
	FacebookSDKApp,
	FacebookCustomerChatApp
];
