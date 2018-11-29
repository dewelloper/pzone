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
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _webhooks = require('../../lib/webhooks');
var _webhooks2 = _interopRequireDefault(_webhooks);
var _customerGroups = require('./customerGroups');
var _customerGroups2 = _interopRequireDefault(_customerGroups);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var CustomersService = (function() {
	function CustomersService() {
		_classCallCheck(this, CustomersService);
	}
	_createClass(CustomersService, [
		{
			key: 'getFilter',
			value: function getFilter() {
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				// tag
				// gender
				// date_created_to
				// date_created_from
				// total_spent_to
				// total_spent_from
				// orders_count_to
				// orders_count_from

				var filter = {};
				var id = _parse2.default.getObjectIDIfValid(params.id);
				var group_id = _parse2.default.getObjectIDIfValid(params.group_id);

				if (id) {
					filter._id = new _mongodb.ObjectID(id);
				}

				if (group_id) {
					filter.group_id = group_id;
				}

				if (params.email) {
					filter.email = params.email.toLowerCase();
				}

				if (params.search) {
					filter['$or'] = [
						{ email: new RegExp(params.search, 'i') },
						{ mobile: new RegExp(params.search, 'i') },
						{ $text: { $search: params.search } }
					];
				}

				return filter;
			}
		},
		{
			key: 'getCustomers',
			value: function getCustomers() {
				var _this = this;
				var params =
					arguments.length > 0 && arguments[0] !== undefined
						? arguments[0]
						: {};
				var filter = this.getFilter(params);
				var limit = _parse2.default.getNumberIfPositive(params.limit) || 1000;
				var offset = _parse2.default.getNumberIfPositive(params.offset) || 0;

				return Promise.all([
					_customerGroups2.default.getGroups(),
					_mongo.db
						.collection('customers')
						.find(filter)
						.sort({ date_created: -1 })
						.skip(offset)
						.limit(limit)
						.toArray(),
					_mongo.db.collection('customers').countDocuments(filter)
				]).then(function(_ref) {
					var _ref2 = _slicedToArray(_ref, 3),
						customerGroups = _ref2[0],
						customers = _ref2[1],
						customersCount = _ref2[2];
					var items = customers.map(function(customer) {
						return _this.changeProperties(customer, customerGroups);
					});

					var result = {
						total_count: customersCount,
						has_more: offset + items.length < customersCount,
						data: items
					};

					return result;
				});
			}
		},
		{
			key: 'getSingleCustomer',
			value: function getSingleCustomer(id) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				return this.getCustomers({ id: id }).then(function(items) {
					return items.data.length > 0 ? items.data[0] : {};
				});
			}
		},
		{
			key: 'addCustomer',
			value: async function addCustomer(data) {
				var customer = this.getValidDocumentForInsert(data);

				// is email unique
				if (customer.email && customer.email.length > 0) {
					var customerCount = await _mongo.db
						.collection('customers')
						.count({ email: customer.email });
					if (customerCount > 0) {
						return Promise.reject('Customer email must be unique');
					}
				}

				var insertResponse = await _mongo.db
					.collection('customers')
					.insertMany([customer]);
				var newCustomerId = insertResponse.ops[0]._id.toString();
				var newCustomer = await this.getSingleCustomer(newCustomerId);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.CUSTOMER_CREATED,
					payload: newCustomer
				});

				return newCustomer;
			}
		},
		{
			key: 'updateCustomer',
			value: async function updateCustomer(id, data) {
				if (!_mongodb.ObjectID.isValid(id)) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(id);
				var customer = this.getValidDocumentForUpdate(id, data);

				// is email unique
				if (customer.email && customer.email.length > 0) {
					var customerCount = await _mongo.db.collection('customers').count({
						_id: {
							$ne: customerObjectID
						},

						email: customer.email
					});

					if (customerCount > 0) {
						return Promise.reject('Customer email must be unique');
					}
				}

				await _mongo.db.collection('customers').updateOne(
					{
						_id: customerObjectID
					},

					{
						$set: customer
					}
				);

				var updatedCustomer = await this.getSingleCustomer(id);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.CUSTOMER_UPDATED,
					payload: updatedCustomer
				});

				return updatedCustomer;
			}
		},
		{
			key: 'updateCustomerStatistics',
			value: function updateCustomerStatistics(
				customerId,
				totalSpent,
				ordersCount
			) {
				if (!_mongodb.ObjectID.isValid(customerId)) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customerId);
				var customerData = {
					total_spent: totalSpent,
					orders_count: ordersCount
				};

				return _mongo.db
					.collection('customers')
					.updateOne({ _id: customerObjectID }, { $set: customerData });
			}
		},
		{
			key: 'deleteCustomer',
			value: async function deleteCustomer(customerId) {
				if (!_mongodb.ObjectID.isValid(customerId)) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customerId);
				var customer = await this.getSingleCustomer(customerId);
				var deleteResponse = await _mongo.db
					.collection('customers')
					.deleteOne({ _id: customerObjectID });
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.CUSTOMER_DELETED,
					payload: customer
				});

				return deleteResponse.deletedCount > 0;
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				var customer = {
					date_created: new Date(),
					date_updated: null,
					total_spent: 0,
					orders_count: 0
				};

				customer.note = _parse2.default.getString(data.note);
				customer.email = _parse2.default.getString(data.email).toLowerCase();
				customer.mobile = _parse2.default.getString(data.mobile).toLowerCase();
				customer.full_name = _parse2.default.getString(data.full_name);
				customer.gender = _parse2.default.getString(data.gender).toLowerCase();
				customer.group_id = _parse2.default.getObjectIDIfValid(data.group_id);
				customer.tags = _parse2.default.getArrayIfValid(data.tags) || [];
				customer.social_accounts =
					_parse2.default.getArrayIfValid(data.social_accounts) || [];
				customer.birthdate = _parse2.default.getDateIfValid(data.birthdate);
				customer.addresses = this.validateAddresses(data.addresses);
				customer.browser = _parse2.default.getBrowser(data.browser);

				return customer;
			}
		},
		{
			key: 'validateAddresses',
			value: function validateAddresses(addresses) {
				if (addresses && addresses.length > 0) {
					var validAddresses = addresses.map(function(addressItem) {
						return _parse2.default.getCustomerAddress(addressItem);
					});

					return validAddresses;
				} else {
					return [];
				}
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(id, data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var customer = {
					date_updated: new Date()
				};

				if (data.note !== undefined) {
					customer.note = _parse2.default.getString(data.note);
				}

				if (data.email !== undefined) {
					customer.email = _parse2.default.getString(data.email).toLowerCase();
				}

				if (data.mobile !== undefined) {
					customer.mobile = _parse2.default
						.getString(data.mobile)
						.toLowerCase();
				}

				if (data.full_name !== undefined) {
					customer.full_name = _parse2.default.getString(data.full_name);
				}

				if (data.gender !== undefined) {
					customer.gender = _parse2.default.getString(data.gender);
				}

				if (data.group_id !== undefined) {
					customer.group_id = _parse2.default.getObjectIDIfValid(data.group_id);
				}

				if (data.tags !== undefined) {
					customer.tags = _parse2.default.getArrayIfValid(data.tags) || [];
				}

				if (data.social_accounts !== undefined) {
					customer.social_accounts =
						_parse2.default.getArrayIfValid(data.social_accounts) || [];
				}

				if (data.birthdate !== undefined) {
					customer.birthdate = _parse2.default.getDateIfValid(data.birthdate);
				}

				if (data.addresses !== undefined) {
					customer.addresses = this.validateAddresses(data.addresses);
				}

				if (data.browser !== undefined) {
					customer.browser = _parse2.default.getBrowser(data.browser);
				}

				return customer;
			}
		},
		{
			key: 'changeProperties',
			value: function changeProperties(customer, customerGroups) {
				if (customer) {
					customer.id = customer._id.toString();
					delete customer._id;

					var customerGroup = customer.group_id
						? customerGroups.find(function(group) {
								return group.id === customer.group_id.toString();
						  })
						: null;

					customer.group_name =
						customerGroup && customerGroup.name ? customerGroup.name : '';

					if (customer.addresses && customer.addresses.length === 1) {
						customer.billing = customer.shipping = customer.addresses[0];
					} else if (customer.addresses && customer.addresses.length > 1) {
						var default_billing = customer.addresses.find(function(address) {
							return address.default_billing;
						});

						var default_shipping = customer.addresses.find(function(address) {
							return address.default_shipping;
						});

						customer.billing = default_billing
							? default_billing
							: customer.addresses[0];
						customer.shipping = default_shipping
							? default_shipping
							: customer.addresses[0];
					} else {
						customer.billing = {};
						customer.shipping = {};
					}
				}

				return customer;
			}
		},
		{
			key: 'addAddress',
			value: function addAddress(customer_id, address) {
				if (!_mongodb.ObjectID.isValid(customer_id)) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customer_id);
				var validAddress = _parse2.default.getCustomerAddress(address);

				return _mongo.db.collection('customers').updateOne(
					{
						_id: customerObjectID
					},

					{
						$push: {
							addresses: validAddress
						}
					}
				);
			}
		},
		{
			key: 'createObjectToUpdateAddressFields',
			value: function createObjectToUpdateAddressFields(address) {
				var fields = {};

				if (address.address1 !== undefined) {
					fields['addresses.$.address1'] = _parse2.default.getString(
						address.address1
					);
				}

				if (address.address2 !== undefined) {
					fields['addresses.$.address2'] = _parse2.default.getString(
						address.address2
					);
				}

				if (address.city !== undefined) {
					fields['addresses.$.city'] = _parse2.default.getString(address.city);
				}

				if (address.country !== undefined) {
					fields['addresses.$.country'] = _parse2.default
						.getString(address.country)
						.toUpperCase();
				}

				if (address.state !== undefined) {
					fields['addresses.$.state'] = _parse2.default.getString(
						address.state
					);
				}

				if (address.phone !== undefined) {
					fields['addresses.$.phone'] = _parse2.default.getString(
						address.phone
					);
				}

				if (address.postal_code !== undefined) {
					fields['addresses.$.postal_code'] = _parse2.default.getString(
						address.postal_code
					);
				}

				if (address.full_name !== undefined) {
					fields['addresses.$.full_name'] = _parse2.default.getString(
						address.full_name
					);
				}

				if (address.company !== undefined) {
					fields['addresses.$.company'] = _parse2.default.getString(
						address.company
					);
				}

				if (address.tax_number !== undefined) {
					fields['addresses.$.tax_number'] = _parse2.default.getString(
						address.tax_number
					);
				}

				if (address.coordinates !== undefined) {
					fields['addresses.$.coordinates'] = address.coordinates;
				}

				if (address.details !== undefined) {
					fields['addresses.$.details'] = address.details;
				}

				if (address.default_billing !== undefined) {
					fields[
						'addresses.$.default_billing'
					] = _parse2.default.getBooleanIfValid(address.default_billing, false);
				}

				if (address.default_shipping !== undefined) {
					fields[
						'addresses.$.default_shipping'
					] = _parse2.default.getBooleanIfValid(
						address.default_shipping,
						false
					);
				}

				return fields;
			}
		},
		{
			key: 'updateAddress',
			value: function updateAddress(customer_id, address_id, data) {
				if (
					!_mongodb.ObjectID.isValid(customer_id) ||
					!_mongodb.ObjectID.isValid(address_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customer_id);
				var addressObjectID = new _mongodb.ObjectID(address_id);
				var addressFields = this.createObjectToUpdateAddressFields(data);

				return _mongo.db.collection('customers').updateOne(
					{
						_id: customerObjectID,
						'addresses.id': addressObjectID
					},

					{ $set: addressFields }
				);
			}
		},
		{
			key: 'deleteAddress',
			value: function deleteAddress(customer_id, address_id) {
				if (
					!_mongodb.ObjectID.isValid(customer_id) ||
					!_mongodb.ObjectID.isValid(address_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customer_id);
				var addressObjectID = new _mongodb.ObjectID(address_id);

				return _mongo.db.collection('customers').updateOne(
					{
						_id: customerObjectID
					},

					{
						$pull: {
							addresses: {
								id: addressObjectID
							}
						}
					}
				);
			}
		},
		{
			key: 'setDefaultBilling',
			value: function setDefaultBilling(customer_id, address_id) {
				if (
					!_mongodb.ObjectID.isValid(customer_id) ||
					!_mongodb.ObjectID.isValid(address_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customer_id);
				var addressObjectID = new _mongodb.ObjectID(address_id);

				return _mongo.db
					.collection('customers')
					.updateOne(
						{
							_id: customerObjectID,
							'addresses.default_billing': true
						},

						{
							$set: {
								'addresses.$.default_billing': false
							}
						}
					)
					.then(function(res) {
						return _mongo.db.collection('customers').updateOne(
							{
								_id: customerObjectID,
								'addresses.id': addressObjectID
							},

							{
								$set: {
									'addresses.$.default_billing': true
								}
							}
						);
					});
			}
		},
		{
			key: 'setDefaultShipping',
			value: function setDefaultShipping(customer_id, address_id) {
				if (
					!_mongodb.ObjectID.isValid(customer_id) ||
					!_mongodb.ObjectID.isValid(address_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var customerObjectID = new _mongodb.ObjectID(customer_id);
				var addressObjectID = new _mongodb.ObjectID(address_id);

				return _mongo.db
					.collection('customers')
					.updateOne(
						{
							_id: customerObjectID,
							'addresses.default_shipping': true
						},

						{
							$set: {
								'addresses.$.default_shipping': false
							}
						}
					)
					.then(function(res) {
						return _mongo.db.collection('customers').updateOne(
							{
								_id: customerObjectID,
								'addresses.id': addressObjectID
							},

							{
								$set: {
									'addresses.$.default_shipping': true
								}
							}
						);
					});
			}
		}
	]);
	return CustomersService;
})();
exports.default = new CustomersService();
