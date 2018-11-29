'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _reduxForm = require('redux-form');
var _actions = require('../actions');

var _buttons = require('./components/buttons');
var _buttons2 = _interopRequireDefault(_buttons);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		selected: state.productCategories.items.find(function(item) {
			return item.id === state.productCategories.selectedId;
		})
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onMoveUp: function onMoveUp() {
			dispatch((0, _actions.moveUpCategory)());
		},
		onMoveDown: function onMoveDown() {
			dispatch((0, _actions.moveDownCategory)());
		},
		onDelete: function onDelete(id) {
			dispatch((0, _actions.deleteCategory)(id));
			dispatch((0, _reduxForm.reset)('FormProductCategory'));
		},
		onMoveTo: function onMoveTo(id) {
			dispatch((0, _actions.replaceCategory)(id));
			dispatch((0, _reduxForm.reset)('FormProductCategory'));
		},
		onCreate: function onCreate() {
			dispatch((0, _actions.createCategory)());
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		_buttons2.default
	)
);
