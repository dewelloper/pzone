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
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _fsExtra = require('fs-extra');
var _fsExtra2 = _interopRequireDefault(_fsExtra);
var _fs = require('fs');
var _fs2 = _interopRequireDefault(_fs);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _formidable = require('formidable');
var _formidable2 = _interopRequireDefault(_formidable);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
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
var SettingsService = (function() {
	function SettingsService() {
		_classCallCheck(this, SettingsService);
		this.defaultSettings = {
			domain: '',
			logo_file: null,
			language: 'tr',
			currency_code: 'TL',
			currency_symbol: 'TL',
			currency_format: 'TL{amount}',
			thousand_separator: ',',
			decimal_separator: '.',
			decimal_number: 2,
			timezone: 'Asia/Istanbul',
			date_format: 'MMMM D, YYYY',
			time_format: 'h:mm a',
			default_shipping_country: 'TR',
			default_shipping_state: '',
			default_shipping_city: '',
			default_product_sorting: 'stock_status,price,position',
			product_fields:
				'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position',
			products_limit: 30,
			weight_unit: 'kg',
			length_unit: 'cm',
			hide_billing_address: false,
			order_confirmation_copy_to: ''
		};
	}
	_createClass(SettingsService, [
		{
			key: 'getSettings',
			value: function getSettings() {
				var _this = this;
				return _mongo.db
					.collection('settings')
					.findOne()
					.then(function(settings) {
						return _this.changeProperties(settings);
					});
			}
		},
		{
			key: 'updateSettings',
			value: function updateSettings(data) {
				var _this2 = this;
				var settings = this.getValidDocumentForUpdate(data);
				return this.insertDefaultSettingsIfEmpty().then(function() {
					return _mongo.db
						.collection('settings')
						.updateOne(
							{},
							{
								$set: settings
							},

							{ upsert: true }
						)
						.then(function(res) {
							return _this2.getSettings();
						});
				});
			}
		},
		{
			key: 'insertDefaultSettingsIfEmpty',
			value: function insertDefaultSettingsIfEmpty() {
				var _this3 = this;
				return _mongo.db
					.collection('settings')
					.countDocuments({})
					.then(function(count) {
						if (count === 0) {
							return _mongo.db
								.collection('settings')
								.insertOne(_this3.defaultSettings);
						} else {
							return;
						}
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var settings = {};

				if (data.language !== undefined) {
					settings.language = _parse2.default.getString(data.language);
				}

				if (data.currency_code !== undefined) {
					settings.currency_code = _parse2.default.getString(
						data.currency_code
					);
				}

				if (data.domain !== undefined) {
					settings.domain = _parse2.default.getString(data.domain);
				}

				if (data.currency_symbol !== undefined) {
					settings.currency_symbol = _parse2.default.getString(
						data.currency_symbol
					);
				}

				if (data.currency_format !== undefined) {
					settings.currency_format = _parse2.default.getString(
						data.currency_format
					);
				}

				if (data.thousand_separator !== undefined) {
					settings.thousand_separator = _parse2.default.getString(
						data.thousand_separator
					);
				}

				if (data.decimal_separator !== undefined) {
					settings.decimal_separator = _parse2.default.getString(
						data.decimal_separator
					);
				}

				if (data.decimal_number !== undefined) {
					settings.decimal_number =
						_parse2.default.getNumberIfPositive(data.decimal_number) || 0;
				}

				if (data.timezone !== undefined) {
					settings.timezone = _parse2.default.getString(data.timezone);
				}

				if (data.date_format !== undefined) {
					settings.date_format = _parse2.default.getString(data.date_format);
				}

				if (data.time_format !== undefined) {
					settings.time_format = _parse2.default.getString(data.time_format);
				}

				if (data.default_shipping_country !== undefined) {
					settings.default_shipping_country = _parse2.default.getString(
						data.default_shipping_country
					);
				}

				if (data.default_shipping_state !== undefined) {
					settings.default_shipping_state = _parse2.default.getString(
						data.default_shipping_state
					);
				}

				if (data.default_shipping_city !== undefined) {
					settings.default_shipping_city = _parse2.default.getString(
						data.default_shipping_city
					);
				}

				if (data.default_product_sorting !== undefined) {
					settings.default_product_sorting = _parse2.default.getString(
						data.default_product_sorting
					);
				}

				if (data.product_fields !== undefined) {
					settings.product_fields = _parse2.default.getString(
						data.product_fields
					);
				}

				if (data.products_limit !== undefined) {
					settings.products_limit = _parse2.default.getNumberIfPositive(
						data.products_limit
					);
				}

				if (data.weight_unit !== undefined) {
					settings.weight_unit = _parse2.default.getString(data.weight_unit);
				}

				if (data.length_unit !== undefined) {
					settings.length_unit = _parse2.default.getString(data.length_unit);
				}

				if (data.logo_file !== undefined) {
					settings.logo_file = _parse2.default.getString(data.logo_file);
				}

				if (data.hide_billing_address !== undefined) {
					settings.hide_billing_address = _parse2.default.getBooleanIfValid(
						data.hide_billing_address,
						false
					);
				}

				if (data.order_confirmation_copy_to !== undefined) {
					settings.order_confirmation_copy_to = _parse2.default.getString(
						data.order_confirmation_copy_to
					);
				}

				return settings;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(settingsFromDB) {
				var data = Object.assign(this.defaultSettings, settingsFromDB, {
					_id: undefined
				});

				if (data.domain === null || data.domain === undefined) {
					data.domain = '';
				}

				if (data.logo_file && data.logo_file.length > 0) {
					data.logo = _url2.default.resolve(
						data.domain,
						_settings2.default.filesUploadUrl + '/' + data.logo_file
					);
				} else {
					data.logo = null;
				}
				return data;
			}
		},
		{
			key: 'deleteLogo',
			value: function deleteLogo() {
				var _this4 = this;
				return this.getSettings().then(function(data) {
					if (data.logo_file && data.logo_file.length > 0) {
						var filePath = _path2.default.resolve(
							_settings2.default.filesUploadPath + '/' + data.logo_file
						);

						_fs2.default.unlink(filePath, function(err) {
							_this4.updateSettings({ logo_file: null });
						});
					}
				});
			}
		},
		{
			key: 'uploadLogo',
			value: function uploadLogo(req, res, next) {
				var _this5 = this;
				var uploadDir = _path2.default.resolve(
					_settings2.default.filesUploadPath
				);
				_fsExtra2.default.ensureDirSync(uploadDir);

				var form = new _formidable2.default.IncomingForm(),
					file_name = null,
					file_size = 0;

				form.uploadDir = uploadDir;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						file.name = _utils2.default.getCorrectFileName(file.name);
						file.path = uploadDir + '/' + file.name;
					})
					.on('file', function(field, file) {
						// every time a file has been uploaded successfully,
						file_name = file.name;
						file_size = file.size;
					})
					.on('error', function(err) {
						res.status(500).send(_this5.getErrorMessage(err));
					})
					.on('end', function() {
						//Emitted when the entire request has been received, and all contained files have finished flushing to disk.
						if (file_name) {
							_this5.updateSettings({ logo_file: file_name });
							res.send({ file: file_name, size: file_size });
						} else {
							res
								.status(400)
								.send(_this5.getErrorMessage('Required fields are missing'));
						}
					});

				form.parse(req);
			}
		},
		{
			key: 'getErrorMessage',
			value: function getErrorMessage(err) {
				return { error: true, message: err.toString() };
			}
		}
	]);
	return SettingsService;
})();
exports.default = new SettingsService();
