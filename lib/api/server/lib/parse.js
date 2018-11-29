'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _mongodb = require('mongodb');

var getString = function getString(value) {
	return (value || '').toString();
};

var getDateIfValid = function getDateIfValid(value) {
	var date = Date.parse(value);
	return isNaN(date) ? null : new Date(date);
};

var getArrayIfValid = function getArrayIfValid(value) {
	return Array.isArray(value) ? value : null;
};

var getArrayOfObjectID = function getArrayOfObjectID(value) {
	if (Array.isArray(value) && value.length > 0) {
		return value
			.map(function(id) {
				return getObjectIDIfValid(id);
			})
			.filter(function(id) {
				return !!id;
			});
	} else {
		return [];
	}
};

var isNumber = function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
};

var getNumberIfValid = function getNumberIfValid(value) {
	return isNumber(value) ? parseFloat(value) : null;
};

var getNumberIfPositive = function getNumberIfPositive(value) {
	var n = getNumberIfValid(value);
	return n && n >= 0 ? n : null;
};

var getBooleanIfValid = function getBooleanIfValid(value) {
	var defaultValue =
		arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	if (value === 'true' || value === 'false') {
		return value === 'true';
	} else {
		return typeof value === 'boolean' ? value : defaultValue;
	}
};

var getObjectIDIfValid = function getObjectIDIfValid(value) {
	return _mongodb.ObjectID.isValid(value) ? new _mongodb.ObjectID(value) : null;
};

var getBrowser = function getBrowser(browser) {
	return browser
		? {
				ip: getString(browser.ip),
				user_agent: getString(browser.user_agent)
		  }
		: {
				ip: '',
				user_agent: ''
		  };
};

var getCustomerAddress = function getCustomerAddress(address) {
	var coordinates = {
		latitude: '',
		longitude: ''
	};

	if (address && address.coordinates) {
		coordinates.latitude = address.coordinates.latitude;
		coordinates.longitude = address.coordinates.longitude;
	}

	return address
		? {
				id: new _mongodb.ObjectID(),
				address1: getString(address.address1),
				address2: getString(address.address2),
				city: getString(address.city),
				country: getString(address.country).toUpperCase(),
				state: getString(address.state),
				phone: getString(address.phone),
				postal_code: getString(address.postal_code),
				full_name: getString(address.full_name),
				company: getString(address.company),
				tax_number: getString(address.tax_number),
				coordinates: coordinates,
				details: address.details,
				default_billing: false,
				default_shipping: false
		  }
		: {};
};

var getOrderAddress = function getOrderAddress(address) {
	var coordinates = {
		latitude: '',
		longitude: ''
	};

	if (address && address.coordinates) {
		coordinates.latitude = address.coordinates.latitude;
		coordinates.longitude = address.coordinates.longitude;
	}

	var emptyAddress = {
		address1: '',
		address2: '',
		city: '',
		country: '',
		state: '',
		phone: '',
		postal_code: '',
		full_name: '',
		company: '',
		tax_number: '',
		coordinates: coordinates,
		details: null
	};

	return address
		? Object.assign(
				{},
				{
					address1: getString(address.address1),
					address2: getString(address.address2),
					city: getString(address.city),
					country: getString(address.country).toUpperCase(),
					state: getString(address.state),
					phone: getString(address.phone),
					postal_code: getString(address.postal_code),
					full_name: getString(address.full_name),
					company: getString(address.company),
					tax_number: getString(address.tax_number),
					coordinates: coordinates,
					details: address.details
				},

				address
		  )
		: emptyAddress;
};
exports.default = {
	getString: getString,
	getObjectIDIfValid: getObjectIDIfValid,
	getDateIfValid: getDateIfValid,
	getArrayIfValid: getArrayIfValid,
	getArrayOfObjectID: getArrayOfObjectID,
	getNumberIfValid: getNumberIfValid,
	getNumberIfPositive: getNumberIfPositive,
	getBooleanIfValid: getBooleanIfValid,
	getBrowser: getBrowser,
	getCustomerAddress: getCustomerAddress,
	getOrderAddress: getOrderAddress
};
