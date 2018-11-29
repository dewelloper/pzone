'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function() {
	return _react2.default.createElement(
		'div',
		{ className: 'block404' },
		_react2.default.createElement('div', { className: 'title' }, '404'),
		_react2.default.createElement(
			'div',
			{ className: 'description' },
			_text2.default.pageNotFound
		)
	);
};
