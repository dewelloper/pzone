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
var _mongo = require('../../lib/mongo');
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var PaymentMethodsLightService = (function() {
	function PaymentMethodsLightService() {
		_classCallCheck(this, PaymentMethodsLightService);
	}
	_createClass(PaymentMethodsLightService, [
		{
			key: 'getMethods',
			value: function getMethods() {
				var _this = this;
				var filter =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var flt = {};
				return _mongo.db
					.collection('paymentMethods')
					.find(flt)
					.toArray()
					.then(function(items) {
						return items.map(function(item) {
							return _this.changeProperties(item);
						});
					});
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item) {
				if (item) {
					item.id = item._id.toString();
					delete item._id;
				}
				return item;
			}
		}
	]);
	return PaymentMethodsLightService;
})();
exports.default = new PaymentMethodsLightService();
