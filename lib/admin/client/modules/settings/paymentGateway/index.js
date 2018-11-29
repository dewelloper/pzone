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
	return {
		gateway: ownProps.gateway,
		initialValues: state.settings.paymentGatewayEdit
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad(gateway) {
			dispatch((0, _actions.fetchPaymentGateway)(gateway || ownProps.gateway));
		},
		onSubmit: function onSubmit(data) {
			dispatch((0, _actions.updatePaymentGateway)(ownProps.gateway, data));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
