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
		initialValues: state.settings.emailTemplate
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var templateName = ownProps.match.params.templateName;
			dispatch((0, _actions.fetchEmailTemplate)(templateName));
		},
		onSubmit: function onSubmit(values) {
			dispatch((0, _actions.updateEmailTemplate)(values));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
