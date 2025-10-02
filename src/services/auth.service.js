const { getUserRepository } = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { serviceResponse } = require('../utils/response');
require('dotenv').config();


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


const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = userData;
    
    const userRepository = getUserRepository();
    
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return serviceResponse(false, 409, 'User with this email already exists.');
    }

    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.save({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      phone_number: phoneNumber || null,
      verification_code: verificationCode,
      verification_expires: verificationExpires,
      is_verified: false,
      is_onboarded: false,
      created_at: new Date(),
      updated_at: new Date()
    });

    const emailResult = await sendEmail({
      from: 'Tripitify <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your Tripitify account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to Tripitify!</h2>
          <p>Hello ${firstName},</p>
          <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #4F46E5; font-size: 32px; margin: 0; letter-spacing: 4px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't create an account with Tripitify, please ignore this email.</p>
          <p>Best regards,<br>The Tripitify Team</p>
        </div>
      `,
    });

    if (!emailResult.success) {
      console.warn('Failed to send verification email:', emailResult.error);
    }

    const userResponse = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      is_verified: user.is_verified,
      is_onboarded: user.is_onboarded
    };

    return serviceResponse(true, 201, 'Registration successful. Please check your email for verification code.', { user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    return serviceResponse(false, 500, 'Registration failed.');
  }
};

const verifyEmail = async (email, code) => {
  try {
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

    if (user.is_verified) {
      return serviceResponse(false, 400, 'Email already verified.');
    }

    if (!user.verification_code || user.verification_code !== code) {
      return serviceResponse(false, 400, 'Invalid verification code.');
    }

    if (new Date() > user.verification_expires) {
      return serviceResponse(false, 400, 'Verification code has expired.');
    }

    await userRepository.update(
      { user_id: user.user_id },
      {
        is_verified: true,
        verification_code: null,
        verification_expires: null,
        updated_at: new Date()
      }
    );

    const updatedUser = await userRepository.findOne({ where: { user_id: user.user_id } });

    const userResponse = {
      user_id: updatedUser.user_id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      phone_number: updatedUser.phone_number,
      is_verified: true,
      is_onboarded: updatedUser.is_onboarded
    };

    return serviceResponse(true, 200, 'Email verified successfully.', { user: userResponse });
  } catch (error) {
    console.error('Email verification error:', error);
    return serviceResponse(false, 500, 'Email verification failed.');
  }
};

const resendVerificationCode = async (email) => {
  try {
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

    if (user.is_verified) {
      return serviceResponse(false, 400, 'Email already verified.');
    }

    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); 

    await userRepository.update(
      { user_id: user.user_id },
      {
        verification_code: verificationCode,
        verification_expires: verificationExpires,
        updated_at: new Date()
      }
    );

    const emailResult = await sendEmail({
      from: 'Tripitify <onboarding@resend.dev>',
      to: email,
      subject: 'New verification code for Tripitify',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Verification Code</h2>
          <p>Hello ${user.first_name},</p>
          <p>Here's your new verification code:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #4F46E5; font-size: 32px; margin: 0; letter-spacing: 4px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>Best regards,<br>The Tripitify Team</p>
        </div>
      `,
    });

    if (!emailResult.success) {
      console.warn('Failed to send verification email:', emailResult.error);
      return serviceResponse(false, 500, 'Failed to send verification code.');
    }

    return serviceResponse(true, 200, 'New verification code sent successfully.');
  } catch (error) {
    console.error('Resend verification error:', error);
    return serviceResponse(false, 500, 'Failed to resend verification code.');
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
      phone_number: user.phone_number,
      is_verified: user.is_verified,
      is_onboarded: user.is_onboarded,
      usertype_id: user.usertype_id,
      travel_frequency: user.travel_frequency,
      budget_range: user.budget_range
    };

    return serviceResponse(true, 200, 'Login successful.', { user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    return serviceResponse(false, 500, 'Login failed.');
  }
};
const socialAuth = async (provider, socialData) => {
  try {
    const { socialId, email, firstName, lastName, profilePicture } = socialData;
    const userRepository = getUserRepository();
    
    
    let user = await userRepository.findOne({ 
      where: { social_id: socialId, social_provider: provider } 
    });
    
    if (!user) {
      
      user = await userRepository.findOne({ where: { email } });
      
      if (user) {
        
        await userRepository.update(
          { user_id: user.user_id },
          {
            social_provider: provider,
            social_id: socialId,
            updated_at: new Date()
          }
        );
      } else {
        
        user = await userRepository.save({
          first_name: firstName,
          last_name: lastName,
          email,
          password: 'SOCIAL_AUTH', 
          social_provider: provider,
          social_id: socialId,
          is_verified: true, 
          is_onboarded: false,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const userResponse = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      is_verified: user.is_verified,
      is_onboarded: user.is_onboarded,
      usertype_id: user.usertype_id,
      social_provider: user.social_provider
    };

    return serviceResponse(true, 200, 'Social authentication successful.', { user: userResponse, token });
  } catch (error) {
    console.error('Social auth error:', error);
    return serviceResponse(false, 500, 'Social authentication failed.');
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

  if (!user) return { success: false, status: 404, message: "User not found" };

  const resetToken = jwt.sign({ id: user.user_id }, process.env.RESET_TOKEN_SECRET, { expiresIn: "1h" });

  const emailResult = await sendEmail({
    from: 'Tripitify <onboarding@resend.dev>',
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Password Reset Request</h2>
        <p>Hello ${user.first_name},</p>
        <p>You requested to reset your password. Use the token below:</p>
        <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <code style="color: #4F46E5; font-size: 16px;">${resetToken}</code>
        </div>
        <p>This token will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Tripitify Team</p>
      </div>
    `,
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
    
    if (!user) return { success: false, status: 404, message: "User not found" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.update(
      { user_id: user.user_id },
      { password: hashedPassword, updated_at: new Date() }
    );

    return { success: true };
  } catch(error) {
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

module.exports = {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword
};