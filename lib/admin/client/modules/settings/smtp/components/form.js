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
var EmailSettings = (function(_React$Component) {
	_inherits(EmailSettings, _React$Component);
	function EmailSettings(props) {
		_classCallCheck(this, EmailSettings);
		return _possibleConstructorReturn(
			this,
			(EmailSettings.__proto__ || Object.getPrototypeOf(EmailSettings)).call(
				this,
				props
			)
		);
	}
	_createClass(EmailSettings, [
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
							{ className: _style2.default.innerBox },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'host',
									hintText: 'smtp.server.com',
									floatingLabelText: _text2.default.settings_smtpHost
								})
							),

							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'port',
									type: 'number',
									hintText: '465',
									floatingLabelText: _text2.default.settings_smtpPort
								})
							),

							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'user',
									floatingLabelText: _text2.default.settings_smtpUser
								})
							),

							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'pass',
									type: 'password',
									floatingLabelText: _text2.default.settings_smtpPass
								})
							),

							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'from_name',
									floatingLabelText: _text2.default.settings_emailFromName
								})
							),

							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_reduxForm.Field, {
									component: _reduxFormMaterialUi.TextField,
									fullWidth: true,
									name: 'from_address',
									type: 'email',
									floatingLabelText: _text2.default.settings_emailFromAddress
								})
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
	return EmailSettings;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'EmailSettingsForm',
	enableReinitialize: false
})(EmailSettings);
