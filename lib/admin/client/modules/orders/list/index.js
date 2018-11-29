'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');

var _list = require('./components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		settings: state.settings.settings,
		items: state.orders.items,
		selected: state.orders.selected,
		loadingItems: state.orders.loadingItems,
		hasMore: state.orders.hasMore
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchOrders)());
		},
		onSelect: function onSelect(orderId, checked) {
			if (checked) {
				dispatch((0, _actions.selectOrder)(orderId));
			} else {
				dispatch((0, _actions.deselectOrder)(orderId));
			}
		},
		onSelectAll: function onSelectAll(checked) {
			if (checked) {
				dispatch((0, _actions.selectAllOrder)());
			} else {
				dispatch((0, _actions.deselectAllOrder)());
			}
		},
		loadMore: function loadMore() {
			dispatch((0, _actions.fetchMoreOrders)());
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_list2.default)
);
