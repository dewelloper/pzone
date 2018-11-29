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
		initialValues: state.settings.checkoutField
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var fieldName = ownProps.match.params.fieldName;
			dispatch((0, _actions.fetchCheckoutField)(fieldName));
		},
		onSubmit: function onSubmit(values) {
			dispatch((0, _actions.updateCheckoutField)(values));
			ownProps.history.push('/admin/settings/checkout');
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
