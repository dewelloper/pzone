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
var _fs = require('fs');
var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _lruCache = require('lru-cache');
var _lruCache2 = _interopRequireDefault(_lruCache);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var cache = (0, _lruCache2.default)({
	max: 10000,
	maxAge: 1000 * 60 * 60 * 24 // 24h
});

var THEME_SETTINGS_CACHE_KEY = 'themesettings';
var SETTINGS_FILE = _path2.default.resolve('theme/settings/settings.json');
var SETTINGS_SCHEMA_FILE = _path2.default.resolve(
	'theme/settings/' + _settings2.default.language + '.json'
);

var SETTINGS_SCHEMA_FILE_EN = _path2.default.resolve('theme/settings/en.json');
var ThemeSettingsService = (function() {
	function ThemeSettingsService() {
		_classCallCheck(this, ThemeSettingsService);
	}
	_createClass(ThemeSettingsService, [
		{
			key: 'readFile',
			value: function readFile(file) {
				return new Promise(function(resolve, reject) {
					_fs2.default.readFile(file, 'utf8', function(err, data) {
						if (err) {
							reject(err);
						} else {
							var jsonData = {};
							try {
								jsonData = data.length > 0 ? JSON.parse(data) : {};
								resolve(jsonData);
							} catch (e) {
								reject('Failed to parse JSON');
							}
						}
					});
				});
			}
		},
		{
			key: 'writeFile',
			value: function writeFile(file, jsonData) {
				return new Promise(function(resolve, reject) {
					var stringData = JSON.stringify(jsonData);
					_fs2.default.writeFile(file, stringData, function(err) {
						if (err) {
							reject(err);
						} else {
							resolve();
						}
					});
				});
			}
		},
		{
			key: 'getSettingsSchema',
			value: function getSettingsSchema() {
				if (_fs2.default.existsSync(SETTINGS_SCHEMA_FILE)) {
					return this.readFile(SETTINGS_SCHEMA_FILE);
				}

				// If current locale not exist, use scheme in English
				return this.readFile(SETTINGS_SCHEMA_FILE_EN);
			}
		},
		{
			key: 'getSettings',
			value: function getSettings() {
				var settingsFromCache = cache.get(THEME_SETTINGS_CACHE_KEY);

				if (settingsFromCache) {
					return Promise.resolve(settingsFromCache);
				}
				return this.readFile(SETTINGS_FILE).then(function(settings) {
					cache.set(THEME_SETTINGS_CACHE_KEY, settings);
					return settings;
				});
			}
		},
		{
			key: 'updateSettings',
			value: function updateSettings(settings) {
				cache.set(THEME_SETTINGS_CACHE_KEY, settings);
				return this.writeFile(SETTINGS_FILE, settings);
			}
		}
	]);
	return ThemeSettingsService;
})();
exports.default = new ThemeSettingsService();
