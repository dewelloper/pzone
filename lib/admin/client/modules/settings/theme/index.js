'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		exportInProcess: state.settings.exportInProcess,
		installInProcess: state.settings.installInProcess
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		exportRequest: function exportRequest() {
			dispatch((0, _actions.exportRequest)());
		},
		exportReceive: function exportReceive() {
			dispatch((0, _actions.exportReceive)());
		},
		installRequest: function installRequest() {
			dispatch((0, _actions.installRequest)());
		},
		installReceive: function installReceive() {
			dispatch((0, _actions.installReceive)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
