const markCompleteShiftFun = ({ markCompleteShiftSer }) => {
  return async function get(httpRequest) {
    const shiftId = httpRequest.body.shiftId;
    const tsmId = httpRequest.body.tsmId;

    console.log("The user is : " + httpRequest.user);
    const clinic = await markCompleteShiftSer(httpRequest.user, shiftId, tsmId);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = markCompleteShiftFun;
