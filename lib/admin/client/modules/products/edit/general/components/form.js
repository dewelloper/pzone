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
var _editor = require('modules/shared/editor');
var _editor2 = _interopRequireDefault(_editor);

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
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
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

var asyncValidate = function asyncValidate(values) {
	return Promise.all([slugExists(values)]).then(function(_ref) {
		var _ref2 = _slicedToArray(_ref, 1),
			isSlugExists = _ref2[0];
		var errors = {};

		if (isSlugExists) {
			errors.slug = _text2.default.errors_urlTaken;
		}

		if (Object.keys(errors).length > 0) {
			return Promise.reject(errors);
		} else {
			return Promise.resolve();
		}
	});
};

var ProductGeneralForm = function ProductGeneralForm(_ref3) {
	var handleSubmit = _ref3.handleSubmit,
		pristine = _ref3.pristine,
		reset = _ref3.reset,
		submitting = _ref3.submitting,
		initialValues = _ref3.initialValues;
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
						name: 'name',
						component: _reduxFormMaterialUi.TextField,
						floatingLabelText: _text2.default.products_name + ' *',
						fullWidth: true
					}),

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
					}),

					_react2.default.createElement(
						'div',
						{ className: 'field-hint', style: { marginTop: 40 } },
						_text2.default.description
					),

					_react2.default.createElement(_reduxForm.Field, {
						name: 'description',
						component: _editor2.default
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
	} else {
		return null;
	}
};
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ProductGeneralForm',
	validate: validate,
	asyncValidate: asyncValidate,
	asyncBlurFields: ['slug'],
	enableReinitialize: true
})(ProductGeneralForm);
