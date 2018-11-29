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

var _variants = require('modules/products/edit/variants');
var _variants2 = _interopRequireDefault(_variants);
var _attributes = require('modules/products/edit/attributes');
var _attributes2 = _interopRequireDefault(_attributes);
var _inventory = require('modules/products/edit/inventory');
var _inventory2 = _interopRequireDefault(_inventory);
var _images = require('modules/products/edit/images');
var _images2 = _interopRequireDefault(_images);
var _general = require('modules/products/edit/general');
var _general2 = _interopRequireDefault(_general);
var _additional = require('modules/products/edit/additional');
var _additional2 = _interopRequireDefault(_additional);

var _reactRedux = require('react-redux');
var _reactRouter = require('react-router');
var _actions = require('../actions');
var _actions2 = require('modules/productCategories/actions');
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
var ProductEditContainer = (function(_React$Component) {
	_inherits(ProductEditContainer, _React$Component);
	function ProductEditContainer(props) {
		_classCallCheck(this, ProductEditContainer);
		return _possibleConstructorReturn(
			this,
			(
				ProductEditContainer.__proto__ ||
				Object.getPrototypeOf(ProductEditContainer)
			).call(this, props)
		);
	}
	_createClass(ProductEditContainer, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchData();
			}
		},
		{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.props.eraseData();
			}
		},
		{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.description
					),
					_react2.default.createElement(_general2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.products_inventory
					),
					_react2.default.createElement(_inventory2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.productVariants
					),
					_react2.default.createElement(_variants2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.attributes
					),
					_react2.default.createElement(_attributes2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.additionalInfo
					),
					_react2.default.createElement(_additional2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { margin: 20, color: 'rgba(0, 0, 0, 0.52)' } },
						_text2.default.images
					),
					_react2.default.createElement(_images2.default, null)
				);
			}
		}
	]);
	return ProductEditContainer;
})(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		product: state.products.editProduct
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchData: function fetchData() {
			var productId = ownProps.match.params.productId;
			dispatch((0, _actions.fetchProduct)(productId));
			dispatch((0, _actions2.fetchCategoriesIfNeeded)());
		},
		eraseData: function eraseData() {
			dispatch((0, _actions.cancelProductEdit)());
		}
	};
};
exports.default = (0, _reactRouter.withRouter)(
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
		ProductEditContainer
	)
);
