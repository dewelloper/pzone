'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../../actions');
var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		settings: state.settings.settings,
		initialValues: state.products.editProduct
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSubmit: function onSubmit(values) {
			dispatch(
				(0, _actions.updateProduct)({
					id: values.id,
					regular_price: values.regular_price,
					sale_price: values.sale_price,
					date_sale_from: values.date_sale_from,
					date_sale_to: values.date_sale_to,
					sku: values.sku,
					stock_quantity: values.stock_quantity,
					weight: values.weight,
					date_stock_expected: values.date_stock_expected,
					stock_tracking: values.stock_tracking,
					stock_preorder: values.stock_preorder,
					stock_backorder: values.stock_backorder,
					discontinued: values.discontinued,
					enabled: values.enabled
				})
			);
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_form2.default)
);
