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
		active: state.products.filter_active,
		discontinued: state.products.filter_discontinued,
		on_sale: state.products.filter_on_sale,
		stock_status: state.products.filter_stock_status
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setActive: function setActive(value) {
			dispatch((0, _actions.setFilterActive)(value));
			dispatch((0, _actions.fetchProducts)());
		},
		setDiscontinued: function setDiscontinued(value) {
			dispatch((0, _actions.setFilterDiscontinued)(value));
			dispatch((0, _actions.fetchProducts)());
		},
		setOnSale: function setOnSale(value) {
			dispatch((0, _actions.setFilterOnSale)(value));
			dispatch((0, _actions.fetchProducts)());
		},
		setStock: function setStock(value) {
			dispatch((0, _actions.setFilterStock)(value));
			dispatch((0, _actions.fetchProducts)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_fields2.default
);
