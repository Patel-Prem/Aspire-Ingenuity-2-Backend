const { body } = require("express-validator");
const loginBodyValidator = [
  body("email").isEmail().withMessage("Email is not validd!"),
];
module.exports = loginBodyValidator;
