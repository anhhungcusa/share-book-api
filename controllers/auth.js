const { generateAccessToken } = require('../utils/jwt');
const { verifyPassword, Exception } = require('../utils');
const User = require('../models/user.model');
const { env } = require('../config/globals');
const { httpCodes } = require('../utils/constant');

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) throw new Exception('username or password incorrect');
		const user = await User.findOne({ username });
		if (!user) throw new Exception('username or password incorrect');
		const isValidPassword = await verifyPassword(user.password, password);
		if (!isValidPassword) throw new Exception('username or password incorrect');
		delete user._doc.password;
		const token = await generateAccessToken(
			{ _id: user._id, username: user._doc.username },
			env.JWT_SECRET_KEY,
			'7d'
		);
		res.status(httpCodes.OK).send({ user, token });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login
};
