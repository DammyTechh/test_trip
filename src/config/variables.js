const path = require("path");
const env = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.resolve(__dirname, `../../.env.${env}`),
});

const appEnv = Object.freeze({
  DB_HOST: process.env.DB_HOST,
  DD_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NODE_ENV: env,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  EMAIL_BASE_URL: process.env.EMAIL_BASE_URL,
  EMAIL_API_KEY: process.env.EMAIL_API_KEY,
  FROM_NAME: process.env.FROM_NAME
});

module.exports = { appEnv };
