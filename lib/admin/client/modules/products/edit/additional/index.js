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
		initialValues: state.products.editProduct,
		settings: state.settings.settings,
		categories: state.productCategories.items
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSubmit: function onSubmit(values) {
			dispatch(
				(0, _actions.updateProduct)({
					id: values.id,
					tags: values.tags,
					position: values.position,
					related_product_ids: values.related_product_ids,
					category_id: values.category_id,
					category_ids: values.category_ids
				})
			);
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_form2.default)
);
