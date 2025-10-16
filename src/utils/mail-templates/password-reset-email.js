const passwordResetEmail = (firstName, resetToken) => {
  return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Password Reset Request</h2>
        <p>Hello ${firstName},</p>
        <p>You requested to reset your password. Use the token below:</p>
        <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <code style="color: #4F46E5; font-size: 16px;">${resetToken}</code>
        </div>
        <p>This token will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Tripitify Team</p>
      </div>`;
};

module.exports = { passwordResetEmail };
