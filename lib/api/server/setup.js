'use strict';
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _mongodb = require('mongodb');
var _logger = require('./lib/logger');
var _logger2 = _interopRequireDefault(_logger);
var _settings = require('./lib/settings');
var _settings2 = _interopRequireDefault(_settings);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mongodbConnection = _settings2.default.mongodbServerUrl;
var mongoPathName = _url2.default.parse(mongodbConnection).pathname;
var dbName = mongoPathName.substring(mongoPathName.lastIndexOf('/') + 1);

var CONNECT_OPTIONS = {
	useNewUrlParser: true
};

var DEFAULT_LANGUAGE = 'english';

var addPage = async function addPage(db, pageObject) {
	var count = await db
		.collection('pages')
		.countDocuments({ slug: pageObject.slug });
	var docExists = +count > 0;
	if (!docExists) {
		await db.collection('pages').insertOne(pageObject);
		_winston2.default.info('- Added page: /' + pageObject.slug);
	}
};

var addAllPages = async function addAllPages(db) {
	await addPage(db, {
		slug: '',
		meta_title: 'Home',
		enabled: true,
		is_system: true
	});

	await addPage(db, {
		slug: 'checkout',
		meta_title: 'Checkout',
		enabled: true,
		is_system: true
	});

	await addPage(db, {
		slug: 'checkout-success',
		meta_title: 'Thank You!',
		enabled: true,
		is_system: true
	});

	await addPage(db, {
		slug: 'about',
		meta_title: 'About us',
		enabled: true,
		is_system: false
	});
};

var addAllProducts = async function addAllProducts(db) {
	var productCategoriesCount = await db
		.collection('productCategories')
		.countDocuments({});

	var productsCount = await db.collection('products').countDocuments({});

	var productsNotExists = productCategoriesCount === 0 && productsCount === 0;

	if (productsNotExists) {
		var catA = await db.collection('productCategories').insertOne({
			name: 'Category A',
			slug: 'category-a',
			image: '',
			parent_id: null,
			enabled: true
		});

		var catB = await db.collection('productCategories').insertOne({
			name: 'Category B',
			slug: 'category-b',
			image: '',
			parent_id: null,
			enabled: true
		});

		var catC = await db.collection('productCategories').insertOne({
			name: 'Category C',
			slug: 'category-c',
			image: '',
			parent_id: null,
			enabled: true
		});

		var catA1 = await db.collection('productCategories').insertOne({
			name: 'Subcategory 1',
			slug: 'category-a-1',
			image: '',
			parent_id: catA.insertedId,
			enabled: true
		});

		var catA2 = await db.collection('productCategories').insertOne({
			name: 'Subcategory 2',
			slug: 'category-a-2',
			image: '',
			parent_id: catA.insertedId,
			enabled: true
		});

		var catA3 = await db.collection('productCategories').insertOne({
			name: 'Subcategory 3',
			slug: 'category-a-3',
			image: '',
			parent_id: catA.insertedId,
			enabled: true
		});

		await db.collection('products').insertOne({
			name: 'Product A',
			slug: 'product-a',
			category_id: catA.insertedId,
			regular_price: 950,
			stock_quantity: 1,
			enabled: true,
			discontinued: false,
			attributes: [
				{ name: 'Brand', value: 'Brand A' },
				{ name: 'Size', value: 'M' }
			]
		});

		await db.collection('products').insertOne({
			name: 'Product B',
			slug: 'product-b',
			category_id: catA.insertedId,
			regular_price: 1250,
			stock_quantity: 1,
			enabled: true,
			discontinued: false,
			attributes: [
				{ name: 'Brand', value: 'Brand B' },
				{ name: 'Size', value: 'L' }
			]
		});

		_winston2.default.info('- Added products');
	}
};

