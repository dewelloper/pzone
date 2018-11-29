'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
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

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _List = require('material-ui/List');
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ServiceSettingsForm = function ServiceSettingsForm(_ref) {
	var handleSubmit = _ref.handleSubmit,
		pristine = _ref.pristine,
		submitting = _ref.submitting,
		initialValues = _ref.initialValues;
	var fields = Object.keys(initialValues).map(function(key, index) {
		var value = initialValues[key];
		return _react2.default.createElement(
			'div',
			{ key: index },
			typeof value === 'boolean' &&
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_reduxForm.Field, {
						component: _form.CustomToggle,
						name: key,
						fullWidth: false,
						label: key,
						style: { paddingTop: 16, paddingBottom: 16, width: 'auto' }
					}),

					_react2.default.createElement(_Divider2.default, null)
				),

			typeof value === 'number' &&
				_react2.default.createElement(_reduxForm.Field, {
					component: _reduxFormMaterialUi.TextField,
					fullWidth: true,
					type: 'number',
					name: key,
					floatingLabelText: key
				}),

			typeof value !== 'boolean' &&
				typeof value !== 'number' &&
				_react2.default.createElement(_reduxForm.Field, {
					component: _reduxFormMaterialUi.TextField,
					fullWidth: true,
					name: key,
					floatingLabelText: key
				})
		);
	});

	return _react2.default.createElement(
		'div',
		{ style: { maxWidth: 720, width: '100%' } },
		_react2.default.createElement(
			'div',
			{ className: 'gray-title', style: { margin: '0 0 15px 20px' } },
			_text2.default.drawer_settings
		),

		_react2.default.createElement(
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
				{ style: { margin: '0px 20px' }, zDepth: 1 },
				_react2.default.createElement(
					'div',
					{ style: { padding: '10px 30px 30px 30px' } },
					fields
				),
				_react2.default.createElement(
					'div',
					{
						className: 'buttons-box',
						style: { display: pristine ? 'none' : 'block' }
					},

					_react2.default.createElement(_RaisedButton2.default, {
						type: 'submit',
						label: _text2.default.save,
						primary: true,
						className: _style2.default.button,
						disabled: pristine || submitting
					})
				)
			)
		)
	);
};
exports.default = (0, _reduxForm.reduxForm)({
	form: 'WebStoreServiceSettingsForm',
	enableReinitialize: true
})(ServiceSettingsForm);
