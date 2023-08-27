const {
  authLoginController,
  authSignUpController,
  authRefreshTokenController,
  authLogoutController,
  emailVerifyController,
  saveDeviceTokenController,
  resetPasswordEmailController,
  resetPasswordController,
} = require("../../controller/auth");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const {
  loginBodyValidator,
  signUpBodyValidator,
} = require("../../validation/auth");
const verifyJWT = require("../../middleware/verifyJWT");

const route = ({ router, makeExpressCallback }) => {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Returns user and JWT access token
   *     tags: [Auth]
   *     requestBody:
   *       content:
   *         application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  description: Username for login
   *                password:
   *                  description: password for login
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *
   */

  router.post(
    "/login",
    // loginBodyValidator,
    // validateRequestSchema,
    makeExpressCallback(authLoginController)
  );
  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Create a new user in the database
   *     tags: [Auth]
   *     requestBody:
   *       content:
   *         application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  description: Username for login
   *                password:
   *                  description: password for login
   *                role:
   *                  description: role for user
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *
   */
  router.post(
    "/signup",
    signUpBodyValidator,
    validateRequestSchema,
    makeExpressCallback(authSignUpController)
  );
  /**
   * @swagger
   * /api/auth/refresh:
   *   post:
   *     summary: Create a new user in the database
   *     tags: [Auth]
   *     requestBody:
   *       content:
   *         cookie:
   *            schema:
   *              type: object
   *              properties:
   *                jwt:
   *                  description: jwt stored
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               items:
   *                 accessToken: "acceessToken"
   *
   */
  router.get("/refreshToken", makeExpressCallback(authRefreshTokenController));
  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Create a new user in the database
   *     tags: [Auth]
   *     requestBody:
   *       content:
   *         cookie:
   *            schema:
   *              type: object
   *              properties:
   *                jwt:
   *                  description: jwt stored
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               items:
   *                 accessToken: "acceessToken"
   *
   */
  router.get("/logout", makeExpressCallback(authLogoutController));
  router.get(
    "/verifyemail/:user/:code",
    makeExpressCallback(emailVerifyController)
  );
  router.post(
    "/saveDeviceToken",
    verifyJWT,
    makeExpressCallback(saveDeviceTokenController)
  );
  router.post("/forget", makeExpressCallback(resetPasswordEmailController));
  router.post(
    "/reset/:resetToken",
    makeExpressCallback(resetPasswordController)
  );
  return router;
};

module.exports = route;
