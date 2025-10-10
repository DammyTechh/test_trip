const joi = require("joi");

module.exports = {
  registerSchema: () => {
    return joi.object({
      first_name: joi
        .string()
        .min(2)
        .max(45)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
          "string.pattern.base":
            "First name can only contain letters and spaces",
          "string.min": "First name must be at least 2 characters long",
          "string.max": "First name cannot exceed 45 characters",
        }),
      last_name: joi
        .string()
        .min(2)
        .max(45)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
          "string.pattern.base":
            "Last name can only contain letters and spaces",
          "string.min": "Last name must be at least 2 characters long",
          "string.max": "Last name cannot exceed 45 characters",
        }),
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
          "string.max": "Email cannot exceed 255 characters",
        }),
      password: joi
        .string()
        .min(8)
        .max(128)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .required()
        .messages({
          "string.min": "Password must be at least 8 characters long",
          "string.max": "Password cannot exceed 128 characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
      phone_number: joi
        .string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional()
        .allow("")
        .messages({
          "string.pattern.base": "Please provide a valid phone number",
        }),
    });
  },

  loginSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
        }),
      password: joi.string().min(1).max(128).required().messages({
        "string.empty": "Password is required",
      }),
    });
  },

  verifyEmailSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
        }),
      code: joi
        .string()
        .length(6)
        .pattern(/^\d{6}$/)
        .required()
        .messages({
          "string.length": "Verification code must be 6 digits",
          "string.pattern.base": "Verification code must contain only numbers",
        }),
    });
  },
  resetPasswordSchema: () => {
    return joi.object({
      token: joi.string().required().messages({
        "string.empty": "Reset token is required",
      }),
      new_password: joi
        .string()
        .min(8)
        .max(128)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
        )
        .required()
        .messages({
          "string.min": "Password must be at least 8 characters long",
          "string.max": "Password cannot exceed 128 characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
    });
  },

  resendVerificationSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
        }),
    });
  },

  forgotPasswordSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
        }),
    });
  },

  tokenSchema: () => {
    return joi
      .object({
        "x-auth-token": joi.string().trim().required(),
      })
      .unknown(true);
  },

  changePasswordSchema: () => {
    return joi
      .object({
        current_password: joi.string().trim().required().messages({
          "string.empty": "Current password is required",
        }),
        new_password: joi
          .string().trim()
          .min(8)
          .max(128)
          .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          )
          .required()
          .messages({
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 128 characters",
            "string.pattern.base":
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          }),
      })
      .unknown(true);
  },
};
 