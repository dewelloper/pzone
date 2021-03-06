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
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
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
				var emailSettings = this.props.emailSettings;
				var smtpHint =
					emailSettings && emailSettings.host && emailSettings.host.length > 0
						? emailSettings.host
						: 'none';

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_Paper2.default,
						{ className: 'paper-box', zDepth: 1 },
						_react2.default.createElement(
							'div',
							{ style: { width: '100%' } },
							_react2.default.createElement(
								_List.List,
								{ style: { padding: 0 } },
								_react2.default.createElement(
									_reactRouterDom.Link,
									{
										to: '/admin/settings/email/smtp',
										style: { textDecoration: 'none' }
									},

									_react2.default.createElement(_List.ListItem, {
										rightIcon: _react2.default.createElement(
											_FontIcon2.default,
											{ className: 'material-icons' },
											'keyboard_arrow_right'
										),

										primaryText: _react2.default.createElement(
											'div',
											{ className: 'row' },
											_react2.default.createElement(
												'div',
												{ className: 'col-xs-6' },
												_text2.default.settings_smtpSettings
											),

											_react2.default.createElement(
												'div',
												{
													className: 'col-xs-6',
													style: { color: 'rgba(0, 0, 0, 0.4)' }
												},

												smtpHint
											)
										)
									})
								)
							)
						)
					),

					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.settings_emailTemplates
					),

					_react2.default.createElement(
						_Paper2.default,
						{ className: 'paper-box', zDepth: 1 },
						_react2.default.createElement(
							'div',
							{ style: { width: '100%' } },
							_react2.default.createElement(
								_List.List,
								{ style: { padding: 0 } },
								_react2.default.createElement(
									_reactRouterDom.Link,
									{
										to: '/admin/settings/email/templates/order_confirmation',
										style: { textDecoration: 'none' }
									},

									_react2.default.createElement(_List.ListItem, {
										rightIcon: _react2.default.createElement(
											_FontIcon2.default,
											{ className: 'material-icons' },
											'keyboard_arrow_right'
										),

										primaryText: _text2.default.settings_orderConfirmation
									})
								)
							)
						)
					)
				);
			}
		}
	]);
	return EmailSettings;
})(_react2.default.Component);
exports.default = EmailSettings;
