const addFavouriteClinicFun = ({ getFavouriteClinicSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.body.clinicId;
    console.log("The clinic id is : " + id);
    const clinic = await getFavouriteClinicSer(httpRequest.user, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = addFavouriteClinicFun;
