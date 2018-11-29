'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var methodId = ownProps.match.params.methodId;
	return {
		methodId: methodId,
		settings: state.settings.settings,
		initialValues: state.settings.shippingMethodEdit
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onLoad: function onLoad() {
			var methodId = ownProps.match.params.methodId;
			if (methodId) {
				dispatch((0, _actions.fetchShippingMethod)(methodId));
			} else {
				dispatch(
					(0, _actions.receiveShippingMethod)({
						enabled: true,
						fields: [
							{
								key: 'full_name',
								label: '',
								required: true
							},

							{
								key: 'address1',
								label: '',
								required: true
							},

							{
								key: 'address2',
								label: '',
								required: false
							},

							{
								key: 'postal_code',
								label: '',
								required: false
							},

							{
								key: 'phone',
								label: '',
								required: false
							}
						]
					})
				);
			}
		},
		onSubmit: function onSubmit(method) {
			if (method.conditions) {
				if (
					method.conditions.countries &&
					!Array.isArray(method.conditions.countries)
				) {
					var countriesStr = method.conditions.countries;
					method.conditions.countries = countriesStr
						.split(',')
						.map(function(item) {
							return item.trim().toUpperCase();
						})
						.filter(function(item) {
							return item.length === 2;
						});
				}

				if (
					method.conditions.states &&
					!Array.isArray(method.conditions.states)
				) {
					var statesStr = method.conditions.states;
					method.conditions.states = statesStr.split(',').map(function(item) {
						return item.trim();
					});
				}

				if (
					method.conditions.cities &&
					!Array.isArray(method.conditions.cities)
				) {
					var citiesStr = method.conditions.cities;
					method.conditions.cities = citiesStr.split(',').map(function(item) {
						return item.trim();
					});
				}
			}

			if (method.id) {
				dispatch((0, _actions.updateShippingMethod)(method));
			} else {
				dispatch((0, _actions.createShippingMethod)(method));
				ownProps.history.push('/admin/settings/shipping');
			}
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
