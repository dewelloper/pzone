'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var webhookId = ownProps.match.params.webhookId;
	return {
		webhookId: webhookId,
		initialValues: state.settings.webhookEdit
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var webhookId = ownProps.match.params.webhookId;
			if (webhookId) {
				dispatch((0, _actions.fetchWebhook)(webhookId));
			} else {
				dispatch((0, _actions.receiveWebhook)({ enabled: true }));
			}
		},
		onSubmit: function onSubmit(webhook) {
			if (webhook.id) {
				dispatch((0, _actions.updateWebhook)(webhook));
			} else {
				dispatch((0, _actions.createWebhook)(webhook));
				ownProps.history.push('/admin/settings/webhooks');
			}
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
