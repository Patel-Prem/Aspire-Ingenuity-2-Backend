const ValidationError = require("../../error/validationError");
const Stripe = require("stripe");
const { sendAllNotification } = require("../../util/allnotification");
const {
  shiftCompleteAndPaymentDeduction,
  markedShiftAsCompleteEmailTemplate,
} = require("../../util/emailTemplates");
const { convertoDay, convertoTime } = require("../../util/dateTimeUtil");

const markCompleteShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function markComplete(user, shiftId, tsmId) {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const tsmUser = await userRepository.getOne(tsmId);
    if (!tsmUser) {
      throw new ValidationError("User Id does not exist!");
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

    if (!appliedShift) {
      throw new ValidationError("Invalid! User has not worked in this shift!");
    }

    if (appliedShift.isMarkCompletedByCP) {
      throw new ValidationError(
        "Invalid! Already Marked As completed by Clinic"
      );
    }

    if (appliedShift.isMarkCompletedByTSM) {
      throw new ValidationError(
        "Invalid! Already Marked As completed by Temporary Staff Member"
      );
    }
    // start payment Processing for marked shift
    let ispaymentSuccessful = false;
    const savedCustomerID = loggedInUser.customerStripeId;
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: savedCustomerID,
        type: "card",
      });
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 4599,
          currency: "cad",
          customer: savedCustomerID,
          payment_method: paymentMethods.data[0].id,
          receipt_email: loggedInUser.email,
          off_session: true,
          confirm: true,
        });
        ispaymentSuccessful = true;
        console.log("paymentIntent");
        console.log(paymentIntent);
      } catch (err) {
        console.log("Error code is: ", err.code);
        console.log(err);
        const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
          err.raw.payment_intent.id
        );
        console.log("PI retrieved: ", paymentIntentRetrieved.id);
      }
    } catch (exception) {
      console.log(exception);
      throw new ValidationError("Problem in Stripe API");
    }

    if (!ispaymentSuccessful) {
      throw new ValidationError(
        "Problem in marking shift as complete! Please reach out to admin"
      );
    }

    await userShiftRepository.update(appliedShift.id, {
      isMarkCompletedByCP: true,
      isCharged: true,
    });
    await shiftRepository.update(shiftId, {
      isComplete: true,
      isCharged: true,
    });

    let noOfCompletedShift = tsmUser.noOfCompletedShift + 1;
    await userRepository.update(tsmUser.id, {
      noOfCompletedShift: noOfCompletedShift,
    });

    const shiftInfo = {
      officeName: shift.clinic.officeName,
      address: shift.clinic.address,
      shiftDate: convertoDay(shift.shiftDate),
      startTime: convertoTime(shift.startTime),
      endTime: convertoTime(shift.endTime),
      rate: shift.rate,
      modifiedRate: shift.modifiedRate,
    };

    // send the email to dcp and tsm
    const tsmShiftCompleteHtml = markedShiftAsCompleteEmailTemplate(
      shiftInfo,
      tsmUser
    );
    sendAllNotification({
      userId: tsmUser.id,
      subject: "Your shift is marked as completed",
      bodyPlain: `Your shift is marked as completed`,
      bodyHtml: tsmShiftCompleteHtml,
    });

    // send the email to dcp

    const dcpShiftCompleteHtml = shiftCompleteAndPaymentDeduction(
      shiftInfo,
      loggedInUser
    );
    sendAllNotification({
      userId: loggedInUser.id,
      subject:
        "Your shift is marked as completed and payment of 45.99 is deducted",
      bodyPlain: `Your shift is marked as completed and payment of 45.99 is deducted`,
      bodyHtml: dcpShiftCompleteHtml,
    });

    return userShiftRepository.getOne(appliedShift.id);
  };
};

module.exports = markCompleteShift;
