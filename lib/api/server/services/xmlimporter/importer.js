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
var _nodeFetch = require('node-fetch');
var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _fsExtra = require('fs-extra');
var _fsExtra2 = _interopRequireDefault(_fsExtra);
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
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var XMLParser = require('react-xml-parser');
var parser = require('xml2json');
var ImporterService = (function() {
	function ImporterService() {
		_classCallCheck(this, ImporterService);
	}
	_createClass(
		ImporterService,
		[
			{
				key: 'importFromOuterAPI',
				value: async function importFromOuterAPI() {
					var params =
						arguments.length > 0 && arguments[0] !== undefined
							? arguments[0]
							: {};
					var outerApiUrl = ' http://www.sedaford.com/blgislm/fordparca.xml'; //params.url;

					(0, _nodeFetch2.default)(outerApiUrl)
						.then(function(response) {
							return response.text();
						})
						.then(function(xmlStr) {
							var currentdate = new Date();
							var datetimeStart =
								currentdate.getDate() +
								'/' +
								(currentdate.getMonth() + 1) +
								'/' +
								currentdate.getFullYear() +
								' @ ' +
								currentdate.getHours() +
								':' +
								currentdate.getMinutes() +
								':' +
								currentdate.getSeconds();

							var datetimeEnd =
								currentdate.getDate() +
								'/' +
								(currentdate.getMonth() + 2) +
								'/' +
								currentdate.getFullYear() +
								' @ ' +
								currentdate.getHours() +
								':' +
								currentdate.getMinutes() +
								':' +
								currentdate.getSeconds();

							var product_description =
								'ÜRÜN - TESLİMAT BİLGİLERİ\
										  Kargo Hariç olan ürünlerimizde Türkiye nin her yerine en uygun fiyatlarda göndermekteyiz.\
										  Yayınlanan görseller ürünün gerçek resmidir.\
										  Siparişleriniz stok durumuna göre 1 - 2 iş günü içerisinde kargoya teslim edilecektir.\
										  Aksi bir durumda telefon veya mesaj ile irtibata geçilecektir.\
										  Satın almış olduğunuz tüm ürünler faturası ile gönderilir.\
										  Elektronik ürünlerde takılıp sökülmüş ürünlerin iadesi yapılmamaktadır.\
										  Birden fazla alımlarda, siparişleriniz tek kargo ile gönderilir.\
										  Anlaşmalı kargo şirketi Aras ve Sürat kargo olup firmamız önceden haber vermeksizin değiştirme hakkını saklı tutar.\
										  Ürün ve kargo ile ilgili tüm sorularınıza iletişim kanallarımızdan hızlıca cevap verilecektir. \n\
										  Ürünün aracınıza uygun olup olamdığından emin olmak için\
										  aracınızın ŞASE numarasını;\n\
										  0542 489 39 10 numaralı WhatsApp Hattımıza yazabilir ya da\
										  0850 885 01 85 numaralı Destek Hattımıza ulaşabilirsiniz.';

							var json = parser.toJson(xmlStr);

							JSON.parse(json).fordparca.item.forEach(function(item) {
								var regualPrice =
									parseFloat(item.FIYAT) - (parseFloat(item.FIYAT) / 100) * 10;
								var costPrice = parseFloat(item.FIYAT);
								var salePrice = parseFloat(item.FIYAT) * 1.3 * 1.18 + 5;

								_mongo.db
									.collection('productCategories')
									.findOne({ name: item.KATEGORI }, { _id: 1 })
									.then(function(category) {
										try {
											if (category !== null && category !== undefined) {
												_mongo.db
													.collection('products')
													.findOne({ sku: item.STOKKODU }, { _id: 1 })
													.then(function(product) {
														var tslug = ImporterService.ToSeoUrl(item.STOKADI);
														if (product !== null && product !== undefined) {
															var _$set;
															_mongo.db.collection('products').updateOne(
																{ _id: product._id },
																{
																	$set: ((_$set = {
																		name: item.STOKADI,
																		slug: tslug,
																		category_id: category._id,
																		regular_price: regualPrice,
																		cost_price: costPrice,
																		sale_price: salePrice,
																		stock_quantity: 1,
																		enabled: true,
																		discontinued: false,
																		oem: item.OEMKODU
																	}),
																	_defineProperty(
																		_$set,
																		'stock_quantity',
																		item.STOKDURUMU == 'VAR' ? 1 : 0
																	),
																	_defineProperty(_$set, 'sku', item.STOKKODU),
																	_defineProperty(
																		_$set,
																		'stock_tracking',
																		true
																	),
																	_defineProperty(
																		_$set,
																		'stock_preorder',
																		true
																	),
																	_defineProperty(
																		_$set,
																		'stock_backorder',
																		true
																	),
																	_defineProperty(
																		_$set,
																		'date_sale_from',
																		datetimeStart
																	),
																	_defineProperty(
																		_$set,
																		'date_sale_to',
																		datetimeEnd
																	),
																	_defineProperty(_$set, 'quantity_inc', 1),
																	_defineProperty(_$set, 'quantity_min', 1),
																	_defineProperty(_$set, 'weight', 1),
																	_defineProperty(_$set, 'discontinued', false),
																	_defineProperty(_$set, 'enabled', true),
																	_defineProperty(
																		_$set,
																		'date_created',
																		currentdate
																	),
																	_defineProperty(
																		_$set,
																		'date_updated',
																		currentdate
																	),
																	_defineProperty(
																		_$set,
																		'description',
																		product_description
																	),
																	_defineProperty(_$set, 'attributes', [
																		{ name: 'Marka', value: 'SedaSan' }
																	]),
																	_defineProperty(
																		_$set,
																		'images',

																		[
																			{
																				filename: item.STOKKODU + '.jpeg',
																				_id: new _mongodb.ObjectID(),
																				alt: '',
																				position: 99
																			}
																		]
																	),
																	_$set)
																},

																{ multi: false },
																function(err, result) {
																	if (err) {
																		console.log(err);
																	} else {
																		var sourceFile =
																			'theme/assets/images/urunresimleri/' +
																			item.STOKKODU +
																			'.jpeg';
																		var targetFile =
																			'public/content/images/products/' +
																			product._id +
																			'/' +
																			item.STOKKODU +
																			'.jpeg';

																		_fsExtra2.default.stat(sourceFile, function(
																			err,
																			stat
																		) {
																			if (
																				err != null &&
																				err.code === 'ENOENT'
																			) {
																				sourceFile =
																					'public/content/images/products/parcaalani.png';
																			}
																		});

																		var uploadDir = _path2.default.resolve(
																			'public/content/images/products/' +
																				product._id
																		);

																		_fsExtra2.default.ensureDirSync(uploadDir);
																		_fsExtra2.default.copySync(
																			_path2.default.resolve(sourceFile),
																			_path2.default.resolve(targetFile)
																		);
																	}
																}
															);
														} else {
															var _db$collection$insert;
															_mongo.db.collection('products').insertOne(
																((_db$collection$insert = {
																	name: item.STOKADI,
																	slug: tslug,
																	category_id: category._id,
																	regular_price: regualPrice,
																	cost_price: costPrice,
																	sale_price: salePrice,
																	stock_quantity: 1,
																	enabled: true,
																	discontinued: false,
																	oem: item.OEMKODU
																}),
																_defineProperty(
																	_db$collection$insert,
																	'stock_quantity',
																	item.STOKDURUMU == 'VAR' ? 1 : 0
																),
																_defineProperty(
																	_db$collection$insert,
																	'sku',
																	item.STOKKODU
																),
																_defineProperty(
																	_db$collection$insert,
																	'stock_tracking',
																	true
																),
																_defineProperty(
																	_db$collection$insert,
																	'stock_preorder',
																	true
																),
																_defineProperty(
																	_db$collection$insert,
																	'stock_backorder',
																	true
																),
																_defineProperty(
																	_db$collection$insert,
																	'date_sale_from',
																	datetimeStart
																),
																_defineProperty(
																	_db$collection$insert,
																	'date_sale_to',
																	datetimeEnd
																),
																_defineProperty(
																	_db$collection$insert,
																	'quantity_inc',
																	1
																),
																_defineProperty(
																	_db$collection$insert,
																	'quantity_min',
																	1
																),
																_defineProperty(
																	_db$collection$insert,
																	'weight',
																	1
																),
																_defineProperty(
																	_db$collection$insert,
																	'discontinued',
																	false
																),
																_defineProperty(
																	_db$collection$insert,
																	'enabled',
																	true
																),
																_defineProperty(
																	_db$collection$insert,
																	'date_created',
																	currentdate
																),
																_defineProperty(
																	_db$collection$insert,
																	'date_updated',
																	currentdate
																),
																_defineProperty(
																	_db$collection$insert,
																	'description',
																	product_description
																),
																_defineProperty(
																	_db$collection$insert,
																	'attributes',
																	[{ name: 'Marka', value: 'SedaSan' }]
																),
																_defineProperty(
																	_db$collection$insert,
																	'images',

																	[
																		{
																			filename: item.STOKKODU + '.jpeg',
																			_id: new _mongodb.ObjectID(),
																			alt: '',
																			position: 99
																		}
																	]
																),
																_db$collection$insert),
																function(err, result) {
																	if (err) {
																		console.log(err);
																	} else {
																		var sourceFile =
																			'theme/assets/images/urunresimleri/' +
																			item.STOKKODU +
																			'.jpeg';
																		var targetFile =
																			'public/content/images/products/' +
																			product._id +
																			'/' +
																			item.STOKKODU +
																			'.jpeg';

																		_fsExtra2.default.stat(sourceFile, function(
																			err,
																			stat
																		) {
																			if (
																				err != null &&
																				err.code === 'ENOENT'
																			) {
																				sourceFile =
																					'public/content/images/products/parcaalani.png';
																			}
																		});

																		var uploadDir = _path2.default.resolve(
																			'public/content/images/products/' +
																				product._id
																		);

																		_fsExtra2.default.ensureDirSync(uploadDir);
																		_fsExtra2.default.copySync(
																			_path2.default.resolve(sourceFile),
																			_path2.default.resolve(targetFile)
																		);
																	}
																}
															);
														}
													});
											}
										} catch (err) {
											console.log(err.message);
										}
									});
							});
						})
						.catch(function(error) {
							console.log(error);
						});

					console.log('- Added products from Outer API');

					return true;
				}
			}
		],
		[
			{
				key: 'ToSeoUrl',
				value: function ToSeoUrl(textString) {
					textString = textString.replace(/ /g, '-');
					textString = textString.replace(/</g, '');
					textString = textString.replace(/>/g, '');
					textString = textString.replace(/"/g, '');
					textString = textString.replace(/é/g, '');
					textString = textString.replace(/!/g, '');
					textString = textString.replace(/'/, '');
					textString = textString.replace(/£/, '');
					textString = textString.replace(/^/, '');
					textString = textString.replace(/#/, '');
					textString = textString.replace(/$/, '');
					textString = textString.replace(/\+/g, '');
					textString = textString.replace(/%/g, '');
					textString = textString.replace(/½/g, '');
					textString = textString.replace(/&/g, '');
					textString = textString.replace(/\//g, '');
					textString = textString.replace(/{/g, '');
					textString = textString.replace(/\(/g, '');
					textString = textString.replace(/\[/g, '');
					textString = textString.replace(/\)/g, '');
					textString = textString.replace(/]/g, '');
					textString = textString.replace(/=/g, '');
					textString = textString.replace(/}/g, '');
					textString = textString.replace(/\?/g, '');
					textString = textString.replace(/\*/g, '');
					textString = textString.replace(/@/g, '');
					textString = textString.replace(/€/g, '');
					textString = textString.replace(/~/g, '');
					textString = textString.replace(/æ/g, '');
					textString = textString.replace(/ß/g, '');
					textString = textString.replace(/;/g, '');
					textString = textString.replace(/,/g, '');
					textString = textString.replace(/`/g, '');
					textString = textString.replace(/|/g, '');
					textString = textString.replace(/\./g, '');
					textString = textString.replace(/:/g, '');
					textString = textString.replace(/İ/g, 'i');
					textString = textString.replace(/I/g, 'i');
					textString = textString.replace(/ı/g, 'i');
					textString = textString.replace(/ğ/g, 'g');
					textString = textString.replace(/Ğ/g, 'g');
					textString = textString.replace(/ü/g, 'u');
					textString = textString.replace(/Ü/g, 'u');
					textString = textString.replace(/ş/g, 's');
					textString = textString.replace(/Ş/g, 's');
					textString = textString.replace(/ö/g, 'o');
					textString = textString.replace(/Ö/g, 'o');
					textString = textString.replace(/ç/g, 'c');
					textString = textString.replace(/Ç/g, 'c');
					textString = textString.replace(/--/g, '-');
					textString = textString.replace(/---/g, '-');
					textString = textString.replace(/----/g, '-');
					textString = textString.replace(/----/g, '-');

					return textString.toLowerCase();
				}
			}
		]
	);
	return ImporterService;
})();
exports.default = new ImporterService();
