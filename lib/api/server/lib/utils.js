'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slug = require('slug');
var _slug2 = _interopRequireDefault(_slug);
var _sitemap = require('../services/sitemap');
var _sitemap2 = _interopRequireDefault(_sitemap);
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

var slugConfig = {
	symbols: false, // replace unicode symbols or not
	remove: null, // (optional) regex to remove characters
	lower: true // result in lower case
};

var cleanSlug = function cleanSlug(text) {
	return (0, _slug2.default)(text || '', slugConfig);
};

var getAvailableSlug = function getAvailableSlug(path, resource) {
	var enableCleanPath =
		arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	return _sitemap2.default.getPaths().then(function(paths) {
		if (enableCleanPath) {
			path = cleanSlug(path);
		}

		var pathExists = paths.find(function(e) {
			return e.path === '/' + path && e.resource != resource;
		});

		while (pathExists) {
			path += '-2';
			pathExists = paths.find(function(e) {
				return e.path === '/' + path && e.resource != resource;
			});
		}
		return path;
	});
};

var getCorrectFileName = function getCorrectFileName(filename) {
	if (filename) {
		// replace unsafe characters
		return filename.replace(/[\s*/:;&?@$()<>#%\{\}|\\\^\~\[\]]/g, '-');
	} else {
		return filename;
	}
};

var getProjectionFromFields = function getProjectionFromFields(fields) {
	var fieldsArray = fields && fields.length > 0 ? fields.split(',') : [];
	return Object.assign.apply(
		Object,
		[{}].concat(
			_toConsumableArray(
				fieldsArray.map(function(key) {
					return _defineProperty({}, key, 1);
				})
			)
		)
	);
};
exports.default = {
	cleanSlug: cleanSlug,
	getAvailableSlug: getAvailableSlug,
	getCorrectFileName: getCorrectFileName,
	getProjectionFromFields: getProjectionFromFields
};
