'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');
var _fields = require('./components/fields');
var _fields2 = _interopRequireDefault(_fields);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		isClosed: state.orders.filter.closed,
		isCancelled: state.orders.filter.cancelled,
		isDelivered: state.orders.filter.delivered,
		isPaid: state.orders.filter.paid,
		isHold: state.orders.filter.hold,
		isDraft: state.orders.filter.draft
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setCancelled: function setCancelled(value) {
			dispatch((0, _actions.setFilter)({ cancelled: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		setDelivered: function setDelivered(value) {
			dispatch((0, _actions.setFilter)({ delivered: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		setPaid: function setPaid(value) {
			dispatch((0, _actions.setFilter)({ paid: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		setHold: function setHold(value) {
			dispatch((0, _actions.setFilter)({ hold: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		setDraft: function setDraft(value) {
			dispatch((0, _actions.setFilter)({ draft: value }));
			dispatch((0, _actions.fetchOrders)());
		},
		setClosed: function setClosed(value) {
			dispatch((0, _actions.setFilter)({ closed: value }));
			dispatch((0, _actions.fetchOrders)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_fields2.default
);
