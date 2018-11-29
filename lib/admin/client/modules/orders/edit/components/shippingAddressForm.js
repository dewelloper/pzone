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
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');

var _form = require('modules/shared/form');
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
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
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === 'object' || typeof call === 'function')
		? call
		: self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function, not ' +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}

var validate = function validate(values) {
	var errors = {};
	var requiredFields = [];

	requiredFields.map(function(field) {
		if (values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	return errors;
};

var getShippingFieldLabel = function getShippingFieldLabel(_ref) {
	var label = _ref.label,
		key = _ref.key;
	return label && label.length > 0
		? label
		: helper.getOrderFieldLabelByKey(key);
};
var ShippingAddressForm = (function(_React$Component) {
	_inherits(ShippingAddressForm, _React$Component);
	function ShippingAddressForm(props) {
		_classCallCheck(this, ShippingAddressForm);
		return _possibleConstructorReturn(
			this,
			(
				ShippingAddressForm.__proto__ ||
				Object.getPrototypeOf(ShippingAddressForm)
			).call(this, props)
		);
	}
	_createClass(ShippingAddressForm, [
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					handleSubmit = _props.handleSubmit,
					pristine = _props.pristine,
					submitting = _props.submitting,
					initialValues = _props.initialValues,
					onCancel = _props.onCancel,
					shippingMethod = _props.shippingMethod;

				var shippingFields = null;
				if (
					shippingMethod &&
					shippingMethod.fields &&
					shippingMethod.fields.length > 0
				) {
					shippingFields = shippingMethod.fields.map(function(field, index) {
						var fieldLabel = getShippingFieldLabel(field);

						return _react2.default.createElement(_reduxForm.Field, {
							key: index,
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: field.key,
							floatingLabelText: fieldLabel
						});
					});
				}

				return _react2.default.createElement(
					'form',
					{ onSubmit: handleSubmit },
					_react2.default.createElement(
						'div',
						null,
						shippingFields,
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: 'city',
							floatingLabelText: _text2.default.city
						}),

						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'state',
									floatingLabelText: _text2.default.state
								})
							),

							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'postal_code',
									floatingLabelText: _text2.default.postal_code
								})
							)
						),

						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: 'country',
							floatingLabelText: _text2.default.country
						})
					),

					_react2.default.createElement(
						'div',
						{ className: _style2.default.shippingButtons },
						_react2.default.createElement(_FlatButton2.default, {
							label: _text2.default.cancel,
							onClick: onCancel
						}),
						_react2.default.createElement(_FlatButton2.default, {
							label: _text2.default.save,
							primary: true,
							type: 'submit',
							style: { marginLeft: 12 },
							disabled: pristine || submitting
						})
					)
				);
			}
		}
	]);
	return ShippingAddressForm;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ShippingAddressForm',
	validate: validate,
	enableReinitialize: true
})(ShippingAddressForm);
