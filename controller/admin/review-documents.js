const reviewDocumentFun = ({ reviewDocumentSer }) => {
  return async function get(httpRequest) {
    const tsmId = httpRequest.params.id;
    const model = httpRequest.body;
    console.log("The user is : " + httpRequest.user);
    const clinic = await reviewDocumentSer(httpRequest.user, tsmId, model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = reviewDocumentFun;
