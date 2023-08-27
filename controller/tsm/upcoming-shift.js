const upcomingShiftFun = ({ upcomingShiftSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    const query = httpRequest.query;
    console.log("Query");
    console.log(query);
    console.log("The user is : " + httpRequest.user);
    const clinic = await upcomingShiftSer(httpRequest.user, id, query);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = upcomingShiftFun;
