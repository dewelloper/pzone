'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slicedToArray = (function() {
	function sliceIterator(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return']) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
	return function(arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			);
		}
	};
})();
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
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _handlebars = require('handlebars');
var _handlebars2 = _interopRequireDefault(_handlebars);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _webhooks = require('../../lib/webhooks');
var _webhooks2 = _interopRequireDefault(_webhooks);
var _dashboardWebSocket = require('../../lib/dashboardWebSocket');
var _dashboardWebSocket2 = _interopRequireDefault(_dashboardWebSocket);
var _mailer = require('../../lib/mailer');
var _mailer2 = _interopRequireDefault(_mailer);
var _products = require('../products/products');
var _products2 = _interopRequireDefault(_products);
var _customers = require('../customers/customers');
var _customers2 = _interopRequireDefault(_customers);
var _orderStatuses = require('./orderStatuses');
var _orderStatuses2 = _interopRequireDefault(_orderStatuses);
var _paymentMethodsLight = require('./paymentMethodsLight');
var _paymentMethodsLight2 = _interopRequireDefault(_paymentMethodsLight);
var _shippingMethodsLight = require('./shippingMethodsLight');
var _shippingMethodsLight2 = _interopRequireDefault(_shippingMethodsLight);
var _emailTemplates = require('../settings/emailTemplates');
var _emailTemplates2 = _interopRequireDefault(_emailTemplates);
var _stock = require('../products/stock');
var _stock2 = _interopRequireDefault(_stock);
var _settings3 = require('../settings/settings');
var _settings4 = _interopRequireDefault(_settings3);
var _paymentGateways = require('../../paymentGateways');
var _paymentGateways2 = _interopRequireDefault(_paymentGateways);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrdersService = (function() {
	function OrdersService() {
		_classCallCheck(this, OrdersService);
	}
	_createClass(OrdersService, [
		{
			key: 'getFilter',
			value: function getFilter() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				// TODO: sort, coupon, tag, channel
				var filter = {};
				var id = _parse2.default.getObjectIDIfValid(params.id);
				var status_id = _parse2.default.getObjectIDIfValid(params.status_id);
				var customer_id = _parse2.default.getObjectIDIfValid(
					params.customer_id
				);
				var payment_method_id = _parse2.default.getObjectIDIfValid(
					params.payment_method_id
				);

				var shipping_method_id = _parse2.default.getObjectIDIfValid(
					params.shipping_method_id
				);

				var closed = _parse2.default.getBooleanIfValid(params.closed);
				var cancelled = _parse2.default.getBooleanIfValid(params.cancelled);
				var delivered = _parse2.default.getBooleanIfValid(params.delivered);
				var paid = _parse2.default.getBooleanIfValid(params.paid);
				var draft = _parse2.default.getBooleanIfValid(params.draft);
				var hold = _parse2.default.getBooleanIfValid(params.hold);
				var grand_total_min = _parse2.default.getNumberIfPositive(
					params.grand_total_min
				);
				var grand_total_max = _parse2.default.getNumberIfPositive(
					params.grand_total_max
				);
				var date_placed_min = _parse2.default.getDateIfValid(
					params.date_placed_min
				);
				var date_placed_max = _parse2.default.getDateIfValid(
					params.date_placed_max
				);
				var date_closed_min = _parse2.default.getDateIfValid(
					params.date_closed_min
				);
				var date_closed_max = _parse2.default.getDateIfValid(
					params.date_closed_max
				);

				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}

				if (status_id) {
					filter.status_id = status_id;
				}

				if (customer_id) {
					filter.customer_id = customer_id;
				}

				if (payment_method_id) {
					filter.payment_method_id = payment_method_id;
				}

				if (shipping_method_id) {
					filter.shipping_method_id = shipping_method_id;
				}

				if (params.number) {
					filter.number = params.number;
				}

				if (closed !== null) {
					filter.closed = closed;
				}

				if (cancelled !== null) {
					filter.cancelled = cancelled;
				}

				if (delivered !== null) {
					filter.delivered = delivered;
				}

				if (paid !== null) {
					filter.paid = paid;
				}

				if (draft !== null) {
					filter.draft = draft;
				}

				if (hold !== null) {
					filter.hold = hold;
				}

				if (grand_total_min || grand_total_max) {
					filter.grand_total = {};
					if (grand_total_min) {
						filter.grand_total['$gte'] = grand_total_min;
					}
					if (grand_total_max) {
						filter.grand_total['$lte'] = grand_total_max;
					}
				}

				if (date_placed_min || date_placed_max) {
					filter.date_placed = {};
					if (date_placed_min) {
						filter.date_placed['$gte'] = date_placed_min;
					}
					if (date_placed_max) {
						filter.date_placed['$lte'] = date_placed_max;
					}
				}

				if (date_closed_min || date_closed_max) {
					filter.date_closed = {};
					if (date_closed_min) {
						filter.date_closed['$gte'] = date_closed_min;
					}
					if (date_closed_max) {
						filter.date_closed['$lte'] = date_closed_max;
					}
				}

				if (params.search) {
					var alternativeSearch = [];

					var searchAsNumber = _parse2.default.getNumberIfPositive(
						params.search
					);
					if (searchAsNumber) {
						alternativeSearch.push({ number: searchAsNumber });
					}

					alternativeSearch.push({ email: new RegExp(params.search, 'i') });
					alternativeSearch.push({ mobile: new RegExp(params.search, 'i') });
					alternativeSearch.push({ $text: { $search: params.search } });

					filter['$or'] = alternativeSearch;
				}

				return filter;
			}
		},
		{
			key: 'getOrders',
			value: function getOrders(params) {
				var _this = this;
				var filter = this.getFilter(params);
				var limit = _parse2.default.getNumberIfPositive(params.limit) || 1000;
				var offset = _parse2.default.getNumberIfPositive(params.offset) || 0;

				return Promise.all([
					_mongo.db
						.collection('orders')
						.find(filter)
						.sort({ date_placed: -1, date_created: -1 })
						.skip(offset)
						.limit(limit)
						.toArray(),
					_mongo.db.collection('orders').countDocuments(filter),
					_orderStatuses2.default.getStatuses(),
					_shippingMethodsLight2.default.getMethods(),
					_paymentMethodsLight2.default.getMethods()
				]).then(function(_ref) {
					var _ref2 = _slicedToArray(_ref, 5),
						orders = _ref2[0],
						ordersCount = _ref2[1],
						orderStatuses = _ref2[2],
						shippingMethods = _ref2[3],
						paymentMethods = _ref2[4];
					var items = orders.map(function(order) {
						return _this.changeProperties(
							order,
							orderStatuses,
							shippingMethods,
							paymentMethods
						);
					});

					var result = {
						total_count: ordersCount,
						has_more: offset + items.length < ordersCount,
						data: items
					};

					return result;
				});
			}
		},
		{
			key: 'getSingleOrder',
			value: function getSingleOrder(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getOrders({ id: id }).then(function(items) {
					return items.data.length > 0 ? items.data[0] : {};
				});
			}
		},
		{
			key: 'getOrCreateCustomer',
			value: function getOrCreateCustomer(orderId) {
				return this.getSingleOrder(orderId).then(function(order) {
					if (!order.customer_id && order.email) {
						// find customer by email
						return _customers2.default
							.getCustomers({ email: order.email })
							.then(function(customers) {
								var customerExists =
									customers && customers.data && customers.data.length > 0;

								if (customerExists) {
									// if customer exists - set new customer_id
									return customers.data[0].id;
								} else {
									// if customer not exists - create new customer and set new customer_id
									var addresses = [];
									if (order.shipping_address) {
										addresses.push(order.shipping_address);
									}

									var customerrFullName =
										order.shipping_address && order.shipping_address.full_name
											? order.shipping_address.full_name
											: '';

									return _customers2.default
										.addCustomer({
											email: order.email,
											full_name: customerrFullName,
											mobile: order.mobile,
											browser: order.browser,
											addresses: addresses
										})
										.then(function(customer) {
											return customer.id;
										});
								}
							});
					} else {
						return order.customer_id;
					}
				});
			}
		},
		{
			key: 'addOrder',
			value: async function addOrder(data) {
				var order = await this.getValidDocumentForInsert(data);
				var insertResponse = await _mongo.db
					.collection('orders')
					.insertMany([order]);
				var newOrderId = insertResponse.ops[0]._id.toString();
				var newOrder = await this.getSingleOrder(newOrderId);
				return newOrder;
			}
		},
		{
			key: 'updateOrder',
			value: async function updateOrder(id, data) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(id);
				var orderData = await this.getValidDocumentForUpdate(id, data);
				var updateResponse = await _mongo.db
					.collection('orders')
					.updateOne({ _id: orderObjectID }, { $set: orderData });
				var updatedOrder = await this.getSingleOrder(id);
				if (updatedOrder.draft === false) {
					await _webhooks2.default.trigger({
						event: _webhooks2.default.events.ORDER_UPDATED,
						payload: updatedOrder
					});
				}
				await this.updateCustomerStatistics(updatedOrder.customer_id);
				return updatedOrder;
			}
		},
		{
			key: 'deleteOrder',
			value: async function deleteOrder(orderId) {
				if (!_mongodb.ObjectID.isValid(orderId)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(orderId);
				var order = await this.getSingleOrder(orderId);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.ORDER_DELETED,
					payload: order
				});

				var deleteResponse = await _mongo.db
					.collection('orders')
					.deleteOne({ _id: orderObjectID });
				return deleteResponse.deletedCount > 0;
			}
		},
		{
			key: 'parseDiscountItem',
			value: function parseDiscountItem(discount) {
				return discount
					? {
							id: new _mongodb.ObjectID(),
							name: _parse2.default.getString(discount.name),
							amount: _parse2.default.getNumberIfPositive(discount.amount)
					  }
					: null;
			}
		},
		{
			key: 'parseProductItem',
			value: function parseProductItem(item) {
				return item
					? {
							id: new _mongodb.ObjectID(),
							product_id: _parse2.default.getObjectIDIfValid(item.product_id),
							variant_id: _parse2.default.getObjectIDIfValid(item.variant_id),
							quantity: _parse2.default.getNumberIfPositive(item.quantity)
							// "sku":"",
							// "name":"",
							// "variant_name":"",
							// "price":"",
							// "tax_class":"",
							// "tax_total":"",
							// "weight":"",
							// "discount_total":"",
							// "price_total":"", //price * quantity
					  }
					: null;
			}
		},
		{
			key: 'parseTransactionItem',
			value: function parseTransactionItem(transaction) {
				return transaction
					? {
							id: new _mongodb.ObjectID(),
							transaction_id: _parse2.default.getString(
								transaction.transaction_id
							),
							amount: _parse2.default.getNumberIfPositive(transaction.amount),
							currency: _parse2.default.getString(transaction.currency),
							status: _parse2.default.getString(transaction.status),
							details: transaction.details,
							success: _parse2.default.getBooleanIfValid(transaction.success),
							date_created: new Date(),
							date_updated: null
					  }
					: null;
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var _this2 = this;
				return _mongo.db
					.collection('orders')
					.find({}, { number: 1 })
					.sort({ number: -1 })
					.limit(1)
					.toArray()
					.then(function(items) {
						var orderNumber = _settings2.default.orderStartNumber;
						if (items && items.length > 0) {
							orderNumber = items[0].number + 1;
						}

						var order = {
							date_created: new Date(),
							date_placed: null,
							date_updated: null,
							date_closed: null,
							date_paid: null,
							date_cancelled: null,
							number: orderNumber,
							shipping_status: ''
							// 'weight_total': 0,
							// 'discount_total': 0, //sum(items.discount_total)+sum(discounts.amount)
							// 'tax_included_total': 0, //if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipping_tax)
							// 'tax_total': 0, //item_tax + shipping_tax
							// 'subtotal': 0, //sum(items.price_total)
							// 'shipping_total': 0, //shipping_price-shipping_discount
							// 'grand_total': 0 //subtotal + shipping_total + tax_included_total - (discount_total)
						};

						order.items =
							data.items && data.items.length > 0
								? data.items.map(function(item) {
										return _this2.parseProductItem(item);
								  })
								: [];
						order.transactions =
							data.transactions && data.transactions.length > 0
								? data.transactions.map(function(transaction) {
										return _this2.parseTransactionItem(transaction);
								  })
								: [];
						order.discounts =
							data.discounts && data.discounts.length > 0
								? data.discounts.map(function(discount) {
										return _this2.parseDiscountItem(discount);
								  })
								: [];

						order.billing_address = _parse2.default.getOrderAddress(
							data.billing_address
						);
						order.shipping_address = _parse2.default.getOrderAddress(
							data.shipping_address
						);

						order.item_tax =
							_parse2.default.getNumberIfPositive(data.item_tax) || 0;
						order.shipping_tax =
							_parse2.default.getNumberIfPositive(data.shipping_tax) || 0;
						order.shipping_discount =
							_parse2.default.getNumberIfPositive(data.shipping_discount) || 0;
						order.shipping_price =
							_parse2.default.getNumberIfPositive(data.shipping_price) || 0;

						order.item_tax_included = _parse2.default.getBooleanIfValid(
							data.item_tax_included,
							true
						);

						order.shipping_tax_included = _parse2.default.getBooleanIfValid(
							data.shipping_tax_included,
							true
						);

						order.closed = _parse2.default.getBooleanIfValid(
							data.closed,
							false
						);
						order.cancelled = _parse2.default.getBooleanIfValid(
							data.cancelled,
							false
						);
						order.delivered = _parse2.default.getBooleanIfValid(
							data.delivered,
							false
						);
						order.paid = _parse2.default.getBooleanIfValid(data.paid, false);
						order.hold = _parse2.default.getBooleanIfValid(data.hold, false);
						order.draft = _parse2.default.getBooleanIfValid(data.draft, true);

						order.email = _parse2.default.getString(data.email).toLowerCase();
						order.mobile = _parse2.default.getString(data.mobile).toLowerCase();
						order.referrer_url = _parse2.default
							.getString(data.referrer_url)
							.toLowerCase();
						order.landing_url = _parse2.default
							.getString(data.landing_url)
							.toLowerCase();
						order.channel = _parse2.default.getString(data.channel);
						order.note = _parse2.default.getString(data.note);
						order.comments = _parse2.default.getString(data.comments);
						order.coupon = _parse2.default.getString(data.coupon);
						order.tracking_number = _parse2.default.getString(
							data.tracking_number
						);

						order.customer_id = _parse2.default.getObjectIDIfValid(
							data.customer_id
						);
						order.status_id = _parse2.default.getObjectIDIfValid(
							data.status_id
						);
						order.payment_method_id = _parse2.default.getObjectIDIfValid(
							data.payment_method_id
						);

						order.shipping_method_id = _parse2.default.getObjectIDIfValid(
							data.shipping_method_id
						);

						order.tags = _parse2.default.getArrayIfValid(data.tags) || [];
						order.browser = _parse2.default.getBrowser(data.browser);

						return order;
					});
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				return new Promise(function(resolve, reject) {
					if (Object.keys(data).length === 0) {
						reject(new Error('Required fields are missing'));
					}

					var order = {
						date_updated: new Date()
					};

					if (data.payment_token !== undefined) {
						order.payment_token = _parse2.default.getString(data.payment_token);
					}

					if (data.item_tax !== undefined) {
						order.item_tax =
							_parse2.default.getNumberIfPositive(data.item_tax) || 0;
					}
					if (data.shipping_tax !== undefined) {
						order.shipping_tax =
							_parse2.default.getNumberIfPositive(data.shipping_tax) || 0;
					}
					if (data.shipping_discount !== undefined) {
						order.shipping_discount =
							_parse2.default.getNumberIfPositive(data.shipping_discount) || 0;
					}
					if (data.shipping_price !== undefined) {
						order.shipping_price =
							_parse2.default.getNumberIfPositive(data.shipping_price) || 0;
					}
					if (data.item_tax_included !== undefined) {
						order.item_tax_included = _parse2.default.getBooleanIfValid(
							data.item_tax_included,
							true
						);
					}
					if (data.shipping_tax_included !== undefined) {
						order.shipping_tax_included = _parse2.default.getBooleanIfValid(
							data.shipping_tax_included,
							true
						);
					}
					if (data.closed !== undefined) {
						order.closed = _parse2.default.getBooleanIfValid(
							data.closed,
							false
						);
					}
					if (data.cancelled !== undefined) {
						order.cancelled = _parse2.default.getBooleanIfValid(
							data.cancelled,
							false
						);
					}
					if (data.delivered !== undefined) {
						order.delivered = _parse2.default.getBooleanIfValid(
							data.delivered,
							false
						);
					}
					if (data.paid !== undefined) {
						order.paid = _parse2.default.getBooleanIfValid(data.paid, false);
					}
					if (data.hold !== undefined) {
						order.hold = _parse2.default.getBooleanIfValid(data.hold, false);
					}
					if (data.draft !== undefined) {
						order.draft = _parse2.default.getBooleanIfValid(data.draft, true);
					}
					if (data.email !== undefined) {
						order.email = _parse2.default.getString(data.email).toLowerCase();
					}
					if (data.mobile !== undefined) {
						order.mobile = _parse2.default.getString(data.mobile).toLowerCase();
					}
					if (data.referrer_url !== undefined) {
						order.referrer_url = _parse2.default
							.getString(data.referrer_url)
							.toLowerCase();
					}
					if (data.landing_url !== undefined) {
						order.landing_url = _parse2.default
							.getString(data.landing_url)
							.toLowerCase();
					}
					if (data.channel !== undefined) {
						order.channel = _parse2.default.getString(data.channel);
					}
					if (data.note !== undefined) {
						order.note = _parse2.default.getString(data.note);
					}
					if (data.comments !== undefined) {
						order.comments = _parse2.default.getString(data.comments);
					}
					if (data.coupon !== undefined) {
						order.coupon = _parse2.default.getString(data.coupon);
					}
					if (data.tracking_number !== undefined) {
						order.tracking_number = _parse2.default.getString(
							data.tracking_number
						);
					}
					if (data.shipping_status !== undefined) {
						order.shipping_status = _parse2.default.getString(
							data.shipping_status
						);
					}
					if (data.customer_id !== undefined) {
						order.customer_id = _parse2.default.getObjectIDIfValid(
							data.customer_id
						);
					}
					if (data.status_id !== undefined) {
						order.status_id = _parse2.default.getObjectIDIfValid(
							data.status_id
						);
					}
					if (data.payment_method_id !== undefined) {
						order.payment_method_id = _parse2.default.getObjectIDIfValid(
							data.payment_method_id
						);
					}
					if (data.shipping_method_id !== undefined) {
						order.shipping_method_id = _parse2.default.getObjectIDIfValid(
							data.shipping_method_id
						);
					}
					if (data.tags !== undefined) {
						order.tags = _parse2.default.getArrayIfValid(data.tags) || [];
					}
					if (data.browser !== undefined) {
						order.browser = _parse2.default.getBrowser(data.browser);
					}
					if (data.date_placed !== undefined) {
						order.date_placed = _parse2.default.getDateIfValid(
							data.date_placed
						);
					}
					if (data.date_paid !== undefined) {
						order.date_paid = _parse2.default.getDateIfValid(data.date_paid);
					}

					if (order.shipping_method_id && !order.shipping_price) {
						_shippingMethodsLight2.default
							.getMethodPrice(order.shipping_method_id)
							.then(function(shippingPrice) {
								order.shipping_price = shippingPrice;
								resolve(order);
							});
					} else {
						resolve(order);
					}
				});
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(
				order,
				orderStatuses,
				shippingMethods,
				paymentMethods
			) {
				if (order) {
					order.id = order._id.toString();
					delete order._id;

					var orderStatus =
						order.status_id && orderStatuses.length > 0
							? orderStatuses.find(function(i) {
									return i.id.toString() === order.status_id.toString();
							  })
							: null;
					var orderShippingMethod =
						order.shipping_method_id && shippingMethods.length > 0
							? shippingMethods.find(function(i) {
									return (
										i.id.toString() === order.shipping_method_id.toString()
									);
							  })
							: null;
					var orderPaymentMethod =
						order.payment_method_id && paymentMethods.length > 0
							? paymentMethods.find(function(i) {
									return i.id.toString() === order.payment_method_id.toString();
							  })
							: null;

					order.status = orderStatus ? orderStatus.name : '';
					order.shipping_method = orderShippingMethod
						? orderShippingMethod.name
						: '';
					order.payment_method = orderPaymentMethod
						? orderPaymentMethod.name
						: '';
					order.payment_method_gateway = orderPaymentMethod
						? orderPaymentMethod.gateway
						: '';

					var sum_items_weight = 0;
					var sum_items_price_total = 0;
					var sum_items_discount_total = 0;
					var sum_discounts_amount = 0;
					var tax_included_total =
						(order.item_tax_included ? 0 : order.item_tax) +
						(order.shipping_tax_included ? 0 : order.shipping_tax);

					if (order.items && order.items.length > 0) {
						order.items.forEach(function(item) {
							var item_weight = item.weight * item.quantity;
							if (item_weight > 0) {
								sum_items_weight += item_weight;
							}
						});

						order.items.forEach(function(item) {
							if (item.price_total > 0) {
								sum_items_price_total += item.price_total;
							}
						});

						order.items.forEach(function(item) {
							if (item.discount_total > 0) {
								sum_items_discount_total += item.discount_total;
							}
						});
					}

					if (order.discounts && order.discounts.length > 0) {
						order.items.forEach(function(item) {
							if (item.amount > 0) {
								sum_discounts_amount += item.amount;
							}
						});
					}

					var tax_total = order.item_tax + order.shipping_tax;
					var shipping_total = order.shipping_price - order.shipping_discount;
					var discount_total = sum_items_discount_total + sum_discounts_amount;
					var grand_total =
						sum_items_price_total +
						shipping_total +
						tax_included_total -
						discount_total;

					order.weight_total = sum_items_weight;
					order.discount_total = discount_total; //sum(items.discount_total)+sum(discounts.amount)
					order.subtotal = sum_items_price_total; //sum(items.price_total)
					order.tax_included_total = tax_included_total; //if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipping_tax)
					order.tax_total = tax_total; //item_tax + shipping_tax
					order.shipping_total = shipping_total; //shipping_price-shipping_discount
					order.grand_total = grand_total; //subtotal + shipping_total + tax_included_total - (discount_total)
				}

				return order;
			}
		},
		{
			key: 'getEmailSubject',
			value: function getEmailSubject(emailTemplate, order) {
				var subjectTemplate = _handlebars2.default.compile(
					emailTemplate.subject
				);
				return subjectTemplate(order);
			}
		},
		{
			key: 'getEmailBody',
			value: function getEmailBody(emailTemplate, order) {
				var bodyTemplate = _handlebars2.default.compile(emailTemplate.body);
				return bodyTemplate(order);
			}
		},
		{
			key: 'sendAllMails',
			value: async function sendAllMails(toEmail, copyTo, subject, body) {
				await Promise.all([
					_mailer2.default.send({
						to: toEmail,
						subject: subject,
						html: body
					}),

					_mailer2.default.send({
						to: copyTo,
						subject: subject,
						html: body
					})
				]);
			}
		},
		{
			key: 'checkoutOrder',
			value: async function checkoutOrder(orderId) {
				var _this3 = this;
				/*
                                 TODO:
                                 - check order exists
                                 - check order not placed
                                 - fire Webhooks
                                 */ var _ref3 = await Promise.all(
						[
							this.getOrCreateCustomer(orderId).then(function(customer_id) {
								return _this3.updateOrder(orderId, {
									customer_id: customer_id,
									date_placed: new Date(),
									draft: false
								});
							}),
							_emailTemplates2.default.getEmailTemplate('order_confirmation'),
							_settings4.default.getSettings()
						]
					),
					_ref4 = _slicedToArray(_ref3, 3),
					order = _ref4[0],
					emailTemplate = _ref4[1],
					dashboardSettings = _ref4[2];

				var subject = this.getEmailSubject(emailTemplate, order);
				var body = this.getEmailBody(emailTemplate, order);
				var copyTo = dashboardSettings.order_confirmation_copy_to;

				_dashboardWebSocket2.default.send({
					event: _dashboardWebSocket2.default.events.ORDER_CREATED,
					payload: order
				});

				await Promise.all([
					_webhooks2.default.trigger({
						event: _webhooks2.default.events.ORDER_CREATED,
						payload: order
					}),

					this.sendAllMails(order.email, copyTo, subject, body),
					_stock2.default.handleOrderCheckout(orderId)
				]);

				return order;
			}
		},
		{
			key: 'cancelOrder',
			value: function cancelOrder(orderId) {
				var _this4 = this;
				var orderData = {
					cancelled: true,
					date_cancelled: new Date()
				};

				return _stock2.default.handleCancelOrder(orderId).then(function() {
					return _this4.updateOrder(orderId, orderData);
				});
			}
		},
		{
			key: 'closeOrder',
			value: function closeOrder(orderId) {
				var orderData = {
					closed: true,
					date_closed: new Date()
				};

				return this.updateOrder(orderId, orderData);
			}
		},
		{
			key: 'updateCustomerStatistics',
			value: function updateCustomerStatistics(customerId) {
				if (customerId) {
					return this.getOrders({ customer_id: customerId }).then(function(
						orders
					) {
						var totalSpent = 0;
						var ordersCount = 0;

						if (orders.data && orders.data.length > 0) {
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
							try {
								for (
									var _iterator = orders.data[Symbol.iterator](), _step;
									!(_iteratorNormalCompletion = (_step = _iterator.next())
										.done);
									_iteratorNormalCompletion = true
								) {
									var order = _step.value;
									if (order.draft === false) {
										ordersCount++;
									}
									if (order.paid === true || order.closed === true) {
										totalSpent += order.grand_total;
									}
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
						}

						return _customers2.default.updateCustomerStatistics(
							customerId,
							totalSpent,
							ordersCount
						);
					});
				} else {
					return null;
				}
			}
		},
		{
			key: 'chargeOrder',
			value: async function chargeOrder(orderId) {
				var order = await this.getSingleOrder(orderId);
				var isSuccess = await _paymentGateways2.default.processOrderPayment(
					order
				);
				return isSuccess;
			}
		}
	]);
	return OrdersService;
})();
exports.default = new OrdersService();
