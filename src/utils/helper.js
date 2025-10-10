const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { appEnv } = require("../config/variables");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const sendEmail = async (emailData) => {
  try {
    await axios.post(`${appEnv.EMAIL_BASE_URL}/api/send-mail-v2`, emailData, {
      headers: {
        "x-api-key": appEnv.EMAIL_API_KEY,
      },
    });
  } catch (err) {
    throw new Error(err?.response?.data?.data || "Error Sending Email");
  }
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateCode = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  return { otp, hashedOtp };
};

const hashedOtp = (code) => {
  const hashedOtp = crypto.createHash("sha256").update(code).digest("hex");
  return hashedOtp;
};

const hashPassword = (password) => {
  const saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
};

const jwtSign = (data) => {
  return jwt.sign(
    {
      data,
    },
    appEnv.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(30).toString("hex");
  const encryptedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return { resetToken, encryptedResetToken };
};

const comparePassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
};

module.exports = {
  generateVerificationCode,
  comparePassword,
  sendEmail,
  generateResetToken,
  hashPassword,
  jwtSign,
  generateCode,
  hashedOtp,
};
