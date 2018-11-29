'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _list = require('./components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		settings: state.settings.settings,
		items: state.customers.items,
		selected: state.customers.selected,
		loadingItems: state.customers.loadingItems,
		hasMore: state.customers.hasMore
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchCustomers)());
		},
		onSelect: function onSelect(customerId, checked) {
			if (checked) {
				dispatch((0, _actions.selectCustomer)(customerId));
			} else {
				dispatch((0, _actions.deselectCustomer)(customerId));
			}
		},
		onSelectAll: function onSelectAll(checked) {
			if (checked) {
				dispatch((0, _actions.selectAllCustomer)());
			} else {
				dispatch((0, _actions.deselectAllCustomer)());
			}
		},
		loadMore: function loadMore() {
			dispatch((0, _actions.fetchMoreCustomers)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_list2.default
);
