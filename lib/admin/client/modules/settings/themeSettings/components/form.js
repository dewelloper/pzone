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

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _sortBy = require('lodash/sortBy');
var _sortBy2 = _interopRequireDefault(_sortBy);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _dynamicEditControl = require('./dynamicEditControl');
var _dynamicEditControl2 = _interopRequireDefault(_dynamicEditControl);
var _arrayEditor = require('./arrayEditor');
var _arrayEditor2 = _interopRequireDefault(_arrayEditor);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
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
var ThemeSettings = (function(_React$Component) {
	_inherits(ThemeSettings, _React$Component);
	function ThemeSettings(props) {
		_classCallCheck(this, ThemeSettings);
		return _possibleConstructorReturn(
			this,
			(ThemeSettings.__proto__ || Object.getPrototypeOf(ThemeSettings)).call(
				this,
				props
			)
		);
	}
	_createClass(ThemeSettings, [
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
					reset = _props.reset,
					settingsSchema = _props.settingsSchema;
				if (initialValues && settingsSchema) {
					var lastSection = null;
					var sortedSettingsSchema = (0, _sortBy2.default)(settingsSchema, [
						'section',
						'label'
					]);

					var fields = sortedSettingsSchema.map(function(item, index) {
						var sectionTitle = null;
						if (item.section !== lastSection) {
							lastSection = item.section;
							sectionTitle =
								item.section && item.section !== ''
									? _react2.default.createElement(
											'div',
											{ className: _style2.default.sectionTitle },
											item.section
									  )
									: null;
						}

						return _react2.default.createElement(
							'div',
							{ key: index },
							sectionTitle,
							_react2.default.createElement(_dynamicEditControl2.default, {
								type: item.type,
								fieldName: item.key,
								label: item.label,
								options: item.options,
								properties: item.properties
							})
						);
					});

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
							'div',
							{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
							_text2.default.themeSettings
						),

						_react2.default.createElement(
							_Paper2.default,
							{ className: 'paper-box', zDepth: 1 },
							_react2.default.createElement(
								'div',
								{ className: _style2.default.innerBox },
								fields
							),
							_react2.default.createElement(
								'div',
								{ className: 'buttons-box' },
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
			}
		}
	]);
	return ThemeSettings;
})(_react2.default.Component);
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ThemeSettingsForm',
	enableReinitialize: true
})(ThemeSettings);
