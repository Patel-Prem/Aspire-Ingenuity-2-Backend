const authLoginFun = require("./login-auth");
const authSignUpFun = require("./signup-auth");
const authRefreshTokenFun = require("./refresh-token-auth");
const authLogoutFun = require("./logout-auth");
const emailVerifyFun = require("./verify-email");
const saveDeviceTokenFun = require("./save-device-token");
const resetPasswordEmailFun = require("./reset-password-email");
const resetPasswordFun = require("./reset-password");

const authRepository = require("../../data-access/user");

const { localStategyPassport } = require("../../config/passport/index");

const loginAuthSer = authLoginFun({ authRepository, localStategyPassport });
const signUpAuthSer = authSignUpFun({ authRepository });
const refreshTokenAuthSer = authRefreshTokenFun({ authRepository });
const logoutAuthSer = authLogoutFun({ authRepository });
const verifyEmailSer = emailVerifyFun({ authRepository });
const saveDeviceTokenSer = saveDeviceTokenFun({ authRepository });
const resetPasswordEmailSer = resetPasswordEmailFun({ authRepository });
const resetPasswordSer = resetPasswordFun({ authRepository });

const services = Object.freeze({
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
});

module.exports = services;
module.exports = {
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
};
