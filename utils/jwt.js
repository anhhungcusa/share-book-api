const jwt = require("jsonwebtoken");

/**
 * generator token
 * @param {object} user
 * @param {string} secretKey
 * @param {string} tokenLife  'zeit/ms'
 */
const generateAccessToken = (payload, secretKey, tokenLife = "1d") => {
  const option = {
    algorithm: "HS256",
    expiresIn: tokenLife
  };
  return new Promise((rs, rj) => {
    jwt.sign(payload, secretKey, option, (err, token) => {
      if (err) rj(err);
      rs(token);
    });
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 * @returns decoded
 */
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateAccessToken,
  verifyToken
};
