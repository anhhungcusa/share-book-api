const { Exception } = require("../utils");
const { verifyToken } = require("../utils/jwt");
const {env} = require('../config/globals')
module.exports.isAuthorized = async (req, res, next) => {
  const bearerToken = req.get("authorization");
  try {
    if (!bearerToken) throw new Exception("token is not valid");
    if (bearerToken.indexOf("Bearer ") !== 0)
      throw new Exception("token is not bearer token");
    const token = bearerToken.slice(7, bearerToken.length).trimLeft();
    let decoded = await verifyToken(token, env.JWT_SECRET_KEY);
    delete decoded.iat
    delete decoded.exp
    req.auth = decoded
    next();
  } catch (error) {
    next(error)
  }

};