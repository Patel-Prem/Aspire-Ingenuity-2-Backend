const ValidationError = require("../../error/validationError");

const markCompleteShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function markComplete(user, tsmId, shiftId, rating) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const tsmUser = await userRepository.getOne(tsmId);
    if (!tsmUser) {
      throw new ValidationError("TSM Id does not exist!");
    }

    const shift = await shiftRepository.getOne(shiftId);
    if (!shift) {
      throw new ValidationError("Shift Id does not exist");
    }

    const appliedShift = await userShiftRepository.getByUserIdAndShiftId(
      tsmUser.id,
      shift.id
    );
    console.log("appliedShift");
    console.log(appliedShift);

    if (!appliedShift || !appliedShift.isAcceptedByCP) {
      throw new ValidationError("Invalid! User has not worked in this shift!");
    }
    await userShiftRepository.update(appliedShift.id, {
      rating: parseInt(rating),
    });

    let noOfRatesInCompletedShift = tsmUser.noOfRatesInCompletedShift;
    let existingRating = tsmUser.rating;

    await userRepository.update(tsmUser.id, {
      noOfRatesInCompletedShift: noOfRatesInCompletedShift + 1,
      rating:
        (existingRating * noOfRatesInCompletedShift + existingRating) /
        (noOfRatesInCompletedShift + 1),
    });
    return userShiftRepository.getOne(appliedShift.id);
  };
};

module.exports = markCompleteShift;
