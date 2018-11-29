'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getSalesDataFromReportData = exports.getOrdersDataFromReportData = exports.getReportDataFromOrders = undefined;
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var transparentize = function transparentize(color, opacity) {
	var alpha = opacity === undefined ? 0.5 : 1 - opacity;
	return Color(color)
		.alpha(alpha)
		.rgbString();
};

var getOrdersByDate = function getOrdersByDate(orders, dateMoment) {
	return orders.filter(function(order) {
		return (0, _moment2.default)(order.date_placed).isSame(dateMoment, 'day');
	});
};

var filterSuccessOrders = function filterSuccessOrders(order) {
	return order.paid === true || order.closed === true;
};
var filterNewOrders = function filterNewOrders(order) {
	return !order.paid && !order.closed;
};

var getReportDataFromOrders = (exports.getReportDataFromOrders = function getReportDataFromOrders(
	ordersResponse
) {
	var reportItems = [];
	var dateFrom = (0, _moment2.default)().subtract(1, 'months');
	var dateTo = (0, _moment2.default)();
	var daysDiff = dateFrom.diff(dateTo, 'days');

	for (var i = daysDiff; i < 1; i++) {
		var reportingDate = (0, _moment2.default)().add(i, 'days');
		var ordersPlacedThisDate = getOrdersByDate(
			ordersResponse.data,
			reportingDate
		);

		var totalOrdersCount = ordersPlacedThisDate.length;
		var successOrdersCount = ordersPlacedThisDate.filter(filterSuccessOrders)
			.length;
		var newOrdersCount = ordersPlacedThisDate.filter(filterNewOrders).length;
		var successOrdersRevenue = ordersPlacedThisDate
			.filter(filterSuccessOrders)
			.reduce(function(a, b) {
				return a + b.grand_total;
			}, 0);

		reportItems.push({
			date: reportingDate.format('D MMM'),
			total: totalOrdersCount,
			success: successOrdersCount,
			new: newOrdersCount,
			revenue: successOrdersRevenue
		});
	}

	return reportItems;
});

var getOrdersDataFromReportData = (exports.getOrdersDataFromReportData = function getOrdersDataFromReportData(
	reportData
) {
	var labels = reportData.map(function(item) {
		return item.date;
	});
	var successData = reportData.map(function(item) {
		return item.success;
	});
	var newData = reportData.map(function(item) {
		return item.new;
	});

	return {
		labels: labels,
		datasets: [
			{
				label: _text2.default.closedAndPaidOrders,
				data: successData,
				backgroundColor: chartColors.blue,
				hoverBackgroundColor: transparentize(chartColors.blue, 0.4)
			},

			{
				label: _text2.default.newOrders,
				data: newData,
				backgroundColor: chartColors.yellow,
				hoverBackgroundColor: transparentize(chartColors.yellow, 0.4)
			}
		]
	};
});

var getSalesDataFromReportData = (exports.getSalesDataFromReportData = function getSalesDataFromReportData(
	reportData
) {
	var labels = reportData.map(function(item) {
		return item.date;
	});
	var revenueData = reportData.map(function(item) {
		return item.revenue;
	});

	return {
		labels: labels,
		datasets: [
			{
				label: _text2.default.closedAndPaidOrders,
				data: revenueData,
				backgroundColor: chartColors.blue,
				hoverBackgroundColor: transparentize(chartColors.blue, 0.4)
			}
		]
	};
});
