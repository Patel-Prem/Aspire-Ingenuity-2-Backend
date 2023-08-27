const selectClinicFun = ({ selectClinicSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const { size, page } = httpRequest.query;
    const searchKey = httpRequest.query.search;
    const { clinic, count } = await selectClinicSer(
      httpRequest.user,
      id,
      {
        size,
        page,
      },
      searchKey
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
      pagination: {
        page: page,
        size: size,
        count: count,
      },
    };
  };
};

module.exports = selectClinicFun;
