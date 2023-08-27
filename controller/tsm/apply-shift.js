const applyShiftFun = ({ applyShiftSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.body.shiftId;
    const query = httpRequest.query;
    console.log("Query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const isModified = httpRequest.body.isModified;
    const modifiedRate = httpRequest.body.modifiedRate;
    const clinic = await applyShiftSer(
      httpRequest.user,
      id,
      isModified,
      modifiedRate,
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

module.exports = applyShiftFun;
