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
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _serviceItem = require('./serviceItem');
var _serviceItem2 = _interopRequireDefault(_serviceItem);
var _appItem = require('./appItem');
var _appItem2 = _interopRequireDefault(_appItem);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _apps = require('src/apps');
var _apps2 = _interopRequireDefault(_apps);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
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
var ServicesList = (function(_React$Component) {
	_inherits(ServicesList, _React$Component);
	function ServicesList(props) {
		_classCallCheck(this, ServicesList);
		return _possibleConstructorReturn(
			this,
			(ServicesList.__proto__ || Object.getPrototypeOf(ServicesList)).call(
				this,
				props
			)
		);
	}
	_createClass(ServicesList, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchData();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					services = _props.services,
					webstoreAuthorized = _props.webstoreAuthorized;

				var serviceItems = null;
				if (services && services.data) {
					serviceItems = services.data.map(function(service, index) {
						return _react2.default.createElement(_serviceItem2.default, {
							key: index,
							service: service
						});
					});
				}

				var appItems = _apps2.default.map(function(app, index) {
					return _react2.default.createElement(_appItem2.default, {
						key: index,
						app: app.Description
					});
				});

				return _react2.default.createElement(
					'div',
					{
						className: 'row row--no-gutter scroll col-full-height',
						style: { padding: 20, alignContent: 'flex-start' }
					},

					appItems,
					!webstoreAuthorized &&
						_react2.default.createElement(
							'div',
							{
								style: {
									width: '100%',
									marginTop: 30,
									color: 'rgba(0, 0, 0, 0.52)'
								}
							},

							_text2.default.loadFromWebstore,
							'\xA0\xA0',
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ to: '/admin/apps/login' },
								_react2.default.createElement(_RaisedButton2.default, {
									label: _text2.default.loginTitle
								})
							)
						),

					serviceItems
				);
			}
		}
	]);
	return ServicesList;
})(_react2.default.Component);
exports.default = ServicesList;
