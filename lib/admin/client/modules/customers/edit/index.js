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
		customer: state.customers.editCustomer
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var customerId = ownProps.match.params.customerId;
			dispatch((0, _actions.fetchCustomer)(customerId));
		},
		clearData: function clearData() {
			dispatch((0, _actions.clearCustomerDetails)());
		},
		onUpdateAddress: function onUpdateAddress(address) {
			var customerId = ownProps.match.params.customerId;
			dispatch((0, _actions.updateAddress)(customerId, address.id, address));
		},
		onDeleteAddress: function onDeleteAddress(addressId) {
			var customerId = ownProps.match.params.customerId;
			dispatch((0, _actions.deleteAddress)(customerId, addressId));
		},
		onSetDefaultBillingAddress: function onSetDefaultBillingAddress(addressId) {
			var customerId = ownProps.match.params.customerId;
			dispatch((0, _actions.setDefaultBillingAddress)(customerId, addressId));
		},
		onSetDefaultShippingAddress: function onSetDefaultShippingAddress(
			addressId
		) {
			var customerId = ownProps.match.params.customerId;
			dispatch((0, _actions.setDefaultShippingAddress)(customerId, addressId));
		},
		onCustomerSummaryUpdate: function onCustomerSummaryUpdate(customer) {
			dispatch(
				(0, _actions.updateCustomer)({
					id: customer.id,
					note: customer.note,
					full_name: customer.full_name,
					group_id: customer.group_id,
					email: customer.email,
					mobile: customer.mobile
				})
			);
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_details2.default
	)
);
