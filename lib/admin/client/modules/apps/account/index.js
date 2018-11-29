'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _details = require('./components/details');
var _details2 = _interopRequireDefault(_details);
var _webstoreAuth = require('lib/webstoreAuth');
var webstoreAuth = _interopRequireWildcard(_webstoreAuth);
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		account: state.apps.account
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var webstoreAuthorized = webstoreAuth.isCurrentTokenValid();
			if (webstoreAuthorized) {
				dispatch((0, _actions.fetchAccount)());
			} else {
				ownProps.history.push('/admin/apps/login');
			}
		},
		onAccountSubmit: function onAccountSubmit(values) {
			dispatch((0, _actions.updateAccount)(values));
		},
		onDeveloperSubmit: function onDeveloperSubmit(values) {
			dispatch((0, _actions.updateDeveloperAccount)(values));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_details2.default
);
