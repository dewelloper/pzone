'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _security = require('../lib/security');
var _security2 = _interopRequireDefault(_security);
var _years = require('../services/years/years');
var _years2 = _interopRequireDefault(_years);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var YearsRoute = (function() {
	function YearsRoute(router) {
		_classCallCheck(this, YearsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(YearsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/Years',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_Years
					),
					this.getYears.bind(this)
				);
			}
		},
		{
			key: 'getYears',
			value: function getYears(req, res, next) {
				_years2.default
					.getYears(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return YearsRoute;
})();
exports.default = YearsRoute;
