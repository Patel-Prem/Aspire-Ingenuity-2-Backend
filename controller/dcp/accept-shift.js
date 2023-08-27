const acceptShiftFun = ({ acceptShiftSer }) => {
  return async function get(httpRequest) {
    const shiftId = httpRequest.body.shiftId;
    const tsmId = httpRequest.body.tsmId;
    const query = httpRequest.query;
    console.log("Query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const clinic = await acceptShiftSer(
      httpRequest.user,
      shiftId,
      tsmId,
      query
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = acceptShiftFun;
