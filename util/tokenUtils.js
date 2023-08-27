const jwt = require("jsonwebtoken");
const ValidationError = require("../error/validationError");
require("dotenv").config();

const generateToken = async (id) => {
  const verificationToken = jwt.sign(
    { id: id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

const generateResetToken = async (id) => {
  const verificationToken = jwt.sign(
    { id: id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return verificationToken;
};

const verifyToken = async (token, id) => {
  console.log("The token to verify is");
  console.log(token);
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded");
    console.log(decoded.id);
    console.log("id");
    console.log(id);
    if (err || id !== decoded.id) {
      console.log(err);
      throw new ValidationError("Invalid Token!", 401);
    }
  });
  return true;
};

module.exports = { generateToken, verifyToken, generateResetToken };
