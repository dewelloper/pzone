'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');
var _filter = require('./components/filter');
var _filter2 = _interopRequireDefault(_filter);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		filter: state.products.filter
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setEnabled: function setEnabled(value) {
			dispatch((0, _actions.setFilter)({ enabled: value }));
			dispatch((0, _actions.fetchProducts)());
		},
		setDiscontinued: function setDiscontinued(value) {
			dispatch((0, _actions.setFilter)({ discontinued: value }));
			dispatch((0, _actions.fetchProducts)());
		},
		setOnSale: function setOnSale(value) {
			dispatch((0, _actions.setFilter)({ onSale: value }));
			dispatch((0, _actions.fetchProducts)());
		},
		setStock: function setStock(value) {
			dispatch((0, _actions.setFilter)({ stockStatus: value }));
			dispatch((0, _actions.fetchProducts)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_filter2.default
);
