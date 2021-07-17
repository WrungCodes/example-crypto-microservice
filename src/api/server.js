const cors = require("cors");
const express = require("express");
const { json } = require("body-parser");

function server(configuration, route) {
  const app = express();
  const router = express.Router();

  app.use(json());
  app.use(cors());

  app.use('/', function(req, res, next) { req.locals = {}; next();});
  app.use('/', route.register(router));

  return app;
}

module.exports = server;