var addEmailTemplates = async function addEmailTemplates(db) {
	var emailTemplatesCount = await db
		.collection('emailTemplates')
		.countDocuments({ name: 'order_confirmation' });
	var emailTemplatesNotExists = emailTemplatesCount === 0;
	if (emailTemplatesNotExists) {
		await db.collection('emailTemplates').insertOne({
			name: 'order_confirmation',
			subject: 'Order confirmation',
			body:
				'<div>\n\t\t\t<div><b>Order number</b>: {{number}}</div>\n\t\t\t<div><b>Shipping method</b>: {{shipping_method}}</div>\n\t\t\t<div><b>Payment method</b>: {{payment_method}}</div>\n\t\t  \n\t\t\t<div style="width: 100%; margin-top: 20px;">\n\t\t\t  Shipping to<br /><br />\n\t\t\t  <b>Full name</b>: {{shipping_address.full_name}}<br />\n\t\t\t  <b>Address 1</b>: {{shipping_address.address1}}<br />\n\t\t\t  <b>Address 2</b>: {{shipping_address.address2}}<br />\n\t\t\t  <b>Postal code</b>: {{shipping_address.postal_code}}<br />\n\t\t\t  <b>City</b>: {{shipping_address.city}}<br />\n\t\t\t  <b>State</b>: {{shipping_address.state}}<br />\n\t\t\t  <b>Phone</b>: {{shipping_address.phone}}\n\t\t\t</div>\n\t\t  \n\t\t\t<table style="width: 100%; margin-top: 20px;">\n\t\t\t  <tr>\n\t\t\t\t<td style="width: 40%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: left;">Item</td>\n\t\t\t\t<td style="width: 25%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Price</td>\n\t\t\t\t<td style="width: 10%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Qty</td>\n\t\t\t\t<td style="width: 25%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Total</td>\n\t\t\t  </tr>\n\t\t  \n\t\t\t  {{#each items}}\n\t\t\t  <tr>\n\t\t\t\t<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: left;">{{name}}<br />{{variant_name}}</td>\n\t\t\t\t<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">$ {{price}}</td>\n\t\t\t\t<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">{{quantity}}</td>\n\t\t\t\t<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">$ {{price_total}}</td>\n\t\t\t  </tr>\n\t\t\t  {{/each}}\n\t\t  \n\t\t\t</table>\n\t\t  \n\t\t\t<table style="width: 100%; margin: 20px 0;">\n\t\t\t  <tr>\n\t\t\t\t<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Subtotal</b></td>\n\t\t\t\t<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{subtotal}}</td>\n\t\t\t  </tr>\n\t\t\t  <tr>\n\t\t\t\t<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Shipping</b></td>\n\t\t\t\t<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{shipping_total}}</td>\n\t\t\t  </tr>\n\t\t\t  <tr>\n\t\t\t\t<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Grand total</b></td>\n\t\t\t\t<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{grand_total}}</td>\n\t\t\t  </tr>\n\t\t\t</table>\n\t\t  \n\t\t  </div>'
		});

		_winston2.default.info('- Added email template for Order Confirmation');
	}
};

var addShippingMethods = async function addShippingMethods(db) {
	var shippingMethodsCount = await db
		.collection('shippingMethods')
		.countDocuments({});
	var shippingMethodsNotExists = shippingMethodsCount === 0;
	if (shippingMethodsNotExists) {
		await db.collection('shippingMethods').insertOne({
			name: 'Shipping method A',
			enabled: true,
			conditions: {
				countries: [],
				states: [],
				cities: [],
				subtotal_min: 0,
				subtotal_max: 0,
				weight_total_min: 0,
				weight_total_max: 0
			}
		});

		_winston2.default.info('- Added shipping method');
	}
};

var addPaymentMethods = async function addPaymentMethods(db) {
	var paymentMethodsCount = await db
		.collection('paymentMethods')
		.countDocuments({});
	var paymentMethodsNotExists = paymentMethodsCount === 0;
	if (paymentMethodsNotExists) {
		await db.collection('paymentMethods').insertOne({
			name: 'PayPal',
			enabled: true,
			conditions: {
				countries: [],
				shipping_method_ids: [],
				subtotal_min: 0,
				subtotal_max: 0
			}
		});

		_winston2.default.info('- Added payment method');
	}
};

var createIndex = function createIndex(db, collectionName, fields, options) {
	return db.collection(collectionName).createIndex(fields, options);
};

