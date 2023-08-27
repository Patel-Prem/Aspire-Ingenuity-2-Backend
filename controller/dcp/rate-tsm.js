const markCompleteShiftFun = ({ rateTSMSer }) => {
  return async function get(httpRequest) {
    const rating = httpRequest.body.rating;
    const tsmId = httpRequest.body.tsmId;
    const shiftId = httpRequest.body.shiftId;
    console.log("The user is : " + httpRequest.user);
    const clinic = await rateTSMSer(httpRequest.user, tsmId, shiftId, rating);
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
