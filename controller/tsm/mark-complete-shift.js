const markCompleteShiftFun = ({ markCompleteShiftSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.body.shiftId;
    console.log("The user is : " + httpRequest.user);
    const clinic = await markCompleteShiftSer(httpRequest.user, id);
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
