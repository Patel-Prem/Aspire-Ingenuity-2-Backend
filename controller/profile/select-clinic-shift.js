const selectClinicShiftFun = ({ selectClinicShiftSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const clinic = await selectClinicShiftSer(httpRequest.user, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = selectClinicShiftFun;
