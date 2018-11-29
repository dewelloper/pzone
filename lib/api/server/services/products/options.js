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
var ProductOptionsService = (function() {
	function ProductOptionsService() {
		_classCallCheck(this, ProductOptionsService);
	}
	_createClass(ProductOptionsService, [
		{
			key: 'getOptions',
			value: function getOptions(productId) {
				var _this = this;
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);

				return _mongo.db
					.collection('products')
					.findOne({ _id: productObjectID }, { fields: { options: 1 } })
					.then(function(product) {
						if (product && product.options && product.options.length > 0) {
							return product.options
								.map(function(option) {
									return _this.changeProperties(option);
								})
								.sort(function(a, b) {
									return a.position - b.position;
								});
						} else {
							return [];
						}
					});
			}
		},
		{
			key: 'getSingleOption',
			value: function getSingleOption(productId, optionId) {
				return this.getOptions(productId).then(function(options) {
					return options.find(function(option) {
						return option.id === optionId;
					});
				});
			}
		},
		{
			key: 'deleteOption',
			value: function deleteOption(productId, optionId) {
				var _this2 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(optionId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var optionObjectID = new _mongodb.ObjectID(optionId);

				return _mongo.db
					.collection('products')
					.updateOne(
						{
							_id: productObjectID
						},

						{
							$pull: {
								options: {
									id: optionObjectID
								}
							}
						}
					)
					.then(function(res) {
						return _this2.getOptions(productId);
					});
			}
		},
		{
			key: 'addOption',
			value: function addOption(productId, data) {
				var _this3 = this;
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);

				var optionData = this.getValidDocumentForInsert(data);

				return _mongo.db
					.collection('products')
					.updateOne(
						{ _id: productObjectID },
						{ $push: { options: optionData } }
					)
					.then(function(res) {
						return _this3.getOptions(productId);
					});
			}
		},
		{
			key: 'updateOption',
			value: function updateOption(productId, optionId, data) {
				var _this4 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(optionId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var optionObjectID = new _mongodb.ObjectID(optionId);

				var optionData = this.getValidDocumentForUpdate(data);

				return _mongo.db
					.collection('products')
					.updateOne(
						{
							_id: productObjectID,
							'options.id': optionObjectID
						},

						{ $set: optionData }
					)
					.then(function(res) {
						return _this4.getOptions(productId);
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var option = {
					id: new _mongodb.ObjectID(),
					name: _parse2.default.getString(data.name),
					control: _parse2.default.getString(data.control),
					required: _parse2.default.getBooleanIfValid(data.required, true),
					position: _parse2.default.getNumberIfPositive(data.position) || 0,
					values: []
				};

				if (option.control === '') {
					option.control = 'select';
				}

				return option;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var option = {};

				if (data.name !== undefined) {
					option['options.$.name'] = _parse2.default.getString(data.name);
				}

				if (data.control !== undefined) {
					option['options.$.control'] = _parse2.default.getString(data.control);
				}

				if (data.required !== undefined) {
					option['options.$.required'] = _parse2.default.getBooleanIfValid(
						data.required,
						true
					);
				}

				if (data.position !== undefined) {
					option['options.$.position'] =
						_parse2.default.getNumberIfPositive(data.position) || 0;
				}

				return option;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item) {
				if (item) {
					if (item.id) {
						item.id = item.id.toString();
					}

					if (item.values && item.values.length > 0) {
						item.values = item.values.map(function(value) {
							value.id = value.id.toString();
							return value;
						});
					}
				}

				return item;
			}
		}
	]);
	return ProductOptionsService;
})();
exports.default = new ProductOptionsService();
