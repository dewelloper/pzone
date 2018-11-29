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
var _reactRouterDom = require('react-router-dom');
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');
var _form = require('modules/shared/form');
var _values = require('./values');
var _values2 = _interopRequireDefault(_values);

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
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
var ProductOptionForm = (function(_React$Component) {
	_inherits(ProductOptionForm, _React$Component);
	function ProductOptionForm(props) {
		_classCallCheck(this, ProductOptionForm);
		return _possibleConstructorReturn(
			this,
			(
				ProductOptionForm.__proto__ || Object.getPrototypeOf(ProductOptionForm)
			).call(this, props)
		);
	}
	_createClass(ProductOptionForm, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchData();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					handleSubmit = _props.handleSubmit,
					pristine = _props.pristine,
					reset = _props.reset,
					submitting = _props.submitting,
					initialValues = _props.initialValues,
					deleteOption = _props.deleteOption,
					optionValues = _props.optionValues,
					createOptionValue = _props.createOptionValue,
					updateOptionValue = _props.updateOptionValue,
					deleteOptionValue = _props.deleteOptionValue;

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'form',
						{ onSubmit: handleSubmit },
						_react2.default.createElement(
							_Paper2.default,
							{ className: 'paper-box', zDepth: 1 },
							_react2.default.createElement(
								'div',
								{ className: _style2.default.innerBox },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'name',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.optionName,
									fullWidth: true
								}),

								_react2.default.createElement(
									'div',
									{ className: 'row' },
									_react2.default.createElement(
										'div',
										{ className: 'col-xs-6' },
										_react2.default.createElement(_reduxForm.Field, {
											name: 'position',
											component: _reduxFormMaterialUi.TextField,
											type: 'number',
											floatingLabelText: _text2.default.position,
											fullWidth: true
										})
									),

									_react2.default.createElement(
										'div',
										{ className: 'col-xs-6' },
										_react2.default.createElement(
											_reduxForm.Field,
											{
												component: _reduxFormMaterialUi.SelectField,
												autoWidth: true,
												fullWidth: true,
												name: 'control',
												floatingLabelText: _text2.default.optionControl
											},

											_react2.default.createElement(_MenuItem2.default, {
												value: 'select',
												primaryText: _text2.default.optionControlSelect
											})
										)
									)
								),

								_react2.default.createElement(
									'div',
									{ className: _style2.default.shortControl },
									_react2.default.createElement(_reduxForm.Field, {
										name: 'required',
										component: _form.CustomToggle,
										label: _text2.default.settings_fieldRequired
									})
								)
							),

							_react2.default.createElement(
								'div',
								{ className: 'buttons-box' },
								_react2.default.createElement(_RaisedButton2.default, {
									label: _text2.default.actions_delete,
									secondary: true,
									onClick: deleteOption
								}),

								_react2.default.createElement(_FlatButton2.default, {
									label: _text2.default.cancel,
									style: { marginLeft: 12 },
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
					),

					_react2.default.createElement(_values2.default, {
						optionValues: optionValues,
						createOptionValue: createOptionValue,
						updateOptionValue: updateOptionValue,
						deleteOptionValue: deleteOptionValue
					})
				);
			}
		}
	]);
	return ProductOptionForm;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ProductOptionForm',
	validate: validate,
	enableReinitialize: true
})(ProductOptionForm);
