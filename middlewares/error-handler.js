const {httpCodes} = require('../utils/constant')
module.exports = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const {status = httpCodes.BAD_REQUEST, message = 'bad request'} = error
  return res.status(status).send({message})
};
