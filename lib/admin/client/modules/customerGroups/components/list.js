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
var _List = require('material-ui/List');
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
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

var styles = {
	selectedItem: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},

	innerItem: {
		paddingLeft: 55
	}
};

var FolderIcon = _react2.default.createElement(
	_FontIcon2.default,
	{ className: 'material-icons' },
	'folder'
);
var Groups = (function(_React$Component) {
	_inherits(Groups, _React$Component);
	function Groups(props) {
		_classCallCheck(this, Groups);
		return _possibleConstructorReturn(
			this,
			(Groups.__proto__ || Object.getPrototypeOf(Groups)).call(this, props)
		);
	}
	_createClass(Groups, [
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.onLoad();
			}
		},
		{
			key: 'render',
			value: function render() {
				var _this2 = this;
				var _props = this.props,
					onSelect = _props.onSelect,
					selectedId = _props.selectedId,
					items = _props.items,
					showAll = _props.showAll,
					showRoot = _props.showRoot,
					showManage = _props.showManage;

				var rows = items.map(function(item) {
					return _react2.default.createElement(_List.ListItem, {
						key: item.id,
						className: 'treeItem',
						style: item.id === selectedId ? styles.selectedItem : null,
						innerDivStyle: styles.innerItem,
						primaryText: item.name,
						leftIcon: FolderIcon,
						onClick: function onClick() {
							_this2.props.onSelect(item.id);
						}
					});
				});

				return _react2.default.createElement(
					_List.List,
					null,
					showRoot &&
						_react2.default.createElement(_List.ListItem, {
							className: 'treeItem',
							primaryText: _text2.default.customers_noGroup,
							style: 'root' === selectedId ? styles.selectedItem : null,
							innerDivStyle: styles.innerItem,
							leftIcon: _react2.default.createElement(
								_FontIcon2.default,
								{ className: 'material-icons' },
								'clear'
							),
							onClick: function onClick() {
								onSelect('root');
							}
						}),

					showAll &&
						_react2.default.createElement(_List.ListItem, {
							className: 'treeItem',
							primaryText: _text2.default.customerGroups_all,
							style: 'all' === selectedId ? styles.selectedItem : null,
							innerDivStyle: styles.innerItem,
							leftIcon: FolderIcon,
							onClick: function onClick() {
								onSelect('all');
							}
						}),

					rows,

					showManage &&
						_react2.default.createElement(
							_reactRouterDom.Link,
							{
								to: '/admin/customers/groups',
								style: { textDecoration: 'none' }
							},
							_react2.default.createElement(_List.ListItem, {
								className: 'treeItem',
								primaryText: _text2.default.customerGroups_titleEditMany,
								innerDivStyle: styles.innerItem,
								leftIcon: _react2.default.createElement(
									_FontIcon2.default,
									{ className: 'material-icons' },
									'settings'
								)
							})
						)
				);
			}
		}
	]);
	return Groups;
})(_react2.default.Component);
exports.default = Groups;
