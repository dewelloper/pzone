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

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _themeSettings = require('modules/settings/themeSettings');
var _themeSettings2 = _interopRequireDefault(_themeSettings);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
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

var styles = {
	button: {
		margin: 12
	},

	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0
	}
};
var Theme = (function(_React$Component) {
	_inherits(Theme, _React$Component);
	function Theme(props) {
		_classCallCheck(this, Theme);
		return _possibleConstructorReturn(
			this,
			(Theme.__proto__ || Object.getPrototypeOf(Theme)).call(this, props)
		);
	}
	_createClass(Theme, [
		{
			key: 'onExportClick',
			value: function onExportClick() {
				var _this2 = this;
				this.props.exportRequest();
				_api2.default.theme.export().then(function(_ref) {
					var satus = _ref.satus,
						json = _ref.json;
					_this2.props.exportReceive();
					if (json.file) {
						window.location = json.file;
					} else {
						alert('Error: ' + JSON.stringify(json));
					}
				});
			}
		},
		{
			key: 'onImportFileChoose',
			value: function onImportFileChoose(e) {
				this.props.installRequest();
				var file = e.target.files[0];
				var formData = new FormData();
				formData.append('file', file);

				_api2.default.theme.install(formData);
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					exportInProcess = _props.exportInProcess,
					installInProcess = _props.installInProcess;

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_Paper2.default,
						{ className: 'paper-box', zDepth: 1 },
						_react2.default.createElement(
							'div',
							{ className: _style2.default.innerBox },
							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-6' },
									_text2.default.settings_themeExportDesciption
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-4', style: { textAlign: 'right' } },
									_react2.default.createElement(_RaisedButton2.default, {
										label: exportInProcess
											? _text2.default.settings_themeExporting
											: _text2.default.settings_themeExport,

										disabled: exportInProcess || installInProcess,
										onClick: this.onExportClick.bind(this),
										primary: true
									})
								)
							),

							_react2.default.createElement(_Divider2.default, {
								style: {
									marginTop: 30,
									marginBottom: 30,
									marginLeft: -30,
									marginRight: -30
								}
							}),

							_react2.default.createElement(
								'div',
								{ className: 'row between-xs middle-xs' },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-6' },
									_text2.default.settings_themeInstallDesciption
								),

								_react2.default.createElement(
									'div',
									{ className: 'col-xs-4', style: { textAlign: 'right' } },
									_react2.default.createElement(
										_RaisedButton2.default,
										{
											label: installInProcess
												? _text2.default.settings_themeInstalling
												: _text2.default.settings_themeInstall,

											disabled: installInProcess,
											labelPosition: 'before',
											containerElement: 'label',
											primary: true
										},

										_react2.default.createElement('input', {
											type: 'file',
											onChange: this.onImportFileChoose.bind(this),
											disabled: installInProcess,
											style: styles.exampleImageInput
										})
									)
								)
							)
						)
					),

					_react2.default.createElement(_themeSettings2.default, null)
				);
			}
		}
	]);
	return Theme;
})(_react2.default.Component);
exports.default = Theme;
