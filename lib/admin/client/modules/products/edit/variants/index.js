'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../../actions');

var _grid = require('./components/grid');
var _grid2 = _interopRequireDefault(_grid);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var productId = ownProps.match.params.productId;
	var oldOptions = state.products.editProduct
		? state.products.editProduct.options
		: null;
	var oldVariants = state.products.editProduct
		? state.products.editProduct.variants
		: null;

	return {
		options: state.products.editProductOptions || oldOptions,
		variants: state.products.editProductVariants || oldVariants,
		productId: productId
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSkuChange: function onSkuChange(variantId, value) {
			var productId = ownProps.match.params.productId;
			dispatch(
				(0, _actions.updateVariant)(productId, variantId, { sku: value })
			);
		},
		onPriceChange: function onPriceChange(variantId, value) {
			var productId = ownProps.match.params.productId;
			dispatch(
				(0, _actions.updateVariant)(productId, variantId, { price: value })
			);
		},
		onStockChange: function onStockChange(variantId, value) {
			var productId = ownProps.match.params.productId;
			dispatch(
				(0, _actions.updateVariant)(productId, variantId, {
					stock_quantity: value
				})
			);
		},
		onWeightChange: function onWeightChange(variantId, value) {
			var productId = ownProps.match.params.productId;
			dispatch(
				(0, _actions.updateVariant)(productId, variantId, { weight: value })
			);
		},
		onOptionChange: function onOptionChange(variantId, optionId, valueId) {
			var productId = ownProps.match.params.productId;
			dispatch(
				(0, _actions.setVariantOption)(productId, variantId, optionId, valueId)
			);
		},
		createVariant: function createVariant() {
			var productId = ownProps.match.params.productId;
			dispatch((0, _actions.createVariant)(productId));
		},
		deleteVariant: function deleteVariant(variantId) {
			var productId = ownProps.match.params.productId;
			dispatch((0, _actions.deleteVariant)(productId, variantId));
		},
		createOption: function createOption() {
			var productId = ownProps.match.params.productId;
			var newOption = {
				name: 'New option',
				position: 0,
				required: true,
				control: 'select'
			};

			dispatch((0, _actions.createOption)(productId, newOption));
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_grid2.default)
);
