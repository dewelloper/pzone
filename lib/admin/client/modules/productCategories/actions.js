'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.selectCategory = selectCategory;
exports.deselectCategory = deselectCategory;
exports.fetchCategories = fetchCategories;
exports.fetchCategoriesIfNeeded = fetchCategoriesIfNeeded;
exports.updateCategory = updateCategory;
exports.createCategory = createCategory;
exports.deleteImage = deleteImage;
exports.deleteCategory = deleteCategory;
exports.moveUpCategory = moveUpCategory;
exports.moveDownCategory = moveDownCategory;
exports.replaceCategory = replaceCategory;
exports.uploadImage = uploadImage;
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
function requestCategories() {
	return { type: t.CATEGORIES_REQUEST };
}
function receiveCategories(items) {
	return { type: t.CATEGORIES_RECEIVE, items: items };
}
function receiveErrorCategories(error) {
	return { type: t.CATEGORIES_FAILURE, error: error };
}
function selectCategory(id) {
	return { type: t.CATEGORIES_SELECT, selectedId: id };
}
function deselectCategory() {
	return { type: t.CATEGORIES_DESELECT };
}
function requestUpdateCategory(id) {
	return { type: t.CATEGORY_UPDATE_REQUEST };
}
function receiveUpdateCategory() {
	return { type: t.CATEGORY_UPDATE_SUCCESS };
}
function errorUpdateCategory(error) {
	return { type: t.CATEGORY_UPDATE_FAILURE, error: error };
}
function successCreateCategory(id) {
	return { type: t.CATEGORY_CREATE_SUCCESS };
}
function successDeleteCategory(id) {
	return { type: t.CATEGORY_DELETE_SUCCESS };
}
function successMoveUpDownCategory(newPosition) {
	return { type: t.CATEGORY_MOVE_UPDOWN_SUCCESS, position: newPosition };
}
function successReplaceCategory(newParentId) {
	return { type: t.CATEGORY_REPLACE_SUCCESS };
}
function imageUploadStart() {
	return { type: t.CATEGORY_IMAGE_UPLOAD_START };
}
function imageUploadEnd() {
	return { type: t.CATEGORY_IMAGE_UPLOAD_END };
}
function fetchCategories() {
	return function(dispatch) {
		dispatch(requestCategories());
		return _api2.default.productCategories
			.list()
			.then(function(_ref) {
				var status = _ref.status,
					json = _ref.json;
				json.forEach(function(element, index, theArray) {
					if (theArray[index].name === '') {
						theArray[index].name = '<' + _text2.default.draft + '>';
					}
				});
				dispatch(receiveCategories(json));
			})
			.catch(function(error) {
				dispatch(receiveErrorCategories(error));
			});
	};
}
function shouldFetchCategories(state) {
	var categories = state.productCategories;
	if (categories.isFetched || categories.isFetching) {
		return false;
	} else {
		return true;
	}
}
function fetchCategoriesIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchCategories(getState())) {
			return dispatch(fetchCategories());
		}
	};
}
function sendUpdateCategory(id, data) {
	return function(dispatch) {
		dispatch(requestUpdateCategory(id));
		return _api2.default.productCategories
			.update(id, data)
			.then(function(_ref2) {
				var status = _ref2.status,
					json = _ref2.json;
				dispatch(receiveUpdateCategory());
				dispatch(fetchCategories());
			})
			.catch(function(error) {
				dispatch(errorUpdateCategory(error));
			});
	};
}
function updateCategory(data) {
	return function(dispatch, getState) {
		return dispatch(sendUpdateCategory(data.id, data));
	};
}
function createCategory() {
	return function(dispatch, getState) {
		return _api2.default.productCategories
			.create({ enabled: false })
			.then(function(_ref3) {
				var status = _ref3.status,
					json = _ref3.json;
				dispatch(successCreateCategory(json.id));
				dispatch(fetchCategories());
				dispatch(selectCategory(json.id));
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function deleteImage() {
	return function(dispatch, getState) {
		var state = getState();
		var categoryId = state.productCategories.selectedId;
		return _api2.default.productCategories
			.deleteImage(categoryId)
			.then(function(_ref4) {
				var status = _ref4.status,
					json = _ref4.json;
				if (status === 200) {
					dispatch(fetchCategories());
				} else {
					throw status;
				}
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function deleteCategory(id) {
	return function(dispatch, getState) {
		return _api2.default.productCategories
			.delete(id)
			.then(function(_ref5) {
				var status = _ref5.status,
					json = _ref5.json;
				if (status === 200) {
					dispatch(successDeleteCategory(id));
					dispatch(deselectCategory());
					dispatch(fetchCategories());
				} else {
					throw status;
				}
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function moveCategory() {
	var allCategories =
		arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var selectedCategory = arguments[1];
	var isUp =
		arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	return new Promise(function(resolve, reject) {
		if (isUp) {
			allCategories = allCategories
				.filter(function(e) {
					return (
						e.parent_id === selectedCategory.parent_id &&
						e.id !== selectedCategory.id &&
						e.position < selectedCategory.position
					);
				})
				.sort(function(a, b) {
					return b.position - a.position;
				});
		} else {
			allCategories = allCategories
				.filter(function(e) {
					return (
						e.parent_id === selectedCategory.parent_id &&
						e.id !== selectedCategory.id &&
						e.position > selectedCategory.position
					);
				})
				.sort(function(a, b) {
					return a.position - b.position;
				});
		}
		if (allCategories.length > 0) {
			var targetCategory = allCategories[0];
			var newPosition = targetCategory.position;
			_api2.default.productCategories
				.update(selectedCategory.id, { position: targetCategory.position })
				.then(function() {
					_api2.default.productCategories
						.update(targetCategory.id, { position: selectedCategory.position })
						.then(function() {
							resolve(newPosition);
						})
						.catch(function(err) {
							reject(err);
						});
				})
				.catch(function(err) {
					reject(err);
				});
		}
	});
}
function moveUpCategory() {
	return function(dispatch, getState) {
		var state = getState();
		var allCategories = state.productCategories.items;
		var selectedCategory = allCategories.find(function(item) {
			return item.id === state.productCategories.selectedId;
		});
		var isUp = true;
		return moveCategory(allCategories, selectedCategory, isUp).then(function(
			newPosition
		) {
			dispatch(successMoveUpDownCategory(newPosition));
			dispatch(fetchCategories());
		});
	};
}
function moveDownCategory() {
	return function(dispatch, getState) {
		var state = getState();
		var allCategories = state.productCategories.items;
		var selectedCategory = allCategories.find(function(item) {
			return item.id === state.productCategories.selectedId;
		});
		var isUp = false;
		return moveCategory(allCategories, selectedCategory, isUp).then(function(
			newPosition
		) {
			dispatch(successMoveUpDownCategory(newPosition));
			dispatch(fetchCategories());
		});
	};
}
function replaceCategory(parentId) {
	return function(dispatch, getState) {
		var state = getState();
		var selectedCategory = state.productCategories.items.find(function(item) {
			return item.id === state.productCategories.selectedId;
		});
		return _api2.default.productCategories
			.update(selectedCategory.id, { parent_id: parentId })
			.then(function(_ref6) {
				var status = _ref6.status,
					json = _ref6.json;
				dispatch(successReplaceCategory());
				dispatch(fetchCategories());
			})
			.catch(function(error) {
				//dispatch error
				console.log(error);
			});
	};
}
function uploadImage(form) {
	return function(dispatch, getState) {
		var state = getState();
		var categoryId = state.productCategories.selectedId;
		dispatch(imageUploadStart());
		return _api2.default.productCategories
			.uploadImage(categoryId, form)
			.then(function() {
				dispatch(imageUploadEnd());
				dispatch(fetchCategories());
			})
			.catch(function(error) {
				dispatch(imageUploadEnd());
			});
	};
}
