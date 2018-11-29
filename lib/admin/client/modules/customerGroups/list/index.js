'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');
var _actions2 = require('../../customers/actions');
var _list = require('../components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		items: state.customerGroups.items,
		selectedId: state.customerGroups.selectedId
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchGroupsIfNeeded)());
		},
		onSelect: function onSelect(groupId) {
			dispatch((0, _actions.selectGroup)(groupId));
			dispatch((0, _actions2.fetchCustomers)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_list2.default
);
