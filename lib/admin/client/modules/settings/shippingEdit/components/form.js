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
var _fieldsEditor = require('./fieldsEditor');
var _fieldsEditor2 = _interopRequireDefault(_fieldsEditor);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
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
	var requiredFields = ['name'];

	requiredFields.map(function(field) {
		if (values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	return errors;
};
var EditShippingMethodForm = (function(_React$Component) {
	_inherits(EditShippingMethodForm, _React$Component);
	function EditShippingMethodForm(props) {
		_classCallCheck(this, EditShippingMethodForm);
		return _possibleConstructorReturn(
			this,
			(
				EditShippingMethodForm.__proto__ ||
				Object.getPrototypeOf(EditShippingMethodForm)
			).call(this, props)
		);
	}
	_createClass(EditShippingMethodForm, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.onLoad();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					handleSubmit = _props.handleSubmit,
					pristine = _props.pristine,
					submitting = _props.submitting,
					initialValues = _props.initialValues,
					methodId = _props.methodId,
					settings = _props.settings;
				var isAdd = methodId === null || methodId === undefined;

				return _react2.default.createElement(
					'form',
					{ onSubmit: handleSubmit },
					_react2.default.createElement(
						_Paper2.default,
						{ className: 'paper-box', zDepth: 1 },
						_react2.default.createElement(
							'div',
							{ className: _style2.default.innerBox },
							_react2.default.createElement(
								'div',
								{ className: 'row' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-4' },
									_react2.default.createElement(
										'div',
										{ className: 'blue-title' },
										_text2.default.description
									)
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-8' },
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(_reduxForm.Field, {
											component: _reduxFormMaterialUi.TextField,
											fullWidth: true,
											name: 'name',
											floatingLabelText:
												_text2.default.settings_shippingMethodName
										})
									),

									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(_reduxForm.Field, {
											component: _reduxFormMaterialUi.TextField,
											fullWidth: true,
											name: 'description',
											multiLine: true,
											floatingLabelText: _text2.default.description
										})
									),

									_react2.default.createElement(
										'div',
										{ className: 'row' },
										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _reduxFormMaterialUi.TextField,
												name: 'price',
												type: 'number',
												fullWidth: true,
												floatingLabelText:
													_text2.default.settings_shippingRate +
													(' (' + settings.currency_symbol + ')')
											})
										),

										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _form.CustomToggle,
												name: 'enabled',
												label: _text2.default.enabled,
												style: { paddingTop: 16, paddingBottom: 20 }
											}),

											_react2.default.createElement(_Divider2.default, null)
										)
									)
								)
							),

							_react2.default.createElement(
								'div',
								{ className: 'row', style: { marginTop: '40px' } },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-4' },
									_react2.default.createElement(
										'div',
										{ className: 'blue-title' },
										_text2.default.settings_conditions
									)
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-8' },
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(_reduxForm.Field, {
											component: _reduxFormMaterialUi.TextField,
											fullWidth: true,
											name: 'conditions.countries',
											floatingLabelText: _text2.default.settings_countries,
											hintText: 'US,UK,AU,SG'
										})
									),

									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(_reduxForm.Field, {
											component: _reduxFormMaterialUi.TextField,
											fullWidth: true,
											name: 'conditions.states',
											floatingLabelText: _text2.default.settings_states,
											hintText: 'Sevkiyat B\xF6lgeleri, T\xFCm T\xFCrkiye'
										})
									),

									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(_reduxForm.Field, {
											component: _reduxFormMaterialUi.TextField,
											fullWidth: true,
											name: 'conditions.cities',
											floatingLabelText: _text2.default.settings_cities,
											hintText: 'B\xFCt\xFCn \u015Eehirler'
										})
									),

									_react2.default.createElement(
										'div',
										{ className: 'row' },
										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _reduxFormMaterialUi.TextField,
												name: 'conditions.weight_total_min',
												type: 'number',
												fullWidth: true,
												floatingLabelText:
													_text2.default.settings_minTotalWeight +
													(' (' + settings.weight_unit + ')')
											})
										),

										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _reduxFormMaterialUi.TextField,
												name: 'conditions.weight_total_max',
												type: 'number',
												fullWidth: true,
												floatingLabelText:
													_text2.default.settings_maxTotalWeight +
													(' (' + settings.weight_unit + ')')
											})
										)
									),

									_react2.default.createElement(
										'div',
										{ className: 'row' },
										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _reduxFormMaterialUi.TextField,
												name: 'conditions.subtotal_min',
												type: 'number',
												fullWidth: true,
												floatingLabelText:
													_text2.default.settings_minSubtotal +
													(' (' + settings.currency_symbol + ')')
											})
										),

										_react2.default.createElement(
											'div',
											{ className: 'col-xs-6' },
											_react2.default.createElement(_reduxForm.Field, {
												component: _reduxFormMaterialUi.TextField,
												name: 'conditions.subtotal_max',
												type: 'number',
												fullWidth: true,
												floatingLabelText:
													_text2.default.settings_maxSubtotal +
													(' (' + settings.currency_symbol + ')')
											})
										)
									)
								)
							),

							_react2.default.createElement(
								'div',
								{ className: 'row', style: { marginTop: '40px' } },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-4' },
									_react2.default.createElement(
										'div',
										{ className: 'blue-title' },
										_text2.default.settings_checkoutFields
									),

									_react2.default.createElement(
										'div',
										{ className: 'field-hint' },
										'Standard:',

										_react2.default.createElement(
											'ul',
											null,
											_react2.default.createElement('li', null, 'full_name'),
											_react2.default.createElement('li', null, 'address1'),
											_react2.default.createElement('li', null, 'address2'),
											_react2.default.createElement('li', null, 'postal_code'),
											_react2.default.createElement('li', null, 'phone'),
											_react2.default.createElement('li', null, 'company')
										)
									)
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-8' },
									_react2.default.createElement(_reduxForm.FieldArray, {
										name: 'fields',
										component: _fieldsEditor2.default
									})
								)
							)
						),

						_react2.default.createElement(
							'div',
							{ className: 'buttons-box' },
							_react2.default.createElement(_RaisedButton2.default, {
								type: 'submit',
								label: isAdd ? _text2.default.add : _text2.default.save,
								primary: true,
								className: _style2.default.button,
								disabled: pristine || submitting
							})
						)
					)
				);
			}
		}
	]);
	return EditShippingMethodForm;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'EditShippingMethodForm',
	validate: validate,
	enableReinitialize: true
})(EditShippingMethodForm);
