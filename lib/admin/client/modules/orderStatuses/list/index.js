'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');
var _actions2 = require('../../orders/actions');
var _list = require('../components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		items: state.orderStatuses.items,
		selectedId: state.orderStatuses.selectedId
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchStatusesIfNeeded)());
		},
		onSelect: function onSelect(statusId) {
			dispatch((0, _actions.selectStatus)(statusId));
			dispatch((0, _actions2.fetchOrders)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_list2.default
);
