const User = require('../models/user.model');
const { Exception } = require('../utils');
const { httpCodes } = require('../utils/constant');
const isEmail = require('validator/lib/isEmail');

const registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		// check email valid
		if (!isEmail(email)) throw new Exception('invalid email');
		// check existed: username & email
		const [ isExistedEmail, isExistedUsername ] = await Promise.all([
			User.exists({ email }),
			User.exists({ username })
		]);
		if (isExistedEmail) throw new Exception('email existed');
		if (isExistedUsername) throw new Exception('username existed');
		// create new user
		const user = new User({ email, username, password });
        await user.save();
		return res.status(httpCodes.OK).send({message: 'register successful'});
	} catch (error) {
		next(error);
	}
};

module.exports = {
    registerUser
}