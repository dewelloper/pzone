'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');

var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
var _style = require('./style.css');
var _style2 = _interopRequireDefault(_style);

var _Paper = require('material-ui/Paper');
var _Paper2 = _interopRequireDefault(_Paper);
var _RaisedButton = require('material-ui/RaisedButton');
var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
var _Divider = require('material-ui/Divider');
var _Divider2 = _interopRequireDefault(_Divider);
var _FontIcon = require('material-ui/FontIcon');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ServiceDescription = function ServiceDescription(_ref) {
	var service = _ref.service,
		loadingEnableDisable = _ref.loadingEnableDisable,
		enableService = _ref.enableService,
		disableService = _ref.disableService;
	if (service) {
		return _react2.default.createElement(
			'div',
			{ style: { maxWidth: 720, width: '100%' } },
			_react2.default.createElement(
				_Paper2.default,
				{ className: 'paper-box', zDepth: 1 },
				_react2.default.createElement(
					'div',
					{ className: _style2.default.innerBox },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-xs-4' },
							_react2.default.createElement('img', {
								src: service.cover_url,
								alt: service.name,
								className: _style2.default.cover
							})
						),

						_react2.default.createElement(
							'div',
							{ className: 'col-xs-8' },
							_react2.default.createElement(
								'h1',
								{ className: _style2.default.title },
								service.name
							),
							_react2.default.createElement(
								'div',
								{ className: _style2.default.developer },
								service.developer.name
							),
							!service.enabled &&
								_react2.default.createElement(_RaisedButton2.default, {
									label: _text2.default.enable,
									primary: true,
									disabled: loadingEnableDisable,
									onClick: enableService
								}),

							service.enabled &&
								_react2.default.createElement(_RaisedButton2.default, {
									label: _text2.default.disable,
									disabled: loadingEnableDisable,
									onClick: disableService
								})
						)
					),

					_react2.default.createElement('div', {
						className: _style2.default.description,
						dangerouslySetInnerHTML: { __html: service.description }
					})
				)
			)
		);
	} else {
		return null;
	}
};
exports.default = ServiceDescription;
