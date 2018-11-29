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
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _account = require('./account');
var _account2 = _interopRequireDefault(_account);
var _developer = require('./developer');
var _developer2 = _interopRequireDefault(_developer);
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
var WebStoreAccountDetails = (function(_React$Component) {
	_inherits(WebStoreAccountDetails, _React$Component);
	function WebStoreAccountDetails(props) {
		_classCallCheck(this, WebStoreAccountDetails);
		return _possibleConstructorReturn(
			this,
			(
				WebStoreAccountDetails.__proto__ ||
				Object.getPrototypeOf(WebStoreAccountDetails)
			).call(this, props)
		);
	}
	_createClass(WebStoreAccountDetails, [
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
					account = _props.account,
					onAccountSubmit = _props.onAccountSubmit,
					onDeveloperSubmit = _props.onDeveloperSubmit;
				var developerData = account ? account.developer : null;

				if (account) {
					return _react2.default.createElement(
						'div',
						{
							className:
								_style2.default.detailsContainer + ' scroll col-full-height'
						},
						_react2.default.createElement(_account2.default, {
							initialValues: account,
							onSubmit: onAccountSubmit
						}),
						account &&
							account.is_developer === true &&
							_react2.default.createElement(_developer2.default, {
								initialValues: developerData,
								onSubmit: onDeveloperSubmit
							})
					);
				} else {
					return null;
				}
			}
		}
	]);
	return WebStoreAccountDetails;
})(_react2.default.Component);
exports.default = WebStoreAccountDetails;
