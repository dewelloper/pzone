'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');
var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var pageId = ownProps.match.params.pageId;
	return {
		pageId: pageId,
		initialValues: state.pages.pageEdit
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var pageId = ownProps.match.params.pageId;
			if (pageId) {
				dispatch((0, _actions.fetchPage)(pageId));
			} else {
				dispatch((0, _actions.receivePage)({ enabled: true }));
			}
		},
		onSubmit: function onSubmit(page) {
			if (page.id) {
				dispatch((0, _actions.updatePage)(page));
			} else {
				dispatch((0, _actions.createPage)(page));
				ownProps.history.push('/admin/pages');
			}
		},
		eraseData: function eraseData() {
			dispatch((0, _actions.receivePage)(null));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
