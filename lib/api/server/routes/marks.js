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
var _security = require('../lib/security');
var _security2 = _interopRequireDefault(_security);
var _marks = require('../services/marks/marks');
var _marks2 = _interopRequireDefault(_marks);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var MarksRoute = (function() {
	function MarksRoute(router) {
		_classCallCheck(this, MarksRoute);
		this.router = router;
		this.registerRoutes();
	}
	_createClass(MarksRoute, [
		{
			key: 'registerRoutes',
			value: function registerRoutes() {
				this.router.get(
					'/v1/Marks',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_Marks
					),
					this.getMarks.bind(this)
				);

				this.router.post(
					'/v1/Marks',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_Marks
					),
					this.addMark.bind(this)
				);

				this.router.get(
					'/v1/Marks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.READ_Marks
					),
					this.getSingleMark.bind(this)
				);

				this.router.put(
					'/v1/Marks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_Marks
					),
					this.updateMark.bind(this)
				);

				this.router.delete(
					'/v1/Marks/:id',
					_security2.default.checkUserScope.bind(
						this,
						_security2.default.scope.WRITE_Marks
					),
					this.deleteMark.bind(this)
				);
			}
		},
		{
			key: 'getMarks',
			value: function getMarks(req, res, next) {
				_marks2.default
					.getMarks(req.query)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'getSingleMark',
			value: function getSingleMark(req, res, next) {
				_marks2.default
					.getSingleMark(req.params.id)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'addMark',
			value: function addMark(req, res, next) {
				_marks2.default
					.addMark(req.body)
					.then(function(data) {
						res.send(data);
					})
					.catch(next);
			}
		},
		{
			key: 'updateMark',
			value: function updateMark(req, res, next) {
				_marks2.default
					.updateMark(req.params.id, req.body)
					.then(function(data) {
						if (data) {
							res.send(data);
						} else {
							res.status(404).end();
						}
					})
					.catch(next);
			}
		},
		{
			key: 'deleteMark',
			value: function deleteMark(req, res, next) {
				_marks2.default
					.deleteMark(req.params.id)
					.then(function(data) {
						res.status(data ? 200 : 404).end();
					})
					.catch(next);
			}
		}
	]);
	return MarksRoute;
})();
exports.default = MarksRoute;
