'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _appBar = require('./components/appBar');
var _appBar2 = _interopRequireDefault(_appBar);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	var productCategory = state.productCategories.items.find(function(item) {
		return item.id === state.productCategories.selectedId;
	});

	var customerGroup = state.customerGroups.items.find(function(item) {
		return item.id === state.customerGroups.selectedId;
	});

	var orderStatus = state.orderStatuses.items.find(function(item) {
		return item.id === state.orderStatuses.selectedId;
	});

	var orderNumber = state.orders.editOrder
		? state.orders.editOrder.number
		: null;

	return {
		productsSelectedCount: state.products.selected.length,
		customersSelectedCount: state.customers.selected.length,
		ordersSelectedCount: state.orders.selected.length,
		productCategoryName: productCategory ? productCategory.name : null,
		customerGroupName: customerGroup ? customerGroup.name : null,
		orderStatusName: orderStatus ? orderStatus.name : null,
		orderNumber: orderNumber
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_appBar2.default
	)
);
