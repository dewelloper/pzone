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
var PaymentGatewaysService = (function() {
	function PaymentGatewaysService() {
		_classCallCheck(this, PaymentGatewaysService);
	}
	_createClass(PaymentGatewaysService, [
		{
			key: 'getGateway',
			value: function getGateway(gatewayName) {
				var _this = this;
				return _mongo.db
					.collection('paymentGateways')
					.findOne({ name: gatewayName })
					.then(function(data) {
						return _this.changeProperties(data);
					});
			}
		},
		{
			key: 'updateGateway',
			value: function updateGateway(gatewayName, data) {
				var _this2 = this;
				if (Object.keys(data).length === 0) {
					return this.getGateway(gatewayName);
				} else {
					return _mongo.db
						.collection('paymentGateways')
						.updateOne({ name: gatewayName }, { $set: data }, { upsert: true })
						.then(function(res) {
							return _this2.getGateway(gatewayName);
						});
				}
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(data) {
				if (data) {
					delete data._id;
					delete data.name;
				}
				return data;
			}
		}
	]);
	return PaymentGatewaysService;
})();
exports.default = new PaymentGatewaysService();
