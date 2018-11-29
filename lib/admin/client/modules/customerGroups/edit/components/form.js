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

	requiredFields.forEach(function(field) {
		if (values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	return errors;
};
var Form = (function(_React$Component) {
	_inherits(Form, _React$Component);
	function Form(props) {
		_classCallCheck(this, Form);
		return _possibleConstructorReturn(
			this,
			(Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props)
		);
	}
	_createClass(Form, [
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					handleSubmit = _props.handleSubmit,
					pristine = _props.pristine,
					submitting = _props.submitting,
					isSaving = _props.isSaving,
					initialValues = _props.initialValues;

				var groupId = null;

				if (initialValues) {
					groupId = initialValues.id;
				}

				return _react2.default.createElement(
					_Paper2.default,
					{ className: 'paper-box', zDepth: 1 },
					_react2.default.createElement(
						'form',
						{ onSubmit: handleSubmit },
						_react2.default.createElement(
							'div',
							{ className: _style2.default.innerBox },
							_react2.default.createElement(_reduxForm.Field, {
								name: 'name',
								component: _reduxFormMaterialUi.TextField,
								floatingLabelText: _text2.default.customerGroups_name + ' *',
								fullWidth: true
							}),

							_react2.default.createElement('br', null),
							_react2.default.createElement(_reduxForm.Field, {
								name: 'description',
								component: _reduxFormMaterialUi.TextField,
								floatingLabelText: _text2.default.description,
								fullWidth: true,
								multiLine: true,
								rows: 2
							})
						),

						_react2.default.createElement(
							'div',
							{ className: 'buttons-box' },
							_react2.default.createElement(_FlatButton2.default, {
								label: _text2.default.cancel,
								className: _style2.default.button,
								onClick: this.props.onCancel
							}),

							_react2.default.createElement(_RaisedButton2.default, {
								type: 'submit',
								label: groupId ? _text2.default.save : _text2.default.add,
								primary: true,
								className: _style2.default.button,
								disabled: pristine || submitting || isSaving
							})
						)
					)
				);
			}
		}
	]);
	return Form;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'FormCustomerGroup',
	validate: validate,
	enableReinitialize: true
})(Form);
