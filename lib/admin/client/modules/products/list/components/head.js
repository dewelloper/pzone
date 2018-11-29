'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _Subheader = require('material-ui/Subheader');
var _Subheader2 = _interopRequireDefault(_Subheader);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Head = function Head(_ref) {
	var onSelectAll = _ref.onSelectAll;
	return _react2.default.createElement(
		_Subheader2.default,
		null,
		_react2.default.createElement(
			'div',
			{ className: 'row row--no-gutter middle-xs' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-6 col--no-gutter' },
				_react2.default.createElement(
					'div',
					{ className: 'row row--no-gutter middle-xs' },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-1 col--no-gutter' },
						_react2.default.createElement('input', {
							type: 'checkbox',
							onChange: onSelectAll
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-11' },
						_text2.default.products_name
					)
				)
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-2 col--no-gutter' },
				_text2.default.products_sku
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-2 col--no-gutter' },
				_text2.default.products_stock
			),
			_react2.default.createElement(
				'div',
				{
					className: 'col-xs-2 col--no-gutter',
					style: { textAlign: 'right', paddingRight: 23 }
				},

				_text2.default.products_price
			)
		)
	);
};
exports.default = Head;
