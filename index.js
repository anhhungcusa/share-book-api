require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const { createConnection } = require("./db");
const {env} = require('./config/globals')
const errorHandler = require("./middlewares/error-handler");
const app = express();
const port = env.PORT

// init connect  to mongodb atlas
createConnection();

// middlewares
app.use(express.static("public"));
app.use(bodyParse.json());
app.use(cors());

// init routes

// error handler middleware
app.use(errorHandler);

const listener = app.listen(port, function() {
  console.log("Listening on port:" + listener.address().port);
});
