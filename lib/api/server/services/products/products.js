'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slicedToArray = (function() {
	function sliceIterator(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return']) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
	return function(arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			);
		}
	};
})();
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
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _fsExtra = require('fs-extra');
var _fsExtra2 = _interopRequireDefault(_fsExtra);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _productCategories = require('./productCategories');
var _productCategories2 = _interopRequireDefault(_productCategories);
var _settings3 = require('../settings/settings');
var _settings4 = _interopRequireDefault(_settings3);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}
function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}
		return arr2;
	} else {
		return Array.from(arr);
	}
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ProductsService = (function() {
	function ProductsService() {
		_classCallCheck(this, ProductsService);
	}
	_createClass(ProductsService, [
		{
			key: 'getMatchTextQueryForParts',
			value: function getMatchTextQueryForParts(prtSearchQuery, search) {
				return {
					$or: [
						{ oem: { $in: prtSearchQuery } },
						{ $text: { $search: search } }
					]
				};
			}
		},
		{
			key: 'getCategoryId',
			value: function getCategoryId(categoryId) {
				var objId = new _mongodb.ObjectID(categoryId);
				return {
					$and: [{ category_id: objId }]
				};
			}
		},
		{
			key: 'getProducts',
			value: async function getProducts() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var categories = await _productCategories2.default.getCategories({
					fields: 'parent_id'
				});

				var fieldsArray = this.getArrayFromCSV(params.fields);
				var limit = _parse2.default.getNumberIfPositive(params.limit) || 1000;
				var offset = _parse2.default.getNumberIfPositive(params.offset) || 0;
				var projectQuery = this.getProjectQuery(fieldsArray);
				var sortQuery = this.getSortQuery(params); // todo: validate every sort field
				var matchQuery = this.getMatchQuery(params, categories);
				var matchTextQuery;
				var itemsAggregation = [];

				var oems;
				var categoryId = '';
				if (
					params !== undefined &&
					params.search !== undefined &&
					(params.search.match(/\-/g) || []).length > 1
				) {
					var filters = params.search.split('|');
					var carparts = filters[0].includes('-') ? filters[0] : filters[1];
					if (carparts != '') {
						var selections = carparts.split('-');
						var selectedMark = selections[0];
						var selectedModel = selections[1];
						var selectedYear = selections[2];
						var selectedEngine = selections[3];
						var selectedFuel = selections[4];

						if (selections.length > 5) categoryId = selections[5];

						oems = await _mongo.db.collection('tt_cars').distinct('oem', {
							brand: selectedMark,
							model: selectedModel,
							startyear: selectedYear,
							type: selectedEngine,
							fuel: selectedFuel
						});

						var oemsArr = [];
						for (var i = 0; i < oems.length; i++) {
							oemsArr.push(oems[i]);
						}
					}

					var searchTextQuery = '';
					var searchedText = filters[0].includes('-') ? filters[1] : filters[0];
					if (searchedText != '') {
						searchTextQuery = filters[1];
					}

					matchTextQuery = this.getMatchTextQueryForParts(
						oemsArr,
						searchTextQuery
					);
					itemsAggregation.push({ $match: matchTextQuery });
				} else if (
					params !== undefined &&
					params.search !== undefined &&
					params.search !== ''
				) {
					if ((params.search.match(/\|/g) || []).length == 1)
						params.search = params.search.substr(0, params.search.length - 1);
					matchTextQuery = this.getMatchTextQuery(params);
					if (matchTextQuery) {
						itemsAggregation.push({ $match: matchTextQuery });
					}
				}

				if (categoryId.toString() != '') {
					var catMatch = this.getCategoryId(categoryId);
					itemsAggregation.push({ $match: catMatch });
					//itemsAggregation.push($match: {_id: new ObjectID(categoryId)});
				}

				itemsAggregation.push({ $project: projectQuery });
				itemsAggregation.push({ $match: matchQuery });
				if (sortQuery) {
					itemsAggregation.push({ $sort: sortQuery });
				}
				itemsAggregation.push({ $skip: offset });
				itemsAggregation.push({ $limit: limit });
				itemsAggregation.push({
					$lookup: {
						from: 'productCategories',
						localField: 'category_id',
						foreignField: '_id',
						as: 'categories'
					}
				});

				itemsAggregation.push({
					$project: {
						'categories.description': 0,
						'categories.meta_description': 0,
						'categories._id': 0,
						'categories.date_created': 0,
						'categories.date_updated': 0,
						'categories.image': 0,
						'categories.meta_title': 0,
						'categories.enabled': 0,
						'categories.sort': 0,
						'categories.parent_id': 0,
						'categories.position': 0
					}
				});
				var _ref = await Promise.all([
						_mongo.db
							.collection('products')
							.aggregate(itemsAggregation)
							.toArray(),
						this.getCountIfNeeded(
							params,
							matchQuery,
							matchTextQuery,
							projectQuery
						),
						this.getMinMaxPriceIfNeeded(
							params,
							categories,
							matchTextQuery,
							projectQuery
						),

						this.getAllAttributesIfNeeded(
							params,
							categories,
							matchTextQuery,
							projectQuery
						),

						this.getAttributesIfNeeded(
							params,
							categories,
							matchTextQuery,
							projectQuery
						),

						_settings4.default.getSettings()
					]).catch(function(hata) {
						console.log(hata);
					}),
					_ref2 = _slicedToArray(_ref, 6),
					itemsResult = _ref2[0],
					countResult = _ref2[1],
					minMaxPriceResult = _ref2[2],
					allAttributesResult = _ref2[3],
					attributesResult = _ref2[4],
					generalSettings = _ref2[5];

				var domain = generalSettings.domain || '';
				var ids = this.getArrayFromCSV(_parse2.default.getString(params.ids));
				var sku = this.getArrayFromCSV(_parse2.default.getString(params.sku));

				var items = itemsResult.map(function(item) {
					return _this.changeProperties(item, domain);
				});
				items = this.sortItemsByArrayOfIdsIfNeed(items, ids, sortQuery);
				items = this.sortItemsByArrayOfSkuIfNeed(items, sku, sortQuery);
				items = items.filter(function(item) {
					return !!item;
				});

				var total_count = 0;
				var min_price = 0;
				var max_price = 0;

				if (countResult && countResult.length === 1) {
					total_count = countResult[0].count;
				}

				if (minMaxPriceResult && minMaxPriceResult.length === 1) {
					min_price = minMaxPriceResult[0].min_price || 0;
					max_price = minMaxPriceResult[0].max_price || 0;
				}

				var attributes = [];
				if (allAttributesResult) {
					attributes = this.getOrganizedAttributes(
						allAttributesResult,
						attributesResult,
						params
					);
				}

				return {
					price: {
						min: min_price,
						max: max_price
					},

					attributes: attributes,
					total_count: total_count,
					has_more: offset + items.length < total_count,
					data: items
				};
			}
		},
		{
			key: 'sortItemsByArrayOfIdsIfNeed',
			value: function sortItemsByArrayOfIdsIfNeed(
				items,
				arrayOfIds,
				sortQuery
			) {
				return arrayOfIds &&
					arrayOfIds.length > 0 &&
					sortQuery === null &&
					items &&
					items.length > 0
					? arrayOfIds.map(function(id) {
							return items.find(function(item) {
								return item.id === id;
							});
					  })
					: items;
			}
		},
		{
			key: 'sortItemsByArrayOfSkuIfNeed',
			value: function sortItemsByArrayOfSkuIfNeed(
				items,
				arrayOfSku,
				sortQuery
			) {
				return arrayOfSku &&
					arrayOfSku.length > 0 &&
					sortQuery === null &&
					items &&
					items.length > 0
					? arrayOfSku.map(function(sku) {
							return items.find(function(item) {
								return item.sku === sku;
							});
					  })
					: items;
			}
		},
		{
			key: 'getOrganizedAttributes',
			value: function getOrganizedAttributes(
				allAttributesResult,
				filteredAttributesResult,
				params
			) {
				var _this2 = this;
				var uniqueAttributesName = [].concat(
					_toConsumableArray(
						new Set(
							allAttributesResult.map(function(a) {
								return a._id.name;
							})
						)
					)
				);

				return uniqueAttributesName.sort().map(function(attributeName) {
					return {
						name: attributeName,
						values: allAttributesResult
							.filter(function(b) {
								return b._id.name === attributeName;
							})
							.sort(function(a, b) {
								return a._id.value > b._id.value
									? 1
									: b._id.value > a._id.value
									? -1
									: 0;
							})
							.map(function(b) {
								return {
									name: b._id.value,
									checked:
										params['attributes.' + b._id.name] &&
										params['attributes.' + b._id.name].includes(b._id.value)
											? true
											: false,
									// total: b.count,
									count: _this2.getAttributeCount(
										filteredAttributesResult,
										b._id.name,
										b._id.value
									)
								};
							})
					};
				});
			}
		},
		{
			key: 'getAttributeCount',
			value: function getAttributeCount(
				attributesArray,
				attributeName,
				attributeValue
			) {
				var attribute = attributesArray.find(function(a) {
					return a._id.name === attributeName && a._id.value === attributeValue;
				});

				return attribute ? attribute.count : 0;
			}
		},
		{
			key: 'getCountIfNeeded',
			value: function getCountIfNeeded(
				params,
				matchQuery,
				matchTextQuery,
				projectQuery
			) {
				// get total count
				// not for product details or ids
				if (!params.ids) {
					var aggregation = [];
					if (matchTextQuery) {
						aggregation.push({ $match: matchTextQuery });
					}
					aggregation.push({ $project: projectQuery });
					aggregation.push({ $match: matchQuery });
					aggregation.push({ $group: { _id: null, count: { $sum: 1 } } });
					return _mongo.db
						.collection('products')
						.aggregate(aggregation)
						.toArray();
				} else {
					return null;
				}
			}
		},
		{
			key: 'getMinMaxPriceIfNeeded',
			value: function getMinMaxPriceIfNeeded(
				params,
				categories,
				matchTextQuery,
				projectQuery
			) {
				// get min max price without filter by price
				// not for product details or ids
				if (!params.ids) {
					var minMaxPriceMatchQuery = this.getMatchQuery(
						params,
						categories,
						false,
						false
					);

					var aggregation = [];
					if (matchTextQuery) {
						aggregation.push({ $match: matchTextQuery });
					}
					aggregation.push({ $project: projectQuery });
					aggregation.push({ $match: minMaxPriceMatchQuery });
					aggregation.push({
						$group: {
							_id: null,
							min_price: { $min: '$price' },
							max_price: { $max: '$price' }
						}
					});

					return _mongo.db
						.collection('products')
						.aggregate(aggregation)
						.toArray();
				} else {
					return null;
				}
			}
		},
		{
			key: 'getAllAttributesIfNeeded',
			value: function getAllAttributesIfNeeded(
				params,
				categories,
				matchTextQuery,
				projectQuery
			) {
				// get attributes with counts without filter by attributes
				// only for category
				if (params.category_id) {
					var attributesMatchQuery = this.getMatchQuery(
						params,
						categories,
						false,
						false
					);

					var aggregation = [];
					if (matchTextQuery) {
						aggregation.push({ $match: matchTextQuery });
					}
					aggregation.push({ $project: projectQuery });
					aggregation.push({ $match: attributesMatchQuery });
					aggregation.push({ $unwind: '$attributes' });
					aggregation.push({
						$group: { _id: '$attributes', count: { $sum: 1 } }
					});
					return _mongo.db
						.collection('products')
						.aggregate(aggregation)
						.toArray();
				} else {
					return null;
				}
			}
		},
		{
			key: 'getAttributesIfNeeded',
			value: function getAttributesIfNeeded(
				params,
				categories,
				matchTextQuery,
				projectQuery
			) {
				// get attributes with counts without filter by attributes
				// only for category
				if (params.category_id) {
					var attributesMatchQuery = this.getMatchQuery(
						params,
						categories,
						false,
						true
					);

					var aggregation = [];
					if (matchTextQuery) {
						aggregation.push({ $match: matchTextQuery });
					}
					aggregation.push({ $project: projectQuery });
					aggregation.push({ $match: attributesMatchQuery });
					aggregation.push({ $unwind: '$attributes' });
					aggregation.push({
						$group: { _id: '$attributes', count: { $sum: 1 } }
					});
					return _mongo.db
						.collection('products')
						.aggregate(aggregation)
						.toArray();
				} else {
					return null;
				}
			}
		},
		{
			key: 'getSortQuery',
			value: function getSortQuery(_ref3) {
				var sort = _ref3.sort,
					search = _ref3.search;
				var isSearchUsed =
					search &&
					search.length > 0 &&
					search !== 'null' &&
					search !== 'undefined';
				if (sort === 'search' && isSearchUsed) {
					return { score: { $meta: 'textScore' } };
				} else if (sort && sort.length > 0) {
					var fields = sort.split(',');
					return Object.assign.apply(
						Object,
						_toConsumableArray(
							fields.map(function(field) {
								return _defineProperty(
									{},
									field.startsWith('-') ? field.slice(1) : field,
									field.startsWith('-') ? -1 : 1
								);
							})
						)
					);
				} else {
					return null;
				}
			}
		},
		{
			key: 'getProjectQuery',
			value: function getProjectQuery(fieldsArray) {
				var salePrice = '$sale_price';
				var regularPrice = '$regular_price';
				var costPrice = '$cost_price';

				var project = {
					category_ids: 1,
					related_product_ids: 1,
					enabled: 1,
					discontinued: 1,
					date_created: 1,
					date_updated: 1,
					cost_price: costPrice,
					regular_price: regularPrice,
					sale_price: salePrice,
					date_sale_from: 1,
					date_sale_to: 1,
					images: 1,
					prices: 1,
					quantity_inc: 1,
					quantity_min: 1,
					meta_description: 1,
					meta_title: 1,
					name: 1,
					description: 1,
					sku: 1,
					code: 1,
					tax_class: 1,
					position: 1,
					tags: 1,
					options: 1,
					variants: 1,
					weight: 1,
					dimensions: 1,
					attributes: 1,
					date_stock_expected: 1,
					stock_tracking: 1,
					stock_preorder: 1,
					stock_backorder: 1,
					stock_quantity: 1,
					on_sale: {
						$and: [
							{
								$lt: [new Date(), '$date_sale_to']
							},

							{
								$gt: [new Date(), '$date_sale_from']
							}
						]
					},

					variable: {
						$gt: [
							{
								$size: { $ifNull: ['$variants', []] }
							},

							0
						]
					},

					price: {
						$cond: {
							if: {
								$and: [
									{
										$lt: [new Date(), '$date_sale_to']
									},

									{
										$gt: [new Date(), '$date_sale_from']
									},

									{
										$gt: ['$sale_price', 0]
									}
								]
							},

							then: salePrice,
							else: regularPrice
						}
					},

					stock_status: {
						$cond: {
							if: {
								$eq: ['$discontinued', true]
							},

							then: 'discontinued',
							else: {
								$cond: {
									if: {
										$gt: ['$stock_quantity', 0]
									},

									then: 'available',
									else: {
										$cond: {
											if: {
												$eq: ['$stock_backorder', true]
											},

											then: 'backorder',
											else: {
												$cond: {
													if: {
														$eq: ['$stock_preorder', true]
													},

													then: 'preorder',
													else: 'out_of_stock'
												}
											}
										}
									}
								}
							}
						}
					},

					url: { $literal: '' },
					path: { $literal: '' },
					category_name: { $literal: '' },
					category_slug: { $literal: '' }
				};

				if (fieldsArray && fieldsArray.length > 0) {
					project = this.getProjectFilteredByFields(project, fieldsArray);
				}

				// required fields
				project._id = 0;
				project.id = '$_id';
				project.category_id = 1;
				project.slug = 1;

				return project;
			}
		},
		{
			key: 'getArrayFromCSV',
			value: function getArrayFromCSV(fields) {
				return fields && fields.length > 0 ? fields.split(',') : [];
			}
		},
		{
			key: 'getProjectFilteredByFields',
			value: function getProjectFilteredByFields(project, fieldsArray) {
				return Object.assign.apply(
					Object,
					_toConsumableArray(
						fieldsArray.map(function(key) {
							return _defineProperty({}, key, project[key]);
						})
					)
				);
			}
		},
		{
			key: 'getMatchTextQuery',
			value: function getMatchTextQuery(_ref6) {
				var search = _ref6.search;
				if (
					search &&
					search.length > 0 &&
					search !== 'null' &&
					search !== 'undefined'
				) {
					return {
						$or: [
							{ oem: new RegExp(search, 'i') },
							{ $text: { $search: search } }
						]
					};
				} else {
					return null;
				}
			}
		},
		{
			key: 'getMatchAttributesQuery',
			value: function getMatchAttributesQuery(params) {
				var attributesArray = Object.keys(params)
					.filter(function(paramName) {
						return paramName.startsWith('attributes.');
					})
					.map(function(paramName) {
						var paramValue = params[paramName];
						var paramValueArray = Array.isArray(paramValue)
							? paramValue
							: [paramValue];

						return {
							name: paramName.replace('attributes.', ''),
							values: paramValueArray
						};
					});

				return attributesArray;
			}
		},
		{
			key: 'getMatchQuery',
			value: function getMatchQuery(params, categories) {
				var useAttributes =
					arguments.length > 2 && arguments[2] !== undefined
						? arguments[2]
						: true;
				var usePrice =
					arguments.length > 3 && arguments[3] !== undefined
						? arguments[3]
						: true;
				var category_id = params.category_id,
					enabled = params.enabled,
					discontinued = params.discontinued,
					on_sale = params.on_sale,
					stock_status = params.stock_status,
					price_from = params.price_from,
					price_to = params.price_to,
					sku = params.sku,
					ids = params.ids,
					tags = params.tags;

				// parse values
				category_id = _parse2.default.getObjectIDIfValid(category_id);
				enabled = _parse2.default.getBooleanIfValid(enabled);
				discontinued = _parse2.default.getBooleanIfValid(discontinued);
				on_sale = _parse2.default.getBooleanIfValid(on_sale);
				price_from = _parse2.default.getNumberIfPositive(price_from);
				price_to = _parse2.default.getNumberIfPositive(price_to);
				ids = _parse2.default.getString(ids);
				tags = _parse2.default.getString(tags);

				var queries = [];
				var currentDate = new Date();

				if (category_id !== null) {
					var categoryChildren = [];
					_productCategories2.default.findAllChildren(
						categories,
						category_id,
						categoryChildren
					);

					queries.push({
						$or: [
							{
								category_id: { $in: categoryChildren }
							},

							{
								category_ids: category_id
							}
						]
					});
				}

				if (enabled !== null) {
					queries.push({
						enabled: enabled
					});
				}

				if (discontinued !== null) {
					queries.push({
						discontinued: discontinued
					});
				}

				if (on_sale !== null) {
					queries.push({
						on_sale: on_sale
					});
				}

				if (usePrice) {
					if (price_from !== null && price_from > 0) {
						queries.push({
							price: { $gte: price_from }
						});
					}

					if (price_to !== null && price_to > 0) {
						queries.push({
							price: { $lte: price_to }
						});
					}
				}

				if (stock_status && stock_status.length > 0) {
					queries.push({
						stock_status: stock_status
					});
				}

				if (ids && ids.length > 0) {
					var idsArray = ids.split(',');
					var objectIDs = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (
							var _iterator = idsArray[Symbol.iterator](), _step;
							!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
							_iteratorNormalCompletion = true
						) {
							var id = _step.value;
							if (_mongodb.ObjectID.isValid(id)) {
								objectIDs.push(new _mongodb.ObjectID(id));
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
					queries.push({
						id: { $in: objectIDs }
					});
				}

				if (sku && sku.length > 0) {
					if (sku.includes(',')) {
						// multiple values
						var skus = sku.split(',');
						queries.push({
							sku: { $in: skus }
						});
					} else {
						// single value
						queries.push({
							sku: sku
						});
					}
				}

				if (tags && tags.length > 0) {
					queries.push({
						tags: tags
					});
				}

				if (useAttributes) {
					var attributesArray = this.getMatchAttributesQuery(params);
					if (attributesArray && attributesArray.length > 0) {
						var matchesArray = attributesArray.map(function(attribute) {
							return {
								$elemMatch: {
									name: attribute.name,
									value: { $in: attribute.values }
								}
							};
						});

						queries.push({
							attributes: { $all: matchesArray }
						});
					}
				}

				var matchQuery = {};
				if (queries.length === 1) {
					matchQuery = queries[0];
				} else if (queries.length > 1) {
					matchQuery = {
						$and: queries
					};
				}

				return matchQuery;
			}
		},
		{
			key: 'getSingleProduct',
			value: function getSingleProduct(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getProducts({ ids: id, limit: 1 }).then(function(products) {
					return products.data.length > 0 ? products.data[0] : {};
				});
			}
		},
		{
			key: 'addProduct',
			value: function addProduct(data) {
				var _this3 = this;
				return this.getValidDocumentForInsert(data)
					.then(function(dataToInsert) {
						return _mongo.db.collection('products').insertMany([dataToInsert]);
					})
					.then(function(res) {
						return _this3.getSingleProduct(res.ops[0]._id.toString());
					});
			}
		},
		{
			key: 'updateProduct',
			value: function updateProduct(id, data) {
				var _this4 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(id);

				return this.getValidDocumentForUpdate(id, data)
					.then(function(dataToSet) {
						return _mongo.db
							.collection('products')
							.updateOne({ _id: productObjectID }, { $set: dataToSet });
					})
					.then(function(res) {
						return res.modifiedCount > 0 ? _this4.getSingleProduct(id) : null;
					});
			}
		},
		{
			key: 'deleteProduct',
			value: function deleteProduct(productId) {
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				// 1. delete Product
				return _mongo.db
					.collection('products')
					.deleteOne({ _id: productObjectID })
					.then(function(deleteResponse) {
						if (deleteResponse.deletedCount > 0) {
							// 2. delete directory with images
							var deleteDir = _path2.default.resolve(
								_settings2.default.productsUploadPath + '/' + productId
							);

							_fsExtra2.default.remove(deleteDir, function(err) {});
						}
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var _this5 = this;
				//  Allow empty product to create draft

				var product = {
					date_created: new Date(),
					date_updated: null,
					images: [],
					dimensions: {
						length: 0,
						width: 0,
						height: 0
					}
				};

				product.name = _parse2.default.getString(data.name);
				product.description = _parse2.default.getString(data.description);
				product.meta_description = _parse2.default.getString(
					data.meta_description
				);
				product.meta_title = _parse2.default.getString(data.meta_title);
				product.tags = _parse2.default.getArrayIfValid(data.tags) || [];
				product.attributes = this.getValidAttributesArray(data.attributes);
				product.enabled = _parse2.default.getBooleanIfValid(data.enabled, true);
				product.discontinued = _parse2.default.getBooleanIfValid(
					data.discontinued,
					false
				);
				product.slug = _parse2.default.getString(data.slug);
				product.sku = _parse2.default.getString(data.sku);
				product.code = _parse2.default.getString(data.code);
				product.tax_class = _parse2.default.getString(data.tax_class);
				product.related_product_ids = this.getArrayOfObjectID(
					data.related_product_ids
				);

				product.prices = _parse2.default.getArrayIfValid(data.prices) || [];
				product.cost_price =
					_parse2.default.getNumberIfPositive(data.cost_price) || 0;
				product.regular_price =
					_parse2.default.getNumberIfPositive(data.regular_price) || 0;
				product.sale_price =
					_parse2.default.getNumberIfPositive(data.sale_price) || 0;
				product.quantity_inc =
					_parse2.default.getNumberIfPositive(data.quantity_inc) || 1;
				product.quantity_min =
					_parse2.default.getNumberIfPositive(data.quantity_min) || 1;
				product.weight = _parse2.default.getNumberIfPositive(data.weight) || 0;
				product.stock_quantity =
					_parse2.default.getNumberIfPositive(data.stock_quantity) || 0;
				product.position = _parse2.default.getNumberIfValid(data.position);
				product.date_stock_expected = _parse2.default.getDateIfValid(
					data.date_stock_expected
				);

				product.date_sale_from = _parse2.default.getDateIfValid(
					data.date_sale_from
				);
				product.date_sale_to = _parse2.default.getDateIfValid(
					data.date_sale_to
				);
				product.stock_tracking = _parse2.default.getBooleanIfValid(
					data.stock_tracking,
					false
				);

				product.stock_preorder = _parse2.default.getBooleanIfValid(
					data.stock_preorder,
					false
				);

				product.stock_backorder = _parse2.default.getBooleanIfValid(
					data.stock_backorder,
					false
				);

				product.category_id = _parse2.default.getObjectIDIfValid(
					data.category_id
				);
				product.category_ids = _parse2.default.getArrayOfObjectID(
					data.category_ids
				);

				if (data.dimensions) {
					product.dimensions = data.dimensions;
				}

				if (product.slug.length === 0) {
					product.slug = product.name;
				}

				return this.setAvailableSlug(product).then(function(product) {
					return _this5.setAvailableSku(product);
				});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				var _this6 = this;
				if (Object.keys(data).length === 0) {
					throw new Error('Required fields are missing');
				}

				var product = {
					date_updated: new Date()
				};

				if (data.name !== undefined) {
					product.name = _parse2.default.getString(data.name);
				}

				if (data.description !== undefined) {
					product.description = _parse2.default.getString(data.description);
				}

				if (data.meta_description !== undefined) {
					product.meta_description = _parse2.default.getString(
						data.meta_description
					);
				}

				if (data.meta_title !== undefined) {
					product.meta_title = _parse2.default.getString(data.meta_title);
				}

				if (data.tags !== undefined) {
					product.tags = _parse2.default.getArrayIfValid(data.tags) || [];
				}

				if (data.attributes !== undefined) {
					product.attributes = this.getValidAttributesArray(data.attributes);
				}

				if (data.dimensions !== undefined) {
					product.dimensions = data.dimensions;
				}

				if (data.enabled !== undefined) {
					product.enabled = _parse2.default.getBooleanIfValid(
						data.enabled,
						true
					);
				}

				if (data.discontinued !== undefined) {
					product.discontinued = _parse2.default.getBooleanIfValid(
						data.discontinued,
						false
					);
				}

				if (data.slug !== undefined) {
					if (data.slug === '' && product.name && product.name.length > 0) {
						product.slug = product.name;
					} else {
						product.slug = _parse2.default.getString(data.slug);
					}
				}

				if (data.sku !== undefined) {
					product.sku = _parse2.default.getString(data.sku);
				}

				if (data.code !== undefined) {
					product.code = _parse2.default.getString(data.code);
				}

				if (data.tax_class !== undefined) {
					product.tax_class = _parse2.default.getString(data.tax_class);
				}

				if (data.related_product_ids !== undefined) {
					product.related_product_ids = this.getArrayOfObjectID(
						data.related_product_ids
					);
				}

				if (data.prices !== undefined) {
					product.prices = _parse2.default.getArrayIfValid(data.prices) || [];
				}

				if (data.cost_price !== undefined) {
					product.cost_price =
						_parse2.default.getNumberIfPositive(data.cost_price) || 0;
				}

				if (data.regular_price !== undefined) {
					product.regular_price =
						_parse2.default.getNumberIfPositive(data.regular_price) || 0;
				}

				if (data.sale_price !== undefined) {
					product.sale_price =
						_parse2.default.getNumberIfPositive(data.sale_price) || 0;
				}

				if (data.quantity_inc !== undefined) {
					product.quantity_inc =
						_parse2.default.getNumberIfPositive(data.quantity_inc) || 1;
				}

				if (data.quantity_min !== undefined) {
					product.quantity_min =
						_parse2.default.getNumberIfPositive(data.quantity_min) || 1;
				}

				if (data.weight !== undefined) {
					product.weight =
						_parse2.default.getNumberIfPositive(data.weight) || 0;
				}

				if (data.stock_quantity !== undefined) {
					product.stock_quantity =
						_parse2.default.getNumberIfPositive(data.stock_quantity) || 0;
				}

				if (data.position !== undefined) {
					product.position = _parse2.default.getNumberIfValid(data.position);
				}

				if (data.date_stock_expected !== undefined) {
					product.date_stock_expected = _parse2.default.getDateIfValid(
						data.date_stock_expected
					);
				}

				if (data.date_sale_from !== undefined) {
					product.date_sale_from = _parse2.default.getDateIfValid(
						data.date_sale_from
					);
				}

				if (data.date_sale_to !== undefined) {
					product.date_sale_to = _parse2.default.getDateIfValid(
						data.date_sale_to
					);
				}

				if (data.stock_tracking !== undefined) {
					product.stock_tracking = _parse2.default.getBooleanIfValid(
						data.stock_tracking,
						false
					);
				}

				if (data.stock_preorder !== undefined) {
					product.stock_preorder = _parse2.default.getBooleanIfValid(
						data.stock_preorder,
						false
					);
				}

				if (data.stock_backorder !== undefined) {
					product.stock_backorder = _parse2.default.getBooleanIfValid(
						data.stock_backorder,
						false
					);
				}

				if (data.category_id !== undefined) {
					product.category_id = _parse2.default.getObjectIDIfValid(
						data.category_id
					);
				}

				if (data.category_ids !== undefined) {
					product.category_ids = _parse2.default.getArrayOfObjectID(
						data.category_ids
					);
				}

				return this.setAvailableSlug(product, id).then(function(product) {
					return _this6.setAvailableSku(product, id);
				});
			}
		},
		{
			key: 'getArrayOfObjectID',
			value: function getArrayOfObjectID(array) {
				if (array && Array.isArray(array)) {
					return array.map(function(item) {
						return _parse2.default.getObjectIDIfValid(item);
					});
				} else {
					return [];
				}
			}
		},
		{
			key: 'getValidAttributesArray',
			value: function getValidAttributesArray(attributes) {
				if (attributes && Array.isArray(attributes)) {
					return attributes
						.filter(function(item) {
							return (
								item.name && item.name !== '' && item.value && item.value !== ''
							);
						})
						.map(function(item) {
							return {
								name: _parse2.default.getString(item.name),
								value: _parse2.default.getString(item.value)
							};
						});
				} else {
					return [];
				}
			}
		},
		{
			key: 'getSortedImagesWithUrls',
			value: function getSortedImagesWithUrls(item, domain) {
				var _this7 = this;
				if (item.images && item.images.length > 0) {
					return item.images
						.map(function(image) {
							image.url = _this7.getImageUrl(
								domain,
								item.id,
								image.filename || ''
							);
							return image;
						})
						.sort(function(a, b) {
							return a.position - b.position;
						});
				} else {
					return item.images;
				}
			}
		},
		{
			key: 'getImageUrl',
			value: function getImageUrl(domain, productId, imageFileName) {
				return _url2.default.resolve(
					domain,
					_settings2.default.productsUploadUrl +
						'/' +
						productId +
						'/' +
						imageFileName
				);
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item, domain) {
				if (item) {
					if (item.id) {
						item.id = item.id.toString();
					}

					item.images = this.getSortedImagesWithUrls(item, domain);

					if (item.category_id) {
						item.category_id = item.category_id.toString();

						if (item.categories && item.categories.length > 0) {
							var category = item.categories[0];
							if (category) {
								if (item.category_name === '') {
									item.category_name = category.name;
								}

								if (item.category_slug === '') {
									item.category_slug = category.slug;
								}

								var categorySlug = category.slug || '';
								var productSlug = item.slug || '';

								if (item.url === '') {
									item.url = _url2.default.resolve(
										domain,
										'/' + categorySlug + '/' + productSlug
									);
								}

								if (item.path === '') {
									item.path = '/' + categorySlug + '/' + productSlug;
								}
							}
						}
					}
					item.categories = undefined;
				}

				return item;
			}
		},
		{
			key: 'isSkuExists',
			value: function isSkuExists(sku, productId) {
				var filter = {
					sku: sku
				};

				if (productId && _mongodb.ObjectID.isValid(productId)) {
					filter._id = { $ne: new _mongodb.ObjectID(productId) };
				}

				return _mongo.db
					.collection('products')
					.count(filter)
					.then(function(count) {
						return count > 0;
					});
			}
		},
		{
			key: 'setAvailableSku',
			value: function setAvailableSku(product, productId) {
				// SKU can be empty
				if (product.sku && product.sku.length > 0) {
					var newSku = product.sku;
					var filter = {};
					if (productId && _mongodb.ObjectID.isValid(productId)) {
						filter._id = { $ne: new _mongodb.ObjectID(productId) };
					}

					return _mongo.db
						.collection('products')
						.find(filter)
						.project({ sku: 1 })
						.toArray()
						.then(function(products) {
							while (
								products.find(function(p) {
									return p.sku === newSku;
								})
							) {
								newSku += '-2';
							}
							product.sku = newSku;
							return product;
						});
				} else {
					return Promise.resolve(product);
				}
			}
		},
		{
			key: 'isSlugExists',
			value: function isSlugExists(slug, productId) {
				var filter = {
					slug: _utils2.default.cleanSlug(slug)
				};

				if (productId && _mongodb.ObjectID.isValid(productId)) {
					filter._id = { $ne: new _mongodb.ObjectID(productId) };
				}

				return _mongo.db
					.collection('products')
					.count(filter)
					.then(function(count) {
						return count > 0;
					});
			}
		},
		{
			key: 'setAvailableSlug',
			value: function setAvailableSlug(product, productId) {
				if (product.slug && product.slug.length > 0) {
					var newSlug = _utils2.default.cleanSlug(product.slug);
					var filter = {};
					if (productId && _mongodb.ObjectID.isValid(productId)) {
						filter._id = { $ne: new _mongodb.ObjectID(productId) };
					}

					return _mongo.db
						.collection('products')
						.find(filter)
						.project({ slug: 1 })
						.toArray()
						.then(function(products) {
							while (
								products.find(function(p) {
									return p.slug === newSlug;
								})
							) {
								newSlug += '-2';
							}
							product.slug = newSlug;
							return product;
						});
				} else {
					return Promise.resolve(product);
				}
			}
		}
	]);
	return ProductsService;
})();
exports.default = new ProductsService();
