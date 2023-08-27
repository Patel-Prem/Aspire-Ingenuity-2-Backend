const express = require("express");
const router = express.Router();
const makeExpressCallback = require("../../express-callback");

const route = require("./routes");

const routes = route({ router, makeExpressCallback });

const services = Object.freeze({
  routes,
});

module.exports = services;

module.exports = {
  routes,
};

module.exports = router;
