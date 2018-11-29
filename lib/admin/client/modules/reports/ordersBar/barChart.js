'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _reactChartjs = require('react-chartjs-2');
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var BarChart = function BarChart(_ref) {
	var data = _ref.data,
		title = _ref.title,
		subTitle = _ref.subTitle,
		legendDisplay = _ref.legendDisplay;
	return _react2.default.createElement(
		'div',
		{ className: 'row row--no-gutter' },
		_react2.default.createElement(
			'div',
			{ className: 'col--no-gutter col-xs-12' },
			_react2.default.createElement(
				_Paper2.default,
				{ className: 'paper-box', zDepth: 1 },
				_react2.default.createElement(
					'div',
					{ className: _style2.default.title },
					title
				),
				_react2.default.createElement(
					'div',
					{ className: _style2.default.subTitle },
					subTitle
				),
				_react2.default.createElement(
					'div',
					{ style: { padding: 30 } },
					_react2.default.createElement(_reactChartjs.Bar, {
						data: data,
						width: 100,
						height: 200,
						options: {
							legend: {
								display: legendDisplay
							},

							scales: {
								xAxes: [
									{
										stacked: true,
										barPercentage: 0.99,
										categoryPercentage: 0.99,
										gridLines: {
											display: false,
											drawBorder: false
										},

										ticks: {
											display: true,
											fontColor: 'rgba(0,0,0,0.3)',
											padding: 0
										}
									}
								],

								yAxes: [
									{
										stacked: true,
										gridLines: {
											display: true,
											drawBorder: false,
											color: 'rgba(0,0,0,0.08)'
										},

										ticks: {
											maxTicksLimit: 4,
											display: true,
											padding: 10,
											fontColor: 'rgba(0,0,0,0.3)'
										}
									}
								]
							}
						}
					})
				)
			)
		)
	);
};
exports.default = BarChart;
