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
var _form = require('modules/shared/form');

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

var WEBHOOK_EVENTS = [
	'order.created',
	'order.updated',
	'order.deleted',
	'transaction.created',
	'transaction.updated',
	'transaction.deleted',
	'customer.created',
	'customer.updated',
	'customer.deleted'
];

var validate = function validate(values) {
	var errors = {};
	var requiredFields = ['url'];

	requiredFields.map(function(field) {
		if (!values.is_system && values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	return errors;
};
var EditWebhookForm = (function(_React$Component) {
	_inherits(EditWebhookForm, _React$Component);
	function EditWebhookForm(props) {
		_classCallCheck(this, EditWebhookForm);
		return _possibleConstructorReturn(
			this,
			(
				EditWebhookForm.__proto__ || Object.getPrototypeOf(EditWebhookForm)
			).call(this, props)
		);
	}
	_createClass(EditWebhookForm, [
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
					webhookId = _props.webhookId;
				var isAdd = webhookId === null || webhookId === undefined;

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
									name: 'description',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.description,
									fullWidth: true,
									multiLine: true
								}),

								_react2.default.createElement(_reduxForm.Field, {
									name: 'url',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: 'URL',
									fullWidth: true
								}),

								_react2.default.createElement(_reduxForm.Field, {
									name: 'secret',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.webhookSecret,
									fullWidth: true
								}),

								_react2.default.createElement(
									'div',
									{ style: { maxWidth: 256 } },
									_react2.default.createElement(_reduxForm.Field, {
										component: _form.CustomToggle,
										name: 'enabled',
										label: _text2.default.enabled,
										style: { paddingTop: 16, paddingBottom: 16 }
									})
								),

								_react2.default.createElement(
									'div',
									{ className: 'blue-title' },
									_text2.default.webhookEvents
								),
								_react2.default.createElement(_reduxForm.Field, {
									name: 'events',
									component: _form.MultiSelect,
									items: WEBHOOK_EVENTS,
									columns: 3
								})
							),

							_react2.default.createElement(
								'div',
								{
									className:
										'buttons-box ' +
										(pristine && !isAdd
											? 'buttons-box-pristine'
											: 'buttons-box-show')
								},

								_react2.default.createElement(_RaisedButton2.default, {
									type: 'submit',
									label: isAdd ? _text2.default.add : _text2.default.save,
									primary: true,
									className: _style2.default.button,
									disabled: pristine || submitting
								})
							)
						)
					)
				);
			}
		}
	]);
	return EditWebhookForm;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'EditWebhookForm',
	validate: validate,
	enableReinitialize: true
})(EditWebhookForm);
