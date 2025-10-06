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
      'Registration successful. Please check your email for verification code.',
      result.data,
    );
  } catch (error) {
    console.error('Register controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await authService.verifyEmail(email, code);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    return successResponseMsg(res, 200, 'Email verified successfully. You can now log in.', result.data);
  } catch (error) {
    console.error('Verify email controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerificationCode(email);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    return successResponseMsg(res, 200, result.message);
  } catch (error) {
    console.error('Resend verification controller error:', error);
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

const socialAuth = async (req, res) => {
  try {
    const { provider } = req.params;
    const socialData = req.body;
    
    if (!['google', 'apple', 'facebook'].includes(provider)) {
      return errorResponseMsg(res, 400, 'Invalid social provider');
    }
    
    const result = await authService.socialAuth(provider, socialData);
    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }
    
    return sessionSuccessResponseMsg(
      res,
      200,
      'Social authentication successful.',
      result.data.token,
      result.data.user,
    );
  } catch (error) {
    console.error('Social auth controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  socialAuth,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
};