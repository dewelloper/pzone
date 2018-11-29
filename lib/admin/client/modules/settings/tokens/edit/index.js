'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var tokenId = ownProps.match.params.tokenId;
	return {
		tokenId: tokenId,
		initialValues: state.settings.tokenEdit,
		newToken: state.settings.newToken
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var tokenId = ownProps.match.params.tokenId;
			if (tokenId) {
				dispatch((0, _actions.fetchToken)(tokenId));
			} else {
				dispatch((0, _actions.receiveToken)({ expiration: 24 }));
			}
		},
		onSubmit: function onSubmit(token) {
			if (token.id) {
				dispatch((0, _actions.updateToken)(token));
			} else {
				dispatch((0, _actions.createToken)(token));
			}
		},
		onDelete: function onDelete() {
			var tokenId = ownProps.match.params.tokenId;
			dispatch((0, _actions.deleteToken)(tokenId));
			ownProps.history.push('/admin/settings/tokens');
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
