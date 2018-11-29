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
var ProductOptionValuesService = (function() {
	function ProductOptionValuesService() {
		_classCallCheck(this, ProductOptionValuesService);
	}
	_createClass(ProductOptionValuesService, [
		{
			key: 'getOptionValues',
			value: function getOptionValues(productId, optionId) {
				var productObjectID = new _mongodb.ObjectID(productId);

				return _mongo.db
					.collection('products')
					.findOne({ _id: productObjectID }, { fields: { options: 1 } })
					.then(function(product) {
						return product && product.options ? product.options : null;
					})
					.then(function(options) {
						return options && options.length > 0
							? options.find(function(option) {
									return option.id.toString() === optionId;
							  })
							: null;
					})
					.then(function(option) {
						return option && option.values.length > 0 ? option.values : [];
					});
			}
		},
		{
			key: 'getSingleOptionValue',
			value: function getSingleOptionValue(productId, optionId, valueId) {
				return this.getOptionValues(productId, optionId).then(function(
					optionValues
				) {
					return optionValues.find(function(optionValue) {
						return optionValue.id.toString() === valueId;
					});
				});
			}
		},
		{
			key: 'addOptionValue',
			value: function addOptionValue(productId, optionId, data) {
				var _this = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(optionId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var optionObjectID = new _mongodb.ObjectID(optionId);

				var optionValueData = this.getValidDocumentForInsert(data);

				return _mongo.db
					.collection('products')
					.updateOne(
						{
							_id: productObjectID,
							'options.id': optionObjectID
						},

						{ $push: { 'options.$.values': optionValueData } }
					)
					.then(function(res) {
						return _this.getOptionValues(productId, optionId);
					});
			}
		},
		{
			key: 'updateOptionValue',
			value: function updateOptionValue(productId, optionId, valueId, data) {
				var _this2 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(optionId) ||
					!_mongodb.ObjectID.isValid(valueId)
				) {
					return Promise.reject('Invalid identifier');
				}

				if (data.name !== undefined) {
					return this.getModifiedOptionValues(
						productId,
						optionId,
						valueId,
						data.name
					)
						.then(function(values) {
							return _this2.overwriteAllValuesForOption(
								productId,
								optionId,
								values
							);
						})
						.then(function(updateResult) {
							return _this2.getOptionValues(productId, optionId);
						});
				} else {
					return Promise.reject('Please, specify value name');
				}
			}
		},
		{
			key: 'deleteOptionValue',
			value: function deleteOptionValue(productId, optionId, valueId) {
				var _this3 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(optionId) ||
					!_mongodb.ObjectID.isValid(valueId)
				) {
					return Promise.reject('Invalid identifier');
				}

				return this.getOptionValuesWithDeletedOne(productId, optionId, valueId)
					.then(function(values) {
						return _this3.overwriteAllValuesForOption(
							productId,
							optionId,
							values
						);
					})
					.then(function(updateResult) {
						return _this3.getOptionValues(productId, optionId);
					});
			}
		},
		{
			key: 'getModifiedOptionValues',
			value: function getModifiedOptionValues(
				productId,
				optionId,
				valueId,
				name
			) {
				return this.getOptionValues(productId, optionId).then(function(values) {
					if (values && values.length > 0) {
						values = values.map(function(value) {
							if (value.id.toString() === valueId) {
								value.name = name;
								return value;
							} else {
								return value;
							}
						});
					}

					return values;
				});
			}
		},
		{
			key: 'getOptionValuesWithDeletedOne',
			value: function getOptionValuesWithDeletedOne(
				productId,
				optionId,
				deleteValueId
			) {
				return this.getOptionValues(productId, optionId).then(function(values) {
					if (values && values.length > 0) {
						values = values.filter(function(value) {
							return value.id.toString() !== deleteValueId;
						});
					}

					return values;
				});
			}
		},
		{
			key: 'overwriteAllValuesForOption',
			value: function overwriteAllValuesForOption(productId, optionId, values) {
				var productObjectID = new _mongodb.ObjectID(productId);
				var optionObjectID = new _mongodb.ObjectID(optionId);

				if (!values) {
					return;
				}

				return _mongo.db
					.collection('products')
					.updateOne(
						{ _id: productObjectID, 'options.id': optionObjectID },
						{ $set: { 'options.$.values': values } }
					);
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var optionValue = {
					id: new _mongodb.ObjectID(),
					name: _parse2.default.getString(data.name)
				};

				return optionValue;
			}
		}
	]);
	return ProductOptionValuesService;
})();
exports.default = new ProductOptionValuesService();
