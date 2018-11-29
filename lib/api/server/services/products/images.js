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
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _url = require('url');
var _url2 = _interopRequireDefault(_url);
var _formidable = require('formidable');
var _formidable2 = _interopRequireDefault(_formidable);
var _fsExtra = require('fs-extra');
var _fsExtra2 = _interopRequireDefault(_fsExtra);
var _settings = require('../../lib/settings');
var _settings2 = _interopRequireDefault(_settings);
var _mongo = require('../../lib/mongo');
var _utils = require('../../lib/utils');
var _utils2 = _interopRequireDefault(_utils);
var _parse = require('../../lib/parse');
var _parse2 = _interopRequireDefault(_parse);
var _settings3 = require('../settings/settings');
var _settings4 = _interopRequireDefault(_settings3);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}
var ProductImagesService = (function() {
	function ProductImagesService() {
		_classCallCheck(this, ProductImagesService);
	}
	_createClass(ProductImagesService, [
		{
			key: 'getErrorMessage',
			value: function getErrorMessage(err) {
				return { error: true, message: err.toString() };
			}
		},
		{
			key: 'getImages',
			value: function getImages(productId) {
				if (!_mongodb.ObjectID.isValid(productId)) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);

				return _settings4.default.getSettings().then(function(generalSettings) {
					return _mongo.db
						.collection('products')
						.findOne({ _id: productObjectID }, { fields: { images: 1 } })
						.then(function(product) {
							if (product && product.images && product.images.length > 0) {
								var images = product.images.map(function(image) {
									image.url = _url2.default.resolve(
										generalSettings.domain,
										_settings2.default.productsUploadUrl +
											'/' +
											product._id +
											'/' +
											image.filename
									);

									return image;
								});

								images = images.sort(function(a, b) {
									return a.position - b.position;
								});
								return images;
							} else {
								return [];
							}
						});
				});
			}
		},
		{
			key: 'deleteImage',
			value: function deleteImage(productId, imageId) {
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(imageId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var imageObjectID = new _mongodb.ObjectID(imageId);

				return this.getImages(productId)
					.then(function(images) {
						if (images && images.length > 0) {
							var imageData = images.find(function(i) {
								return i.id.toString() === imageId.toString();
							});

							if (imageData) {
								var filename = imageData.filename;
								var filepath = _path2.default.resolve(
									_settings2.default.productsUploadPath +
										'/' +
										productId +
										'/' +
										filename
								);

								_fsExtra2.default.removeSync(filepath);
								return _mongo.db
									.collection('products')
									.updateOne(
										{ _id: productObjectID },
										{ $pull: { images: { id: imageObjectID } } }
									);
							} else {
								return true;
							}
						} else {
							return true;
						}
					})
					.then(function() {
						return true;
					});
			}
		},
		{
			key: 'addImage',
			value: async function addImage(req, res) {
				var _this = this;
				var productId = req.params.productId;
				if (!_mongodb.ObjectID.isValid(productId)) {
					res.status(500).send(this.getErrorMessage('Invalid identifier'));
					return;
				}

				var uploadedFiles = [];
				var productObjectID = new _mongodb.ObjectID(productId);
				var uploadDir = _path2.default.resolve(
					_settings2.default.productsUploadPath + '/' + productId
				);

				_fsExtra2.default.ensureDirSync(uploadDir);

				var form = new _formidable2.default.IncomingForm();
				form.uploadDir = uploadDir;

				form
					.on('fileBegin', function(name, file) {
						// Emitted whenever a field / value pair has been received.
						file.name = _utils2.default.getCorrectFileName(file.name);
						file.path = uploadDir + '/' + file.name;
					})
					.on('file', async function(field, file) {
						// every time a file has been uploaded successfully,
						if (file.name) {
							var imageData = {
								id: new _mongodb.ObjectID(),
								alt: '',
								position: 99,
								filename: file.name
							};

							uploadedFiles.push(imageData);

							await _mongo.db.collection('products').updateOne(
								{
									_id: productObjectID
								},

								{
									$push: { images: imageData }
								}
							);
						}
					})
					.on('error', function(err) {
						res.status(500).send(_this.getErrorMessage(err));
					})
					.on('end', function() {
						res.send(uploadedFiles);
					});

				form.parse(req);
			}
		},
		{
			key: 'updateImage',
			value: function updateImage(productId, imageId, data) {
				if (
					!_mongodb.ObjectID.isValid(productId) ||
					!_mongodb.ObjectID.isValid(imageId)
				) {
					return Promise.reject('Invalid identifier');
				}
				var productObjectID = new _mongodb.ObjectID(productId);
				var imageObjectID = new _mongodb.ObjectID(imageId);

				var imageData = this.getValidDocumentForUpdate(data);

				return _mongo.db.collection('products').updateOne(
					{
						_id: productObjectID,
						'images.id': imageObjectID
					},

					{ $set: imageData }
				);
			}
		},
		{
			key: 'getValidDocumentForUpdate',
			value: function getValidDocumentForUpdate(data) {
				if (Object.keys(data).length === 0) {
					return new Error('Required fields are missing');
				}

				var image = {};

				if (data.alt !== undefined) {
					image['images.$.alt'] = _parse2.default.getString(data.alt);
				}

				if (data.position !== undefined) {
					image['images.$.position'] =
						_parse2.default.getNumberIfPositive(data.position) || 0;
				}

				return image;
			}
		}
	]);
	return ProductImagesService;
})();
exports.default = new ProductImagesService();
