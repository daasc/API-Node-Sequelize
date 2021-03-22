const express = require("express");
const bodyParser = require("body-parser");
const database = require("./config/database");
const cors = require("cors");
const router = require("./router");

const app = express();

const configureExpress = () => {
  app.options("*", cors());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/", router);
  return app;
};

module.exports = database.authenticate().then(configureExpress);
