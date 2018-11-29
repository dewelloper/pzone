'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');
var _webstoreAuth = require('lib/webstoreAuth');
var webstoreAuth = _interopRequireWildcard(_webstoreAuth);
var _list = require('./components/list');
var _list2 = _interopRequireDefault(_list);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
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

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var webstoreAuthorized = webstoreAuth.isCurrentTokenValid();
	return {
		services: state.apps.services,
		webstoreAuthorized: webstoreAuthorized
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			dispatch((0, _actions.fetchServices)());
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_list2.default)
);
