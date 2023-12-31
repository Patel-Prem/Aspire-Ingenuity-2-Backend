const updateClinicFun = ({ updateClinicSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const clinic = await updateClinicSer(httpRequest.user, id, model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = updateClinicFun;
