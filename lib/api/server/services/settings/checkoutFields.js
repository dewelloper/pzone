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
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var CheckoutFieldsService = (function() {
	function CheckoutFieldsService() {
		_classCallCheck(this, CheckoutFieldsService);
	}
	_createClass(CheckoutFieldsService, [
		{
			key: 'getCheckoutFields',
			value: function getCheckoutFields() {
				return _mongo.db
					.collection('checkoutFields')
					.find()
					.toArray()
					.then(function(fields) {
						return fields.map(function(field) {
							delete field._id;
							return field;
						});
					});
			}
		},
		{
			key: 'getCheckoutField',
			value: function getCheckoutField(name) {
				var _this = this;
				return _mongo.db
					.collection('checkoutFields')
					.findOne({ name: name })
					.then(function(field) {
						return _this.changeProperties(field);
					});
			}
		},
		{
			key: 'updateCheckoutField',
			value: function updateCheckoutField(name, data) {
				var _this2 = this;
				var field = this.getValidDocumentForUpdate(data);
				return _mongo.db
					.collection('checkoutFields')
					.updateOne(
						{ name: name },
						{
							$set: field
						},

						{ upsert: true }
					)
					.then(function(res) {
						return _this2.getCheckoutField(name);
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var field = {};

				if (data.status !== undefined) {
					field.status = _parse2.default.getString(data.status);
				}

				if (data.label !== undefined) {
					field.label = _parse2.default.getString(data.label);
				}

				if (data.placeholder !== undefined) {
					field.placeholder = _parse2.default.getString(data.placeholder);
				}

				return field;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(field) {
				if (field) {
					delete field._id;
					delete field.name;
				} else {
					return {
						status: 'required',
						label: '',
						placeholder: ''
					};
				}

				return field;
			}
		}
	]);
	return CheckoutFieldsService;
})();
exports.default = new CheckoutFieldsService();
