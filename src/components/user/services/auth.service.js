const CustomResponse = require("../../../utils/custom-response");
const UserRepository = require("../repositories/user-repository");
const {
  hashPassword,
  comparePassword,
  jwtSign,
  sendEmail,
  hashedOtp,
  generateCode,
} = require("../../../utils/helper");
const {
  verifyEmailTemplate,
} = require("../../../utils/mail-templates/verify-email");
const { appEnv } = require("../../../config/variables");
const {
  passwordResetEmail,
} = require("../../../utils/mail-templates/password-reset-email");
const {
  passwordUpdateEmail,
} = require("../../../utils/mail-templates/password-update-email");

const {
  resendVerificationEmail,
} = require("../../../utils/mail-templates/resend-verification-email");

class AuthService extends CustomResponse {
  constructor(statusCode, message, data) {
    super(statusCode, message, data);
  }

  static async registerUser(body) {
    try {
      const { password, ...rest } = body;
      const existingUser = await UserRepository.findByEmail(body.email);
      if (existingUser)
        return this.response(401, "User with this email already exists");
      const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);
      const hashedPassword = hashPassword(password);
      const { otp, hashedOtp } = generateCode();
      const user = await UserRepository.create({
        ...rest,
        password: hashedPassword,
        email_verification_code: hashedOtp,
        email_verification_expires_at: verificationExpires,
      });
      await sendEmail({
        from: appEnv.FROM_NAME,
        receiver: body.email,
        subject: "Welcome world",
        html: verifyEmailTemplate(body.first_name, otp),
      });
      return this.response(
        201,
        "Registration successful. Please check your email for verification code.",
        user
      );
    } catch (error) {
      console.log(error, "error");
      return this.response(500, "Something went wrong");
    }
  }

  static async verifyEmail(body) {
    try {
      const { email, code } = body;
      const user = await UserRepository.findByEmail(email);
      if (!user) return this.response(404, "User not found.");
      const eCode = hashedOtp(code);

      if (user.is_verified) {
        return this.response(400, "Email already verified.");
      }

      if (user.email_verification_code !== eCode) {
        return this.response(400, "Invalid verification code.");
      }

      if (new Date() > user.email_verification_expires_at) {
        return this.response(400, "Verification code has expired.");
      }
      await UserRepository.updateById(user.user_id, {
        is_verified: true,
        email_verification_code: null,
        email_verification_expires_at: null,
      });
      return this.response(200, "Email verified successfully.");
    } catch (error) {
      console.error("Email verification error:", error);
      return response(500, "Email verification failed.");
    }
  }
  static async resendVerificationCode(body) {
    try {
      const user = await UserRepository.findByEmail(body.email);
      if (!user) {
        return this.response(404, "User not found.");
      }
      if (existingUser.is_verified) {
        return this.response(400, "Email already verified.");
      }
      const { otp, hashedOtp } = generateCode();
      const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

      await UserRepository.updateById(user.user_id, {
        email_verification_code: hashedOtp,
        email_verification_expires_at: verificationExpires,
      });

      await sendEmail({
        from: appEnv.FROM_NAME,
        receiver: body.email,
        subject: "New verification code for Tripitify",
        html: resendVerificationEmail(user.first_name, otp),
      });

      return this.response(200, "New verification code sent successfully.");
    } catch (error) {
      return this.response(500, "Failed to resend verification code.");
    }
  }
  static async login(body) {
    try {
      const { email, password } = body;
      const user = await UserRepository.findByEmail(email);
      if (!user) return this.response(401, "Invalid Email or Password");
      
      if (!user.is_verified) {
        return this.response(
          false,
          403,
          "Please verify your email before logging in."
        );
      }
      const isMatch = comparePassword(password, user.password);
      if (!isMatch) return this.response(401, "Invalid credentials.");
      const token = jwtSign({
        user_id: user.user_id,
        email: user.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      });
      return this.response(200, "Login successful.", {
        token,
        user,
      });
    } catch (error) {
      return this.response(500, "Login failed");
    }
  }

  static async forgotPassword(body) {
    try {
      const { email } = body;
      const user = await UserRepository.findByEmail(email);
      if (!user) return this.response(400, "User Not Found");
      const { otp, hashedOtp } = generateCode();
      const passwordResetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
      await UserRepository.updateById(user.user_id, {
        password_reset_code: hashedOtp,
        password_reset_code_expires_at: passwordResetCodeExpires,
      });
      
      await sendEmail({
        from: appEnv.FROM_NAME,
        receiver: body.email,
        subject: "Password Reset Request",
        html: passwordResetEmail(user.first_name, otp),
      });

      return this.response(
        200,
        "Password reset code has been sent to your inbox."
      );
    } catch (err) {
      console.log(err, "error");
      return this.response(500, "Password Reset Request Failed. Try again later");
    }
  }
  static async resetPassword(body) {
    try {
      const { token, new_password } = body;
      const eCode = hashedOtp(token);
      const user = await UserRepository.findByResetCode(eCode);
      if (!user)
        return this.response(401, "Invalid or expired password reset code.");
      if (new Date() > user.password_reset_code_expires_at) {
        return this.response(401, "Invalid or expired password reset code.");
      }
      const hashedPassword = hashPassword(new_password);
      await UserRepository.updateById(user.user_id, {
        password: hashedPassword,
      });
      await sendEmail({
        from: appEnv.FROM_NAME,
        receiver: user.email,
        subject: "Password Update Confirmation",
        html: passwordUpdateEmail(user.first_name),
      });
      return this.response(200, "Your password has been updated successfully");
    } catch (error) {
      console.log(error, "error");
      return this.response(500, "Password Reset Failed. Try again later");
    }
  }
  static async updatePassword(body) {
    try {
      const { current_password, user_id, new_password } = body;
      const user = await UserRepository.findById(body.user_id);
      if (!user) return this.response(404, "User not found");
      const valid = comparePassword(current_password, user.password);
      if (!valid) return this.response(401, "Your current password is invalid");
      const hashedPassword = hashPassword(new_password);
      await UserRepository.updateById(user_id, {
        password: hashedPassword,
      });
      await sendEmail({
        from: appEnv.FROM_NAME,
        receiver: user.email,
        subject: "Password Update Confirmation",
        html: passwordUpdateEmail(user.first_name),
      });
      return this.response(200, "Your password has been updated successfully")
    } catch (err) {
      console.log(err);
      this.response(500, "Password Update Failed. Please try again later.");
    }
  }
}
module.exports = AuthService;
