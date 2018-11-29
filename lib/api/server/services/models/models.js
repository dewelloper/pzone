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
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var DEFAULT_SORT = { is_system: -1, date_created: 1 };
var ModelsService = (function() {
	function ModelsService() {
		_classCallCheck(this, ModelsService);
	}
	_createClass(ModelsService, [
		{
			key: 'getModels',
			value: async function getModels() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var items = await _mongo.db
					.collection('tt_cars')
					.distinct('model', { brand: params.marks });
				return items;
			}
		}
	]);
	return ModelsService;
})();
exports.default = new ModelsService();
