'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);

var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _List = require('material-ui/List');
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
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === 'object' || typeof call === 'function')
		? call
		: self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function, not ' +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}

var getOrderStates = function getOrderStates(order) {
	var states = [];

	if (order.hold) {
		states.push(
			_react2.default.createElement(
				'span',
				{ key: 'hold', className: _style2.default.holdState },
				_text2.default.orders_hold
			)
		);
	}

	if (order.paid) {
		states.push(
			_react2.default.createElement(
				'span',
				{ key: 'paid', className: _style2.default.paidState },
				_text2.default.orders_paid
			)
		);
	}

	if (order.delivered) {
		states.push(
			_react2.default.createElement(
				'span',
				{ key: 'delivered', className: _style2.default.deliveredState },
				_text2.default.orders_delivered
			)
		);
	}

	if (order.cancelled) {
		return [
			_react2.default.createElement(
				'span',
				{ key: 'cancelled', className: _style2.default.cancelledState },
				_text2.default.orders_cancelled
			)
		];
	}

	if (order.closed) {
		return [
			_react2.default.createElement(
				'span',
				{ key: 'closed', className: _style2.default.closedState },
				_text2.default.orders_closed
			)
		];
	}

	if (states.length === 0 && order.draft) {
		states.unshift(
			_react2.default.createElement(
				'span',
				{ key: 'draft', className: _style2.default.draftState },
				_text2.default.orders_draft
			)
		);
	}

	return states;
};

var CustomerOrder = function CustomerOrder(_ref) {
	var order = _ref.order,
		settings = _ref.settings;
	var grandTotalFormatted = helper.formatCurrency(order.grand_total, settings);
	var dateCreated = (0, _moment2.default)(
		order.date_placed || order.date_created
	);
	var dateCreatedFormated = dateCreated.format(settings.date_format);
	var states = getOrderStates(order);

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_Divider2.default, null),
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: '/admin/order/' + order.id, style: { textDecoration: 'none' } },
			_react2.default.createElement(_List.ListItem, {
				rightIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'keyboard_arrow_right'
				),

				primaryText: _react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-2' },
						order.number
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-3', style: { color: 'rgba(0, 0, 0, 0.4)' } },
						dateCreatedFormated
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-4' },
						_react2.default.createElement(
							'div',
							{ className: _style2.default.states },
							states
						)
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-3', style: { textAlign: 'right' } },
						grandTotalFormatted
					)
				)
			})
		)
	);
};
var CustomerOrders = (function(_React$Component) {
	_inherits(CustomerOrders, _React$Component);
	function CustomerOrders(props) {
		_classCallCheck(this, CustomerOrders);
		var _this = _possibleConstructorReturn(
			this,
			(CustomerOrders.__proto__ || Object.getPrototypeOf(CustomerOrders)).call(
				this,
				props
			)
		);
		_this.state = {
			orders: []
		};
		return _this;
	}
	_createClass(CustomerOrders, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;
				_api2.default.orders
					.list({ customer_id: this.props.customerId })
					.then(function(_ref2) {
						var status = _ref2.status,
							json = _ref2.json;
						_this2.setState({ orders: json.data });
					});
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					customerId = _props.customerId,
					settings = _props.settings;
				var orders = this.state.orders;

				var orderItems = [];
				if (orders.length > 0) {
					orderItems = orders.map(function(order, index) {
						return _react2.default.createElement(CustomerOrder, {
							key: index,
							order: order,
							settings: settings
						});
					});
				}

				return _react2.default.createElement(
					_Paper2.default,
					{ className: 'paper-box', zDepth: 1 },
					_react2.default.createElement(
						'div',
						{
							className: 'blue-title',
							style: { paddingLeft: 16, paddingBottom: 16 }
						},

						_text2.default.customers_orders
					),

					_react2.default.createElement(
						_List.List,
						{ style: { padding: 0 } },
						orderItems
					)
				);
			}
		}
	]);
	return CustomerOrders;
})(_react2.default.Component);
exports.default = CustomerOrders;
