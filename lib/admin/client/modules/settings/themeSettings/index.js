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
		initialValues: state.settings.themeSettings,
		settingsSchema: state.settings.themeSettingsSchema
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchThemeSettings)());
		},
		onSubmit: function onSubmit(values) {
			dispatch((0, _actions.updateThemeSettings)(values));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
