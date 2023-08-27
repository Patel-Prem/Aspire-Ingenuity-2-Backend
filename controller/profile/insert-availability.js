const createUserAvailabilityFun = ({ createUserAvailabilitySer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const shift = await createUserAvailabilitySer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = createUserAvailabilityFun;
