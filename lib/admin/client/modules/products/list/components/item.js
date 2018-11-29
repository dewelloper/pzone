'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _helper = require('lib/helper');
var helper = _interopRequireWildcard(_helper);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var THUMBNAIL_WIDTH = 100;
var ImagePlaceholder = _react2.default.createElement(
	_FontIcon2.default,
	{
		style: { fontSize: 30, color: '#cccccc' },
		className: 'material-icons'
	},
	'photo_camera'
);

var ItemImage = function ItemImage(_ref) {
	var images = _ref.images;
	if (images && images.length > 0) {
		var imageUrl = helper.getThumbnailUrl(images[0].url, THUMBNAIL_WIDTH);
		return _react2.default.createElement('img', {
			src: imageUrl,
			className: _style2.default.image
		});
	} else {
		return ImagePlaceholder;
	}
};

var ItemPrice = function ItemPrice(_ref2) {
	var product = _ref2.product,
		settings = _ref2.settings;
	var priceFormatted = helper.formatCurrency(product.price, settings);
	var priceOldFormatted = product.on_sale
		? helper.formatCurrency(product.regular_price, settings)
		: '';

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement('small', null, priceOldFormatted),
		priceFormatted
	);
};

var ItemStock = function ItemStock(_ref3) {
	var status = _ref3.status,
		quantity = _ref3.quantity;
	var stockValue = '';
	var stockClass = '';
	switch (status) {
		case 'discontinued':
			stockValue = _text2.default.products_discontinued;
			stockClass = _style2.default.discontinued;
			break;
		case 'backorder':
			stockValue = _text2.default.products_backorder;
			stockClass = _style2.default.backorder;
			break;
		case 'preorder':
			stockValue = _text2.default.products_preorder;
			stockClass = _style2.default.preorder;
			break;
		case 'available':
			stockValue = quantity;
			stockClass = _style2.default.inStock;
			break;
		case 'out_of_stock':
		default:
			stockValue = _text2.default.products_outOfStock;
			stockClass = _style2.default.outOfStock;
			break;
	}

	return _react2.default.createElement(
		'div',
		{ className: stockClass },
		stockValue
	);
};

var ProductItem = function ProductItem(_ref4) {
	var product = _ref4.product,
		onSelect = _ref4.onSelect,
		selected = _ref4.selected,
		settings = _ref4.settings;
	var productClass = _style2.default.productName;
	if (!product.enabled || product.discontinued) {
		productClass += ' ' + _style2.default.productInactive;
	} else {
		productClass += ' ' + _style2.default.productActive;
	}

	var productName =
		product.name && product.name.length > 0
			? product.name
			: '<' + _text2.default.draft + '>';

	return _react2.default.createElement(
		'div',
		{ className: 'products-item' + (selected === true ? ' selected' : '') },
		_react2.default.createElement(
			'div',
			{
				className: 'row row--no-gutter middle-xs ' + _style2.default.innerItem
			},
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
							onChange: onSelect,
							checked: selected,
							value: product.id
						})
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-3' },
						_react2.default.createElement(
							'div',
							{
								className: 'row middle-xs center-xs ' + _style2.default.imageBox
							},
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement(
									'div',
									{ className: 'box' },
									_react2.default.createElement(ItemImage, {
										images: product.images
									})
								)
							)
						)
					),

					_react2.default.createElement(
						'div',
						{ className: 'col-xs-8' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{
								to: '/admin/product/' + product.id,
								className: productClass
							},

							productName,
							_react2.default.createElement('br', null),
							_react2.default.createElement(
								'small',
								null,
								product.category_name
							)
						)
					)
				)
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-2 ' + _style2.default.sku },
				product.sku
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-2 ' + _style2.default.stock },
				_react2.default.createElement(ItemStock, {
					status: product.stock_status,
					quantity: product.stock_quantity
				})
			),

			_react2.default.createElement(
				'div',
				{ className: 'col-xs-2 ' + _style2.default.price },
				_react2.default.createElement(ItemPrice, {
					product: product,
					settings: settings
				})
			)
		),

		_react2.default.createElement(_Divider2.default, null)
	);
};
exports.default = ProductItem;
