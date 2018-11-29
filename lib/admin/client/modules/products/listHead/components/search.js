'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _TextField = require('material-ui/TextField');
var _TextField2 = _interopRequireDefault(_TextField);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function(_ref) {
	var value = _ref.value,
		setSearch = _ref.setSearch;
	return _react2.default.createElement(_TextField2.default, {
		value: value,
		onChange: setSearch,
		hintText: _text2.default.products_search,
		underlineShow: false,
		className: 'searchField',
		hintStyle: { color: 'rgba(255,255,255,0.4)', textIndent: '16px' },
		inputStyle: {
			color: '#fff',
			backgroundColor: 'rgba(255,255,255,0.2)',
			borderRadius: '4px',
			textIndent: '16px'
		}
	});
};
