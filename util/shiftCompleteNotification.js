const shiftRepository = require("../data-access/shift");
const userRepository = require("../data-access/user");
const { sendAllNotification } = require("./allnotification");
const { convertoDay, convertoTime } = require("./dateTimeUtil");
const { shiftEmail, shiftCompletionEmail } = require("./emailTemplates");

const sendShiftCompleteNotification = async () => {
  const completedShifts =
    await shiftRepository.getAllTheTimePassedAndMarkComplete();
  console.log(completedShifts);
  if (completedShifts) {
    for (const shift of completedShifts) {
      const clinicPersonnel = shift.clinicPersonnel;
      const user_shifts = shift.user_shifts;

      if (user_shifts != null && user_shifts.length > 0) {
        const user_shift = user_shifts.filter(
          (us) => us.isAcceptedByCP == true
        );

        if (user_shift[0]) {
          console.log("User shift");
          console.log(user_shift);
          const tsmUser = await userRepository.getOne(user_shift[0].tsmId);
          console.log("Shift User found. Sending Completion Mail");

          const shiftInfo = {
            officeName: shift.clinic.officeName,
            address: shift.clinic.address,
            shiftDate: convertoDay(shift.shiftDate),
            startTime: convertoTime(shift.startTime),
            endTime: convertoTime(shift.endTime),
            rate: shift.rate,
          };
          // Send Notification to TSM
          const htmlForTSM = shiftCompletionEmail(shiftInfo, tsmUser);
          console.log("TSMUSER");
          console.log(tsmUser.id);

          sendAllNotification({
            userId: tsmUser.id,
            subject: "Your shift is complete. Please mark as complete - TSM",
            bodyPlain: `Your shift is complete. Please mark as complete in shift history`,
            bodyHtml: htmlForTSM,
          });

          // Send Notification to DCP
          const htmlForDCP = shiftCompletionEmail(shiftInfo, clinicPersonnel);

          console.log("clinicPersonnel");
          console.log(clinicPersonnel.id);
          sendAllNotification({
            userId: clinicPersonnel.id,
            subject: "Your shift is complete. Please mark as complete -DCP",
            bodyPlain: `Your shift is complete. Please mark as complete in shift history`,
            bodyHtml: htmlForDCP,
          });
        }
        await shiftRepository.update(shift.id, {
          isCompleteNotificationSent: true,
        });
      }
    }
  }
};

module.exports = { sendShiftCompleteNotification };
