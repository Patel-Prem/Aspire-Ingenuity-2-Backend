const ValidationError = require("../../error/validationError");
const getDisInM = require("../../util/distance");

const selectShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
}) => {
  return async function select(user, id, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const loggedInUserProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );

    if (!loggedInUserProfile) {
      throw new ValidationError("Please Set up address before viewing shifts!");
    }

    // get all from user shift

    let appliedShifts = await userShiftRepository.getAllAppliedShift(
      loggedInUser.id
    );

    let onlyShifts = appliedShifts.map((as) => {
      let abc = {
        ...as.shift,
        isApplied: as.isApplied,
        isOffered: as.isOffered,
        isAcceptedByTSM: as.isAcceptedByTSM,
        isAcceptedByCP: as.isAcceptedByCP,
        isMarkCompletedByTSM: as.isMarkCompletedByTSM,
        isMarkCompletedByCP: as.isMarkCompletedByCP,
      };
      return abc;
    });

    let finalShifts = [];
    for (let shift of onlyShifts) {
      const clinic = await clinicRepository.getOne(shift.clinicId);
      if (clinic) {
        finalShifts.push({
          ...shift,
          clinicName: clinic.officeName,
          clinicAddress: clinic.address,
        });
      }
    }

    if (query) {
      const { page, size } = query;
      let finalShiftsInFilter = finalShifts.filter(
        (os) =>
          os.startTime < new Date() &&
          ((os.isApplied == true && os.isAcceptedByCP == true) ||
            (os.isOffered == true && os.isAcceptedByTSM == true))
      );

      if (query.search) {
        finalShiftsInFilter = finalShiftsInFilter.filter(
          (sh) =>
            sh.clinicName.toLowerCase().includes(query.search.toLowerCase()) ||
            sh.clinicAddress
              .toLowerCase()
              .includes(query.search.toLowerCase()) ||
            sh.jobRole.toLowerCase().includes(query.search.toLowerCase())
        );
      }

      return {
        clinic: finalShiftsInFilter.slice(
          (Number(page) - 1) * Number(size),
          (Number(page) - 1) * Number(size) + Number(size)
        ),
        count: finalShiftsInFilter.length,
      };
    }

    return finalShifts.filter(
      (os) =>
        os.startTime < new Date() &&
        ((os.isApplied == true && os.isAcceptedByCP == true) ||
          (os.isOffered == true && os.isAcceptedByTSM == true))
    );
  };
};

module.exports = selectShift;
