const verifyEmailTemplate = (firstName, verificationCode) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to Tripitify!</h2>
          <p>Hello ${firstName},</p>
          <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #4F46E5; font-size: 32px; margin: 0; letter-spacing: 4px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't create an account with Tripitify, please ignore this email.</p>
          <p>Best regards,<br>The Tripitify Team</p>
        </div>`;
};

module.exports = { verifyEmailTemplate };
