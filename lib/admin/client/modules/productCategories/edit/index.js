'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _reactRedux = require('react-redux');
var _actions = require('../actions');

var _form = require('./components/form');
var _form2 = _interopRequireDefault(_form);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		uploadingImage: state.productCategories.uploadingImage,
		categoryId: state.productCategories.selectedId,
		items: state.productCategories.items,
		initialValues: state.productCategories.items.find(function(item) {
			return item.id === state.productCategories.selectedId;
		}),

		isSaving: state.productCategories.isSaving
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onImageDelete: function onImageDelete() {
			dispatch((0, _actions.deleteImage)());
		},
		onImageUpload: function onImageUpload(form) {
			dispatch((0, _actions.uploadImage)(form));
		},
		onSubmit: function onSubmit(values) {
			delete values.image;
			if (!values.slug || values.slug === '') {
				values.slug = values.name;
			}
			dispatch((0, _actions.updateCategory)(values));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
