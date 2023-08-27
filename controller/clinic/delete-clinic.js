const deleteClinicFun = ({ deleteClinicSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const clinic = await deleteClinicSer(httpRequest.user, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = deleteClinicFun;
