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
var _reactRouterDom = require('react-router-dom');
var _reduxFormMaterialUi = require('redux-form-material-ui');

var _form = require('modules/shared/form');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _data = require('lib/data');
var _data2 = _interopRequireDefault(_data);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _DropDownMenu = require('material-ui/DropDownMenu');
var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _List = require('material-ui/List');
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
var GeneralSettings = (function(_React$Component) {
	_inherits(GeneralSettings, _React$Component);
	function GeneralSettings(props) {
		_classCallCheck(this, GeneralSettings);
		return _possibleConstructorReturn(
			this,
			(
				GeneralSettings.__proto__ || Object.getPrototypeOf(GeneralSettings)
			).call(this, props)
		);
	}
	_createClass(GeneralSettings, [
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
					initialValues = _props.initialValues;

				var currencyItems = [];
				for (var key in _data2.default.currencies) {
					currencyItems.push(
						_react2.default.createElement(_MenuItem2.default, {
							value: key,
							key: key,
							primaryText: key + ' - ' + _data2.default.currencies[key]
						})
					);
				}

				var timezoneItems = [];
				for (var _key in _data2.default.timezones) {
					var utc = _data2.default.timezones[_key].utc;
					var utcPretty = utc.slice(0, -2) + ':' + utc.slice(-2);
					timezoneItems.push(
						_react2.default.createElement(_MenuItem2.default, {
							value: _key,
							key: _key,
							primaryText: '(UTC' + utcPretty + ') ' + _key
						})
					);
				}

				var countryItems = [];
				for (var _key2 in _data2.default.countries) {
					countryItems.push(
						_react2.default.createElement(_MenuItem2.default, {
							value: _key2,
							key: _key2,
							primaryText: _data2.default.countries[_key2]
						})
					);
				}

				return _react2.default.createElement(
					'form',
					{
						onSubmit: handleSubmit,
						style: {
							display: 'initial',
							width: '100%'
						}
					},

					_react2.default.createElement(
						_Paper2.default,
						{ className: 'paper-box', zDepth: 1 },
						_react2.default.createElement(
							'div',
							{ style: { width: '100%' } },
							_react2.default.createElement(
								_List.List,
								null,
								_react2.default.createElement(
									_reactRouterDom.Link,
									{
										to: '/admin/settings/general/logo',
										style: { textDecoration: 'none' }
									},

									_react2.default.createElement(_List.ListItem, {
										rightIcon: _react2.default.createElement(
											_FontIcon2.default,
											{ className: 'material-icons' },
											'keyboard_arrow_right'
										),

										primaryText: _text2.default.logo
									})
								),

								_react2.default.createElement(_Divider2.default, null)
							)
						),

						_react2.default.createElement(
							'div',
							{ className: _style2.default.innerBox },
							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.currency
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'currency_code'
										},

										currencyItems
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_currencyFormatting
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'currency_format',
										floatingLabelText:
											_text2.default.settings_currencyFormatting
									}),

									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'currency_symbol',
										floatingLabelText: _text2.default.settings_currencySymbol
									}),

									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											floatingLabelFixed: true,
											fullWidth: true,
											name: 'thousand_separator',
											floatingLabelText:
												_text2.default.settings_thousandSeparator
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: '.',
											primaryText: '5.000.000'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: ',',
											primaryText: '5,000,000'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: ' ',
											primaryText: '5 000 000'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: '',
											primaryText: '5000000'
										})
									),

									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'decimal_separator',
											floatingLabelText:
												_text2.default.settings_decimalSeparator
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: '.',
											primaryText: '100.00'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: ',',
											primaryText: '100,00'
										})
									),

									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'decimal_number',
											floatingLabelText: _text2.default.settings_numberOfDecimal
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: 0,
											primaryText: '100'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 1,
											primaryText: '100.0'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 2,
											primaryText: '100.00'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 3,
											primaryText: '100.000'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 4,
											primaryText: '100.0000'
										})
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_timezone
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'timezone'
										},

										timezoneItems
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_dateFormat
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'date_format'
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: 'MMMM D, YYYY',
											primaryText: 'January 30, 2017'
										}),

										_react2.default.createElement(_MenuItem2.default, {
											value: 'D MMMM YYYY',
											primaryText: '30 January 2017'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'YYYY-MM-DD',
											primaryText: '2017-01-30'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'YYYY-M-D',
											primaryText: '2017-1-30'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'MM/DD/YYYY',
											primaryText: '01/30/2017'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'MM.DD.YYYY',
											primaryText: '01.30.2017'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'DD/MM/YYYY',
											primaryText: '30/01/2017'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'DD.MM.YYYY',
											primaryText: '30.01.2017'
										})
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_timeFormat
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'time_format'
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: 'h:mm a',
											primaryText: '2:30 pm'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'h:mm A',
											primaryText: '2:30 PM'
										}),
										_react2.default.createElement(_MenuItem2.default, {
											value: 'HH:mm',
											primaryText: '14:30'
										})
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_weightUnit
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'weight_unit'
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: 'g',
											primaryText: _text2.default.settings_gram + ' (g)'
										}),

										_react2.default.createElement(_MenuItem2.default, {
											value: 'kg',
											primaryText: _text2.default.settings_kilogram + ' (kg)'
										}),

										_react2.default.createElement(_MenuItem2.default, {
											value: 'lb',
											primaryText: _text2.default.settings_pound + ' (lb)'
										}),

										_react2.default.createElement(_MenuItem2.default, {
											value: 'oz',
											primaryText: _text2.default.settings_ounce + ' (oz)'
										})
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_lengthUnit
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'length_unit'
										},

										_react2.default.createElement(_MenuItem2.default, {
											value: 'cm',
											primaryText: _text2.default.settings_centimeter + ' (cm)'
										}),

										_react2.default.createElement(_MenuItem2.default, {
											value: 'in',
											primaryText: _text2.default.settings_inch + ' (in)'
										})
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_defaultProductSorting
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'default_product_sorting',
										placeholder: '-position,stock_status,price'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.productFields
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'product_fields',
										placeholder: 'id,path,name,price, ...'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.productsLimit
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'products_limit',
										type: 'number',
										placeholder: '30'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_defaultShippingCountry
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(
										_reduxForm.Field,
										{
											component: _reduxFormMaterialUi.SelectField,
											autoWidth: true,
											fullWidth: true,
											name: 'default_shipping_country'
										},

										countryItems
									)
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_defaultShippingState
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'default_shipping_state'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.settings_defaultShippingCity
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'default_shipping_city'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(_reduxForm.Field, {
								component: _form.CustomToggle,
								name: 'hide_billing_address',
								label: _text2.default.hideBillingAddress,
								style: { paddingTop: 16, paddingBottom: 16 }
							}),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.domain
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'domain',
										placeholder: 'https://domain.com'
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 10,
									marginBottom: 10
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_text2.default.orderEmailCopyTo
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-12 col-sm-6' },
									_react2.default.createElement(_reduxForm.Field, {
										component: _reduxFormMaterialUi.TextField,
										fullWidth: true,
										name: 'order_confirmation_copy_to'
									})
								)
							)
						),

						_react2.default.createElement(
							'div',
							{ className: 'buttons-box' },
							_react2.default.createElement(_RaisedButton2.default, {
								type: 'submit',
								label: _text2.default.save,
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
	return GeneralSettings;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'GeneralSettingsForm',
	enableReinitialize: true
})(GeneralSettings);
