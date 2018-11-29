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
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function(_ref) {
	var isClosed = _ref.isClosed,
		isCancelled = _ref.isCancelled,
		isDelivered = _ref.isDelivered,
		isPaid = _ref.isPaid,
		isHold = _ref.isHold,
		isDraft = _ref.isDraft,
		setClosed = _ref.setClosed,
		setCancelled = _ref.setCancelled,
		setDelivered = _ref.setDelivered,
		setPaid = _ref.setPaid,
		setHold = _ref.setHold,
		setDraft = _ref.setDraft;
	return _react2.default.createElement(
		'div',
		{ className: _style2.default.filter },
		_react2.default.createElement(
			_SelectField2.default,
			{
				className: _style2.default.select,
				fullWidth: true,
				value: isDraft,
				onChange: function onChange(event, index, value) {
					setDraft(value);
				},
				floatingLabelText: _text2.default.orders_draft
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
				className: _style2.default.select,
				fullWidth: true,
				value: isHold,
				onChange: function onChange(event, index, value) {
					setHold(value);
				},
				floatingLabelText: _text2.default.orders_hold
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
				className: _style2.default.select,
				fullWidth: true,
				value: isPaid,
				onChange: function onChange(event, index, value) {
					setPaid(value);
				},
				floatingLabelText: _text2.default.orders_paid
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
				className: _style2.default.select,
				fullWidth: true,
				value: isDelivered,
				onChange: function onChange(event, index, value) {
					setDelivered(value);
				},
				floatingLabelText: _text2.default.orders_delivered
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
				className: _style2.default.select,
				fullWidth: true,
				value: isCancelled,
				onChange: function onChange(event, index, value) {
					setCancelled(value);
				},
				floatingLabelText: _text2.default.orders_cancelled
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
				className: _style2.default.select,
				fullWidth: true,
				value: isClosed,
				onChange: function onChange(event, index, value) {
					setClosed(value);
				},
				floatingLabelText: _text2.default.orders_closed
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
		)
	);
};
