'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _edit = require('modules/pages/edit');
var _edit2 = _interopRequireDefault(_edit);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ProductDetails = function ProductDetails(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'row row--no-gutter col-full-height scroll' },
		_react2.default.createElement(
			'div',
			{
				className:
					'col-xs-12 col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2'
			},
			_react2.default.createElement(_edit2.default, props)
		)
	);
};
exports.default = ProductDetails;
