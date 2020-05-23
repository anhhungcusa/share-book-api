const bcrypt = require('bcrypt');

const Exception = function Exception(message, statusCode) {
	this.message = message;
	this.statusCode = statusCode;
};
const hashPassword = (plainPassword) => {
	return bcrypt.hash(plainPassword, 10);
};
/**
   * 
   * @param {string} hashedPassword 
   * @param {string} plainPassword 
   */
const verifyPassword = (hashedPassword, plainPassword) => {
	return bcrypt.compare(plainPassword, hashedPassword);
};
/**
   * Check file is image of ['image/png', 'image/jpeg']
   * @param {string} mimetype
   */
const checkIsImage = (mimetype) => {
	const acceptImageTypes = [ 'image/png', 'image/jpeg', 'image/gif', 'image/x-icon' ];
	return acceptImageTypes.includes(mimetype);
};

module.exports = {
	Exception,
	hashPassword,
	verifyPassword,
	checkIsImage
};

// hashPassword('123123').then(res => console.log(res))