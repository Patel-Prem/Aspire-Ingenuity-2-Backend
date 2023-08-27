const setUpPaymentFun = ({ getPaymentMethodSer }) => {
  return async function get(httpRequest) {
    const clinic = await getPaymentMethodSer(httpRequest.user);
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
