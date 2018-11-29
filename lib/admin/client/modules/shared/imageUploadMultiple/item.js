'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _IconButton = require('material-ui/IconButton');
var _IconButton2 = _interopRequireDefault(_IconButton);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var GalleryItem = function GalleryItem(_ref) {
	var url = _ref.url,
		alt = _ref.alt,
		id = _ref.id,
		onDelete = _ref.onDelete,
		onImageEdit = _ref.onImageEdit;
	return _react2.default.createElement(
		_Paper2.default,
		{ zDepth: 1, rounded: false },
		_react2.default.createElement(
			'div',
			{ className: _style2.default.preview },
			_react2.default.createElement('img', { src: url, title: alt })
		),

		_react2.default.createElement(
			'div',
			{ className: _style2.default.footer },
			_react2.default.createElement(
				_IconButton2.default,
				{
					touch: true,
					tooltip: _text2.default.edit,
					tooltipPosition: 'top-right',
					onClick: onImageEdit
				},

				_react2.default.createElement(
					_FontIcon2.default,
					{ color: 'rgba(0,0,0,0.5)', className: 'material-icons' },
					'create'
				)
			),

			_react2.default.createElement(
				_IconButton2.default,
				{
					touch: true,
					tooltip: _text2.default.actions_delete,
					tooltipPosition: 'top-right',
					onClick: function onClick() {
						onDelete(id);
					}
				},

				_react2.default.createElement(
					_FontIcon2.default,
					{ color: 'rgba(0,0,0,0.5)', className: 'material-icons' },
					'delete'
				)
			)
		)
	);
};
exports.default = GalleryItem;
