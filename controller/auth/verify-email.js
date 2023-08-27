const ValidationError = require("../../error/validationError");

const verifyEmailFun = ({ verifyEmailSer }) => {
  return async function get(httpRequest) {
    const resp = await verifyEmailSer({
      user: `${httpRequest.params.user}`,
      code: httpRequest.params.code,
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

module.exports = verifyEmailFun;
