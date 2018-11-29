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
var _List = require('material-ui/List');
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _head = require('./head');
var _head2 = _interopRequireDefault(_head);
var _item = require('./item');
var _item2 = _interopRequireDefault(_item);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
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
var OrdersList = (function(_React$Component) {
	_inherits(OrdersList, _React$Component);
	function OrdersList(props) {
		_classCallCheck(this, OrdersList);
		return _possibleConstructorReturn(
			this,
			(OrdersList.__proto__ || Object.getPrototypeOf(OrdersList)).call(
				this,
				props
			)
		);
	}
	_createClass(OrdersList, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.onLoad();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _props = this.props,
					items = _props.items,
					selected = _props.selected,
					loadingItems = _props.loadingItems,
					hasMore = _props.hasMore,
					onSelect = _props.onSelect,
					onSelectAll = _props.onSelectAll,
					loadMore = _props.loadMore,
					settings = _props.settings;
				var rows = items.map(function(item, index) {
					return _react2.default.createElement(_item2.default, {
						key: index,
						order: item,
						selected: selected,
						onSelect: onSelect,
						settings: settings
					});
				});

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_List.List,
						null,
						_react2.default.createElement(_head2.default, {
							onSelectAll: onSelectAll
						}),
						_react2.default.createElement(_Divider2.default, null),
						rows,
						_react2.default.createElement(
							'div',
							{ className: _style2.default.more },
							_react2.default.createElement(_RaisedButton2.default, {
								disabled: loadingItems || !hasMore,
								label: _text2.default.actions_loadMore,
								labelPosition: 'before',
								primary: false,
								icon: _react2.default.createElement(
									_FontIcon2.default,
									{ className: 'material-icons' },
									'refresh'
								),
								onClick: loadMore
							})
						)
					)
				);
			}
		}
	]);
	return OrdersList;
})(_react2.default.Component);
exports.default = OrdersList;
