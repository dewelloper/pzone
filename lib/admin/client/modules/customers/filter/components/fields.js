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
exports.default = function(_ref) {
	var active = _ref.active,
		discontinued = _ref.discontinued,
		on_sale = _ref.on_sale,
		stock_status = _ref.stock_status,
		setActive = _ref.setActive,
		setDiscontinued = _ref.setDiscontinued,
		setOnSale = _ref.setOnSale,
		setStock = _ref.setStock;
	return _react2.default.createElement(
		'div',
		{ className: _style2.default.filter },
		_react2.default.createElement(_Toggle2.default, {
			label: _text2.default.products_onlyEnabled,
			onToggle: function onToggle(e, value) {
				setActive(value);
			},
			toggled: active,
			className: _style2.default.toggle
		}),

		_react2.default.createElement(_Toggle2.default, {
			label: _text2.default.products_onlyDiscontinued,
			onToggle: function onToggle(e, value) {
				setDiscontinued(value);
			},
			toggled: discontinued,
			className: _style2.default.toggle
		}),

		_react2.default.createElement(_Toggle2.default, {
			label: _text2.default.products_onlyOnSale,
			onToggle: function onToggle(e, value) {
				setOnSale(value);
			},
			toggled: on_sale,
			className: _style2.default.toggle
		}),

		_react2.default.createElement(
			_SelectField2.default,
			{
				value: stock_status,
				onChange: function onChange(event, index, value) {
					setStock(value);
				},
				floatingLabelText: _text2.default.products_stockStatus,
				fullWidth: true
			},

			_react2.default.createElement(_MenuItem2.default, {
				value: 'all',
				primaryText: _text2.default.all
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
