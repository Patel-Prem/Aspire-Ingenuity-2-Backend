const express = require("express");
const router = express.Router();
const makeExpressCallback = require("../../express-callback");

const route = require("./routes");

const routes = route({ router, makeExpressCallback });

const services = Object.freeze({
  routes,
});

module.exports = services;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: Email of the user
 *         firstName:
 *           type: string
 *           description: First Name of the user
 *         lastName:
 *           type: string
 *           description: First Name of the user
 *         isVerified:
 *           type: boolean
 *           description: First Name of the user
 *       example:
 *         id: d5fE_asz
 *         email: test123@gmail.com
 *         author: Alexander K. Dewdney
 *         firstName: Suraj
 *         lastName: Regmi
 *         isVerified: true
 */
module.exports = {
  routes,
};

module.exports = router;
