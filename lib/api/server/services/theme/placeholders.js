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
var ThemePlaceholdersService = (function() {
	function ThemePlaceholdersService() {
		_classCallCheck(this, ThemePlaceholdersService);
	}
	_createClass(ThemePlaceholdersService, [
		{
			key: 'getPlaceholders',
			value: function getPlaceholders() {
				return _mongo.db
					.collection('themePlaceholders')
					.find({}, { _id: 0 })
					.toArray();
			}
		},
		{
			key: 'getSinglePlaceholder',
			value: function getSinglePlaceholder(placeholderKey) {
				return _mongo.db
					.collection('themePlaceholders')
					.findOne({ key: placeholderKey }, { _id: 0 });
			}
		},
		{
			key: 'addPlaceholder',
			value: function addPlaceholder(data) {
				var _this = this;
				var field = this.getValidDocumentForInsert(data);
				var placeholderKey = field.key;

				return this.getSinglePlaceholder(placeholderKey).then(function(
					placeholder
				) {
					if (placeholder) {
						// placeholder exists
						return new Error('Placeholder exists');
					} else {
						// add
						return _mongo.db
							.collection('themePlaceholders')
							.insertOne(field)
							.then(function(res) {
								return _this.getSinglePlaceholder(placeholderKey);
							});
					}
				});
			}
		},
		{
			key: 'updatePlaceholder',
			value: function updatePlaceholder(placeholderKey, data) {
				var _this2 = this;
				var field = this.getValidDocumentForUpdate(data);
				return _mongo.db
					.collection('themePlaceholders')
					.updateOne(
						{ key: placeholderKey },
						{
							$set: field
						},

						{ upsert: true }
					)
					.then(function(res) {
						return _this2.getSinglePlaceholder(placeholderKey);
					});
			}
		},
		{
			key: 'deletePlaceholder',
			value: function deletePlaceholder(placeholderKey) {
				return _mongo.db
					.collection('themePlaceholders')
					.deleteOne({ key: placeholderKey });
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var field = {};

				if (data.place !== undefined) {
					field.place = _parse2.default.getString(data.place);
				}

				if (data.value !== undefined) {
					field.value = _parse2.default.getString(data.value);
				}

				return field;
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var field = {};

				if (data.key !== undefined) {
					field.key = _parse2.default.getString(data.key);
				}

				if (data.place !== undefined) {
					field.place = _parse2.default.getString(data.place);
				}

				if (data.value !== undefined) {
					field.value = _parse2.default.getString(data.value);
				}

				return field;
			}
		}
	]);
	return ThemePlaceholdersService;
})();
exports.default = new ThemePlaceholdersService();
