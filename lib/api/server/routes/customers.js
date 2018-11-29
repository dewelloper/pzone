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
var _security = require('../lib/security');
var _security2 = _interopRequireDefault(_security);
var _customers = require('../services/customers/customers');
var _customers2 = _interopRequireDefault(_customers);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var CustomersRoute = (function() {
	function CustomersRoute(router) {
		_classCallCheck(this, CustomersRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(CustomersRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/customers',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_CUSTOMERS
					),
					this.getCustomers.bind(this)
				);

				this.router.post(
					'/v1/customers',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.addCustomer.bind(this)
				);

				this.router.get(
					'/v1/customers/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_CUSTOMERS
					),
					this.getSingleCustomer.bind(this)
				);

				this.router.put(
					'/v1/customers/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.updateCustomer.bind(this)
				);

				this.router.delete(
					'/v1/customers/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.deleteCustomer.bind(this)
				);

				this.router.post(
					'/v1/customers/:id/addresses',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.addAddress.bind(this)
				);

				this.router.put(
					'/v1/customers/:id/addresses/:address_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.updateAddress.bind(this)
				);

				this.router.delete(
					'/v1/customers/:id/addresses/:address_id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.deleteAddress.bind(this)
				);

				this.router.post(
					'/v1/customers/:id/addresses/:address_id/default_billing',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.setDefaultBilling.bind(this)
				);

				this.router.post(
					'/v1/customers/:id/addresses/:address_id/default_shipping',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMERS
					),
					this.setDefaultShipping.bind(this)
				);
			}
		},
		{
			key: 'getCustomers',
			value: function getCustomers(req, res, next) {
				_customers2.default
					.getCustomers(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleCustomer',
			value: function getSingleCustomer(req, res, next) {
				_customers2.default
					.getSingleCustomer(req.params.id)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'addCustomer',
			value: function addCustomer(req, res, next) {
				_customers2.default
					.addCustomer(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateCustomer',
			value: function updateCustomer(req, res, next) {
				_customers2.default
					.updateCustomer(req.params.id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteCustomer',
			value: function deleteCustomer(req, res, next) {
				_customers2.default
					.deleteCustomer(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		},
		{
			key: 'addAddress',
			value: function addAddress(req, res, next) {
				var customer_id = req.params.id;
				_customers2.default
					.addAddress(customer_id, req.body)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'updateAddress',
			value: function updateAddress(req, res, next) {
				var customer_id = req.params.id;
				var address_id = req.params.address_id;
				_customers2.default
					.updateAddress(customer_id, address_id, req.body)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'deleteAddress',
			value: function deleteAddress(req, res, next) {
				var customer_id = req.params.id;
				var address_id = req.params.address_id;
				_customers2.default
					.deleteAddress(customer_id, address_id)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'setDefaultBilling',
			value: function setDefaultBilling(req, res, next) {
				var customer_id = req.params.id;
				var address_id = req.params.address_id;
				_customers2.default
					.setDefaultBilling(customer_id, address_id)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		},
		{
			key: 'setDefaultShipping',
			value: function setDefaultShipping(req, res, next) {
				var customer_id = req.params.id;
				var address_id = req.params.address_id;
				_customers2.default
					.setDefaultShipping(customer_id, address_id)
					.then(function(data) {
						res.end();
					})
					.catch(next);
			}
		}
	]);
	return CustomersRoute;
})();
exports.default = CustomersRoute;
