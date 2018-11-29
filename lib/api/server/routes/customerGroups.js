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
var _customerGroups = require('../services/customers/customerGroups');
var _customerGroups2 = _interopRequireDefault(_customerGroups);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var CustomerGroupsRoute = (function() {
	function CustomerGroupsRoute(router) {
		_classCallCheck(this, CustomerGroupsRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(CustomerGroupsRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/customer_groups',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_CUSTOMER_GROUPS
					),
					this.getGroups.bind(this)
				);

				this.router.post(
					'/v1/customer_groups',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMER_GROUPS
					),
					this.addGroup.bind(this)
				);

				this.router.get(
					'/v1/customer_groups/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_CUSTOMER_GROUPS
					),
					this.getSingleGroup.bind(this)
				);

				this.router.put(
					'/v1/customer_groups/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMER_GROUPS
					),
					this.updateGroup.bind(this)
				);

				this.router.delete(
					'/v1/customer_groups/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_CUSTOMER_GROUPS
					),
					this.deleteGroup.bind(this)
				);
			}
		},
		{
			key: 'getGroups',
			value: function getGroups(req, res, next) {
				_customerGroups2.default
					.getGroups(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleGroup',
			value: function getSingleGroup(req, res, next) {
				_customerGroups2.default
					.getSingleGroup(req.params.id)
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
			key: 'addGroup',
			value: function addGroup(req, res, next) {
				_customerGroups2.default
					.addGroup(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateGroup',
			value: function updateGroup(req, res, next) {
				_customerGroups2.default
					.updateGroup(req.params.id, req.body)
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
			key: 'deleteGroup',
			value: function deleteGroup(req, res, next) {
				_customerGroups2.default
					.deleteGroup(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return CustomerGroupsRoute;
})();
exports.default = CustomerGroupsRoute;
