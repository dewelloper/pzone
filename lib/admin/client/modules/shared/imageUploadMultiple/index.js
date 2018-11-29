'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactSortableHoc = require('react-sortable-hoc');

var _settings = require('lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _item = require('./item');
var _item2 = _interopRequireDefault(_item);
var _uploader = require('./uploader');
var _uploader2 = _interopRequireDefault(_uploader);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var SortableItem = (0, _reactSortableHoc.SortableElement)(function(_ref) {
	var image = _ref.image,
		onDelete = _ref.onDelete,
		_onImageEdit = _ref.onImageEdit;
	return _react2.default.createElement(
		'li',
		{ className: _style2.default.item },
		_react2.default.createElement(_item2.default, {
			url: image.url,
			alt: image.alt,
			id: image.id,
			onDelete: onDelete,
			onImageEdit: function onImageEdit() {
				_onImageEdit(image);
			}
		})
	);
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function(_ref2) {
	var items = _ref2.items,
		onDelete = _ref2.onDelete,
		onImageEdit = _ref2.onImageEdit;
	return _react2.default.createElement(
		'ul',
		{ className: _style2.default.list },
		items.map(function(value, index) {
			return _react2.default.createElement(SortableItem, {
				key: 'item-' + index,
				index: index,
				image: value,
				onDelete: onDelete,
				onImageEdit: onImageEdit
			});
		})
	);
});

var Gallery = function Gallery(_ref3) {
	var productId = _ref3.productId,
		images = _ref3.images,
		onImageDelete = _ref3.onImageDelete,
		onImageSort = _ref3.onImageSort,
		onImageUpload = _ref3.onImageUpload,
		uploading = _ref3.uploading,
		onImageEdit = _ref3.onImageEdit;
	if (images && images.length > 0) {
		return _react2.default.createElement(
			_uploader2.default,
			{ onUpload: onImageUpload, uploading: uploading },
			_react2.default.createElement(
				'div',
				{ className: _style2.default.gallery },
				_react2.default.createElement(SortableList, {
					axis: 'x',
					items: images,
					onDelete: function onDelete(imageId) {
						onImageDelete(productId, imageId);
					},
					onImageEdit: onImageEdit,
					onSortEnd: function onSortEnd(_ref4) {
						var oldIndex = _ref4.oldIndex,
							newIndex = _ref4.newIndex;
						var sortedItems = (0, _reactSortableHoc.arrayMove)(
							images,
							oldIndex,
							newIndex
						);
						var withNewPosition = sortedItems.map(function(image, index) {
							image.position = index;
							return image;
						});
						onImageSort(productId, withNewPosition);
					}
				})
			)
		);
	} else {
		return _react2.default.createElement(_uploader2.default, {
			onUpload: onImageUpload,
			uploading: uploading
		});
	}
};
exports.default = Gallery;
