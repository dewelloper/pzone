import jwt from 'jsonwebtoken';

const cert = 'crazyshitreactjs';
class AuthHeader {
	constructor() {}

	encodeUserLoginAuth(userId) {
		return jwt.sign({ userId: userId }, cert);
	}

	decodeUserLoginAuth(token) {
		return jwt.verify(token, cert);
	}

	encodeUserPassword(token) {
		return jwt.sign({ password: token }, cert);
	}

	decodeUserPassword(token) {
		return jwt.verify(token, cert);
	}
}
export default new AuthHeader();
