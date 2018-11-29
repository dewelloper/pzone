'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _isEqual = require('lodash/isEqual');
var _isEqual2 = _interopRequireDefault(_isEqual);
var _clone = require('lodash/clone');
var _clone2 = _interopRequireDefault(_clone);
var _uuid = require('../helpers/uuid');
var _uuid2 = _interopRequireDefault(_uuid);
var _ucFirst = require('../helpers/ucFirst');
var _ucFirst2 = _interopRequireDefault(_ucFirst);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === 'object' || typeof call === 'function')
		? call
		: self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function, not ' +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}

var EVENTS = [
	'focusin',
	'focusout',
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mousemove',
	'mouseover',
	'beforepaste',
	'paste',
	'cut',
	'copy',
	'selectionchange',
	'mouseout',
	'mouseenter',
	'mouseleave',
	'keydown',
	'keypress',
	'keyup',
	'contextmenu',
	'dragend',
	'dragover',
	'draggesture',
	'dragdrop',
	'drop',
	'drag',
	'BeforeRenderUI',
	'SetAttrib',
	'PreInit',
	'PostRender',
	'init',
	'deactivate',
	'activate',
	'NodeChange',
	'BeforeExecCommand',
	'ExecCommand',
	'show',
	'hide',
	'ProgressState',
	'LoadContent',
	'SaveContent',
	'BeforeSetContent',
	'SetContent',
	'BeforeGetContent',
	'GetContent',
	'VisualAid',
	'remove',
	'submit',
	'reset',
	'BeforeAddUndo',
	'AddUndo',
	'change',
	'undo',
	'redo',
	'ClearUndos',
	'ObjectSelected',
	'ObjectResizeStart',
	'ObjectResized',
	'PreProcess',
	'PostProcess',
	'focus',
	'blur',
	'dirty'
];

var HANDLER_NAMES = EVENTS.map(function(event) {
	return 'on' + (0, _ucFirst2.default)(event);
});
var TinyMCE = (function(_React$Component) {
	_inherits(TinyMCE, _React$Component);
	function TinyMCE(props) {
		_classCallCheck(this, TinyMCE);
		var _this = _possibleConstructorReturn(
			this,
			(TinyMCE.__proto__ || Object.getPrototypeOf(TinyMCE)).call(this, props)
		);
		_this.state = {
			config: {},
			content: props.content
		};
		return _this;
	}
	_createClass(TinyMCE, [
		{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.id = this.id || this.props.id || (0, _uuid2.default)();
			}
		},
		{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var config = (0, _clone2.default)(this.props.config);
				this._init(config, this.props.content);
			}
		},
		{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (
					!(0, _isEqual2.default)(this.props.config, nextProps.config) ||
					!(0, _isEqual2.default)(this.props.id, nextProps.id)
				) {
					this.id = nextProps.id;
					this._init((0, _clone2.default)(nextProps.config), nextProps.content);
					return;
				}
			}
		},
		{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps) {
				return (
					!(0, _isEqual2.default)(this.props.config, nextProps.config) ||
					!(0, _isEqual2.default)(this.props.entityId, nextProps.entityId)
				);
			}
		},
		{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this._remove();
			}
		},
		{
			key: 'render',
			value: function render() {
				return this.props.config.inline
					? _react2.default.createElement('div', {
							id: this.id,
							className: this.props.className,
							dangerouslySetInnerHTML: { __html: this.props.content }
					  })
					: _react2.default.createElement('textarea', {
							id: this.id,
							className: this.props.className,
							name: this.props.name,
							defaultValue: this.props.content
					  });
			}
		},
		{
			key: '_init',
			value: function _init(config, content) {
				var _this2 = this;
				if (this._isInit) {
					this._remove();
				}

				// hide the textarea that is me so that no one sees it
				(0, _reactDom.findDOMNode)(this).style.hidden = 'hidden';

				var setupCallback = config.setup;
				var hasSetupCallback = typeof setupCallback === 'function';

				config.selector = '#' + this.id;
				config.setup = function(editor) {
					EVENTS.forEach(function(eventType, index) {
						editor.on(eventType, function(e) {
							var handler = _this2.props[HANDLER_NAMES[index]];
							if (typeof handler === 'function') {
								// native DOM events don't have access to the editor so we pass it here
								handler(e, editor);
							}
						});
					});
					// need to set content here because the textarea will still have the
					// old `this.props.content`
					if (typeof content !== 'undefined') {
						editor.on('init', function() {
							editor.setContent(content);
						});
					}
					if (hasSetupCallback) {
						setupCallback(editor);
					}
				};

				tinymce.init(config);

				(0, _reactDom.findDOMNode)(this).style.hidden = '';

				this._isInit = true;
			}
		},
		{
			key: '_remove',
			value: function _remove() {
				tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.id);
				this._isInit = false;
			}
		}
	]);
	return TinyMCE;
})(_react2.default.Component);
exports.default = TinyMCE;
