const markCompleteShiftFun = ({ selectFavTSMSer }) => {
  return async function get(httpRequest) {
    const clinicId = httpRequest.body.clinicId;
    const clinic = await selectFavTSMSer(httpRequest.user, clinicId);
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
