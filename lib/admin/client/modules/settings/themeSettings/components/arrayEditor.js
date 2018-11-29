'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _dynamicEditControl = require('./dynamicEditControl');
var _dynamicEditControl2 = _interopRequireDefault(_dynamicEditControl);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _FloatingActionButton = require('material-ui/FloatingActionButton');
var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ArrayEditor = function ArrayEditor(_ref) {
	var label = _ref.label,
		properties = _ref.properties,
		fields = _ref.fields,
		_ref$meta = _ref.meta,
		touched = _ref$meta.touched,
		error = _ref$meta.error,
		submitFailed = _ref$meta.submitFailed;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: _style2.default.arrayTitle },
			label,
			_react2.default.createElement(
				_FloatingActionButton2.default,
				{
					mini: true,
					secondary: true,
					onClick: function onClick() {
						return fields.push({});
					},
					style: { marginLeft: '20px' }
				},

				_react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'add'
				)
			)
		),

		_react2.default.createElement(
			'ol',
			{ style: { listStyle: 'none' } },
			fields.map(function(field, index) {
				return _react2.default.createElement(
					'li',
					{ key: index },
					_react2.default.createElement(
						_Paper2.default,
						{
							style: { margin: '20px 0 20px 20px', backgroundColor: '#f7f7f7' },
							zDepth: 1
						},

						_react2.default.createElement(
							'div',
							{ className: _style2.default.arrayItemHead },
							_react2.default.createElement(_FlatButton2.default, {
								label: _text2.default.actions_delete,
								secondary: true,
								onClick: function onClick() {
									return fields.remove(index);
								}
							}),

							index > 0 &&
								_react2.default.createElement(_FlatButton2.default, {
									label: _text2.default.actions_moveUp,
									onClick: function onClick() {
										return fields.move(index, index - 1);
									}
								}),

							index + 1 < fields.length &&
								_react2.default.createElement(_FlatButton2.default, {
									label: _text2.default.actions_moveDown,
									onClick: function onClick() {
										return fields.move(index, index + 1);
									}
								})
						),

						_react2.default.createElement(
							'div',
							{ className: _style2.default.arrayInnerBox },
							properties.map(function(property, propertyIndex) {
								var fieldName = field + '.' + property.key;
								return _react2.default.createElement(
									_dynamicEditControl2.default,
									{
										key: propertyIndex,
										type: property.type,
										fieldName: fieldName,
										label: property.label,
										options: property.options,
										properties: property.properties
									}
								);
							})
						)
					)
				);
			})
		)
	);
};
exports.default = ArrayEditor;
