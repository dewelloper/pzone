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
var EmailTemplatesService = (function() {
	function EmailTemplatesService() {
		_classCallCheck(this, EmailTemplatesService);
	}
	_createClass(EmailTemplatesService, [
		{
			key: 'getEmailTemplate',
			value: function getEmailTemplate(name) {
				var _this = this;
				return _mongo.db
					.collection('emailTemplates')
					.findOne({ name: name })
					.then(function(template) {
						return _this.changeProperties(template);
					});
			}
		},
		{
			key: 'updateEmailTemplate',
			value: function updateEmailTemplate(name, data) {
				var _this2 = this;
				var template = this.getValidDocumentForUpdate(data);
				return _mongo.db
					.collection('emailTemplates')
					.updateOne(
						{ name: name },
						{
							$set: template
						},

						{ upsert: true }
					)
					.then(function(res) {
						return _this2.getEmailTemplate(name);
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var template = {};

				if (data.subject !== undefined) {
					template.subject = _parse2.default.getString(data.subject);
				}

				if (data.body !== undefined) {
					template.body = _parse2.default.getString(data.body);
				}

				return template;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(template) {
				if (template) {
					delete template._id;
					delete template.name;
				} else {
					return {
						subject: '',
						body: ''
					};
				}

				return template;
			}
		}
	]);
	return EmailTemplatesService;
})();
exports.default = new EmailTemplatesService();
