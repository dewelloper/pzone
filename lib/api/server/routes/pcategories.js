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
var _pcategories = require('../services/pcategories/pcategories');
var _pcategories2 = _interopRequireDefault(_pcategories);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var PcategoriesRoute = (function() {
	function PcategoriesRoute(router) {
		_classCallCheck(this, PcategoriesRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(PcategoriesRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/Pcategories',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_PCATEGORIES
					),
					this.getPcategories.bind(this)
				);
			}
		},
		{
			key: 'getPcategories',
			value: function getPcategories(req, res, next) {
				_pcategories2.default
					.getPcategories(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		}
	]);
	return PcategoriesRoute;
})();
exports.default = PcategoriesRoute;
