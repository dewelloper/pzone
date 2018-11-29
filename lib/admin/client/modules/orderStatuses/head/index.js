'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reduxForm = require('redux-form');
var _actions = require('../actions');
var _buttons = require('./components/buttons');
var _buttons2 = _interopRequireDefault(_buttons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		selected: state.orderStatuses.items.find(function(item) {
			return item.id === state.orderStatuses.selectedId;
		})
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onDelete: function onDelete(id) {
			dispatch((0, _actions.deleteStatus)(id));
			dispatch((0, _reduxForm.reset)('FormOrderStatus'));
		},
		onCreate: function onCreate() {
			dispatch((0, _actions.deselectStatus)());
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_buttons2.default
);
