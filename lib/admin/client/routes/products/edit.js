'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _edit = require('modules/products/edit');
var _edit2 = _interopRequireDefault(_edit);
var _option = require('modules/products/edit/option');
var _option2 = _interopRequireDefault(_option);
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
			_react2.default.createElement(_reactRouterDom.Route, {
				path: '/admin/product/:productId',
				exact: true,
				component: _edit2.default
			}),
			_react2.default.createElement(_reactRouterDom.Route, {
				path: '/admin/product/:productId/option/:optionId',
				component: _option2.default
			})
		)
	);
};
exports.default = ProductDetails;
