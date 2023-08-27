const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const Stripe = require("stripe");
require("dotenv").config();

const setUpPayment = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function select(user, shiftId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    if (!loggedInUser.email) {
      throw new ValidationError(
        "Invalid Email! Email does not exist for the user to setup"
      );
    }

    if (
      loggedInUser.customerStripeId &&
      loggedInUser.customerStripeSetupIntentId
    ) {
      const expaymentMethods = await stripe.paymentMethods.list({
        customer: loggedInUser.customerStripeId,
        type: "card",
      });

      if (expaymentMethods.data.length == 2) {
        throw new ValidationError(
          "Card Already Setup! Please call /dcp/payment/retrieve"
        );
      }
      const ExsetupIntent = await stripe.setupIntents.retrieve(
        loggedInUser.customerStripeSetupIntentId
      );

      return {
        clientSecret: ExsetupIntent.client_secret,
      };
    }

    let customer = null;
    let setupIntent = null;
    try {
      customer = await stripe.customers.create({
        email: loggedInUser.email,
        payment_method: "pm_card_visa",
      });

      setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      await userRepository.update(loggedInUser.id, {
        customerStripeId: customer.id,
        customerStripeSetupIntentId: setupIntent.id,
      });
    } catch (e) {
      console.log(e);
      throw new ValidationError("Error in creating payment!");
    }

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "setup",
    //   customer: customer.id,
    //   success_url:
    //     "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    //   cancel_url: "https://example.com/cancel",
    // });

    // const session_id =
    //   "cs_test_c1IfLaHWVPeJie37gc78wTGJ7yLEhaw29EQN3GVhwZfaQt8jE68SstWqoj";

    // const sess = await stripe.checkout.sessions.retrieve(session_id);

    // console.log(customer.id); //cus_NLc12YZdeQjeWp

    // const setupIntent = await stripe.setupIntents.create({
    //   customer: customer.id,
    //   payment_method_types: ["card"],
    // }); //seti_1MaungLeP6ofMIIsO5VWDfKL, seti_1MaungLeP6ofMIIsO5VWDfKL_secret_NLc1wnyWcskTHBbAuHIQsM4DOZTOMlF

    //deduct payment

    // const paymentMethods = await stripe.paymentMethods.list({
    //   customer: "cus_NLc12YZdeQjeWp",
    //   type: "card",
    // });

    // console.log(paymentMethods);

    // try {
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1099,
    //     currency: "cad",
    //     customer: "cus_NLc12YZdeQjeWp",
    //     payment_method: "pm_1Maup9LeP6ofMIIsC5XbgXEi",
    //     off_session: true,
    //     confirm: true,
    //   });

    //   const paymentIntentConfirm = await stripe.paymentIntents.confirm(
    //     paymentIntent.id,
    //     { payment_method: "pm_card_visa" }
    //   );

    //   console.log(paymentIntentConfirm);
    // } catch (err) {
    //   // Error code will be authentication_required if authentication is needed
    //   console.log("Error code is: ", err.code);
    //   console.log(err);
    //   const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
    //     err.raw.payment_intent.id
    //   );
    //   console.log("PI retrieved: ", paymentIntentRetrieved.id);
    // }

    // return { setupIntent: setupIntent };
    return {
      clientSecret: setupIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    };
  };
};

module.exports = setUpPayment;
