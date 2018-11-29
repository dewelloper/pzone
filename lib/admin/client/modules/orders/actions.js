'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _slicedToArray = (function() {
	function sliceIterator(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return']) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
	return function(arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			);
		}
	};
})();
exports.clearOrderDetails = clearOrderDetails;
exports.selectOrder = selectOrder;
exports.deselectOrder = deselectOrder;
exports.deselectAllOrder = deselectAllOrder;
exports.selectAllOrder = selectAllOrder;
exports.setFilter = setFilter;
exports.fetchOrders = fetchOrders;
exports.fetchMoreOrders = fetchMoreOrders;
exports.bulkUpdate = bulkUpdate;
exports.deleteOrders = deleteOrders;
exports.deleteCurrentOrder = deleteCurrentOrder;
exports.fetchOrder = fetchOrder;
exports.deleteOrderItem = deleteOrderItem;
exports.addOrderItem = addOrderItem;
exports.updateOrderItem = updateOrderItem;
exports.updateOrder = updateOrder;
exports.closeOrder = closeOrder;
exports.cancelOrder = cancelOrder;
exports.updateShippingAddress = updateShippingAddress;
exports.createOrder = createOrder;
exports.checkoutOrder = checkoutOrder;
var _actionTypes = require('./actionTypes');
var t = _interopRequireWildcard(_actionTypes);
var _api = require('lib/api');
var _api2 = _interopRequireDefault(_api);
var _text = require('lib/text');
var _text2 = _interopRequireDefault(_text);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key];
			}
		}
		newObj.default = obj;
		return newObj;
	}
}
function requestOrder() {
	return { type: t.ORDER_DETAIL_REQUEST };
}
function receiveOrder(item) {
	return { type: t.ORDER_DETAIL_RECEIVE, item: item };
}
function clearOrderDetails() {
	return receiveOrder(null);
}
function requestOrders() {
	return { type: t.ORDERS_REQUEST };
}
function requestMoreOrders() {
	return { type: t.ORDERS_MORE_REQUEST };
}
function receiveOrdersMore(_ref) {
	var has_more = _ref.has_more,
		total_count = _ref.total_count,
		data = _ref.data;
	return {
		type: t.ORDERS_MORE_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveOrders(_ref2) {
	var has_more = _ref2.has_more,
		total_count = _ref2.total_count,
		data = _ref2.data;
	return {
		type: t.ORDERS_RECEIVE,
		has_more: has_more,
		total_count: total_count,
		data: data
	};
}
function receiveOrdersError(error) {
	return { type: t.ORDERS_FAILURE, error: error };
}
function requestOrderCheckout() {
	return { type: t.ORDER_CHECKOUT_REQUEST };
}
function receiveOrderCheckout() {
	return { type: t.ORDER_CHECKOUT_RECEIVE };
}
function failOrderCheckout(error) {
	return { type: t.ORDER_CHECKOUT_FAILURE, error: error };
}
function selectOrder(id) {
	return { type: t.ORDERS_SELECT, orderId: id };
}
function deselectOrder(id) {
	return { type: t.ORDERS_DESELECT, orderId: id };
}
function deselectAllOrder() {
	return { type: t.ORDERS_DESELECT_ALL };
}
function selectAllOrder() {
	return { type: t.ORDERS_SELECT_ALL };
}
function setFilter(filter) {
	return { type: t.ORDERS_SET_FILTER, filter: filter };
}
function requestBulkUpdate() {
	return { type: t.ORDERS_BULK_UPDATE_REQUEST };
}
function receiveBulkUpdate() {
	return { type: t.ORDERS_BULK_UPDATE_SUCCESS };
}
function errorBilkUpdate() {
	return { type: t.ORDERS_BULK_UPDATE_FAILURE };
}
function deleteOrdersSuccess() {
	return { type: t.ORDER_DELETE_SUCCESS };
}
function createOrdersSuccess() {
	return { type: t.ORDER_CREATE_SUCCESS };
}
function requestOrderUpdate() {
	return { type: t.ORDER_UPDATE_REQUEST };
}
function receiveOrderUpdate() {
	return { type: t.ORDER_UPDATE_SUCCESS };
}
function failOrderUpdate(error) {
	return { type: t.ORDER_UPDATE_FAILURE, error: error };
}
var getFilter = function getFilter(state) {
	var offset =
		arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var filterState = state.orders.filter;
	var filter = { limit: 50, offset: offset };
	if (filterState.search !== null && filterState.search !== '') {
		filter.search = filterState.search;
	}
	if (filterState.closed !== null) {
		filter.closed = filterState.closed;
	}
	if (filterState.cancelled !== null) {
		filter.cancelled = filterState.cancelled;
	}
	if (filterState.delivered !== null) {
		filter.delivered = filterState.delivered;
	}
	if (filterState.paid !== null) {
		filter.paid = filterState.paid;
	}
	if (filterState.hold !== null) {
		filter.hold = filterState.hold;
	}
	if (filterState.draft !== null) {
		filter.draft = filterState.draft;
	}
	if (state.orderStatuses.selectedId) {
		filter.status_id = state.orderStatuses.selectedId;
	}
	return filter;
};
function fetchOrders() {
	return function(dispatch, getState) {
		var state = getState();
		if (!state.orders.loadingItems) {
			dispatch(requestOrders());
			dispatch(deselectAllOrder());
			var filter = getFilter(state);
			return _api2.default.orders
				.list(filter)
				.then(function(_ref3) {
					var status = _ref3.status,
						json = _ref3.json;
					dispatch(receiveOrders(json));
				})
				.catch(function(error) {
					dispatch(receiveOrdersError(error));
				});
		}
	};
}
function fetchMoreOrders() {
	return function(dispatch, getState) {
		var state = getState();
		if (!state.orders.loadingItems) {
			dispatch(requestMoreOrders());
			var filter = getFilter(state, state.orders.items.length);
			return _api2.default.orders
				.list(filter)
				.then(function(_ref4) {
					var status = _ref4.status,
						json = _ref4.json;
					dispatch(receiveOrdersMore(json));
				})
				.catch(function(error) {
					dispatch(receiveOrdersError(error));
				});
		}
	};
}
function bulkUpdate(dataToSet) {
	return function(dispatch, getState) {
		dispatch(requestBulkUpdate());
		var state = getState();
		var promises = state.orders.selected.map(function(orderId) {
			return _api2.default.orders.update(orderId, dataToSet);
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(receiveBulkUpdate());
				dispatch(fetchOrders());
			})
			.catch(function(err) {
				dispatch(errorBilkUpdate());
				console.log(err);
			});
	};
}
function deleteOrders() {
	return function(dispatch, getState) {
		var state = getState();
		var promises = state.orders.selected.map(function(orderId) {
			return _api2.default.orders.delete(orderId);
		});
		return Promise.all(promises)
			.then(function(values) {
				dispatch(deleteOrdersSuccess());
				dispatch(deselectAllOrder());
				dispatch(fetchOrders());
			})
			.catch(function(err) {
				console.log(err);
			});
	};
}
function deleteCurrentOrder() {
	return function(dispatch, getState) {
		var state = getState();
		var order = state.orders.editOrder;
		if (order && order.id) {
			return _api2.default.orders.delete(order.id).catch(function(err) {
				console.log(err);
			});
		}
	};
}
var fetchOrderAdditionalData = function fetchOrderAdditionalData(order) {
	var hasCustomer = order.customer_id && order.customer_id.length > 0;
	var hasShippingMethod =
		order.shipping_method_id && order.shipping_method_id.length > 0;
	var productIds =
		order && order.items && order.items.length > 0
			? order.items
					.filter(function(item) {
						return item.product_id;
					})
					.map(function(item) {
						return item.product_id;
					})
			: [];
	var productFilter = {
		ids: productIds,
		fields: 'images,enabled,stock_quantity,variants,options'
	};
	return Promise.all([
		productIds.length > 0 ? _api2.default.products.list(productFilter) : null,
		hasCustomer ? _api2.default.customers.retrieve(order.customer_id) : null,
		hasShippingMethod
			? _api2.default.shippingMethods.retrieve(order.shipping_method_id)
			: null
	])
		.then(function(_ref5) {
			var _ref6 = _slicedToArray(_ref5, 3),
				productsResponse = _ref6[0],
				customerResponse = _ref6[1],
				methodResponse = _ref6[2];
			if (productsResponse) {
				var products = productsResponse.json.data;
				var newItems = order.items.map(function(item) {
					item.product = products.find(function(p) {
						return p.id === item.product_id;
					});
					return item;
				});
				order.items = newItems;
			}
			order.customer = customerResponse ? customerResponse.json : null;
			order.shipping_method_details = methodResponse
				? methodResponse.json
				: null;
			return order;
		})
		.catch(function(err) {
			return err;
		});
};
function fetchOrder(orderId) {
	return function(dispatch, getState) {
		dispatch(requestOrder());
		return _api2.default.orders
			.retrieve(orderId)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function deleteOrderItem(orderId, orderItemId) {
	return function(dispatch, getState) {
		var state = getState();
		_api2.default.orders.items
			.delete(orderId, orderItemId)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function addOrderItem(orderId, productId) {
	return function(dispatch, getState) {
		var state = getState();
		_api2.default.orders.items
			.create(orderId, { product_id: productId, variant_id: null, quantity: 1 })
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function updateOrderItem(orderId, orderItemId, quantity, variantId) {
	return function(dispatch, getState) {
		var state = getState();
		_api2.default.orders.items
			.update(orderId, orderItemId, {
				quantity: quantity,
				variant_id: variantId
			})
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function updateOrder(data) {
	return function(dispatch, getState) {
		dispatch(requestOrderUpdate());
		return _api2.default.orders
			.update(data.id, data)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrderUpdate());
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {
				dispatch(failOrderUpdate(error));
			});
	};
}
function closeOrder(orderId) {
	return function(dispatch, getState) {
		return _api2.default.orders
			.close(orderId)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function cancelOrder(orderId) {
	return function(dispatch, getState) {
		return _api2.default.orders
			.cancel(orderId)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function updateShippingAddress(orderId, address) {
	return function(dispatch, getState) {
		return _api2.default.orders
			.updateShippingAddress(orderId, address)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {});
	};
}
function createOrder(history) {
	return function(dispatch, getState) {
		var state = getState();
		return _api2.default.orders
			.create({ draft: true, referrer_url: 'admin' })
			.then(function(orderResponse) {
				var orderId = orderResponse.json.id;
				dispatch(createOrdersSuccess());
				history.push('/admin/order/' + orderId);
			})
			.catch(function(error) {});
	};
}
function checkoutOrder(orderId) {
	return function(dispatch, getState) {
		dispatch(requestOrderCheckout());
		return _api2.default.orders
			.checkout(orderId)
			.then(function(orderResponse) {
				return orderResponse.json;
			})
			.then(fetchOrderAdditionalData)
			.then(function(order) {
				dispatch(receiveOrderCheckout());
				dispatch(receiveOrder(order));
			})
			.catch(function(error) {
				dispatch(failOrderCheckout(error));
			});
	};
}
