'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _buttons = require('./components/buttons');
var _buttons2 = _interopRequireDefault(_buttons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		search: state.customers.search,
		selectedCount: state.customers.selected.length
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setSearch: function setSearch(value) {
			dispatch((0, _actions.setFilterSearch)(value));
			dispatch((0, _actions.fetchCustomers)());
		},
		onDelete: function onDelete() {
			dispatch((0, _actions.deleteCustomers)());
		},
		onSetGroup: function onSetGroup(group_id) {
			dispatch((0, _actions.setGroup)(group_id));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_buttons2.default
);
