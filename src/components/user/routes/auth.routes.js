const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { guard } = require("../../../middlewares/auth.middleware");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  changePasswordSchema,
  tokenSchema,
} = require("../validators/auth-schema");

const {
  authRateLimit,
  passwordResetRateLimit,
} = require("../../../middlewares/security.middleware");
const { validate } = require("../../../middlewares/validate-request");
const router = Router();

router.post(
  "/register",
  authRateLimit,
  validate(registerSchema(), "body"),
  authController.register
);


router.post(
  "/verify-email",
  authRateLimit,
  validate(verifyEmailSchema(), "body"),
  authController.verifyEmail
);


router.post(
  "/resend-verification",
  authRateLimit,
  validate(resendVerificationSchema(), "body"),
  authController.resendVerification
);

router.post(
  "/login",
  authRateLimit,
  validate(loginSchema(), "body"),
  authController.login
);


router.post(
  "/forgot-password",
  passwordResetRateLimit,
  validate(forgotPasswordSchema(), "body"),
  authController.forgotPassword
);


router.post(
  "/reset-password",
  passwordResetRateLimit,
  validate(resetPasswordSchema(), "body"),
  authController.resetPassword
);
 

router.patch(
  "/update-password",
  validate(tokenSchema(), "headers"),
  guard,
  validate(changePasswordSchema(), "body"),
  authController.changePassword
);

module.exports = router;
