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
var _editor = require('modules/shared/editor');
var _editor2 = _interopRequireDefault(_editor);
var _reactTagsinput = require('react-tagsinput');
var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);

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

var TagsField = function TagsField(_ref) {
	var input = _ref.input,
		placeholder = _ref.placeholder;
	var tagsArray = input.value && Array.isArray(input.value) ? input.value : [];
	return _react2.default.createElement(_reactTagsinput2.default, {
		value: tagsArray,
		inputProps: { placeholder: placeholder },
		onChange: function onChange(tags) {
			input.onChange(tags);
		}
	});
};

var validate = function validate(values) {
	var errors = {};
	var requiredFields = ['slug', 'meta_title'];

	requiredFields.map(function(field) {
		if (!values.is_system && values && !values[field]) {
			errors[field] = _text2.default.errors_required;
		}
	});

	return errors;
};

var asyncValidate = function asyncValidate(values /*, dispatch */) {
	return new Promise(function(resolve, reject) {
		if (!values.slug && values.is_system) {
			resolve();
		} else {
			_api2.default.sitemap
				.retrieve({ path: values.slug })
				.then(function(_ref2) {
					var status = _ref2.status,
						json = _ref2.json;
					if (status === 404) {
						resolve();
					} else {
						if (json && !Object.is(json.resource, values.id)) {
							reject({ slug: _text2.default.errors_urlTaken });
						} else {
							resolve();
						}
					}
				});
		}
	});
};
var EditPageForm = (function(_React$Component) {
	_inherits(EditPageForm, _React$Component);
	function EditPageForm(props) {
		_classCallCheck(this, EditPageForm);
		return _possibleConstructorReturn(
			this,
			(EditPageForm.__proto__ || Object.getPrototypeOf(EditPageForm)).call(
				this,
				props
			)
		);
	}
	_createClass(EditPageForm, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.onLoad();
			}
		},
		{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.props.eraseData();
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
					pageId = _props.pageId;
				var isAdd = pageId === null || pageId === undefined;

				if (initialValues) {
					return _react2.default.createElement(
						'form',
						{ onSubmit: handleSubmit },
						_react2.default.createElement(
							_Paper2.default,
							{ className: 'paper-box', zDepth: 1 },
							_react2.default.createElement(
								'div',
								{ className: _style2.default.innerBox },
								_react2.default.createElement(_reduxForm.Field, {
									name: 'meta_title',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.pageTitle,
									fullWidth: true
								}),

								_react2.default.createElement('br', null),
								_react2.default.createElement(_reduxForm.Field, {
									name: 'slug',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.slug,
									fullWidth: true,
									disabled: initialValues.is_system
								}),

								_react2.default.createElement(
									'p',
									{ className: 'field-hint' },
									_text2.default.help_slug
								),
								_react2.default.createElement(_reduxForm.Field, {
									name: 'meta_description',
									component: _reduxFormMaterialUi.TextField,
									floatingLabelText: _text2.default.metaDescription,
									fullWidth: true
								}),

								_react2.default.createElement(
									'div',
									{ className: 'field-hint', style: { marginTop: 40 } },
									_text2.default.content
								),

								_react2.default.createElement(
									'div',
									{ style: { marginBottom: 50 } },
									_react2.default.createElement(_reduxForm.Field, {
										name: 'content',
										component: _editor2.default
									})
								),

								_text2.default.tags,
								_react2.default.createElement(_reduxForm.Field, {
									name: 'tags',
									component: TagsField,
									placeholder: _text2.default.newTag
								}),

								_react2.default.createElement(
									'div',
									{ style: { maxWidth: 256 } },
									_react2.default.createElement(_reduxForm.Field, {
										component: _form.CustomToggle,
										name: 'enabled',
										label: _text2.default.enabled,
										style: { paddingTop: 16, paddingBottom: 16 },
										disabled: initialValues.is_system
									})
								)
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
					);
				} else {
					return null;
				}
			}
		}
	]);
	return EditPageForm;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'EditPageForm',
	validate: validate,
	asyncValidate: asyncValidate,
	asyncBlurFields: ['slug'],
	enableReinitialize: true
})(EditPageForm);
