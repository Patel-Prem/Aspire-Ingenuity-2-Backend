const ValidationError = require("../../error/validationError");
const { sendAllNotification } = require("../../util/allnotification");
const { convertoDay, convertoTime } = require("../../util/dateTimeUtil");
const {
  appliedShiftEmail,
  moodifiedShiftEmail,
} = require("../../util/emailTemplates");
const { getRewardMetrics } = require("../../util/reward");

const selectShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
}) => {
  return async function select(user, shiftId, isModified, modifiedRate, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);
    if (profile.documentStatus == "NO_CERTIFICATE_PROVIDED") {
      throw new ValidationError(
        "Please upload your certifications to start applying the jobs"
      );
    }

    if (profile.documentStatus !== "APPROVED") {
      throw new ValidationError(
        "Your certification is under review. We will let you know once its approved"
      );
    }

    const shift = await shiftRepository.getOneWithClinic(shiftId);
    if (!shift) {
      throw new ValidationError("Shift Id does not exist");
    }
    console.log(shift.jobRole);
    if (!["Dental Hygienist", "Dental Assistant"].includes(shift.jobRole)) {
      throw new ValidationError(
        "Invalid Job roles! Only Detal Hygienist and Dental Assistant are accpted"
      );
    }

    // Check if the user is available in the shift time or not
    const userShiftFutures = await userShiftRepository.getAllUpcomingShifts(
      loggedInUser.id
    );

    console.log("userOtherUpcomingShifts");
    console.log(userShiftFutures);

    for (const user_shift of userShiftFutures) {
      let upcomingShift = await shiftRepository.getOne(user_shift.shiftId);
      console.log("upcomingShift");
      console.log(upcomingShift);
      console.log("shift");
      console.log(shift);

      console.log(upcomingShift.startTime.getTime());
      console.log(shift.startTime.getTime());
      console.log(upcomingShift.endTime.getTime());

      if (
        upcomingShift.startTime.getTime() < shift.startTime.getTime() &&
        shift.startTime.getTime() < upcomingShift.endTime.getTime()
      ) {
        throw new ValidationError(
          "You already have an upcoming shift that overlaps with this shift."
        );
      }
      if (
        upcomingShift.startTime.getTime() < shift.endTime.getTime() &&
        shift.startTime.getTime() < upcomingShift.endTime.getTime()
      ) {
        throw new ValidationError(
          "You already have an upcoming shift that overlaps with this shift."
        );
      }
      if (
        upcomingShift.startTime.getTime() == shift.startTime.getTime() &&
        shift.endTime.getTime() == upcomingShift.endTime.getTime()
      ) {
        throw new ValidationError(
          "You already have an upcoming shift that overlaps with this shift."
        );
      }
    }

    const appliedShift = await userShiftRepository.getByUserIdAndShiftId(
      loggedInUser.id,
      shift.id
    );

    if (appliedShift) {
      throw new ValidationError("Already Applied");
    }

    if (!isModified) {
      const rewardMetricsNM = getRewardMetrics(loggedInUser);

      if (shift.jobRole == "Dental Hygienist")
        if (shift.rate > rewardMetricsNM.canApplyUptoHG) {
          throw new ValidationError(
            `You can only apply upto ${rewardMetricsNM.canApplyUptoHG}. Please complete more shifts to unlock shifts with higher rate`
          );
        }

      if (shift.jobRole == "Dental Assistant")
        if (shift.rate > rewardMetricsNM.canApplyUptoHA) {
          throw new ValidationError(
            `You can only apply upto ${rewardMetricsNM.canApplyUptoHA}. Please complete more shifts to unlock shifts with higher rate`
          );
        }

      // send shift is applied mail

      const appliedShift = await userShiftRepository.add({
        tsmId: loggedInUser.id,
        shiftId: shift.id,
        isModified: false,
        isApplied: true,
        isOffered: false,
        isAcceptedByTSM: false,
        isAcceptedByCP: false,
        isMarkCompletedByTSM: false,
        isMarkCompletedByCP: false,
        isCanceledByTSM: false,
      });
      const shiftInfo = {
        officeName: shift.clinic.officeName,
        address: shift.clinic.address,
        shiftDate: convertoDay(shift.shiftDate),
        startTime: convertoTime(shift.startTime),
        endTime: convertoTime(shift.endTime),
        rate: shift.rate,
      };

      const dentalClinic = await userRepository.getOne(shift.clinicPersonnelId);
      const appliedShiftHtml = appliedShiftEmail(shiftInfo, dentalClinic);
      sendAllNotification({
        userId: dentalClinic.id,
        subject: "A new user has applied to your shift!",
        bodyPlain: `A new user has applied to your shift!`,
        bodyHtml: appliedShiftHtml,
      });
      return appliedShift;
    }

    if (isModified) {
      if (modifiedRate == null || modifiedRate == "") {
        throw new ValidationError("Modified Rate is needed");
      }
      //Check if user is elligible to modify
      const rewardMetrics = getRewardMetrics(loggedInUser);

      if (shift.jobRole == "Dental Hygienist")
        if (modifiedRate > rewardMetrics.canModifyUptoHG) {
          throw new ValidationError(
            `You can only modify upto ${rewardMetrics.canModifyUptoHG}`
          );
        }

      if (shift.jobRole == "Dental Assistant")
        if (modifiedRate > rewardMetrics.canModifyUptoHA) {
          throw new ValidationError(
            `You can only modify upto ${rewardMetrics.canModifyUptoHA}`
          );
        }
    }

    // send shift is modified Notification
    const modifiedShift = await userShiftRepository.add({
      tsmId: loggedInUser.id,
      shiftId: shift.id,
      isModified: true,
      modifiedRate: modifiedRate,
      isApplied: true,
      isOffered: false,
      isAcceptedByTSM: false,
      isAcceptedByCP: false,
      isMarkCompletedByTSM: false,
      isMarkCompletedByCP: false,
    });
    const shiftInfo = {
      officeName: shift.clinic.officeName,
      address: shift.clinic.address,
      shiftDate: convertoDay(shift.shiftDate),
      startTime: convertoTime(shift.startTime),
      endTime: convertoTime(shift.endTime),
      rate: shift.rate,
      modifiedRate: modifiedRate,
    };
    const dentalClinic = await userRepository.getOne(shift.clinicPersonnelId);
    const modifiedShiftHtml = moodifiedShiftEmail(shiftInfo, dentalClinic);
    sendAllNotification({
      userId: dentalClinic.id,
      subject: "A new user has modified and applied to your shift!",
      bodyPlain: `A new user has modified and applied to your shift!`,
      bodyHtml: modifiedShiftHtml,
    });
    return modifiedShift;
  };
};

module.exports = selectShift;
