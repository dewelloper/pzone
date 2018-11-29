'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');

var _form = require('modules/shared/form');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _Checkbox = require('material-ui/Checkbox');
var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var GatewaySettings = function GatewaySettings(_ref) {
	var gateway = _ref.gateway;
	switch (gateway) {
		case 'paypal-checkout':
			return _react2.default.createElement(PayPalButton, null);
		case 'liqpay':
			return _react2.default.createElement(LiqPay, null);
		case 'stripe-elements':
			return _react2.default.createElement(StripeElements, null);
		default:
			return null;
	}
};
exports.default = GatewaySettings;

var PayPalButton = function PayPalButton(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'env',
				floatingLabelText: 'Environment',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'production',
				primaryText: 'production'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'sandbox',
				primaryText: 'sandbox'
			})
		),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'client',
			floatingLabelText: 'Client ID',
			fullWidth: true
		}),

		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'size',
				floatingLabelText: 'Button size',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'small',
				primaryText: 'small'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'medium',
				primaryText: 'medium'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'large',
				primaryText: 'large'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'responsive',
				primaryText: 'responsive'
			})
		),

		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'shape',
				floatingLabelText: 'Button shape',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'pill',
				primaryText: 'pill'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'rect',
				primaryText: 'rect'
			})
		),

		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'color',
				floatingLabelText: 'Button color',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'gold',
				primaryText: 'gold'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'blue',
				primaryText: 'blue'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'silver',
				primaryText: 'silver'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'black',
				primaryText: 'black'
			})
		),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'notify_url',
			floatingLabelText: 'Notify URL',
			hintText: 'https://<domain>/api/v1/notifications/paypal-checkout',
			fullWidth: true
		})
	);
};

var LiqPay = function LiqPay(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'public_key',
			floatingLabelText: 'Public Key',
			fullWidth: true
		}),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'private_key',
			floatingLabelText: 'Private Key',
			fullWidth: true
		}),

		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'language',
				floatingLabelText: 'Language',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'ru',
				primaryText: 'Russian'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'uk',
				primaryText: 'Ukrainian'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'en',
				primaryText: 'English'
			})
		),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'server_url',
			floatingLabelText: 'Server URL',
			hintText: 'https://<domain>/api/v1/notifications/liqpay',
			fullWidth: true
		})
	);
};

var StripeElements = function StripeElements(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: 'env',
				floatingLabelText: 'Environment',
				fullWidth: true,
				autoWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'production',
				primaryText: 'production'
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'sandbox',
				primaryText: 'sandbox'
			})
		),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'public_key',
			floatingLabelText: 'Publishable key',
			fullWidth: true
		}),

		_react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			name: 'secret_key',
			floatingLabelText: 'Secret key',
			fullWidth: true
		})
	);
};
