'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var methodId = ownProps.match.params.methodId;
	var gateway = state.settings.paymentMethodEdit
		? state.settings.paymentMethodEdit.gateway
		: null;

	return {
		methodId: methodId,
		gateway: gateway,
		settings: state.settings.settings,
		initialValues: state.settings.paymentMethodEdit,
		shippingMethods: state.settings.shippingMethods
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var methodId = ownProps.match.params.methodId;
			if (methodId) {
				dispatch((0, _actions.fetchPaymentMethod)(methodId));
			} else {
				dispatch((0, _actions.receivePaymentMethod)({ enabled: true }));
			}
			dispatch((0, _actions.fetchShippingMethods)());
		},
		onSubmit: function onSubmit(method) {
			if (
				method.conditions &&
				method.conditions.countries &&
				!Array.isArray(method.conditions.countries)
			) {
				var countriesStr = method.conditions.countries;
				method.conditions.countries = countriesStr
					.split(',')
					.map(function(item) {
						return item.trim().toUpperCase();
					})
					.filter(function(item) {
						return item.length === 2;
					});
			}

			if (method.id) {
				dispatch((0, _actions.updatePaymentMethod)(method));
			} else {
				dispatch((0, _actions.createPaymentMethod)(method));
				ownProps.history.push('/admin/settings/payments');
			}
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
