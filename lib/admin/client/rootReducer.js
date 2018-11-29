'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _redux = require('redux');
var _reduxForm = require('redux-form');

var _reducer = require('modules/productCategories/reducer');
var _reducer2 = _interopRequireDefault(_reducer);
var _reducer3 = require('modules/products/reducer');
var _reducer4 = _interopRequireDefault(_reducer3);
var _reducer5 = require('modules/customerGroups/reducer');
var _reducer6 = _interopRequireDefault(_reducer5);
var _reducer7 = require('modules/customers/reducer');
var _reducer8 = _interopRequireDefault(_reducer7);
var _reducer9 = require('modules/orders/reducer');
var _reducer10 = _interopRequireDefault(_reducer9);
var _reducer11 = require('modules/orderStatuses/reducer');
var _reducer12 = _interopRequireDefault(_reducer11);
var _reducer13 = require('modules/pages/reducer');
var _reducer14 = _interopRequireDefault(_reducer13);
var _reducer15 = require('modules/settings/reducer');
var _reducer16 = _interopRequireDefault(_reducer15);
var _reducer17 = require('modules/apps/reducer');
var _reducer18 = _interopRequireDefault(_reducer17);
var _reducer19 = require('modules/files/reducer');
var _reducer20 = _interopRequireDefault(_reducer19);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = (0, _redux.combineReducers)({
	form: _reduxForm.reducer,
	productCategories: _reducer2.default,
	products: _reducer4.default,
	settings: _reducer16.default,
	customerGroups: _reducer6.default,
	customers: _reducer8.default,
	orders: _reducer10.default,
	orderStatuses: _reducer12.default,
	pages: _reducer14.default,
	apps: _reducer18.default,
	files: _reducer20.default
});
