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
var ProductVariantsService = (function() {
	function ProductVariantsService() {
		_classCallCheck(this, ProductVariantsService);
	}
	_createClass(ProductVariantsService, [
		{
			key: 'getVariants',
			value: function getVariants(productId) {
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}

				var productObjectID = new _mongodb.ObjectID(productId);
				return _mongo.db
					.collection('products')
					.findOne({ _id: productObjectID }, { fields: { variants: 1 } })
					.then(function(product) {
						return product.variants || [];
					});
			}
		},
		{
			key: 'deleteVariant',
			value: function deleteVariant(productId, variantId) {
				var _this = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(variantId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var variantObjectID = new _mongodb.ObjectID(variantId);

				return _mongo.db
					.collection('products')
					.updateOne(
						{
							_id: productObjectID
						},

						{
							$pull: {
								variants: {
									id: variantObjectID
								}
							}
						}
					)
					.then(function(res) {
						return _this.getVariants(productId);
					});
			}
		},
		{
			key: 'addVariant',
			value: function addVariant(productId, data) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);

				var variantData = this.getValidDocumentForInsert(data);

				return _mongo.db
					.collection('products')
					.updateOne(
						{ _id: productObjectID },
						{ $push: { variants: variantData } }
					)
					.then(function(res) {
						return _this2.getVariants(productId);
					});
			}
		},
		{
			key: 'updateVariant',
			value: function updateVariant(productId, variantId, data) {
				var _this3 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(variantId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var variantObjectID = new _mongodb.ObjectID(variantId);

				var variantData = this.getValidDocumentForUpdate(data);

				return _mongo.db
					.collection('products')
					.updateOne(
						{
							_id: productObjectID,
							'variants.id': variantObjectID
						},

						{ $set: variantData }
					)
					.then(function(res) {
						return _this3.getVariants(productId);
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var variant = {
					id: new _mongodb.ObjectID(),
					sku: _parse2.default.getString(data.sku),
					price: _parse2.default.getNumberIfPositive(data.price) || 0,
					stock_quantity:
						_parse2.default.getNumberIfPositive(data.stock_quantity) || 0,
					weight: _parse2.default.getNumberIfPositive(data.weight) || 0,
					options: []
				};

				return variant;
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var variant = {};

				if (data.sku !== undefined) {
					variant['variants.$.sku'] = _parse2.default.getString(data.sku);
				}

				if (data.price !== undefined) {
					variant['variants.$.price'] =
						_parse2.default.getNumberIfPositive(data.price) || 0;
				}

				if (data.stock_quantity !== undefined) {
					variant['variants.$.stock_quantity'] =
						_parse2.default.getNumberIfPositive(data.stock_quantity) || 0;
				}

				if (data.weight !== undefined) {
					variant['variants.$.weight'] =
						_parse2.default.getNumberIfPositive(data.weight) || 0;
				}

				return variant;
			}
		},
		{
			key: 'getVariantOptions',
			value: function getVariantOptions(productId, variantId) {
				var productObjectID = new _mongodb.ObjectID(productId);

				return _mongo.db
					.collection('products')
					.findOne({ _id: productObjectID }, { fields: { variants: 1 } })
					.then(function(product) {
						return product && product.variants ? product.variants : null;
					})
					.then(function(variants) {
						return variants && variants.length > 0
							? variants.find(function(variant) {
									return variant.id.toString() === variantId;
							  })
							: null;
					})
					.then(function(variant) {
						return variant && variant.options.length > 0 ? variant.options : [];
					});
			}
		},
		{
			key: 'getModifiedVariantOptions',
			value: function getModifiedVariantOptions(
				productId,
				variantId,
				optionId,
				valueId
			) {
				return this.getVariantOptions(productId, variantId).then(function(
					options
				) {
					if (options && options.length > 0) {
						var optionToChange = options.find(function(option) {
							return option.option_id.toString() === optionId;
						});

						if (optionToChange === undefined) {
							// if option not exists => add new option
							options.push({
								option_id: new _mongodb.ObjectID(optionId),
								value_id: new _mongodb.ObjectID(valueId)
							});
						} else {
							// if option exists => set new valueId

							if (optionToChange.value_id.toString() === valueId) {
								// don't save same value
								return option;
							}

							options = options.map(function(option) {
								if (option.option_id.toString() === optionId) {
									option.value_id = new _mongodb.ObjectID(valueId);
									return option;
								} else {
									return option;
								}
							});
						}
					} else {
						options = [];
						options.push({
							option_id: new _mongodb.ObjectID(optionId),
							value_id: new _mongodb.ObjectID(valueId)
						});
					}

					return options;
				});
			}
		},
		{
			key: 'setVariantOption',
			value: function setVariantOption(productId, variantId, data) {
				var _this4 = this;
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(variantId) ||
					!_mongodb.ObjectID.isValid(data.option_id) ||
					!_mongodb.ObjectID.isValid(data.value_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var variantObjectID = new _mongodb.ObjectID(variantId);

				return this.getModifiedVariantOptions(
					productId,
					variantId,
					data.option_id,
					data.value_id
				)
					.then(function(options) {
						return _mongo.db
							.collection('products')
							.updateOne(
								{ _id: productObjectID, 'variants.id': variantObjectID },
								{ $set: { 'variants.$.options': options } }
							);
					})
					.then(function(res) {
						return _this4.getVariants(productId);
					});
			}
		}
	]);
	return ProductVariantsService;
})();
exports.default = new ProductVariantsService();
