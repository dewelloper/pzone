'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _FlatButton = require('material-ui/FlatButton');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
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

var OrderTotals = function OrderTotals(_ref) {
	var order = _ref.order,
		settings = _ref.settings;
	var discountTotal = helper.formatCurrency(order.discount_total, settings);
	var subtotal = helper.formatCurrency(order.subtotal, settings);
	var taxIncludedTotal = helper.formatCurrency(
		order.tax_included_total,
		settings
	);

	var taxTotal = helper.formatCurrency(order.tax_total, settings);
	var shippingTotal = helper.formatCurrency(order.shipping_total, settings);
	var grandTotal = helper.formatCurrency(order.grand_total, settings);
	var itemTax = helper.formatCurrency(order.item_tax, settings);
	var shippingTax = helper.formatCurrency(order.shipping_tax, settings);
	var shippingDiscount = helper.formatCurrency(
		order.shipping_discount,
		settings
	);

	var shippingPrice = helper.formatCurrency(order.shipping_price, settings);
	var discountsDescription =
		order.coupon && order.coupon.length > 0
			? ' (' + _text2.default.coupon + ': ' + order.coupon + ')'
			: '';

	var transactionsTotal = 0;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	try {
		for (
			var _iterator = order.transactions[Symbol.iterator](), _step;
			!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
			_iteratorNormalCompletion = true
		) {
			var transaction = _step.value;
			if (transaction.success === true) {
				transactionsTotal += transaction.amount;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
	var paidTotal = helper.formatCurrency(transactionsTotal, settings);

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: _style2.default.total + ' row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_react2.default.createElement(
					'span',
					null,
					_text2.default.orderSubtotal
				)
			),

			_react2.default.createElement('div', { className: 'col-xs-5' }, subtotal)
		),

		_react2.default.createElement(
			'div',
			{ className: _style2.default.total + ' row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_react2.default.createElement(
					'span',
					null,
					_text2.default.orderShipping
				)
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5' },
				shippingTotal
			)
		),

		_react2.default.createElement(
			'div',
			{ className: _style2.default.total + ' row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_react2.default.createElement('span', null, _text2.default.orderTax)
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5' },
				taxIncludedTotal
			)
		),

		_react2.default.createElement(
			'div',
			{ className: _style2.default.total + ' row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_react2.default.createElement(
					'span',
					null,
					_text2.default.orderDiscount,
					discountsDescription
				)
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5' },
				discountTotal
			)
		),

		_react2.default.createElement(
			'div',
			{
				className: _style2.default.total + ' row ' + _style2.default.grandTotal
			},
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_text2.default.grandTotal
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-5' },
				grandTotal
			)
		),

		_react2.default.createElement(_Divider2.default, {
			style: {
				marginTop: 20,
				marginBottom: 20
			}
		}),

		_react2.default.createElement(
			'div',
			{ className: _style2.default.total + ' row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-7' },
				_react2.default.createElement('span', null, _text2.default.amountPaid)
			),

			_react2.default.createElement('div', { className: 'col-xs-5' }, paidTotal)
		)
	);
};
exports.default = OrderTotals;
