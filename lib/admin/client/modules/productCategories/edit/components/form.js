'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');
var _editor = require('modules/shared/editor');
var _editor2 = _interopRequireDefault(_editor);

var _form = require('modules/shared/form');
var _imageUpload = require('modules/shared/imageUpload');
var _imageUpload2 = _interopRequireDefault(_imageUpload);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _settings = require('lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
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

var asyncValidate = function asyncValidate(values) {
	return new Promise(function(resolve, reject) {
		if (values.slug && values.slug.length > 0) {
			_api2.default.sitemap
				.retrieve({ path: '/' + values.slug })
				.then(function(_ref) {
					var status = _ref.status,
						json = _ref.json;
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
		} else {
			resolve();
		}
	});
};

var ProductCategoryEditForm = function ProductCategoryEditForm(_ref2) {
	var uploadingImage = _ref2.uploadingImage,
		handleSubmit = _ref2.handleSubmit,
		pristine = _ref2.pristine,
		reset = _ref2.reset,
		submitting = _ref2.submitting,
		onImageUpload = _ref2.onImageUpload,
		onImageDelete = _ref2.onImageDelete,
		isSaving = _ref2.isSaving,
		initialValues = _ref2.initialValues;
	var imageUrl = null;
	var categoryId = null;

	if (initialValues) {
		categoryId = initialValues.id;
		imageUrl = initialValues.image;
	}

	if (categoryId) {
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
						floatingLabelText: _text2.default.productCategories_name + ' *',
						fullWidth: true
					}),

					_react2.default.createElement(
						'div',
						{ className: 'field-hint', style: { marginTop: 40 } },
						_text2.default.description
					),

					_react2.default.createElement(_reduxForm.Field, {
						name: 'description',
						entityId: categoryId,
						component: _editor2.default
					}),

					_react2.default.createElement(
						'div',
						{ className: _style2.default.shortBox },
						_react2.default.createElement(_reduxForm.Field, {
							name: 'enabled',
							component: _form.CustomToggle,
							label: _text2.default.enabled,
							className: _style2.default.toggle
						}),

						_react2.default.createElement(_imageUpload2.default, {
							uploading: uploadingImage,
							imageUrl: imageUrl,
							onDelete: onImageDelete,
							onUpload: onImageUpload
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'blue-title' },
						_text2.default.seo
					),
					_react2.default.createElement(_reduxForm.Field, {
						name: 'slug',
						component: _reduxFormMaterialUi.TextField,
						floatingLabelText: _text2.default.slug,
						fullWidth: true
					}),

					_react2.default.createElement(
						'p',
						{ className: 'field-hint' },
						_text2.default.help_slug
					),
					_react2.default.createElement(_reduxForm.Field, {
						name: 'meta_title',
						component: _reduxFormMaterialUi.TextField,
						floatingLabelText: _text2.default.pageTitle,
						fullWidth: true
					}),

					_react2.default.createElement(_reduxForm.Field, {
						name: 'meta_description',
						component: _reduxFormMaterialUi.TextField,
						floatingLabelText: _text2.default.metaDescription,
						fullWidth: true
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
						disabled: pristine || submitting || isSaving
					})
				)
			)
		);
	} else {
		return null;
	}
};
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ProductCategoryEditForm',
	validate: validate,
	asyncValidate: asyncValidate,
	asyncBlurFields: ['slug'],
	enableReinitialize: true
})(ProductCategoryEditForm);
