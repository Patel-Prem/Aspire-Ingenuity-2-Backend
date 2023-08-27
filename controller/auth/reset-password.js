const ValidationError = require("../../error/validationError");

const resetPasswordEmail = ({ resetPasswordSer }) => {
  return async function get(httpRequest) {
    const resp = await resetPasswordSer({
      password: httpRequest.body.password,
      resetToken: `${httpRequest.params.resetToken}`,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: resp,
    };
  };
};

module.exports = resetPasswordEmail;
