'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _reduxForm = require('redux-form');
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
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _IconMenu = require('material-ui/IconMenu');
var _IconMenu2 = _interopRequireDefault(_IconMenu);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var FieldsEditor = function FieldsEditor(_ref) {
	var fields = _ref.fields,
		_ref$meta = _ref.meta,
		touched = _ref$meta.touched,
		error = _ref$meta.error,
		submitFailed = _ref$meta.submitFailed;
	return _react2.default.createElement(
		'div',
		null,
		fields.map(function(field, index) {
			var fieldKey = field + '.key';
			var fieldLabel = field + '.label';
			var fieldRequired = field + '.required';

			return _react2.default.createElement(
				_Paper2.default,
				{
					className: 'paper-box',
					zDepth: 1,
					rounded: false,
					key: index,
					style: {
						padding: '0px 20px',
						margin: '10px 0px',
						backgroundColor: '#f7f7f7'
					}
				},

				_react2.default.createElement(
					'div',
					{ className: 'row middle-xs center-xs' },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-4' },
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							name: fieldKey,
							floatingLabelText: _text2.default.fieldKey,
							fullWidth: true,
							required: true,
							pattern: '^[A-Za-z0-9_]{2,32}$'
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-4' },
						_react2.default.createElement(_reduxForm.Field, {
							component: _reduxFormMaterialUi.TextField,
							name: fieldLabel,
							floatingLabelText: _text2.default.settings_fieldLabel,
							fullWidth: true
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-3' },
						_react2.default.createElement(_reduxForm.Field, {
							component: _form.CustomToggle,
							name: fieldRequired,
							label: _text2.default.settings_fieldRequired,
							style: { paddingTop: 16, paddingBottom: 16 }
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-1' },
						_react2.default.createElement(
							_IconMenu2.default,
							{
								targetOrigin: { horizontal: 'right', vertical: 'top' },
								anchorOrigin: { horizontal: 'right', vertical: 'top' },
								iconButtonElement: _react2.default.createElement(
									_IconButton2.default,
									{ touch: true },
									_react2.default.createElement(
										_FontIcon2.default,
										{ color: '#777', className: 'material-icons' },
										'more_vert'
									)
								)
							},

							_react2.default.createElement(_MenuItem2.default, {
								primaryText: _text2.default.actions_delete,
								onClick: function onClick() {
									return fields.remove(index);
								}
							}),

							index > 0 &&
								_react2.default.createElement(_MenuItem2.default, {
									primaryText: _text2.default.actions_moveUp,
									onClick: function onClick() {
										return fields.move(index, index - 1);
									}
								}),

							index + 1 < fields.length &&
								_react2.default.createElement(_MenuItem2.default, {
									primaryText: _text2.default.actions_moveDown,
									onClick: function onClick() {
										return fields.move(index, index + 1);
									}
								})
						)
					)
				)
			);
		}),

		_react2.default.createElement(
			'div',
			{ style: { margin: '20px 0px' } },
			_react2.default.createElement(_RaisedButton2.default, {
				label: _text2.default.add,
				onClick: function onClick() {
					return fields.push({});
				}
			})
		)
	);
};
exports.default = FieldsEditor;
