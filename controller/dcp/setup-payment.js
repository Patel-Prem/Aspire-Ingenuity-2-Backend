const setUpPaymentFun = ({ setUpPaymentSer }) => {
  return async function get(httpRequest) {
    const shiftId = httpRequest.params.id;
    const clinic = await setUpPaymentSer(httpRequest.user, shiftId);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = setUpPaymentFun;
