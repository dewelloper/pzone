'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _reduxForm = require('redux-form');

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var AttributesGrid = function AttributesGrid(_ref) {
	var fields = _ref.fields,
		_ref$meta = _ref.meta,
		touched = _ref$meta.touched,
		error = _ref$meta.error,
		submitFailed = _ref$meta.submitFailed;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'row row--no-gutter middle-xs' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5 col--no-gutter ' + _style2.default.head },
				_text2.default.attributeName
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7 col--no-gutter ' + _style2.default.head },
				_text2.default.attributeValue
			)
		),

		fields.map(function(field, index) {
			var fieldName = field + '.name';
			var fieldValue = field + '.value';
			return _react2.default.createElement(
				'div',
				{
					className: 'row row--no-gutter middle-xs',
					key: index,
					style: { borderBottom: '1px solid rgb(224, 224, 224)' }
				},

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-5 col--no-gutter' },
					_react2.default.createElement(_reduxForm.Field, {
						component: 'input',
						type: 'text',
						className: _style2.default.input,
						name: fieldName,
						placeholder: _text2.default.attributeName
					})
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-6 col--no-gutter' },
					_react2.default.createElement(_reduxForm.Field, {
						component: 'input',
						type: 'text',
						className: _style2.default.input,
						name: fieldValue,
						placeholder: _text2.default.attributeValue
					})
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-1 col--no-gutter' },
					_react2.default.createElement(
						_IconButton2.default,
						{
							title: _text2.default.actions_delete,
							onClick: function onClick() {
								return fields.remove(index);
							},
							tabIndex: -1
						},

						_react2.default.createElement(
							_FontIcon2.default,
							{
								color: '#a1a1a1',
								className: 'material-icons',
								'data-index': index
							},
							'delete'
						)
					)
				)
			);
		}),

		_react2.default.createElement(
			'div',
			{ style: { margin: 30 } },
			_react2.default.createElement(_RaisedButton2.default, {
				label: _text2.default.addAttribute,
				onClick: function onClick() {
					return fields.push({});
				}
			})
		)
	);
};

var ProductAttributesForm = function ProductAttributesForm(_ref2) {
	var handleSubmit = _ref2.handleSubmit,
		pristine = _ref2.pristine,
		reset = _ref2.reset,
		submitting = _ref2.submitting,
		initialValues = _ref2.initialValues;
	return _react2.default.createElement(
		'form',
		{ onSubmit: handleSubmit },
		_react2.default.createElement(
			_Paper2.default,
			{ className: 'paper-box', zDepth: 1 },
			_react2.default.createElement(_reduxForm.FieldArray, {
				name: 'attributes',
				component: AttributesGrid
			}),
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
};
exports.default = (0, _reduxForm.reduxForm)({
	form: 'ProductAttributesForm',
	enableReinitialize: true
})(ProductAttributesForm);
