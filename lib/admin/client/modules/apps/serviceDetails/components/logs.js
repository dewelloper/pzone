'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ServiceLogs = function ServiceLogs(_ref) {
	var logs = _ref.logs;
	var list = logs.map(function(action, index) {
		var date = (0, _moment2.default)(action.date);
		var dateFormated = date.fromNow();
		return _react2.default.createElement(
			'div',
			{ className: _style2.default.logsItem, key: index },
			_react2.default.createElement(
				'div',
				{ className: _style2.default.logMessage },
				action.message
			),
			_react2.default.createElement(
				'div',
				{ className: _style2.default.logDate },
				dateFormated
			)
		);
	});

	return _react2.default.createElement(
		'div',
		{ style: { maxWidth: 720, width: '100%' } },
		_react2.default.createElement(
			'div',
			{ className: 'gray-title', style: { margin: '0px 0px 0px 20px' } },
			_text2.default.serviceLogs
		),

		_react2.default.createElement(
			_Paper2.default,
			{ className: 'paper-box', zDepth: 1 },
			_react2.default.createElement(
				'div',
				{ className: _style2.default.logsBox },
				list
			)
		)
	);
};
exports.default = ServiceLogs;
