'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _Checkbox = require('material-ui/Checkbox');
var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _List = require('material-ui/List');
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
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

var getOrderStateIcons = function getOrderStateIcons(order) {
	var icons = [];

	if (order.hold) {
		icons.push(
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'hold',
					title: _text2.default.orders_hold,
					style: { color: 'rgba(0, 0, 0, 0.2)' },
					className: 'material-icons'
				},
				'pause_circle_outline'
			)
		);
	}

	if (order.paid) {
		icons.push(
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'paid',
					title: _text2.default.orders_paid,
					style: { color: 'rgba(251, 184, 41, 1)' },
					className: 'material-icons'
				},
				'monetization_on'
			)
		);
	}

	if (order.delivered) {
		icons.push(
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'delivered',
					title: _text2.default.orders_delivered,
					style: { color: 'rgba(127, 175, 27, 1)' },
					className: 'material-icons'
				},
				'local_shipping'
			)
		);
	}

	if (order.cancelled) {
		return [
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'cancelled',
					title: _text2.default.orders_cancelled,
					style: { color: 'rgba(0, 0, 0, 0.3)' },
					className: 'material-icons'
				},
				'not_interested'
			)
		];
	}

	if (order.closed) {
		return [
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'closed',
					title: _text2.default.orders_closed,
					style: { color: 'rgba(127, 175, 27, 1)' },
					className: 'material-icons'
				},
				'done'
			)
		];
	}

	if (icons.length === 0 && order.draft) {
		icons.unshift(
			_react2.default.createElement(
				_FontIcon2.default,
				{
					key: 'draft',
					title: _text2.default.orders_draft,
					style: { color: 'rgba(0, 0, 0, 0.1)' },
					className: 'material-icons'
				},
				'edit'
			)
		);
	}

	return icons;
};

var OrdersListItem = function OrdersListItem(_ref) {
	var order = _ref.order,
		onSelect = _ref.onSelect,
		selected = _ref.selected,
		settings = _ref.settings;
	var checked = selected.includes(order.id);
	var grandTotalFormatted = helper.formatCurrency(order.grand_total, settings);

	var stateIcons = getOrderStateIcons(order);
	var dateCreated = (0, _moment2.default)(
		order.date_placed || order.date_created
	);
	var dateCreatedFromNow = dateCreated.format('' + settings.date_format);
	var shippingTo = order.shipping_address
		? order.shipping_address.full_name
		: '';

	return _react2.default.createElement(
		'div',
		{ className: 'orders-item' + (checked === true ? ' selected' : '') },
		_react2.default.createElement(_List.ListItem, {
			style: { cursor: 'normal' },
			primaryText: _react2.default.createElement(
				'div',
				{ className: 'row middle-xs' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-1' },
					_react2.default.createElement(_Checkbox2.default, {
						checked: checked,
						onCheck: function onCheck(event, isInputChecked) {
							onSelect(order.id, isInputChecked);
						}
					})
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-1' },
					stateIcons
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-2' },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{
							to: '/admin/order/' + order.id,
							className: _style2.default.number
						},
						order.number || 0
					),

					_react2.default.createElement('br', null),
					_react2.default.createElement(
						'small',
						{ className: _style2.default.small },
						dateCreatedFromNow
					)
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-4' },
					_react2.default.createElement(
						'div',
						{ className: _style2.default.shipping },
						shippingTo
					),
					_react2.default.createElement(
						'small',
						{ className: _style2.default.small },
						order.shipping_method
					)
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-2 ' + _style2.default.price },
					grandTotalFormatted,
					_react2.default.createElement('br', null),
					_react2.default.createElement(
						'small',
						{ className: _style2.default.small },
						order.payment_method
					)
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-2 ' + _style2.default.status },
					order.status
				)
			)
		}),

		_react2.default.createElement(_Divider2.default, null)
	);
};
exports.default = OrdersListItem;
