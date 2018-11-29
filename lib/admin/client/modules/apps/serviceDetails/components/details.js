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
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _description = require('./description');
var _description2 = _interopRequireDefault(_description);
var _settings = require('./settings');
var _settings2 = _interopRequireDefault(_settings);
var _actions = require('./actions');
var _actions2 = _interopRequireDefault(_actions);
var _logs = require('./logs');
var _logs2 = _interopRequireDefault(_logs);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === 'object' || typeof call === 'function')
		? call
		: self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function, not ' +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}
var ServiceDetails = (function(_React$Component) {
	_inherits(ServiceDetails, _React$Component);
	function ServiceDetails(props) {
		_classCallCheck(this, ServiceDetails);
		var _this = _possibleConstructorReturn(
			this,
			(ServiceDetails.__proto__ || Object.getPrototypeOf(ServiceDetails)).call(
				this,
				props
			)
		);
		_this.state = {
			timer: null
		};
		return _this;
	}
	_createClass(ServiceDetails, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;
				this.props.fetchData();

				// refresh logs every 5 sec
				var timer = setInterval(function() {
					var _props = _this2.props,
						service = _props.service,
						fetchServiceLogs = _props.fetchServiceLogs;
					if (service && service.enabled) {
						fetchServiceLogs();
					}
				}, 5000);

				this.setState({ timer: timer });
			}
		},
		{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearInterval(this.state.timer);
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props2 = this.props,
					serviceId = _props2.serviceId,
					service = _props2.service,
					serviceSettings = _props2.serviceSettings,
					serviceLogs = _props2.serviceLogs,
					loadingEnableDisable = _props2.loadingEnableDisable,
					enableService = _props2.enableService,
					disableService = _props2.disableService,
					updateSettings = _props2.updateSettings,
					fetchServiceLogs = _props2.fetchServiceLogs;
				var actions = null;
				var serviceError = serviceSettings && serviceSettings.error === true;
				if (
					service &&
					service.actions &&
					Array.isArray(service.actions) &&
					service.actions.length > 0
				) {
					actions = service.actions;
				}

				return _react2.default.createElement(
					'div',
					{
						className:
							_style2.default.detailsContainer + ' scroll col-full-height'
					},
					_react2.default.createElement(_description2.default, {
						service: service,
						loadingEnableDisable: loadingEnableDisable,
						enableService: enableService,
						disableService: disableService
					}),

					serviceError &&
						_react2.default.createElement(
							'div',
							{ style: { color: '#FC3246', fontSize: '24px', margin: '30px' } },
							'Service error'
						),

					service &&
						service.enabled &&
						serviceSettings &&
						!serviceError &&
						_react2.default.createElement(_settings2.default, {
							initialValues: serviceSettings,
							onSubmit: updateSettings
						}),

					service &&
						service.enabled &&
						!serviceError &&
						_react2.default.createElement(_actions2.default, {
							actions: actions,
							serviceId: serviceId,
							fetchServiceLogs: fetchServiceLogs
						}),

					service &&
						service.enabled &&
						serviceLogs &&
						serviceLogs.length > 0 &&
						_react2.default.createElement(_logs2.default, { logs: serviceLogs })
				);
			}
		}
	]);
	return ServiceDetails;
})(_react2.default.Component);
exports.default = ServiceDetails;
