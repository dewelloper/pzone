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

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _List = require('material-ui/List');
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

var PageItem = function PageItem(_ref) {
	var page = _ref.page;
	var tags = page.tags && page.tags.length > 0 ? page.tags.join(', ') : '';

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_Divider2.default, null),
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: '/admin/pages/' + page.id, style: { textDecoration: 'none' } },
			_react2.default.createElement(_List.ListItem, {
				rightIcon: _react2.default.createElement(
					_FontIcon2.default,
					{ className: 'material-icons' },
					'keyboard_arrow_right'
				),

				leftIcon: page.is_system
					? _react2.default.createElement(
							_FontIcon2.default,
							{ className: 'material-icons' },
							'lock_outline'
					  )
					: null,

				style: !page.enabled ? { color: 'rgba(0, 0, 0, 0.3)' } : {},
				primaryText: _react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-8' },
						page.meta_title
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-4', style: { color: 'rgba(0, 0, 0, 0.4)' } },
						tags
					)
				)
			})
		)
	);
};
var PagesList = (function(_React$Component) {
	_inherits(PagesList, _React$Component);
	function PagesList(props) {
		_classCallCheck(this, PagesList);
		return _possibleConstructorReturn(
			this,
			(PagesList.__proto__ || Object.getPrototypeOf(PagesList)).call(
				this,
				props
			)
		);
	}
	_createClass(PagesList, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.onLoad();
			}
		},
		{
			key: 'render',
			value: function render() {
				var pages = this.props.pages;
				var listItems = pages.map(function(page, index) {
					return _react2.default.createElement(PageItem, {
						key: index,
						page: page
					});
				});

				return _react2.default.createElement(
					_Paper2.default,
					{ className: 'paper-box', zDepth: 1 },
					_react2.default.createElement(
						'div',
						{ style: { width: '100%' } },
						_react2.default.createElement(
							_List.List,
							{ style: { padding: 0 } },
							listItems
						)
					)
				);
			}
		}
	]);
	return PagesList;
})(_react2.default.Component);
exports.default = PagesList;
