const ValidationError = require("../../error/validationError");
const { forgetEmail } = require("../../util/emailTemplates");
const { sendMail } = require("../../util/emailUtils");
const { verifyToken, generateResetToken } = require("../../util/tokenUtils");

const resetPasswordEmail = ({ authRepository }) => {
  return async function verify({ email }) {
    if (!email || email.trim() == "") {
      throw new ValidationError("Error! Please provide email", 400);
    }
    const loggedInUser = await authRepository.getByEmail(email);

    if (!loggedInUser) {
      throw new ValidationError(" No user with given username exists", 400);
    }

    if (loggedInUser.role == "ADMIN") {
      throw new ValidationError("Can not reset ADMIN Password", 400);
    }

    const token = await generateResetToken(loggedInUser.id, loggedInUser.email);
    const text = `Please click \n here! `;
    const baseURL = process.env.baseURL || "https://tempsii.netlify.app/";

    // const html = `<p>Hello <strong>${loggedInUser.email}! </strong><br/>  Please find the password reset link <a href="https://tempsii.netlify.app/resetPassword?token=${token}">Reset Token</a><p/>`;

    const html = forgetEmail(loggedInUser.email, token);
    console.log(text);
    try {
      sendMail({
        to: email,
        from: "test",
        subject: "Reset Your Password",
        text: text,
        html: html,
      });
    } catch (error) {
      throw new ValidationError("Email Sendding error", 400);
    }
    return { messgae: "Password Reset Link is sent! Please check mail" };
  };
};

module.exports = resetPasswordEmail;
