const cancelShiftFun = ({ cancelShiftSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.body.shiftId;
    console.log("The user is : " + httpRequest.user);
    const clinic = await cancelShiftSer(httpRequest.user, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = cancelShiftFun;
