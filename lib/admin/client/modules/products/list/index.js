'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');

var _list = require('./components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		settings: state.settings.settings,
		items: state.products.items,
		selected: state.products.selected,
		loadingItems: state.products.loadingItems,
		hasMore: state.products.hasMore,
		totalCount: state.products.totalCount
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchProducts)());
		},
		onSelect: function onSelect(event) {
			var productId = event.target.value;
			var checked = event.target.checked;

			if (checked) {
				dispatch((0, _actions.selectProduct)(productId));
			} else {
				dispatch((0, _actions.deselectProduct)(productId));
			}
		},
		onSelectAll: function onSelectAll(event) {
			var checked = event.target.checked;

			if (checked) {
				dispatch((0, _actions.selectAllProduct)());
			} else {
				dispatch((0, _actions.deselectAllProduct)());
			}
		},
		loadMore: function loadMore() {
			dispatch((0, _actions.fetchMoreProducts)());
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_list2.default)
);
