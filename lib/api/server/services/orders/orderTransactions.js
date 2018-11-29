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
var _mongodb = require('mongodb');
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _webhooks = require('../../lib/webhooks');
var _webhooks2 = _interopRequireDefault(_webhooks);
var _orders = require('./orders');
var _orders2 = _interopRequireDefault(_orders);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var OrdertTansactionsService = (function() {
	function OrdertTansactionsService() {
		_classCallCheck(this, OrdertTansactionsService);
	}
	_createClass(OrdertTansactionsService, [
		{
			key: 'addTransaction',
			value: async function addTransaction(order_id, data) {
				if (!_mongodb.ObjectID.isValid(order_id)) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var transaction = this.getValidDocumentForInsert(data);

				await _mongo.db.collection('orders').updateOne(
					{
						_id: orderObjectID
					},

					{
						$push: {
							transactions: transaction
						}
					}
				);

				var order = await _orders2.default.getSingleOrder(order_id);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.TRANSACTION_CREATED,
					payload: order
				});

				return order;
			}
		},
		{
			key: 'updateTransaction',
			value: async function updateTransaction(order_id, transaction_id, data) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(transaction_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var transactionObjectID = new _mongodb.ObjectID(transaction_id);
				var transaction = this.getValidDocumentForUpdate(data);

				await _mongo.db.collection('orders').updateOne(
					{
						_id: orderObjectID,
						'transactions.id': transactionObjectID
					},

					{
						$set: transaction
					}
				);

				var order = await _orders2.default.getSingleOrder(order_id);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.TRANSACTION_UPDATED,
					payload: order
				});

				return order;
			}
		},
		{
			key: 'deleteTransaction',
			value: async function deleteTransaction(order_id, transaction_id) {
				if (
					!_mongodb.ObjectID.isValid(order_id) ||
					!_mongodb.ObjectID.isValid(transaction_id)
				) {
					return Promise.reject('Invalid identifier');
				}
				var orderObjectID = new _mongodb.ObjectID(order_id);
				var transactionObjectID = new _mongodb.ObjectID(transaction_id);

				await _mongo.db.collection('orders').updateOne(
					{
						_id: orderObjectID
					},

					{
						$pull: {
							transactions: {
								id: transactionObjectID
							}
						}
					}
				);

				var order = await _orders2.default.getSingleOrder(order_id);
				await _webhooks2.default.trigger({
					event: _webhooks2.default.events.TRANSACTION_DELETED,
					payload: order
				});

				return order;
			}
		},
		{
			key: 'getValidDocumentForInsert',
			value: function getValidDocumentForInsert(data) {
				return {
					id: new _mongodb.ObjectID(),
					transaction_id: _parse2.default.getString(data.transaction_id),
					amount: _parse2.default.getNumberIfPositive(data.amount) || 0,
					currency: _parse2.default.getString(data.currency),
					status: _parse2.default.getString(data.status),
					details: _parse2.default.getString(data.details),
					success: _parse2.default.getBooleanIfValid(data.success)
				};
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var transaction = {};

				if (data.transaction_id !== undefined) {
					transaction[
						'transactions.$.transaction_id'
					] = _parse2.default.getString(data.transaction_id);
				}

				if (data.amount !== undefined) {
					transaction['transactions.$.amount'] =
						_parse2.default.getNumberIfPositive(data.amount) || 0;
				}

				if (data.currency !== undefined) {
					transaction['transactions.$.currency'] = _parse2.default.getString(
						data.currency
					);
				}

				if (data.status !== undefined) {
					transaction['transactions.$.status'] = _parse2.default.getString(
						data.status
					);
				}

				if (data.details !== undefined) {
					transaction['transactions.$.details'] = _parse2.default.getString(
						data.details
					);
				}

				if (data.success !== undefined) {
					transaction[
						'transactions.$.success'
					] = _parse2.default.getBooleanIfValid(data.success);
				}

				return transaction;
			}
		}
	]);
	return OrdertTansactionsService;
})();
exports.default = new OrdertTansactionsService();
