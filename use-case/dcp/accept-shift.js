const ValidationError = require("../../error/validationError");
const {
  convertoDayandTime,
  convertoDay,
  convertoTime,
} = require("../../util/dateTimeUtil");
const { shiftEmail, acceptshiftEmail } = require("../../util/emailTemplates");
const { sendMail } = require("../../util/emailUtils");
const { sendAllNotification } = require("../../util/allnotification");

const selectShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function select(user, shiftId, tsmId, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const shift = await shiftRepository.getOneWithClinic(shiftId);
    if (!shift) {
      throw new ValidationError("Shift Id does not exist");
    }

    const tmsUser = await userRepository.getOne(tsmId);
    if (!tmsUser) {
      throw new ValidationError("User Id does not exist");
    }

    const user_shift = await userShiftRepository.getByUserIdAndShiftId(
      tmsUser.id,
      shift.id
    );

    if (!user_shift) {
      throw new ValidationError(
        "User has not applied for Job or the Job is not posted by current clinic user"
      );
    }

    if (shift.startTime) {
      const givenDate = new Date(shift.startTime);
      const currentDate = new Date();

      if (currentDate > givenDate) {
        throw new ValidationError(
          "Can not accept shift ! Shift start time has already passed!"
        );
      }

      const timeDiff = Math.abs(givenDate - currentDate);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff < 4) {
        throw new ValidationError(
          "Can not accept shift ! Shift starts in less than 4 hours!"
        );
      }
    }

    //check if the user has already accepted
    const shiftWithUsers = await shiftRepository.getOneWithUser(shift.id);
    for (const user_shift of shiftWithUsers.user_shifts) {
      if (user_shift.isAcceptedByCP) {
        throw new ValidationError(
          "TSM has been already accepted to this shift"
        );
      }
    }

    // update the accepted to be true
    const userShiftId = user_shift.id;
    delete user_shift.id;
    user_shift.isAcceptedByCP = true;

    const updated = userShiftRepository.update(userShiftId, user_shift);
    let abc = {
      ...user_shift,
      isApplied: updated.isApplied,
      isOffered: updated.isOffered,
      isAcceptedByTSM: updated.isAcceptedByTSM,
      isAcceptedByCP: updated.isAcceptedByCP,
      isMarkCompletedByTSM: updated.isMarkCompletedByTSM,
      isMarkCompletedByCP: updated.isMarkCompletedByCP,
    };

    await shiftRepository.update(shiftId, {
      modifiedRate: user_shift.modifiedRate,
    });

    const shiftInfo = {
      officeName: shift.clinic.officeName,
      address: shift.clinic.address,
      shiftDate: convertoDay(shift.shiftDate),
      startTime: convertoTime(shift.startTime),
      endTime: convertoTime(shift.endTime),
      rate: shift.rate,
    };

    const html = shiftEmail(shiftInfo, tmsUser);

    sendAllNotification({
      userId: tmsUser.id,
      subject: "Congratulations! You got a new Shift!",
      bodyPlain: `Congratulations! You got a new Shift! Please view upcoming shifts for more information`,
      bodyHtml: html,
    });

    const htmlForShiftAcceptanceDCP = acceptshiftEmail(shiftInfo, loggedInUser);
    sendAllNotification({
      userId: loggedInUser.id,
      subject:
        "Congratulations! You have accepted a temporary staff member to a new Shift!",
      bodyPlain: `Congratulations! You have accepted a temporary staff member to a new Shift! Please view upcoming shifts for more information`,
      bodyHtml: htmlForShiftAcceptanceDCP,
    });

    return shiftRepository.getOneWithUser(shift.id);
  };
};

module.exports = selectShift;
