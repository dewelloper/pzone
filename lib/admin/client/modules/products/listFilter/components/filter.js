'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _SelectField = require('material-ui/SelectField');
var _SelectField2 = _interopRequireDefault(_SelectField);
var _MenuItem = require('material-ui/MenuItem');
var _MenuItem2 = _interopRequireDefault(_MenuItem);
var _Toggle = require('material-ui/Toggle');
var _Toggle2 = _interopRequireDefault(_Toggle);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Filter = function Filter(_ref) {
	var filter = _ref.filter,
		setEnabled = _ref.setEnabled,
		setDiscontinued = _ref.setDiscontinued,
		setOnSale = _ref.setOnSale,
		setStock = _ref.setStock;
	var enabled = filter.enabled,
		discontinued = filter.discontinued,
		onSale = filter.onSale,
		stockStatus = filter.stockStatus;

	return _react2.default.createElement(
		'div',
		{ className: _style2.default.filter },
		_react2.default.createElement(
			_SelectField2.default,
			{
				value: enabled,
				onChange: function onChange(event, index, value) {
					setEnabled(value);
				},
				floatingLabelText: _text2.default.enabled,
				fullWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: null,
				primaryText: _text2.default.all,
				label: ' '
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: false,
				primaryText: _text2.default.no
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: true,
				primaryText: _text2.default.yes
			})
		),

		_react2.default.createElement(
			_SelectField2.default,
			{
				value: discontinued,
				onChange: function onChange(event, index, value) {
					setDiscontinued(value);
				},
				floatingLabelText: _text2.default.products_discontinued,
				fullWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: null,
				primaryText: _text2.default.all,
				label: ' '
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: false,
				primaryText: _text2.default.no
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: true,
				primaryText: _text2.default.yes
			})
		),

		_react2.default.createElement(
			_SelectField2.default,
			{
				value: onSale,
				onChange: function onChange(event, index, value) {
					setOnSale(value);
				},
				floatingLabelText: _text2.default.products_onSale,
				fullWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: null,
				primaryText: _text2.default.all,
				label: ' '
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: false,
				primaryText: _text2.default.no
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: true,
				primaryText: _text2.default.yes
			})
		),

		_react2.default.createElement(
			_SelectField2.default,
			{
				value: stockStatus,
				onChange: function onChange(event, index, value) {
					setStock(value);
				},
				floatingLabelText: _text2.default.products_stockStatus,
				fullWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: null,
				primaryText: _text2.default.all,
				label: ' '
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'available',
				primaryText: _text2.default.products_inStock
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'out_of_stock',
				primaryText: _text2.default.products_outOfStock
			}),

			_react2.default.createElement(_MenuItem2.default, {
				value: 'backorder',
				primaryText: _text2.default.products_backorder
			}),

			_react2.default.createElement(_MenuItem2.default, {
				value: 'preorder',
				primaryText: _text2.default.products_preorder
			}),
			_react2.default.createElement(_MenuItem2.default, {
				value: 'discontinued',
				primaryText: _text2.default.products_discontinued
			})
		)
	);
};
exports.default = Filter;
