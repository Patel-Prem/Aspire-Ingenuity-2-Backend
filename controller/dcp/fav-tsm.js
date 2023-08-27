const markCompleteShiftFun = ({ favTSMSer }) => {
  return async function get(httpRequest) {
    const tsmId = httpRequest.body.tsmId;
    const clinicId = httpRequest.body.clinicId;
    const clinic = await favTSMSer(httpRequest.user, clinicId, tsmId);
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
