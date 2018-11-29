'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reduxForm = require('redux-form');
var _actions = require('../actions');
var _buttons = require('./components/buttons');
var _buttons2 = _interopRequireDefault(_buttons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		selected: state.customerGroups.items.find(function(item) {
			return item.id === state.customerGroups.selectedId;
		})
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onDelete: function onDelete(id) {
			dispatch((0, _actions.deleteGroup)(id));
			dispatch((0, _reduxForm.reset)('FormCustomerGroup'));
		},
		onCreate: function onCreate() {
			dispatch((0, _actions.deselectGroup)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_buttons2.default
);
