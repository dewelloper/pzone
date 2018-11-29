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
		initialValues: state.products.editProduct
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSubmit: function onSubmit(values) {
			dispatch(
				(0, _actions.updateProduct)({
					id: values.id,
					name: values.name,
					slug: values.slug,
					meta_title: values.meta_title,
					meta_description: values.meta_description,
					description: values.description
				})
			);
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_form2.default)
);
