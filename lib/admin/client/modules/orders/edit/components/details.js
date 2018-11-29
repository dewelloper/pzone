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

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _totals = require('./totals');
var _totals2 = _interopRequireDefault(_totals);
var _summary = require('./summary');
var _summary2 = _interopRequireDefault(_summary);
var _items = require('./items');
var _items2 = _interopRequireDefault(_items);
var _customer = require('./customer');
var _customer2 = _interopRequireDefault(_customer);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
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
var OrderDetails = (function(_React$Component) {
	_inherits(OrderDetails, _React$Component);
	function OrderDetails(props) {
		_classCallCheck(this, OrderDetails);
		return _possibleConstructorReturn(
			this,
			(OrderDetails.__proto__ || Object.getPrototypeOf(OrderDetails)).call(
				this,
				props
			)
		);
	}
	_createClass(OrderDetails, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchData();
			}
		},
		{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.props.clearData();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					order = _props.order,
					settings = _props.settings,
					onItemDelete = _props.onItemDelete,
					onItemUpdate = _props.onItemUpdate,
					onShippingAddressUpdate = _props.onShippingAddressUpdate,
					onOrderSummaryUpdate = _props.onOrderSummaryUpdate,
					onCheckout = _props.onCheckout,
					processingCheckout = _props.processingCheckout;
				if (!order) return null;

				return _react2.default.createElement(
					'div',
					{ className: 'row row--no-gutter col-full-height' },
					_react2.default.createElement(
						'div',
						{
							className:
								'col-xs-12 col-sm-5 col-md-4 col--no-gutter scroll col-full-height'
						},
						_react2.default.createElement(_summary2.default, {
							order: order,
							settings: settings,
							onOrderSummaryUpdate: onOrderSummaryUpdate,
							onCheckout: onCheckout,
							processingCheckout: processingCheckout
						}),

						_react2.default.createElement(_customer2.default, {
							order: order,
							settings: settings,
							onShippingAddressUpdate: onShippingAddressUpdate
						})
					),

					_react2.default.createElement(
						'div',
						{
							className:
								'col-xs-12 col-sm-7 col-md-8 col--no-gutter scroll col-full-height'
						},
						_react2.default.createElement(
							_Paper2.default,
							{ className: 'paper-box', zDepth: 1 },
							_react2.default.createElement(_items2.default, {
								order: order,
								settings: settings,
								onItemDelete: onItemDelete,
								onItemUpdate: onItemUpdate
							}),

							_react2.default.createElement(
								'div',
								{ className: _style2.default.innerBox },
								_react2.default.createElement(
									'div',
									{ className: 'row' },
									_react2.default.createElement('div', {
										className: 'col-xs-6'
									}),
									_react2.default.createElement(
										'div',
										{ className: 'col-xs-6' },
										_react2.default.createElement(_totals2.default, {
											order: order,
											settings: settings
										})
									)
								)
							)
						)
					)
				);
			}
		}
	]);
	return OrderDetails;
})(_react2.default.Component);
exports.default = OrderDetails;
