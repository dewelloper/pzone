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
exports.exportRequest = exportRequest;
exports.exportReceive = exportReceive;
exports.installRequest = installRequest;
exports.installReceive = installReceive;
exports.receiveShippingMethod = receiveShippingMethod;
exports.receivePaymentMethod = receivePaymentMethod;
exports.receiveToken = receiveToken;
exports.receiveNewToken = receiveNewToken;
exports.receiveThemeSettings = receiveThemeSettings;
exports.receiveThemeSettingsSchema = receiveThemeSettingsSchema;
exports.receiveWebhook = receiveWebhook;
exports.fetchSettings = fetchSettings;
exports.fetchEmailSettings = fetchEmailSettings;
exports.deleteLogo = deleteLogo;
exports.updateSettings = updateSettings;
exports.updateEmailSettings = updateEmailSettings;
exports.fetchEmailTemplate = fetchEmailTemplate;
exports.updateEmailTemplate = updateEmailTemplate;
exports.fetchCheckoutFields = fetchCheckoutFields;
exports.fetchCheckoutField = fetchCheckoutField;
exports.updateCheckoutField = updateCheckoutField;
exports.fetchShippingMethods = fetchShippingMethods;
exports.fetchPaymentMethods = fetchPaymentMethods;
exports.updateShippingMethod = updateShippingMethod;
exports.updatePaymentMethod = updatePaymentMethod;
exports.fetchShippingMethod = fetchShippingMethod;
exports.fetchPaymentMethod = fetchPaymentMethod;
exports.deleteShippingMethod = deleteShippingMethod;
exports.deletePaymentMethod = deletePaymentMethod;
exports.createShippingMethod = createShippingMethod;
exports.createPaymentMethod = createPaymentMethod;
exports.fetchTokens = fetchTokens;
exports.fetchToken = fetchToken;
exports.createToken = createToken;
exports.updateToken = updateToken;
exports.deleteToken = deleteToken;
exports.fetchPaymentGateway = fetchPaymentGateway;
exports.updatePaymentGateway = updatePaymentGateway;
exports.uploadLogo = uploadLogo;
exports.fetchThemeSettings = fetchThemeSettings;
exports.updateThemeSettings = updateThemeSettings;
exports.fetchWebhooks = fetchWebhooks;
exports.fetchWebhook = fetchWebhook;
exports.createWebhook = createWebhook;
exports.updateWebhook = updateWebhook;
exports.deleteWebhook = deleteWebhook;
var _actionTypes = require('./actionTypes');
var t = _interopRequireWildcard(_actionTypes);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
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
function exportRequest() {
	return { type: t.THEME_EXPORT_REQUEST };
}
function exportReceive() {
	return { type: t.THEME_EXPORT_RECEIVE };
}
function installRequest() {
	return { type: t.THEME_INSTALL_REQUEST };
}
function installReceive() {
	return { type: t.THEME_INSTALL_RECEIVE };
}
function receiveSettings(settings) {
	return { type: t.SETTINGS_RECEIVE, settings: settings };
}
function receiveEmailSettings(emailSettings) {
	return { type: t.EMAIL_SETTINGS_RECEIVE, emailSettings: emailSettings };
}
function receiveEmailTemplate(emailTemplate) {
	return { type: t.EMAIL_TEMPLATE_RECEIVE, emailTemplate: emailTemplate };
}
function requestEmailTemplate() {
	return { type: t.EMAIL_TEMPLATE_REQUEST };
}
function receiveCheckoutFields(checkoutFields) {
	return { type: t.CHECKOUT_FIELDS_RECEIVE, checkoutFields: checkoutFields };
}
function receiveCheckoutField(checkoutField) {
	return { type: t.CHECKOUT_FIELD_RECEIVE, checkoutField: checkoutField };
}
function requestCheckoutField() {
	return { type: t.CHECKOUT_FIELD_REQUEST };
}
function receiveShippingMethods(shippingMethods) {
	return { type: t.SHIPPING_METHODS_RECEIVE, shippingMethods: shippingMethods };
}
function receivePaymentMethods(paymentMethods) {
	return { type: t.PAYMENT_METHODS_RECEIVE, paymentMethods: paymentMethods };
}
function receivePaymentGateway(paymentGatewayEdit) {
	return {
		type: t.PAYMENT_GATEWAY_RECEIVE,
		paymentGatewayEdit: paymentGatewayEdit
	};
}
function receiveShippingMethod(shippingMethodEdit) {
	return {
		type: t.SHIPPING_METHOD_RECEIVE,
		shippingMethodEdit: shippingMethodEdit
	};
}
function receivePaymentMethod(paymentMethodEdit) {
	return {
		type: t.PAYMENT_METHOD_RECEIVE,
		paymentMethodEdit: paymentMethodEdit
	};
}
function receiveTokens(tokens) {
	return { type: t.TOKENS_RECEIVE, tokens: tokens };
}
function receiveToken(tokenEdit) {
	return { type: t.TOKEN_RECEIVE, tokenEdit: tokenEdit };
}
function receiveNewToken(newToken) {
	return { type: t.NEW_TOKEN_RECEIVE, newToken: newToken };
}
function receiveThemeSettings(settings) {
	return { type: t.THEME_SETTINGS_RECEIVE, settings: settings };
}
function receiveThemeSettingsSchema(schema) {
	return { type: t.THEME_SETTINGS_SCHEMA_RECEIVE, schema: schema };
}
function receiveWebhooks(webhooks) {
	return { type: t.WEBHOOKS_RECEIVE, webhooks: webhooks };
}
function receiveWebhook(webhookEdit) {
	return { type: t.WEBHOOK_RECEIVE, webhookEdit: webhookEdit };
}
function fetchSettings() {
	return function(dispatch, getState) {
		// API can be not init on app start
		if (_api2.default) {
			return _api2.default.settings
				.retrieve()
				.then(function(_ref) {
					var status = _ref.status,
						json = _ref.json;
					dispatch(receiveSettings(json));
				})
				.catch(function(error) {});
		}
	};
}
function fetchEmailSettings() {
	return function(dispatch, getState) {
		return _api2.default.settings
			.retrieveEmailSettings()
			.then(function(_ref2) {
				var status = _ref2.status,
					json = _ref2.json;
				dispatch(receiveEmailSettings(json));
			})
			.catch(function(error) {});
	};
}
function deleteLogo() {
	return function(dispatch, getState) {
		return _api2.default.settings
			.deleteLogo()
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				if (status === 200) {
					dispatch(fetchSettings());
				} else {
					throw status;
				}
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function updateSettings(settings) {
	return function(dispatch, getState) {
		delete settings.logo_file;
		return _api2.default.settings
			.update(settings)
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				dispatch(receiveSettings(json));
			})
			.catch(function(error) {});
	};
}
function updateEmailSettings(emailSettings) {
	return function(dispatch, getState) {
		return _api2.default.settings
			.updateEmailSettings(emailSettings)
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				dispatch(receiveEmailSettings(json));
			})
			.catch(function(error) {});
	};
}
function fetchEmailTemplate(templateName) {
	return function(dispatch, getState) {
		dispatch(requestEmailTemplate());
		return _api2.default.settings
			.retrieveEmailTemplate(templateName)
			.then(function(_ref6) {
				var status = _ref6.status,
					json = _ref6.json;
				json.templateName = templateName;
				dispatch(receiveEmailTemplate(json));
			})
			.catch(function(error) {});
	};
}
function updateEmailTemplate(emailTemplate) {
	return function(dispatch, getState) {
		return _api2.default.settings
			.updateEmailTemplate(emailTemplate.templateName, emailTemplate)
			.then(function(_ref7) {
				var status = _ref7.status,
					json = _ref7.json;
				json.templateName = templateName;
				dispatch(receiveEmailTemplate(json));
			})
			.catch(function(error) {});
	};
}
function fetchCheckoutFields() {
	return function(dispatch, getState) {
		return _api2.default.checkoutFields
			.list()
			.then(function(_ref8) {
				var status = _ref8.status,
					json = _ref8.json;
				dispatch(receiveCheckoutFields(json));
			})
			.catch(function(error) {});
	};
}
function fetchCheckoutField(fieldName) {
	return function(dispatch, getState) {
		dispatch(requestCheckoutField());
		return _api2.default.checkoutFields
			.retrieve(fieldName)
			.then(function(_ref9) {
				var status = _ref9.status,
					json = _ref9.json;
				json.fieldName = fieldName;
				dispatch(receiveCheckoutField(json));
			})
			.catch(function(error) {});
	};
}
function updateCheckoutField(checkoutField) {
	return function(dispatch, getState) {
		return _api2.default.checkoutFields
			.update(checkoutField.fieldName, checkoutField)
			.then(function(_ref10) {
				var status = _ref10.status,
					json = _ref10.json;
				json.fieldName = fieldName;
				dispatch(receiveCheckoutField(json));
			})
			.catch(function(error) {});
	};
}
function fetchShippingMethods() {
	return function(dispatch, getState) {
		return _api2.default.shippingMethods
			.list()
			.then(function(_ref11) {
				var status = _ref11.status,
					json = _ref11.json;
				dispatch(receiveShippingMethods(json));
			})
			.catch(function(error) {});
	};
}
function fetchPaymentMethods() {
	return function(dispatch, getState) {
		return _api2.default.paymentMethods
			.list()
			.then(function(_ref12) {
				var status = _ref12.status,
					json = _ref12.json;
				dispatch(receivePaymentMethods(json));
			})
			.catch(function(error) {});
	};
}
function updateShippingMethod(method) {
	return function(dispatch, getState) {
		return _api2.default.shippingMethods
			.update(method.id, method)
			.then(function(_ref13) {
				var status = _ref13.status,
					json = _ref13.json;
				dispatch(fetchShippingMethods());
			})
			.catch(function(error) {});
	};
}
function updatePaymentMethod(method) {
	return function(dispatch, getState) {
		return _api2.default.paymentMethods
			.update(method.id, method)
			.then(function(_ref14) {
				var status = _ref14.status,
					json = _ref14.json;
				dispatch(fetchPaymentMethods());
			})
			.catch(function(error) {});
	};
}
function fetchShippingMethod(id) {
	return function(dispatch, getState) {
		return _api2.default.shippingMethods
			.retrieve(id)
			.then(function(_ref15) {
				var status = _ref15.status,
					json = _ref15.json;
				dispatch(receiveShippingMethod(json));
			})
			.catch(function(error) {});
	};
}
function fetchPaymentMethod(id) {
	return function(dispatch, getState) {
		return _api2.default.paymentMethods
			.retrieve(id)
			.then(function(_ref16) {
				var status = _ref16.status,
					json = _ref16.json;
				dispatch(receivePaymentMethod(json));
			})
			.catch(function(error) {});
	};
}
function deleteShippingMethod(methodId) {
	return function(dispatch, getState) {
		return _api2.default.shippingMethods
			.delete(methodId)
			.then(function(_ref17) {
				var status = _ref17.status,
					json = _ref17.json;
				dispatch(fetchShippingMethods());
			})
			.catch(function(error) {});
	};
}
function deletePaymentMethod(methodId) {
	return function(dispatch, getState) {
		return _api2.default.paymentMethods
			.delete(methodId)
			.then(function(_ref18) {
				var status = _ref18.status,
					json = _ref18.json;
				dispatch(fetchPaymentMethods());
			})
			.catch(function(error) {});
	};
}
function createShippingMethod(method) {
	return function(dispatch, getState) {
		return _api2.default.shippingMethods
			.create(method)
			.then(function(_ref19) {
				var status = _ref19.status,
					json = _ref19.json;
				dispatch(fetchShippingMethods());
			})
			.catch(function(error) {});
	};
}
function createPaymentMethod(method) {
	return function(dispatch, getState) {
		return _api2.default.paymentMethods
			.create(method)
			.then(function(_ref20) {
				var status = _ref20.status,
					json = _ref20.json;
				dispatch(fetchPaymentMethods());
			})
			.catch(function(error) {});
	};
}
function fetchTokens() {
	return function(dispatch, getState) {
		return _api2.default.tokens
			.list()
			.then(function(_ref21) {
				var status = _ref21.status,
					json = _ref21.json;
				dispatch(receiveTokens(json));
			})
			.catch(function(error) {});
	};
}
function fetchToken(id) {
	return function(dispatch, getState) {
		return _api2.default.tokens
			.retrieve(id)
			.then(function(_ref22) {
				var status = _ref22.status,
					json = _ref22.json;
				dispatch(receiveToken(json));
			})
			.catch(function(error) {});
	};
}
function createToken(token) {
	return function(dispatch, getState) {
		return _api2.default.tokens
			.create(token)
			.then(function(_ref23) {
				var status = _ref23.status,
					json = _ref23.json;
				dispatch(fetchTokens());
				dispatch(receiveNewToken(json.token));
			})
			.catch(function(error) {});
	};
}
function updateToken(token) {
	return function(dispatch, getState) {
		return _api2.default.tokens
			.update(token.id, token)
			.then(function(_ref24) {
				var status = _ref24.status,
					json = _ref24.json;
				dispatch(fetchTokens());
			})
			.catch(function(error) {});
	};
}
function deleteToken(tokenId) {
	return function(dispatch, getState) {
		return _api2.default.tokens
			.delete(tokenId)
			.then(function(_ref25) {
				var status = _ref25.status,
					json = _ref25.json;
				dispatch(fetchTokens());
			})
			.catch(function(error) {});
	};
}
function fetchPaymentGateway(gatewayName) {
	return function(dispatch, getState) {
		if (gatewayName && gatewayName.length > 0) {
			return _api2.default.paymentGateways
				.retrieve(gatewayName)
				.then(function(_ref26) {
					var status = _ref26.status,
						json = _ref26.json;
					dispatch(receivePaymentGateway(json));
				})
				.catch(function(error) {});
		} else {
			dispatch(receivePaymentGateway(null));
		}
	};
}
function updatePaymentGateway(gatewayName, data) {
	return function(dispatch, getState) {
		return _api2.default.paymentGateways
			.update(gatewayName, data)
			.then(function(_ref27) {
				var status = _ref27.status,
					json = _ref27.json;
				dispatch(receivePaymentGateway(json));
			})
			.catch(function(error) {});
	};
}
function uploadLogo(form) {
	return function(dispatch, getState) {
		return _api2.default.settings
			.uploadLogo(form)
			.then(function() {
				dispatch(fetchSettings());
			})
			.catch(function(error) {});
	};
}
function fetchThemeSettings() {
	return function(dispatch, getState) {
		return Promise.all([
			_api2.default.theme.settings.retrieve(),
			_api2.default.theme.settings.retrieveSchema()
		])
			.then(function(_ref28) {
				var _ref29 = _slicedToArray(_ref28, 2),
					settingsResponse = _ref29[0],
					schemaResponse = _ref29[1];
				dispatch(receiveThemeSettings(settingsResponse.json));
				dispatch(receiveThemeSettingsSchema(schemaResponse.json));
			})
			.catch(function(error) {});
	};
}
function updateThemeSettings(settings) {
	return function(dispatch, getState) {
		return _api2.default.theme.settings
			.update(settings)
			.then(function() {
				dispatch(fetchThemeSettings());
			})
			.catch(function(error) {});
	};
}
function fetchWebhooks() {
	return function(dispatch, getState) {
		return _api2.default.webhooks
			.list()
			.then(function(_ref30) {
				var status = _ref30.status,
					json = _ref30.json;
				dispatch(receiveWebhooks(json));
			})
			.catch(function(error) {});
	};
}
function fetchWebhook(id) {
	return function(dispatch, getState) {
		return _api2.default.webhooks
			.retrieve(id)
			.then(function(_ref31) {
				var status = _ref31.status,
					json = _ref31.json;
				dispatch(receiveWebhook(json));
			})
			.catch(function(error) {});
	};
}
function createWebhook(webhook) {
	return function(dispatch, getState) {
		return _api2.default.webhooks
			.create(webhook)
			.then(function(_ref32) {
				var status = _ref32.status,
					json = _ref32.json;
				dispatch(fetchWebhooks());
			})
			.catch(function(error) {});
	};
}
function updateWebhook(webhook) {
	return function(dispatch, getState) {
		return _api2.default.webhooks
			.update(webhook.id, webhook)
			.then(function(_ref33) {
				var status = _ref33.status,
					json = _ref33.json;
				dispatch(fetchWebhooks());
			})
			.catch(function(error) {});
	};
}
function deleteWebhook(webhookId) {
	return function(dispatch, getState) {
		return _api2.default.webhooks
			.delete(webhookId)
			.then(function(_ref34) {
				var status = _ref34.status,
					json = _ref34.json;
				dispatch(fetchWebhooks());
			})
			.catch(function(error) {});
	};
}
