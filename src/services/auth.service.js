const { getUserRepository } = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { serviceResponse } = require('../utils/response');
require('dotenv').config();

// Initialize Resend with proper error handling
let resend;
try {
  const { Resend } = require('resend');
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_demo_api_key_replace_with_real_key') {
    console.warn('⚠️  RESEND_API_KEY not configured. Email functionality will be disabled.');
    resend = null;
  } else {
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend email service initialized successfully');
  }
} catch (error) {
  console.error('❌ Failed to initialize Resend:', error.message);
  resend = null;
}

// Email sending helper with fallback
const sendEmail = async (emailData) => {
  if (!resend) {
    console.log('📧 Email would be sent:', emailData);
    console.log('⚠️  Email service not configured. Please set RESEND_API_KEY in .env file');
    return { success: true, message: 'Email service not configured' };
  }
  
  try {
    const result = await resend.emails.send(emailData);
    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

const registerUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    
    const userRepository = getUserRepository();
    
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return serviceResponse(false, 409, 'User with this email already exists.');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.save({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      verification_token: verificationToken,
      is_verified: false,
      is_onboarded: false,
      created_at: new Date(),
      updated_at: new Date()
    });

    const emailResult = await sendEmail({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Tripify App',
      html: `<p>Hello ${firstName},</p><p>Your verification code is <strong>${verificationToken}</strong>. It will expire in 60 minutes.</p>`,
    });

    if (!emailResult.success) {
      console.warn('Failed to send verification email:', emailResult.error);
    }

    const userResponse = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_verified: user.is_verified,
      is_onboarded: user.is_onboarded
    };

    return serviceResponse(true, 201, 'Registration successful.', { user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    return serviceResponse(false, 500, 'Registration failed.');
  }
};

const verifyEmail = async (token) => {
  try {
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { verification_token: token } });

    if (!user) {
      return serviceResponse(false, 400, 'Invalid verification token.');
    }

    await userRepository.update(
      { user_id: user.user_id },
      {
        is_verified: true,
        verification_token: null,
        updated_at: new Date()
      }
    );

    const updatedUser = await userRepository.findOne({ where: { user_id: user.user_id } });

    const userResponse = {
      user_id: updatedUser.user_id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      is_verified: true,
      is_onboarded: updatedUser.is_onboarded
    };

    return serviceResponse(true, 200, 'Email verified successfully.', { user: userResponse });
  } catch (error) {
    console.error('Email verification error:', error);
    return serviceResponse(false, 500, 'Email verification failed.');
  }
};

const loginUser = async (email, password) => {
  try {
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return serviceResponse(false, 401, 'Invalid credentials.');
    }

    if (!user.is_verified) {
      return serviceResponse(false, 403, 'Please verify your email before logging in.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return serviceResponse(false, 401, 'Invalid credentials.');
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const userResponse = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_verified: user.is_verified,
      is_onboarded: user.is_onboarded
    };

    return serviceResponse(true, 200, 'Login successful.', { user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    return serviceResponse(false, 500, 'Login failed.');
  }
};

const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { user_id: decoded.id } });
    if (!user) return { success: false, status: 404, message: "User not found" };

    const newAccessToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return { success: true, data: { token: newAccessToken } };
  } catch {
    return { success: false, status: 403, message: "Invalid refresh token" };
  }
};

const logoutUser = async (refreshToken) => {
  return { success: true };
};

const forgotPassword = async (email) => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne({ where: { email } });

  console.log("user forgot password", user);
  if (!user) return { success: false, status: 404, message: "User not found" };

  const resetToken = jwt.sign({ id: user.user_id }, process.env.RESET_TOKEN_SECRET, { expiresIn: "1h" });

  const emailResult = await sendEmail({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: 'Password Reset Request',
    html: `<p>Hello ${user.first_name},</p><p>Your resetToken code is <strong>${resetToken}</strong> to reset your password. It will expire in 60 minutes.</p>`,
  });

  if (!emailResult.success) {
    console.warn('Failed to send password reset email:', emailResult.error);
    return { success: false, status: 500, message: "Failed to send reset email" };
  }

  return { success: true };
};

const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { user_id: decoded.id } });
    
    console.log("user reset password", user);
    if (!user) return { success: false, status: 404, message: "User not found" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.update(
      { user_id: user.user_id },
      { password: hashedPassword, updated_at: new Date() }
    );

    return { success: true };
  } catch(error) {
    console.log("error", error);
    return { success: false, status: 400, message: "Invalid or expired reset token" };
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne({ where: { user_id: userId } });
  if (!user) return { success: false, status: 404, message: "User not found" };

  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return { success: false, status: 401, message: "Old password is incorrect" };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepository.update(
    { user_id: userId },
    { password: hashedPassword, updated_at: new Date() }
  );

  return { success: true };
};

const resendVerification = async (email) => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne({ where: { email } });
  if (!user) return { success: false, status: 404, message: "User not found" };

  if (user.is_verified) {
    return { success: false, status: 400, message: "Account already verified" };
  }

  const verifyToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  
  const emailResult = await sendEmail({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: 'Verify your account',
    html: `<a href="${process.env.FRONTEND_URL}/verify?token=${verifyToken}">Verify</a>`,
  });

  if (!emailResult.success) {
    console.warn('Failed to send verification email:', emailResult.error);
    return { success: false, status: 500, message: "Failed to send verification email" };
  }

  return { success: true };
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
  resendVerification
};