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
var _mongodb = require('mongodb');
var _mongo = require('../../lib/mongo');
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ShippingMethodsLightService = (function() {
	function ShippingMethodsLightService() {
		_classCallCheck(this, ShippingMethodsLightService);
	}
	_createClass(ShippingMethodsLightService, [
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
					.collection('shippingMethods')
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
			key: 'getMethodPrice',
			value: function getMethodPrice(id) {
				var filter = {};
				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}

				return this.getMethods(filter).then(function(methods) {
					return methods.length > 0 ? methods[0].price || 0 : 0;
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
	return ShippingMethodsLightService;
})();
exports.default = new ShippingMethodsLightService();
