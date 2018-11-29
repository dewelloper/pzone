'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _Card = require('material-ui/Card');
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var styles = {
	card: {
		width: 280,
		marginBottom: 15,
		marginRight: 15
	},

	textContainer: {
		paddingBottom: 0
	},

	title: {
		color: '#212121',
		fontSize: '15px',
		lineHeight: '18px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},

	subtitle: {
		color: '#616161',
		fontSize: '13px',
		lineHeight: '16px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		marginTop: 5
	},

	link: {
		textDecoration: 'none'
	}
};

var Item = function Item(_ref) {
	var path = _ref.path,
		coverUrl = _ref.coverUrl,
		title = _ref.title,
		developer = _ref.developer,
		enabled = _ref.enabled;
	return _react2.default.createElement(
		_reactRouterDom.Link,
		{ to: path, style: styles.link },
		_react2.default.createElement(
			_Card.Card,
			{
				style: styles.card,
				containerStyle: styles.textContainer,
				className: _style2.default.card
			},

			_react2.default.createElement(_Card.CardMedia, {
				className: _style2.default.servicesCover,
				style: { backgroundImage: 'url(' + coverUrl + ')' }
			}),

			_react2.default.createElement(_Card.CardTitle, {
				title: title,
				subtitle: _react2.default.createElement(
					'div',
					null,
					developer,
					enabled &&
						_react2.default.createElement(
							_FontIcon2.default,
							{
								style: { color: '#FF9900', float: 'right' },
								className: 'material-icons'
							},
							'check_circle'
						)
				),

				titleStyle: styles.title,
				subtitleStyle: styles.subtitle
			})
		)
	);
};
exports.default = Item;
