const { body, validationResult } = require("express-validator");

const validateRequestSchema = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      statusCode: 400,
      status: "ERROR",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validateRequestSchema;
