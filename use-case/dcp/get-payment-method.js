const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const Stripe = require("stripe");
require("dotenv").config();

const getPaymentMethod = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function select(user) {
    console.log(user);
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    if (!loggedInUser.customerStripeId) {
      return {
        cardInfo: {},
      };
    }
    let paymentMethods = null;
    try {
      paymentMethods = await stripe.paymentMethods.list({
        customer: loggedInUser.customerStripeId,
        type: "card",
      });
    } catch (error) {
      console.log(e);
      throw new ValidationError("Error in retrieving payment! Stripe Error");
    }
    if (paymentMethods.data.length == 1) {
      return {
        cardInfo: {},
      };
    }
    return { cardInfo: paymentMethods.data[0] };
  };
};

module.exports = getPaymentMethod;
