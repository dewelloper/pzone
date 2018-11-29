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

var CustomersListItem = function CustomersListItem(_ref) {
	var customer = _ref.customer,
		onSelect = _ref.onSelect,
		selected = _ref.selected,
		settings = _ref.settings;
	var checked = selected.includes(customer.id);
	var totalSpentFormatted = helper.formatCurrency(
		customer.total_spent,
		settings
	);

	return _react2.default.createElement(
		'div',
		{ className: 'customers-item' + (checked === true ? ' selected' : '') },
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
							onSelect(customer.id, isInputChecked);
						}
					})
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-5' },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{
							to: '/admin/customer/' + customer.id,
							className: _style2.default.customerName
						},

						customer.full_name,
						_react2.default.createElement('br', null),
						_react2.default.createElement('small', null, customer.group_name)
					)
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-3 ' + _style2.default.location },
					customer.shipping &&
						customer.shipping.city &&
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								_FontIcon2.default,
								{
									style: {
										color: 'rgba(0, 0, 0, 0.4)',
										fontSize: 16,
										marginRight: 6
									},

									className: 'material-icons'
								},
								'place'
							),

							customer.shipping.city
						)
				),

				_react2.default.createElement(
					'div',
					{ className: 'col-xs-1' },
					customer.orders_count || 0
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-2' },
					_react2.default.createElement(
						'div',
						{ className: _style2.default.price },
						totalSpentFormatted
					)
				)
			)
		}),

		_react2.default.createElement(_Divider2.default, null)
	);
};
exports.default = CustomersListItem;
