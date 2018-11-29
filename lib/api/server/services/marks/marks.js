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
var MarksService = (function() {
	function MarksService() {
		_classCallCheck(this, MarksService);
	}
	_createClass(MarksService, [
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
			key: 'getMarks',
			value: async function getMarks() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var items = await _mongo.db.collection('tt_cars').distinct('brand');
				return items;
			}
		},
		{
			key: 'getSingleMark',
			value: function getSingleMark(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getMarks({ id: id }).then(function(Marks) {
					return Marks.length > 0 ? Marks[0] : null;
				});
			}
		},
		{
			key: 'addMark',
			value: function addMark(data) {
				var _this = this;
				return this.getValidDocumentForInsert(data).then(function(Mark) {
					return _mongo.db
						.collection('Marks')
						.insertMany([Mark])
						.then(function(res) {
							return _this.getSingleMark(res.ops[0]._id.toString());
						});
				});
			}
		},
		{
			key: 'updateMark',
			value: function updateMark(id, data) {
				var _this2 = this;
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var MarkObjectID = new _mongodb.ObjectID(id);

				return this.getValidDocumentForUpdate(id, data).then(function(Mark) {
					return _mongo.db
						.collection('Marks')
						.updateOne({ _id: MarkObjectID }, { $set: Mark })
						.then(function(res) {
							return _this2.getSingleMark(id);
						});
				});
			}
		},
		{
			key: 'deleteMark',
			value: function deleteMark(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var MarkObjectID = new _mongodb.ObjectID(id);
				return _mongo.db
					.collection('Marks')
					.deleteOne({ _id: MarkObjectID, is_system: false })
					.then(function(deleteResponse) {
						return deleteResponse.deletedCount > 0;
					});
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var Mark = {
					is_system: false,
					date_created: new Date()
				};

				Mark.content = _parse2.default.getString(data.content);
				Mark.meta_description = _parse2.default.getString(
					data.meta_description
				);
				Mark.meta_title = _parse2.default.getString(data.meta_title);
				Mark.enabled = _parse2.default.getBooleanIfValid(data.enabled, true);
				Mark.tags = _parse2.default.getArrayIfValid(data.tags) || [];

				var slug =
					!data.slug || data.slug.length === 0 ? data.meta_title : data.slug;
				if (!slug || slug.length === 0) {
					return Promise.resolve(Mark);
				} else {
					return _utils2.default
						.getAvailableSlug(slug, null, false)
						.then(function(newSlug) {
							Mark.slug = newSlug;
							return Mark;
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
					return this.getSingleMark(id).then(function(prevMarkData) {
						var Mark = {
							date_updated: new Date()
						};

						if (data.content !== undefined) {
							Mark.content = _parse2.default.getString(data.content);
						}

						if (data.meta_description !== undefined) {
							Mark.meta_description = _parse2.default.getString(
								data.meta_description
							);
						}

						if (data.meta_title !== undefined) {
							Mark.meta_title = _parse2.default.getString(data.meta_title);
						}

						if (data.enabled !== undefined && !prevMarkData.is_system) {
							Mark.enabled = _parse2.default.getBooleanIfValid(
								data.enabled,
								true
							);
						}

						if (data.tags !== undefined) {
							Mark.tags = _parse2.default.getArrayIfValid(data.tags) || [];
						}

						if (data.slug !== undefined && !prevMarkData.is_system) {
							var slug = data.slug;
							if (!slug || slug.length === 0) {
								slug = data.meta_title;
							}

							return _utils2.default
								.getAvailableSlug(slug, id, false)
								.then(function(newSlug) {
									Mark.slug = newSlug;
									return Mark;
								});
						} else {
							return Mark;
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
	return MarksService;
})();
exports.default = new MarksService();
