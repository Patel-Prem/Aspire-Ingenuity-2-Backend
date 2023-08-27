const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const Stripe = require("stripe");
require("dotenv").config();

const deletePaymentMethod = ({
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
      throw new ValidationError("No Card to delete!");
    }
    let deleted = {};
    try {
      deleted = await stripe.customers.del(loggedInUser.customerStripeId);

      await userRepository.update(loggedInUser.id, {
        customerStripeId: null,
        customerStripeSetupIntentId: null,
      });
    } catch (error) {
      console.log(error);
      throw new ValidationError(
        "Stripe Error! Error in Deleting Customer card"
      );
    }
    return { cardInfo: deleted };
  };
};

module.exports = deletePaymentMethod;
