'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _ordersBar = require('modules/reports/ordersBar');
var _ordersBar2 = _interopRequireDefault(_ordersBar);
var _reactChartjs = require('react-chartjs-2');
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// Set charts default
_reactChartjs.defaults.global.responsive = true;
_reactChartjs.defaults.global.maintainAspectRatio = false;
_reactChartjs.defaults.global.title.display = false;
_reactChartjs.defaults.global.legend.position = 'bottom';
_reactChartjs.defaults.global.legend.labels.boxWidth = 20;
_reactChartjs.defaults.global.tooltips.mode = 'index';
_reactChartjs.defaults.global.tooltips.intersect = false;
_reactChartjs.defaults.global.tooltips.bodySpacing = 8;
_reactChartjs.defaults.global.tooltips.titleMarginBottom = 16;
exports.default = function() {
	return _react2.default.createElement(
		'div',
		{ className: 'scroll col-full-height' },
		_react2.default.createElement(_ordersBar2.default, null)
	);
};
