'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _details = require('./components/details');
var _details2 = _interopRequireDefault(_details);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var serviceId = ownProps.match.params.serviceId;

	return {
		serviceId: serviceId,
		service: state.apps.service,
		serviceSettings: state.apps.serviceSettings,
		serviceLogs: state.apps.serviceLogs,
		loadingEnableDisable: state.apps.loadingEnableDisableService
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var serviceId = ownProps.match.params.serviceId;
			dispatch((0, _actions.fetchService)(serviceId));
		},
		enableService: function enableService() {
			var serviceId = ownProps.match.params.serviceId;
			dispatch((0, _actions.enableService)(serviceId));
		},
		disableService: function disableService() {
			var serviceId = ownProps.match.params.serviceId;
			dispatch((0, _actions.disableService)(serviceId));
		},
		updateSettings: function updateSettings(values) {
			var serviceId = ownProps.match.params.serviceId;
			dispatch((0, _actions.updateServiceSettings)(serviceId, values));
		},
		fetchServiceLogs: function fetchServiceLogs() {
			var serviceId = ownProps.match.params.serviceId;
			dispatch((0, _actions.fetchServiceLogs)(serviceId));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_details2.default
);
