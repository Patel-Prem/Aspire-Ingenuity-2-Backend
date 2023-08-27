const updateUserAvailabilityFun = ({ updateUserAvailabilitySer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const availabilityId = httpRequest.params.id;
    const shift = await updateUserAvailabilitySer(
      availabilityId,
      model,
      httpRequest.user
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = updateUserAvailabilityFun;
