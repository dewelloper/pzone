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
var AppSettingsService = (function() {
	function AppSettingsService() {
		_classCallCheck(this, AppSettingsService);
	}
	_createClass(AppSettingsService, [
		{
			key: 'getSettings',
			value: function getSettings(appKey) {
				return _mongo.db
					.collection('appSettings')
					.findOne({ key: appKey }, { _id: 0, key: 0 });
			}
		},
		{
			key: 'updateSettings',
			value: function updateSettings(appKey, data) {
				var _this = this;
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				delete data.key;

				return _mongo.db
					.collection('appSettings')
					.updateOne(
						{ key: appKey },
						{
							$set: data
						},

						{ upsert: true }
					)
					.then(function(res) {
						return _this.getSettings(appKey);
					});
			}
		}
	]);
	return AppSettingsService;
})();
exports.default = new AppSettingsService();
