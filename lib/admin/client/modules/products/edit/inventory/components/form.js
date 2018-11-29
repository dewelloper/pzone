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
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');
var _form = require('modules/shared/form');

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var validate = function validate(values) {
	var errors = {};
	var requiredFields = ['name'];
	var numberFields = [
		'regular_price',
		'sale_price',
		'stock_quantity',
		'weight'
	];

	requiredFields.map(function(field) {
		if (values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	numberFields.map(function(field) {
		if (values && values[field] && isNaN(parseFloat(values[field]))) {
			errors[field] = _text2.default.errors_number;
		}
	});

	return errors;
};

var slugExists = function slugExists(values) {
	if (values.slug && values.slug.length > 0) {
		return _api2.default.products
			.slugExists(values.id, values.slug)
			.then(function(response) {
				return response.status === 200;
			});
	} else {
		return Promise.resolve(false);
	}
};

var skuExists = function skuExists(values) {
	if (values.sku && values.sku.length > 0) {
		return _api2.default.products
			.skuExists(values.id, values.sku)
			.then(function(response) {
				return response.status === 200;
			});
	} else {
		return Promise.resolve(false);
	}
};

var asyncValidate = function asyncValidate(values) {
	return Promise.all([slugExists(values), skuExists(values)]).then(function(
		_ref
	) {
		var _ref2 = _slicedToArray(_ref, 2),
			isSlugExists = _ref2[0],
			isSkuExists = _ref2[1];
		var errors = {};

		if (isSlugExists) {
			errors.slug = _text2.default.errors_urlTaken;
		}

		if (isSkuExists) {
			errors.sku = _text2.default.skuTaken;
		}

		if (Object.keys(errors).length > 0) {
			return Promise.reject(errors);
		} else {
			return Promise.resolve();
		}
	});
};

var ProductInventoryForm = function ProductInventoryForm(_ref3) {
	var handleSubmit = _ref3.handleSubmit,
		pristine = _ref3.pristine,
		reset = _ref3.reset,
		submitting = _ref3.submitting,
		initialValues = _ref3.initialValues,
		settings = _ref3.settings;
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
					{ className: 'row', style: { marginBottom: 50 } },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-5' },
						_react2.default.createElement(
							'div',
							{ className: 'blue-title' },
							_text2.default.products_pricing
						),
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'regular_price',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText:
										_text2.default.products_regularPrice +
										(' (' + settings.currency_symbol + ')'),

									fullWidth: true
								})
							),

							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'sale_price',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText:
										_text2.default.products_salePrice +
										(' (' + settings.currency_symbol + ')'),

									fullWidth: true
								})
							),

							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'date_sale_from',
									component: _reduxFormMaterialUi.DatePicker,
									textFieldStyle: { width: '100%' },
									format: function format(value, name) {
										return value === '' ? null : value;
									},
									floatingLabelText: _text2.default.products_dateSaleFrom
								})
							),

							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'date_sale_to',
									component: _reduxFormMaterialUi.DatePicker,
									textFieldStyle: { width: '100%' },
									format: function format(value, name) {
										return value === '' ? null : value;
									},
									floatingLabelText: _text2.default.products_dateSaleTo
								})
							)
						)
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-5 col-xs-offset-2' },
						_react2.default.createElement(
							'div',
							{ className: 'blue-title' },
							_text2.default.products_inventory
						),

						_react2.default.createElement(_reduxForm.Field, {
							name: 'sku',
							component: _reduxFormMaterialUi.TextField,
							floatingLabelText: _text2.default.products_sku,
							fullWidth: true
						}),

						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'stock_quantity',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.products_stockQuantity,
									fullWidth: true
								})
							),

							_react2.default.createElement(
								'div',
								{ className: 'col-xs-6' },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'weight',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText:
										_text2.default.products_weight +
										(' (' + settings.weight_unit + ')'),

									fullWidth: true
								})
							)
						),

						_react2.default.createElement(_reduxForm.Field, {
							name: 'date_stock_expected',
							component: _reduxFormMaterialUi.DatePicker,
							textFieldStyle: { width: '100%' },
							format: function format(value, name) {
								return value === '' ? null : value;
							},
							floatingLabelText: _text2.default.products_dateStockExpected
						})
					)
				),

				_react2.default.createElement(_reduxForm.Field, {
					name: 'stock_tracking',
					component: _form.CustomToggle,
					label: _text2.default.products_stockTracking
				}),

				_react2.default.createElement(_Divider2.default, {
					style: {
						marginTop: 10,
						marginBottom: 10
					}
				}),

				_react2.default.createElement(_reduxForm.Field, {
					name: 'stock_preorder',
					component: _form.CustomToggle,
					label: _text2.default.products_stockPreorder
				}),

				_react2.default.createElement(_Divider2.default, {
					style: {
						marginTop: 10,
						marginBottom: 10
					}
				}),

				_react2.default.createElement(_reduxForm.Field, {
					name: 'stock_backorder',
					component: _form.CustomToggle,
					label: _text2.default.products_stockBackorder
				}),

				_react2.default.createElement(_Divider2.default, {
					style: {
						marginTop: 10,
						marginBottom: 10
					}
				}),

				_react2.default.createElement(_reduxForm.Field, {
					name: 'discontinued',
					component: _form.CustomToggle,
					label: _text2.default.products_discontinued
				}),

				_react2.default.createElement(_Divider2.default, {
					style: {
						marginTop: 10,
						marginBottom: 10
					}
				}),

				_react2.default.createElement(_reduxForm.Field, {
					name: 'enabled',
					component: _form.CustomToggle,
					label: _text2.default.enabled
				})
			),

			_react2.default.createElement(
				'div',
				{
					className:
						'buttons-box ' +
						(pristine ? 'buttons-box-pristine' : 'buttons-box-show')
				},

				_react2.default.createElement(_FlatButton2.default, {
					label: _text2.default.cancel,
					className: _style2.default.button,
					onClick: reset,
					disabled: pristine || submitting
				}),

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
};
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ProductInventoryForm',
	validate: validate,
	asyncValidate: asyncValidate,
	asyncBlurFields: ['sku'],
	enableReinitialize: true
})(ProductInventoryForm);
