const response = require("../../../utils/controller-response");

const AuthService = require("../services/auth.service");
class AuthController {
  static async register(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.registerUser(
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Register controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }



  static async verifyEmail(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.verifyEmail(
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Verify email controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async resendVerification(req, res) {
    try {
      const { statusCode, message, data } =
        await AuthService.resendVerificationCode(req.body);
      return response(res, statusCode, message, data);
    } catch (error) {
      return response(res, 500, "Something went wrong");
    }
  }

  static async login(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.login(req.body);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.log(error, "error");
      return response(res, 500, "Something went wrong");
    }
  }

  static async refresh(req, res) {
    try {
      const { token } = req.body;
      const { status, message, data } = await AuthService.refreshToken(token);
      response(status, message, data);
    } catch (error) {
      response(res, 500, "Something went wrong");
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.forgotPassword(
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.log(error, "eror");
      return response(res, 500, "Something went wrong");
    }
  }

  static async resetPassword(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.resetPassword(
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.log(error, "error");
      response(res, 500, "Something went wrong");
    }
  }

  static async changePassword(req, res) {
    try {
      const { statusCode, message, data } = await AuthService.updatePassword(
       req?.user?.user_id, req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      return response(res, 500, "Something went wrong");
    }
  }
}

module.exports = AuthController;