var createAllIndexes = async function createAllIndexes(db) {
	var pagesIndexes = await db
		.collection('pages')
		.listIndexes()
		.toArray();

	if (pagesIndexes.length === 1) {
		await createIndex(db, 'pages', { enabled: 1 });
		await createIndex(db, 'pages', { slug: 1 });
		_winston2.default.info('- Created indexes for: pages');
	}

	var productCategoriesIndexes = await db
		.collection('productCategories')
		.listIndexes()
		.toArray();

	if (productCategoriesIndexes.length === 1) {
		await createIndex(db, 'productCategories', { enabled: 1 });
		await createIndex(db, 'productCategories', { slug: 1 });
		_winston2.default.info('- Created indexes for: productCategories');
	}

	var productsIndexes = await db
		.collection('products')
		.listIndexes()
		.toArray();

	if (productsIndexes.length === 1) {
		await createIndex(db, 'products', { slug: 1 });
		await createIndex(db, 'products', { enabled: 1 });
		await createIndex(db, 'products', { category_id: 1 });
		await createIndex(db, 'products', { sku: 1 });
		await createIndex(db, 'products', {
			'attributes.name': 1,
			'attributes.value': 1
		});

		await createIndex(
			db,
			'products',
			{
				name: 'text',
				description: 'text'
			},

			{ default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
		);

		_winston2.default.info('- Created indexes for: products');
	}

	var customersIndexes = await db
		.collection('customers')
		.listIndexes()
		.toArray();

	if (customersIndexes.length === 1) {
		await createIndex(db, 'customers', { group_id: 1 });
		await createIndex(db, 'customers', { email: 1 });
		await createIndex(db, 'customers', { mobile: 1 });
		await createIndex(
			db,
			'customers',
			{
				full_name: 'text',
				'addresses.address1': 'text'
			},

			{ default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
		);

		_winston2.default.info('- Created indexes for: customers');
	}

	var ordersIndexes = await db
		.collection('orders')
		.listIndexes()
		.toArray();

	if (ordersIndexes.length === 1) {
		await createIndex(db, 'orders', { draft: 1 });
		await createIndex(db, 'orders', { number: 1 });
		await createIndex(db, 'orders', { customer_id: 1 });
		await createIndex(db, 'orders', { email: 1 });
		await createIndex(db, 'orders', { mobile: 1 });
		await createIndex(
			db,
			'orders',
			{
				'shipping_address.full_name': 'text',
				'shipping_address.address1': 'text'
			},

			{ default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
		);

		_winston2.default.info('- Created indexes for: orders');
	}
};

var addUser = async function addUser(db, userEmail) {
	if (userEmail && userEmail.includes('@')) {
		var tokensCount = await db.collection('tokens').countDocuments({
			email: userEmail
		});

		var tokensNotExists = tokensCount === 0;

		if (tokensNotExists) {
			await db.collection('tokens').insertOne({
				is_revoked: false,
				date_created: new Date(),
				expiration: 72,
				name: 'Owner',
				email: userEmail,
				scopes: ['admin']
			});

			_winston2.default.info('- Added token with email: ' + userEmail);
		}
	}
};

var addSettings = async function addSettings(db, _ref) {
	var domain = _ref.domain;
	if (domain && (domain.includes('https://') || domain.includes('http://'))) {
		await db.collection('settings').updateOne(
			{},
			{
				$set: {
					domain: domain
				}
			},

			{ upsert: true }
		);

		_winston2.default.info('- Set domain: ' + domain);
	}
};

var addTtCars = async function addTtCars(db) {
	var ttCarsCount = await db.collection('tt_cars').countDocuments({});
	var ttCarsNotExists = ttCarsCount === 0;
	if (ttCarsNotExists) {
		await db.collection('tt_cars').insertOne({
			oem: '1M5O12405CA',
			brand: 'FORD',
			model: 'MONDEO Station (SW)',
			type: '1.6 i 16V',
			bodytype: 'Station (SW)',
			startyear: '1994',
			endyear: '1996',
			year: '1994 1995 1996',
			kv: '65',
			pm: '88',
			cc: '1597',
			breaktype: 'null',
			brakingsystem: 'Hidrolik',
			abs: 'null',
			asr: 'null',
			axisconfiguration: 'null',
			capacity: 'null',
			drive: 'null',
			enginecode: 'L1J',
			enginetype: 'Otto',
			fuel: 'Benzin',
			drivetype: 'Önden tahrik'
		});

		_winston2.default.info('- Added tt_cars');
	}
};

var addTtEquivalents = async function addTtEquivalents(db) {
	var ttCarsCount = await db.collection('tt_equivalents').countDocuments({});
	var ttCarsNotExists = ttCarsCount === 0;
	if (ttCarsNotExists) {
		await db.collection('tt_equivalents').insertOne({
			oem: '2U7J12405AA',
			name: 'BOSCH',
			number: '0242229785',
			title: 'ATEŞLEME BUJİSİ'
		});

		_winston2.default.info('- Added tt_equivalents');
	}
};

var addTtOrginals = async function addTtOrginals(db) {
	var ttCarsCount = await db.collection('tt_orginals').countDocuments({});
	var ttCarsNotExists = ttCarsCount === 0;
	if (ttCarsNotExists) {
		await db.collection('tt_orginals').insertOne({
			oem: '1M5O12405CA',
			name: 'FORD',
			number: '1090749',
			title:
				'Finish Numarasıdır! BUJI FIESTA (BE91) Yeni:928F12405AF Eski:928F12405AE',
			price: '35.56'
		});

		_winston2.default.info('- Added tt_orginals');
	}
};

(async function() {
	var client = null;
	var db = null;

	try {
		client = await _mongodb.MongoClient.connect(
			mongodbConnection,
			CONNECT_OPTIONS
		);

		db = client.db(dbName);
		_winston2.default.info('Successfully connected to ' + mongodbConnection);
	} catch (e) {
		_winston2.default.error('MongoDB connection was failed. ' + e.message);
		return;
	}

	var userEmail = process.argv.length > 2 ? process.argv[2] : null;
	var domain = process.argv.length > 3 ? process.argv[3] : null;

	await db.createCollection('customers');
	await db.createCollection('orders');
	await addAllPages(db);
	await addAllProducts(db);
	await addEmailTemplates(db);
	await addShippingMethods(db);
	await addPaymentMethods(db);
	await createAllIndexes(db);
	await addUser(db, userEmail);
	await addTtCars(db);
	await addTtEquivalents(db);
	await addTtOrginals(db);
	await addSettings(db, {
		domain: domain
	});

	client.close();
})();
