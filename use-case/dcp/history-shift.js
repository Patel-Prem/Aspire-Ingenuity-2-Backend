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

    // get all shifto of users

    const shifthistory = await shiftRepository.getAllTheShifts(loggedInUser.id);

    let allshift = [];
    for (let shiftSing of shifthistory) {
      let all = await shiftRepository.getOneWithUser(shiftSing.id);
      allshift.push(all);
    }
    return allshift.filter((as) => as.endTime < new Date());
  };
};

module.exports = selectShift;
