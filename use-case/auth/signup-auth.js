const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidationError = require("../../error/validationError");
const { welcomeEmail } = require("../../util/emailTemplates");
const { sendMail } = require("../../util/emailUtils");
const { getRewardMetrics } = require("../../util/reward");
const { generateToken } = require("../../util/tokenUtils");
require("dotenv").config();

const signUpAuth = ({ authRepository }) => {
  return async function signup(info) {
    const { email, password, role } = info;
    if (!email || !password) {
      throw new ValidationError("Email Or Password is required", 400);
    }
    if (!role) {
      throw new ValidationError("Role is Required", 400);
    }
    const duplicate = await authRepository.getByEmail(email);
    if (duplicate) {
      throw new ValidationError("User Already Exists!");
    }
    const encryptedPassword = await bcrypt.hash(password, 12);

    const accessToken = jwt.sign(
      { email: email, role: role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY || "120s" }
    );
    const refreshToken = jwt.sign(
      { email: email, role: role },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY || "300s" }
    );

    const newuser = await authRepository.add({
      email,
      password: encryptedPassword,
      role,
      refreshToken,
    });

    const token = await generateToken(newuser.id);
    const text = `Please click \n here! `;
    const baseURL = process.env.baseURL || "http://localhost:3333";
    // const html = `<p>Hello <strong>${newuser.email}! </strong><br/>  Welcome to Dental App! </br></br> Please click on the link below to verify your email <a href="${baseURL}/api/auth/verifyemail/${newuser.id}/${token}">VERIFY EMAIL</a><p/>`;
    const html = welcomeEmail(newuser, token, baseURL);
    console.log(text);
    sendMail({
      to: email,
      from: "test",
      subject: "Welcome to Tempsii",
      text: text,
      html: html,
    });
    if (newuser.role == "USER") {
      const reward = getRewardMetrics(newuser);
      newuser.reward = reward;
    }

    return {
      user: newuser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };
};

module.exports = signUpAuth;
