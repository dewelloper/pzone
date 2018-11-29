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

var _summary = require('./summary');
var _summary2 = _interopRequireDefault(_summary);
var _orders = require('./orders');
var _orders2 = _interopRequireDefault(_orders);
var _addresses = require('./addresses');
var _addresses2 = _interopRequireDefault(_addresses);
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
var CustomerDetails = (function(_React$Component) {
	_inherits(CustomerDetails, _React$Component);
	function CustomerDetails(props) {
		_classCallCheck(this, CustomerDetails);
		return _possibleConstructorReturn(
			this,
			(
				CustomerDetails.__proto__ || Object.getPrototypeOf(CustomerDetails)
			).call(this, props)
		);
	}
	_createClass(CustomerDetails, [
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
					customer = _props.customer,
					settings = _props.settings,
					onCustomerSummaryUpdate = _props.onCustomerSummaryUpdate,
					onUpdateAddress = _props.onUpdateAddress,
					onDeleteAddress = _props.onDeleteAddress,
					onSetDefaultBillingAddress = _props.onSetDefaultBillingAddress,
					onSetDefaultShippingAddress = _props.onSetDefaultShippingAddress;
				if (!customer) return _react2.default.createElement('br', null);

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
							customer: customer,
							settings: settings,
							onCustomerSummaryUpdate: onCustomerSummaryUpdate
						}),

						_react2.default.createElement(_addresses2.default, {
							customer: customer,
							settings: settings,
							onUpdateAddress: onUpdateAddress,
							onDeleteAddress: onDeleteAddress,
							onSetDefaultBillingAddress: onSetDefaultBillingAddress,
							onSetDefaultShippingAddress: onSetDefaultShippingAddress
						})
					),

					_react2.default.createElement(
						'div',
						{
							className:
								'col-xs-12 col-sm-7 col-md-8 col--no-gutter scroll col-full-height'
						},
						_react2.default.createElement(_orders2.default, {
							customerId: customer.id,
							settings: settings
						})
					)
				);
			}
		}
	]);
	return CustomerDetails;
})(_react2.default.Component);
exports.default = CustomerDetails;
