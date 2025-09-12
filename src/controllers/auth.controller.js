const authService = require('../services/auth.service');
const {
  successResponseMsg,
  errorResponseMsg,
  sessionSuccessResponseMsg,
} = require('../utils/response');

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    return successResponseMsg(
      res,
      201,
      'Registration successful. Please check your email to verify your account.',
      result.data,
    );
  } catch (error) {
    console.error('Register controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const result = await authService.verifyEmail(token);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    return successResponseMsg(res, 200, 'Email verified successfully. You can now log in.');
  } catch (error) {
    console.error('Verify email controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    return sessionSuccessResponseMsg(
      res,
      200,
      'Login successful.',
      result.data.token,
      result.data.user,
    );
  } catch (error) {
    console.error('Login controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const refresh = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await authService.refreshToken(token);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Token refreshed", result.data);
  } catch (error) {
    console.error('Refresh controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logoutUser(refreshToken);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Logged out successfully");
  } catch (error) {
    console.error('Logout controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Password reset email sent. Check your inbox.");
  } catch (error) {
    console.error('Forgot password controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Password reset successfully. You can now log in.");
  } catch (error) {
    console.error('Reset password controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.user_id, oldPassword, newPassword);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Password changed successfully");
  } catch (error) {
    console.error('Change password controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerification(email);
    if (!result.success) return errorResponseMsg(res, result.status, result.message);

    return successResponseMsg(res, 200, "Verification email resent successfully");
  } catch (error) {
    console.error('Resend verification controller error:', error);
    return errorResponseMsg(res, 500, "Unexpected error");
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  resendVerification
};