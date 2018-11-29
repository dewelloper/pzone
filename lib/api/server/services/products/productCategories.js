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
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _formidable = require('formidable');
var _formidable2 = _interopRequireDefault(_formidable);
var _fsExtra = require('fs-extra');
var _fsExtra2 = _interopRequireDefault(_fsExtra);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _settings3 = require('../settings/settings');
var _settings4 = _interopRequireDefault(_settings3);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
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
var ProductCategoriesService = (function() {
	function ProductCategoriesService() {
		_classCallCheck(this, ProductCategoriesService);
	}
	_createClass(ProductCategoriesService, [
		{
			key: 'getFilter',
			value: function getFilter() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = {};
				var enabled = _parse2.default.getBooleanIfValid(params.enabled);
				if (enabled !== null) {
					filter.enabled = enabled;
				}
				var id = _parse2.default.getObjectIDIfValid(params.id);
				if (id) {
					filter._id = id;
				}
				return filter;
			}
		},
		{
			key: 'getCategories',
			value: async function getCategories() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = this.getFilter(params);
				var projection = _utils2.default.getProjectionFromFields(params.fields);
				var generalSettings = await _settings4.default.getSettings();
				var domain = generalSettings.domain;
				var items = await _mongo.db
					.collection('productCategories')
					.find(filter, { projection: projection })
					.sort({ position: 1 })
					.toArray();
				var result = items.map(function(category) {
					return _this.changeProperties(category, domain);
				});

				return result;
			}
		},
		{
			key: 'getSingleCategory',
			value: function getSingleCategory(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getCategories({ id: id }).then(function(categories) {
					return categories.length > 0 ? categories[0] : null;
				});
			}
		},
		{
			key: 'addCategory',
			value: async function addCategory(data) {
				var lastCategory = await _mongo.db
					.collection('productCategories')
					.findOne({}, { sort: { position: -1 } });
				var newPosition =
					lastCategory && lastCategory.position > 0
						? lastCategory.position + 1
						: 1;
				var dataToInsert = await this.getValidDocumentForInsert(
					data,
					newPosition
				);

				var insertResult = await _mongo.db
					.collection('productCategories')
					.insertMany([dataToInsert]);
				return this.getSingleCategory(insertResult.ops[0]._id.toString());
			}
		},
		{
			key: 'updateCategory',
			value: function updateCategory(id, data) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var categoryObjectID = new _mongodb.ObjectID(id);

				return this.getValidDocumentForUpdate(id, data)
					.then(function(dataToSet) {
						return _mongo.db
							.collection('productCategories')
							.updateOne({ _id: categoryObjectID }, { $set: dataToSet });
					})
					.then(function(res) {
						return res.modifiedCount > 0 ? _this2.getSingleCategory(id) : null;
					});
			}
		},
		{
			key: 'findAllChildren',
			value: function findAllChildren(items, id, result) {
				if (id && _mongodb.ObjectID.isValid(id)) {
					result.push(new _mongodb.ObjectID(id));
					var finded = items.filter(function(item) {
						return (item.parent_id || '').toString() === id.toString();
					});

					if (finded.length > 0) {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
						try {
							for (
								var _iterator = finded[Symbol.iterator](), _step;
								!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
								_iteratorNormalCompletion = true
							) {
								var item = _step.value;
								this.findAllChildren(items, item.id, result);
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
					}
				}

				return result;
			}
		},
		{
			key: 'deleteCategory',
			value: function deleteCategory(id) {
				var _this3 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}

				// 1. get all categories
				return this.getCategories()
					.then(function(items) {
						// 2. find category and children
						var idsToDelete = [];
						_this3.findAllChildren(items, id, idsToDelete);
						return idsToDelete;
					})
					.then(function(idsToDelete) {
						// 3. delete categories
						var objectsToDelete = idsToDelete.map(function(id) {
							return new _mongodb.ObjectID(id);
						});
						// return db.collection('productCategories').deleteMany({_id: { $in: objectsToDelete}}).then(() => idsToDelete);
						return _mongo.db
							.collection('productCategories')
							.deleteMany({ _id: { $in: objectsToDelete } })
							.then(function(deleteResponse) {
								return deleteResponse.deletedCount > 0 ? idsToDelete : null;
							});
					})
					.then(function(idsToDelete) {
						// 4. update category_id for products
						return idsToDelete
							? _mongo.db
									.collection('products')
									.updateMany(
										{ category_id: { $in: idsToDelete } },
										{ $set: { category_id: null } }
									)
									.then(function() {
										return idsToDelete;
									})
							: null;
					})
					.then(function(idsToDelete) {
						// 5. delete directories with images
						if (idsToDelete) {
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;
							try {
								for (
									var _iterator2 = idsToDelete[Symbol.iterator](), _step2;
									!(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
										.done);
									_iteratorNormalCompletion2 = true
								) {
									var categoryId = _step2.value;
									var deleteDir = _path2.default.resolve(
										_settings2.default.categoriesUploadPath + '/' + categoryId
									);

									_fsExtra2.default.remove(deleteDir, function(err) {});
								}
							} catch (err) {
								_didIteratorError2 = true;
								_iteratorError2 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion2 && _iterator2.return) {
										_iterator2.return();
									}
								} finally {
									if (_didIteratorError2) {
										throw _iteratorError2;
									}
								}
							}
							return Promise.resolve(true);
						} else {
							return Promise.resolve(false);
						}
					});
			}
		},
		{
			key: 'getErrorMessage',
			value: function getErrorMessage(err) {
				return { error: true, message: err.toString() };
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data, newPosition) {
				//  Allow empty category to create draft

				var category = {
					date_created: new Date(),
					date_updated: null,
					image: ''
				};

				category.name = _parse2.default.getString(data.name);
				category.description = _parse2.default.getString(data.description);
				category.meta_description = _parse2.default.getString(
					data.meta_description
				);
				category.meta_title = _parse2.default.getString(data.meta_title);
				category.enabled = _parse2.default.getBooleanIfValid(
					data.enabled,
					true
				);
				category.sort = _parse2.default.getString(data.sort);
				category.parent_id = _parse2.default.getObjectIDIfValid(data.parent_id);
				category.position =
					_parse2.default.getNumberIfValid(data.position) || newPosition;

				var slug = !data.slug || data.slug.length === 0 ? data.name : data.slug;
				if (!slug || slug.length === 0) {
					return Promise.resolve(category);
				} else {
					return _utils2.default.getAvailableSlug(slug).then(function(newSlug) {
						category.slug = newSlug;
						return category;
					});
				}
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				return new Promise(function(resolve, reject) {
					if (!_mongodb.ObjectID.isValid(id)) {
						reject('Invalid identifier');
					}
					if (Object.keys(data).length === 0) {
						reject('Required fields are missing');
					}

					var category = {
						date_updated: new Date()
					};

					if (data.name !== undefined) {
						category.name = _parse2.default.getString(data.name);
					}

					if (data.description !== undefined) {
						category.description = _parse2.default.getString(data.description);
					}

					if (data.meta_description !== undefined) {
						category.meta_description = _parse2.default.getString(
							data.meta_description
						);
					}

					if (data.meta_title !== undefined) {
						category.meta_title = _parse2.default.getString(data.meta_title);
					}

					if (data.enabled !== undefined) {
						category.enabled = _parse2.default.getBooleanIfValid(
							data.enabled,
							true
						);
					}

					if (data.image !== undefined) {
						category.image = data.image;
					}

					if (data.position >= 0) {
						category.position = data.position;
					}

					if (data.sort !== undefined) {
						category.sort = data.sort;
					}

					if (data.parent_id !== undefined) {
						category.parent_id = _parse2.default.getObjectIDIfValid(
							data.parent_id
						);
					}

					if (data.slug !== undefined) {
						var slug = data.slug;
						if (!slug || slug.length === 0) {
							slug = data.name;
						}

						_utils2.default
							.getAvailableSlug(slug, id)
							.then(function(newSlug) {
								category.slug = newSlug;
								resolve(category);
							})
							.catch(function(err) {
								reject(err);
							});
					} else {
						resolve(category);
					}
				});
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item, domain) {
				if (item) {
					item.id = item._id.toString();
					item._id = undefined;

					if (item.parent_id) {
						item.parent_id = item.parent_id.toString();
					}

					if (item.slug) {
						item.url = _url2.default.resolve(domain, '/' + item.slug);
						item.path = _url2.default.resolve('/', item.slug);
					}

					if (item.image) {
						item.image = _url2.default.resolve(
							domain,
							_settings2.default.categoriesUploadUrl +
								'/' +
								item.id +
								'/' +
								item.image
						);
					}
				}

				return item;
			}
		},
		{
			key: 'deleteCategoryImage',
			value: function deleteCategoryImage(id) {
				var dir = _path2.default.resolve(
					_settings2.default.categoriesUploadPath + '/' + id
				);
				_fsExtra2.default.emptyDirSync(dir);
				this.updateCategory(id, { image: '' });
			}
		},
		{
			key: 'uploadCategoryImage',
			value: function uploadCategoryImage(req, res) {
				var _this4 = this;
				var categoryId = req.params.id;
				var form = new _formidable2.default.IncomingForm(),
					file_name = null,
					file_size = 0;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						var dir = _path2.default.resolve(
							_settings2.default.categoriesUploadPath + '/' + categoryId
						);

						_fsExtra2.default.emptyDirSync(dir);
						file.name = _utils2.default.getCorrectFileName(file.name);
						file.path = dir + '/' + file.name;
					})
					.on('file', function(field, file) {
						// every time a file has been uploaded successfully,
						file_name = file.name;
						file_size = file.size;
					})
					.on('error', function(err) {
						res.status(500).send(_this4.getErrorMessage(err));
					})
					.on('end', function() {
						//Emitted when the entire request has been received, and all contained files have finished flushing to disk.
						if (file_name) {
							_this4.updateCategory(categoryId, { image: file_name });
							res.send({ file: file_name, size: file_size });
						} else {
							res
								.status(400)
								.send(_this4.getErrorMessage('Required fields are missing'));
						}
					});

				form.parse(req);
			}
		}
	]);
	return ProductCategoriesService;
})();
exports.default = new ProductCategoriesService();
