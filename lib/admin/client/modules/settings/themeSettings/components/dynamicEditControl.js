'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reduxForm = require('redux-form');
var _reduxFormMaterialUi = require('redux-form-material-ui');

var _form = require('modules/shared/form');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _arrayEditor = require('./arrayEditor');
var _arrayEditor2 = _interopRequireDefault(_arrayEditor);
var _imageEditor = require('./imageEditor');
var _imageEditor2 = _interopRequireDefault(_imageEditor);

var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
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

var DynamicEditControl = function DynamicEditControl(_ref) {
	var type = _ref.type,
		fieldName = _ref.fieldName,
		label = _ref.label,
		options = _ref.options,
		properties = _ref.properties;
	var hasOptions = options && Array.isArray(options) && options.length > 0;
	var hasProperties =
		properties && Array.isArray(properties) && properties.length > 0;

	if (type === 'string' && !hasOptions) {
		return _react2.default.createElement(_reduxForm.Field, {
			component: _reduxFormMaterialUi.TextField,
			fullWidth: true,
			name: fieldName,
			floatingLabelText: label
		});
	} else if (type === 'string' && hasOptions) {
		var selectOptions = options.map(function(option, index) {
			return _react2.default.createElement(_MenuItem2.default, {
				key: index,
				value: option.value,
				primaryText: option.label
			});
		});

		return _react2.default.createElement(
			_reduxForm.Field,
			{
				component: _reduxFormMaterialUi.SelectField,
				name: fieldName,
				floatingLabelText: label,
				fullWidth: true,
				autoWidth: true
			},

			selectOptions
		);
	} else if (type === 'number') {
		return _react2.default.createElement(_reduxForm.Field, {
			component: _form.NumberField,
			name: fieldName,
			label: label
		});
	} else if (type === 'color') {
		return _react2.default.createElement(
			'div',
			{ className: _style2.default.colorInput },
			_react2.default.createElement('label', null, label),
			_react2.default.createElement(_reduxForm.Field, {
				component: _form.ColorField,
				name: fieldName
			})
		);
	} else if (type === 'boolean') {
		return _react2.default.createElement(_reduxForm.Field, {
			component: _form.CustomToggle,
			name: fieldName,
			label: label,
			style: { paddingTop: 16, paddingBottom: 16 }
		});
	} else if (type === 'array' && hasProperties) {
		return _react2.default.createElement(_reduxForm.FieldArray, {
			name: fieldName,
			component: _arrayEditor2.default,
			label: label,
			properties: properties
		});
	} else if (type === 'image') {
		return _react2.default.createElement(_reduxForm.Field, {
			name: fieldName,
			component: _imageEditor2.default,
			label: label
		});
	} else {
		return null;
	}
};
exports.default = DynamicEditControl;
