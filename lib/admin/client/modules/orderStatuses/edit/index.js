'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reduxForm = require('redux-form');
var _actions = require('../actions');
var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		statusId: state.orderStatuses.selectedId,
		items: state.orderStatuses.items,
		initialValues: state.orderStatuses.items.find(function(item) {
			return item.id === state.orderStatuses.selectedId;
		}),

		isSaving: state.orderStatuses.isSaving
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onSubmit: function onSubmit(values) {
			if (values.id) {
				dispatch((0, _actions.updateStatus)(values));
			} else {
				dispatch((0, _actions.createStatus)(values));
			}
		},
		onCancel: function onCancel() {
			dispatch((0, _actions.deselectStatus)());
			dispatch((0, _reduxForm.reset)('FormOrderStatus'));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
