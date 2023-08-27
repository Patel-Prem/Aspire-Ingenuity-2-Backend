const createClinicFun = ({ createClinicSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const clinic = await createClinicSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = createClinicFun;
