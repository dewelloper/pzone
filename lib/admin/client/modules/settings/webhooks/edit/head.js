'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../../actions');
var _headButtons = require('./components/headButtons');
var _headButtons2 = _interopRequireDefault(_headButtons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		webhook: state.settings.webhookEdit
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onDelete: function onDelete(webhookId) {
			dispatch((0, _actions.deleteWebhook)(webhookId));
			ownProps.history.push('/admin/settings/webhooks');
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_headButtons2.default
	)
);
