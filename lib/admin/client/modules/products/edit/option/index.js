'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../../actions');

var _option = require('./components/option');
var _option2 = _interopRequireDefault(_option);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var _ownProps$match$param = ownProps.match.params,
		productId = _ownProps$match$param.productId,
		optionId = _ownProps$match$param.optionId;

	var oldOptions = state.products.editProduct
		? state.products.editProduct.options
		: [];
	var options = state.products.editProductOptions || oldOptions;
	var option = options.find(function(option) {
		return option.id === optionId;
	});

	return {
		initialValues: option,
		optionValues:
			option && option.values && option.values.length > 0 ? option.values : []
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var productId = ownProps.match.params.productId;
			dispatch((0, _actions.fetchOptions)(productId));
		},
		deleteOption: function deleteOption() {
			var _ownProps$match$param2 = ownProps.match.params,
				productId = _ownProps$match$param2.productId,
				optionId = _ownProps$match$param2.optionId;
			dispatch((0, _actions.deleteOption)(productId, optionId));
			ownProps.history.push('/admin/product/' + productId);
		},
		onSubmit: function onSubmit(values) {
			var _ownProps$match$param3 = ownProps.match.params,
				productId = _ownProps$match$param3.productId,
				optionId = _ownProps$match$param3.optionId;
			dispatch((0, _actions.updateOption)(productId, optionId, values));
		},
		createOptionValue: function createOptionValue(valueName) {
			var _ownProps$match$param4 = ownProps.match.params,
				productId = _ownProps$match$param4.productId,
				optionId = _ownProps$match$param4.optionId;
			dispatch((0, _actions.createOptionValue)(productId, optionId, valueName));
		},
		updateOptionValue: function updateOptionValue(valueId, valueName) {
			var _ownProps$match$param5 = ownProps.match.params,
				productId = _ownProps$match$param5.productId,
				optionId = _ownProps$match$param5.optionId;
			dispatch(
				(0, _actions.updateOptionValue)(productId, optionId, valueId, valueName)
			);
		},
		deleteOptionValue: function deleteOptionValue(valueId) {
			var _ownProps$match$param6 = ownProps.match.params,
				productId = _ownProps$match$param6.productId,
				optionId = _ownProps$match$param6.optionId;
			dispatch((0, _actions.deleteOptionValue)(productId, optionId, valueId));
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_option2.default
	)
);
