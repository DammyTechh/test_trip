const response = require("../../../utils/controller-response");

const AuthService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { statusCode, message, data } = await AuthService.registerUser(
      req.body
    );
    return response(res, statusCode, message, data);
  } catch (error) {
    console.error("Register controller error:", error);
    return response(res, 500, "Something went wrong");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { statusCode, message, data } = await AuthService.verifyEmail(
      req.body
    );
    return response(res, statusCode, message, data);
  } catch (error) {
    console.error("Verify email controller error:", error);
    return response(res, 500, "Something went wrong");
  }
};

const resendVerification = async (req, res) => {
  try {
    const { statusCode, message, data } =
      await AuthService.resendVerificationCode(req.body);
    return response(res, statusCode, message, data);
  } catch (error) {
    return response(res, 500, "Something went wrong");
  }
};

const login = async (req, res) => {
  try {
    const { statusCode, message, data } = await AuthService.login(req.body);
    return response(res, statusCode, message, data);
  } catch (error) {
    console.log(error, "error");
    return response(res, 500, "Something went wrong");
  }
};

const refresh = async (req, res) => {
  try {
    const { token } = req.body;
    const { status, message, data } = await AuthService.refreshToken(token);
    response(status, message, data);
  } catch (error) {
    response(res, 500, "Something went wrong");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { statusCode, message, data } = await AuthService.forgotPassword(
      req.body
    );
    return response(res, statusCode, message, data);
  } catch (error) {
    console.log(error, "eror");
    return response(res, 500, "Something went wrong");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { statusCode, message, data } = await AuthService.resetPassword(
      req.body
    );
    return response(res, statusCode, message, data);
  } catch (error) {
    console.log(error, "error");
    response(res, 500, "Something went wrong");
  }
};

const changePassword = async (req, res) => {
  try {
    const {statusCode, message, data } = await AuthService.updatePassword(
      req.body
    );
    return response(res, statusCode, message, data);
  } catch (error) {
    return response(res, 500, "Something went wrong");
  }
};



module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
};
