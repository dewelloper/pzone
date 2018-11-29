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
		files: state.files.files,
		uploading: state.files.uploading,
		settings: state.settings.settings
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onLoad: function onLoad() {
			dispatch((0, _actions.fetchFiles)());
		},
		onDelete: function onDelete(fileName) {
			dispatch((0, _actions.deleteFile)(fileName));
		},
		onUpload: function onUpload(form) {
			dispatch((0, _actions.uploadFiles)(form));
		}
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(
	_form2.default
);
