const deletePaymentFun = ({ deletePaymentMethodSer }) => {
  return async function get(httpRequest) {
    const clinic = await deletePaymentMethodSer(httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = deletePaymentFun;
