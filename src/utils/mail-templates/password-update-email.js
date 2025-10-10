const passwordUpdateEmail = (firstName = "User") => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
    <h2 style="color: #4F46E5;">Password Updated Successfully</h2>
    <p>Hello ${firstName},</p>
    <p>We wanted to let you know that your Tripitify account password was recently updated.</p>
    <p>If you made this change, no further action is needed.</p>
    <p>If you did <strong>not</strong> update your password, please reset it immediately or contact our support team to secure your account.</p>
    
    <div style="background-color: #F9FAFB; padding: 16px; border-left: 4px solid #4F46E5; margin: 20px 0; border-radius: 6px;">
      <p style="margin: 0; font-size: 14px;">🔒 Always keep your password private and avoid sharing it with anyone.</p>
    </div>

    <p>Best regards,<br><strong>The Tripitify Team</strong></p>

    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
    
    <p style="font-size: 12px; color: #6B7280; text-align: center;">
      You’re receiving this email because you have an account with Tripitify.<br>
      If you no longer wish to receive security notifications, you can 
      <a href="#" style="color: #4F46E5; text-decoration: none;">unsubscribe here</a>.
    </p>
  </div>
`;

module.exports = { passwordUpdateEmail };
