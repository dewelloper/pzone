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

var AccountForm = function AccountForm(_ref) {
	var handleSubmit = _ref.handleSubmit,
		pristine = _ref.pristine,
		submitting = _ref.submitting,
		initialValues = _ref.initialValues;
	return _react2.default.createElement(
		'div',
		{ style: { maxWidth: 720, width: '100%' } },
		_react2.default.createElement(
			'div',
			{ className: 'gray-title', style: { margin: '15px 0 15px 20px' } },
			_text2.default.account
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
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: 'email',
							floatingLabelText: _text2.default.email
						})
					),

					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: 'shop_url',
							floatingLabelText: _text2.default.shopUrl
						})
					),

					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							fullWidth: true,
							name: 'admin_url',
							floatingLabelText: _text2.default.adminUrl
						})
					),

					_react2.default.createElement(_reduxForm.Field, {
						component: _form.CustomToggle,
						name: 'is_developer',
						label: _text2.default.isDeveloper,
						style: { paddingTop: 16, paddingBottom: 16 }
					})
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
	form: 'WebStoreAccountForm',
	enableReinitialize: true
})(AccountForm);
