'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');
var _buttons = require('./components/buttons');
var _buttons2 = _interopRequireDefault(_buttons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		search: state.orders.filter.search,
		selectedCount: state.orders.selected.length
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		setSearch: function setSearch(value) {
			dispatch((0, _actions.setFilter)({ search: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		onDelete: function onDelete() {
			dispatch((0, _actions.deleteOrders)());
		},
		onCreate: function onCreate() {
			dispatch((0, _actions.createOrder)(ownProps.history));
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_buttons2.default
	)
);
