'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');

var _details = require('./components/details');
var _details2 = _interopRequireDefault(_details);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		settings: state.settings.settings,
		order: state.orders.editOrder,
		processingCheckout: state.orders.processingCheckout
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var orderId = ownProps.match.params.orderId;
			dispatch((0, _actions.fetchOrder)(orderId));
		},
		clearData: function clearData() {
			dispatch((0, _actions.clearOrderDetails)());
		},
		onItemDelete: function onItemDelete(itemId) {
			var orderId = ownProps.match.params.orderId;
			dispatch((0, _actions.deleteOrderItem)(orderId, itemId));
		},
		onItemUpdate: function onItemUpdate(itemId, quantity, variantId) {
			var orderId = ownProps.match.params.orderId;
			dispatch(
				(0, _actions.updateOrderItem)(orderId, itemId, quantity, variantId)
			);
		},
		onShippingAddressUpdate: function onShippingAddressUpdate(address) {
			var orderId = ownProps.match.params.orderId;
			dispatch((0, _actions.updateShippingAddress)(orderId, address));
		},
		onOrderSummaryUpdate: function onOrderSummaryUpdate(order) {
			var orderId = ownProps.match.params.orderId;
			dispatch(
				(0, _actions.updateOrder)({
					id: order.id,
					tracking_number: order.tracking_number,
					status_id: order.status_id,
					shipping_method_id: order.shipping_method_id,
					payment_method_id: order.payment_method_id,
					comments: order.comments,
					note: order.note,
					email: order.email,
					mobile: order.mobile
				})
			);
		},
		onCheckout: function onCheckout() {
			var orderId = ownProps.match.params.orderId;
			dispatch((0, _actions.checkoutOrder)(orderId));
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_details2.default
	)
);
