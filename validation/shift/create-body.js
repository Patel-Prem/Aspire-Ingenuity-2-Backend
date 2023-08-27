const { check } = require("express-validator");
const createBodyValidator = [
  check("jobRole").not().isEmpty().withMessage("Job Role can not be empty!"),
  check("shiftDate")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date format! Please provide ISO8601 Date Format"),
  check("startTime")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date format! Please provide ISO8601 Date Format"),
  check("endTime")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date format! Please provide ISO8601 Date Format"),
  check("rate").not().isEmpty().withMessage("Rate Can not be Empty!").toFloat(),
];
module.exports = createBodyValidator;
