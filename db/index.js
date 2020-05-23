const mongoose = require("mongoose");
const {env} = require('../config/globals')
const createConnection = () =>
  mongoose
    .connect(env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(res => {
      console.log("mongodb connected");
      return res;
    })
    .catch(err => {
      console.log("mongodb connect failed", err);
      return err;
    });

module.exports = { createConnection };
