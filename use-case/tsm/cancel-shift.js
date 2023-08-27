const ValidationError = require("../../error/validationError");
const { sendAllNotification } = require("../../util/allnotification");

const cancelShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function markComplete(user, shiftId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const shift = await shiftRepository.getOne(shiftId);
    if (!shift) {
      throw new ValidationError("Shift Id does not exist");
    }

    console.log("In the Process in cancw, shift");
    console.log(loggedInUser.id);
    console.log(shift.id);

    const appliedShift = await userShiftRepository.getByUserIdAndShiftId(
      loggedInUser.id,
      shift.id
    );

    console.log("appliedShift");
    console.log(appliedShift);

    if (!appliedShift) {
      throw new ValidationError("Invalid! User has not applied in this shift!");
    }

    if (!appliedShift.isAcceptedByCP) {
      throw new ValidationError(
        "Invalid! User has not  been accpeted in this shift!"
      );
    }

    let shiftDate = shift.startTime.getTime();
    let currDate = new Date().getTime();

    console.log("Shift status");
    console.log(new Date());
    console.log(shift.startTime);

    if (shiftDate < currDate) {
      throw new ValidationError(
        "Invalid! Can not cancel shift after it started!"
      );
    }

    await userShiftRepository.update(appliedShift.id, {
      isAcceptedByCP: false,
      isCanceledByTSM: true,
    });

    sendAllNotification({
      userId: loggedInUser.id,
      subject: "Your shift is canceled",
      bodyPlain: "Your shift is canceled",
      bodyHtml: "Your shift is canceled",
    });
    // notify DCP
    sendAllNotification({
      userId: shift.clinicPersonnelId,
      subject: "Your shift is canceled",
      bodyPlain: "Your shift is canceled",
      bodyHtml: "Your shift is canceled",
    });

    let difference = Math.abs(shiftDate - currDate) / (1000 * 60 * 60);
    console.log("The difference is " + difference);
    if (difference <= 48) {
      console.log(
        "The difference is less than 48 hours..logging Penalties " + difference
      );
      userRepository.update(loggedInUser.id, {
        noOfCanceledShift: loggedInUser.noOfCanceledShift + 1,
        cancledShiftDate: new Date(),
        refreshToken: "",
      });
      return {
        message:
          "Shift successfully canceled! User is Penalized and blocked out of the system as shift is canceled in critical time",
        isPenalized: true,
      };
    }
    // notify TSM

    return { message: "Shift successfully canceled", isPenalized: false };
  };
};

module.exports = cancelShift;
