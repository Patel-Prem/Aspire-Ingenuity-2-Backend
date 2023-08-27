const ValidationError = require("../../error/validationError");
const Stripe = require("stripe");
const getDisInM = require("../../util/distance");
const { sendAllNotification } = require("../../util/allnotification");
const { nearbyEmail } = require("../../util/emailTemplates");
const { convertoDay, convertoTime } = require("../../util/dateTimeUtil");

const createShiftFun = ({
  shiftRepository,
  userRepository,
  clinicRepository,
}) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    model.clinicPersonnelId = loggedInUser.id;

    const clinic = await clinicRepository.getOne(model.clinicId);
    if (!clinic) {
      throw new ValidationError("Clinic ID does not exist!");
    }

    if (!["Dental Hygienist", "Dental Assistant"].includes(model.jobRole)) {
      throw new ValidationError(
        "Invalid Job roles! Only Dental Hygienist and Dental Assistant are accpted"
      );
    }

    let clinicOfUser = await clinicRepository.getClinic(
      loggedInUser.id,
      model.clinicId
    );
    if (!clinicOfUser) {
      throw new ValidationError(
        "User Does not have Permission to insert post in this Clinic"
      );
    }
    if (new Date(model.startTime) > new Date(model.endTime)) {
      throw new ValidationError("Start Time can not be greater than endTime");
    }
    if (new Date(model.startTime) < new Date()) {
      throw new ValidationError("Can not post shift in past");
    }
    if (
      loggedInUser.customerStripeId == null ||
      loggedInUser.customerStripeSetupIntentId == null
    ) {
      throw new ValidationError(
        "Can not post shift! Please add credit card in billing information"
      );
    }
    // Get the customers credit card information
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    let paymentMethods = [];
    try {
      paymentMethods = await stripe.paymentMethods.list({
        customer: loggedInUser.customerStripeId,
        type: "card",
      });
    } catch (exception) {
      console.log(exception);
      throw new ValidationError("Problem in Validation Payment");
    }
    console.log(paymentMethods);
    console.log(paymentMethods.data[0].card);
    let year = Number(paymentMethods.data[0].card.exp_year);
    let month = Number(paymentMethods.data[0].card.exp_month);

    let currYear = Number(new Date().getFullYear());
    let currMonth = Number(new Date().getMonth() + 1);

    let shiftYear = Number(new Date(model.endTime).getFullYear());
    let shiftMonth = Number(new Date(model.endTime).getMonth() + 1);
    let shiftDate = Number(new Date(model.endTime).getDate());

    if (currYear > year) {
      throw new ValidationError(
        "Your credit card expired! Please remove the old and Add new one"
      );
    }

    if (currYear == year) {
      if (currMonth > month) {
        throw new ValidationError(
          "Your credit card expired! Please remove the old and Add new one"
        );
      }
    }
    if (shiftYear > year) {
      throw new ValidationError(
        "Your credit card will expire when the shift is marked complete!"
      );
    }
    if (shiftYear == year) {
      if (shiftMonth > month) {
        throw new ValidationError(
          "Your credit card will when the shift is marked complete"
        );
      }
    }
    if (shiftYear == year) {
      if (shiftMonth == month) {
        if (shiftDate == 30)
          throw new ValidationError(
            "Your credit card will when the shift is marked complete"
          );
      }
    }
    model.isComplete = false;
    model.isCharged = false;
    const newShift = await shiftRepository.add(model);
    const retrievedShift = await shiftRepository.getOneWithClinic(newShift.id);

    // notify  TSM within the range
    const allTsmUsers = await userRepository.getAllTSM();

    try {
      for (let tsmUser of allTsmUsers) {
        console.log("tsmUser");
        console.log(tsmUser);
        if (isAdressSetup(tsmUser)) {
          if (clinic.lattitude != null && clinic.longitude != null) {
            const dis = await getDisInM({
              userCord: {
                lat: tsmUser.profile.address.lattitude,
                lng: tsmUser.profile.address.longitude,
              },
              clinicCord: { lat: clinic.lattitude, lng: clinic.longitude },
            });
            console.log("dis / 1000");
            console.log(dis / 1000);
            console.log("user set radius =>" + tsmUser.profile.address.radius);
            let rad = tsmUser.profile.address.radius || 20;
            if (dis / 1000 <= rad) {
              //sendNotification
              const shiftInfo = {
                officeName: retrievedShift.clinic.officeName,
                address: retrievedShift.clinic.address,
                shiftDate: convertoDay(retrievedShift.shiftDate),
                startTime: convertoTime(retrievedShift.startTime),
                endTime: convertoTime(retrievedShift.endTime),
                rate: retrievedShift.rate,
                radius: tsmUser.profile.address.radius || 20,
              };
              const nearbyShiftHtml = nearbyEmail(shiftInfo, tsmUser);
              sendAllNotification({
                userId: tsmUser.id,
                subject: "A new shift has been posted nearby!",
                bodyPlain: `You have a new shift within ${
                  Math.round(dis / 1000 / 10) * 10
                } Km`,
                bodyHtml: nearbyShiftHtml,
              });
              console.log(" user needs to be notified");
            }
          }
        }
      }
    } catch (error) {
      console.log("Error in notifying the users");
      console.log(error);
    }

    return newShift;
  };
};
const isAdressSetup = (user) => {
  if (user.profile) {
    if (user.profile.address) {
      if (user.profile.address.lattitude && user.profile.address.longitude) {
        return true;
      }
    }
  }
  return false;
};
module.exports = createShiftFun;
