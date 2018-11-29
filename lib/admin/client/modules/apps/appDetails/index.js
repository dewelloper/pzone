'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _description = require('./description');
var _description2 = _interopRequireDefault(_description);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);
var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _apps = require('src/apps');
var _apps2 = _interopRequireDefault(_apps);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var AppDetails = function AppDetails(_ref) {
	var match = _ref.match;
	var appKey = match.params.appKey;
	var app = _apps2.default.find(function(a) {
		return a.Description.key === appKey;
	});
	var AppModule = app.App;
	var appDescription = app.Description;

	return _react2.default.createElement(
		'div',
		{ className: _style2.default.detailsContainer + ' scroll col-full-height' },
		_react2.default.createElement(_description2.default, appDescription),
		_react2.default.createElement(
			'div',
			{ style: { maxWidth: 720, width: '100%' } },
			_react2.default.createElement(
				_Paper2.default,
				{ className: 'paper-box', zDepth: 1 },
				_react2.default.createElement(
					'div',
					{ className: _style2.default.innerBox },
					_react2.default.createElement(AppModule, null)
				)
			)
		)
	);
};
exports.default = AppDetails;
