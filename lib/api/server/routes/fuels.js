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
var _fuels = require('../services/fuels/fuels');
var _fuels2 = _interopRequireDefault(_fuels);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var FuelsRoute = (function() {
	function FuelsRoute(router) {
		_classCallCheck(this, FuelsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(FuelsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/Fuels',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_Fuels
					),
					this.getFuels.bind(this)
				);
			}
		},
		{
			key: 'getFuels',
			value: function getFuels(req, res, next) {
				_fuels2.default
					.getFuels(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return FuelsRoute;
})();
exports.default = FuelsRoute;
