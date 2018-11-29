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
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
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

var DEFAULT_SORT = { is_system: -1, date_created: 1 };
var PagesService = (function() {
	function PagesService() {
		_classCallCheck(this, PagesService);
	}
	_createClass(PagesService, [
		{
			key: 'getFilter',
			value: function getFilter() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = {};
				var id = _parse2.default.getObjectIDIfValid(params.id);
				var tags = _parse2.default.getString(params.tags);
				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}
				if (tags && tags.length > 0) {
					filter.tags = tags;
				}
				return filter;
			}
		},
		{
			key: 'getSortQuery',
			value: function getSortQuery(_ref) {
				var sort = _ref.sort;
				if (sort && sort.length > 0) {
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
					return DEFAULT_SORT;
				}
			}
		},
		{
			key: 'getPages',
			value: async function getPages() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = this.getFilter(params);
				var sortQuery = this.getSortQuery(params);
				var projection = _utils2.default.getProjectionFromFields(params.fields);
				var generalSettings = await _settings4.default.getSettings();
				var domain = generalSettings.domain;
				var items = await _mongo.db
					.collection('pages')
					.find(filter, { projection: projection })
					.sort(sortQuery)
					.toArray();
				var result = items.map(function(page) {
					return _this.changeProperties(page, domain);
				});
				return result;
			}
		},
		{
			key: 'getSinglePage',
			value: function getSinglePage(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getPages({ id: id }).then(function(pages) {
					return pages.length > 0 ? pages[0] : null;
				});
			}
		},
		{
			key: 'addPage',
			value: function addPage(data) {
				var _this2 = this;
				return this.getValidDocumentForInsert(data).then(function(page) {
					return _mongo.db
						.collection('pages')
						.insertMany([page])
						.then(function(res) {
							return _this2.getSinglePage(res.ops[0]._id.toString());
						});
				});
			}
		},
		{
			key: 'updatePage',
			value: function updatePage(id, data) {
				var _this3 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var pageObjectID = new _mongodb.ObjectID(id);

				return this.getValidDocumentForUpdate(id, data).then(function(page) {
					return _mongo.db
						.collection('pages')
						.updateOne({ _id: pageObjectID }, { $set: page })
						.then(function(res) {
							return _this3.getSinglePage(id);
						});
				});
			}
		},
		{
			key: 'deletePage',
			value: function deletePage(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var pageObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('pages')
					.deleteOne({ _id: pageObjectID, is_system: false })
					.then(function(deleteResponse) {
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var page = {
					is_system: false,
					date_created: new Date()
				};

				page.content = _parse2.default.getString(data.content);
				page.meta_description = _parse2.default.getString(
					data.meta_description
				);
				page.meta_title = _parse2.default.getString(data.meta_title);
				page.enabled = _parse2.default.getBooleanIfValid(data.enabled, true);
				page.tags = _parse2.default.getArrayIfValid(data.tags) || [];

				var slug =
					!data.slug || data.slug.length === 0 ? data.meta_title : data.slug;
				if (!slug || slug.length === 0) {
					return Promise.resolve(page);
				} else {
					return _utils2.default
						.getAvailableSlug(slug, null, false)
						.then(function(newSlug) {
							page.slug = newSlug;
							return page;
						});
				}
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return Promise.reject('Required fields are missing');
				} else {
					return this.getSinglePage(id).then(function(prevPageData) {
						var page = {
							date_updated: new Date()
						};

						if (data.content !== undefined) {
							page.content = _parse2.default.getString(data.content);
						}

						if (data.meta_description !== undefined) {
							page.meta_description = _parse2.default.getString(
								data.meta_description
							);
						}

						if (data.meta_title !== undefined) {
							page.meta_title = _parse2.default.getString(data.meta_title);
						}

						if (data.enabled !== undefined && !prevPageData.is_system) {
							page.enabled = _parse2.default.getBooleanIfValid(
								data.enabled,
								true
							);
						}

						if (data.tags !== undefined) {
							page.tags = _parse2.default.getArrayIfValid(data.tags) || [];
						}

						if (data.slug !== undefined && !prevPageData.is_system) {
							var slug = data.slug;
							if (!slug || slug.length === 0) {
								slug = data.meta_title;
							}

							return _utils2.default
								.getAvailableSlug(slug, id, false)
								.then(function(newSlug) {
									page.slug = newSlug;
									return page;
								});
						} else {
							return page;
						}
					});
				}
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(item, domain) {
				if (item) {
					item.id = item._id.toString();
					item._id = undefined;

					if (!item.slug) {
						item.slug = '';
					}

					item.url = _url2.default.resolve(domain, '/' + item.slug);
					item.path = _url2.default.resolve('/', item.slug);
				}

				return item;
			}
		}
	]);
	return PagesService;
})();
exports.default = new PagesService();
