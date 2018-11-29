'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getOrderFieldLabelByKey = exports.getThumbnailUrl = exports.formatFileSize = exports.formatCurrency = exports.formatNumber = undefined;
var _text = require('./text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var formatNumber = (exports.formatNumber = function formatNumber(
	number,
	settings
) {
	var x = 3;
	var floatNumber = parseFloat(number || 0) || 0;

	var re =
		'\\d(?=(\\d{' +
		x +
		'})+' +
		(settings.decimal_number > 0 ? '\\D' : '$') +
		')';

	var num = floatNumber.toFixed(Math.max(0, ~~settings.decimal_number));

	return (settings.decimal_separator
		? num.replace('.', settings.decimal_separator)
		: num
	).replace(new RegExp(re, 'g'), '$&' + settings.thousand_separator);
});

var amountPattern = '{amount}';
var formatCurrency = (exports.formatCurrency = function formatCurrency() {
	var number =
		arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var settings = arguments[1];
	return settings.currency_format.replace(
		amountPattern,
		formatNumber(number, settings)
	);
});

var formatFileSize = (exports.formatFileSize = function formatFileSize() {
	var bytes =
		arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) {
		return 'n/a';
	} else {
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
		if (i === 0) {
			return bytes + ' ' + sizes[i];
		} else {
			return (bytes / 1024 ** i).toFixed(1) + ' ' + sizes[i];
		}
	}
});

var getThumbnailUrl = (exports.getThumbnailUrl = function getThumbnailUrl(
	originalUrl,
	width
) {
	if (originalUrl && originalUrl.length > 0) {
		var pos = originalUrl.lastIndexOf('/');
		var thumbnailUrl =
			originalUrl.substring(0, pos) +
			('/' + width + '/') +
			originalUrl.substring(pos + 1);
		return thumbnailUrl;
	} else {
		return '';
	}
});

var getOrderFieldLabelByKey = (exports.getOrderFieldLabelByKey = function getOrderFieldLabelByKey(
	key
) {
	switch (key) {
		case 'full_name':
			return _text2.default.fullName;
		case 'address1':
			return _text2.default.address1;
		case 'address2':
			return _text2.default.address2;
		case 'postal_code':
			return _text2.default.postal_code;
		case 'phone':
			return _text2.default.phone;
		case 'company':
			return _text2.default.company;
		case 'mobile':
			return _text2.default.mobile;
		case 'city':
			return _text2.default.city;
		case 'comments':
			return _text2.default.customerComment;
		default:
			return '';
	}
});
