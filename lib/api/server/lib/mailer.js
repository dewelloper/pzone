'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _winston = require('winston');
var _winston2 = _interopRequireDefault(_winston);
var _nodemailer = require('nodemailer');
var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');
var _nodemailerSmtpTransport2 = _interopRequireDefault(
	_nodemailerSmtpTransport
);
var _settings = require('./settings');
var _settings2 = _interopRequireDefault(_settings);
var _email = require('../services/settings/email');
var _email2 = _interopRequireDefault(_email);
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var SMTP_FROM_CONFIG_FILE = {
	host: _settings2.default.smtpServer.host,
	port: _settings2.default.smtpServer.port,
	secure: _settings2.default.smtpServer.secure,
	auth: {
		user: _settings2.default.smtpServer.user,
		pass: _settings2.default.smtpServer.pass
	}
};

var getSmtpFromEmailSettings = function getSmtpFromEmailSettings(
	emailSettings
) {
	return {
		host: emailSettings.host,
		port: emailSettings.port,
		secure: emailSettings.port === 465,
		auth: {
			user: emailSettings.user,
			pass: emailSettings.pass
		}
	};
};

var getSmtp = function getSmtp(emailSettings) {
	var useSmtpServerFromConfigFile = emailSettings.host === '';
	var smtp = useSmtpServerFromConfigFile
		? SMTP_FROM_CONFIG_FILE
		: getSmtpFromEmailSettings(emailSettings);

	return smtp;
};

var sendMail = function sendMail(smtp, message) {
	return new Promise(function(resolve, reject) {
		if (!message.to.includes('@')) {
			reject('Invalid email address');
			return;
		}

		var transporter = _nodemailer2.default.createTransport(
			(0, _nodemailerSmtpTransport2.default)(smtp)
		);
		transporter.sendMail(message, function(err, info) {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
};

var getFrom = function getFrom(emailSettings) {
	var useSmtpServerFromConfigFile = emailSettings.host === '';
	return useSmtpServerFromConfigFile
		? '"' +
				_settings2.default.smtpServer.fromName +
				'" <' +
				_settings2.default.smtpServer.fromAddress +
				'>'
		: '"' + emailSettings.from_name + '" <' + emailSettings.from_address + '>';
};

var send = async function send(message) {
	var emailSettings = await _email2.default.getEmailSettings();
	var smtp = getSmtp(emailSettings);
	message.from = getFrom(emailSettings);

	try {
		var result = await sendMail(smtp, message);
		_winston2.default.info('Email sent', result);
		return true;
	} catch (e) {
		_winston2.default.error('Email send failed', e);
		return false;
	}
};
exports.default = {
	send: send
};
