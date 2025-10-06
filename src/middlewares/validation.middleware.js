const joi = require('joi');
const { errorResponseMsg } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return errorResponseMsg(res, 400, error.details[0].message);
    }
    next();
  };
};


const registerSchema = joi.object({
  firstName: joi.string()
    .min(2)
    .max(45)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'First name can only contain letters and spaces',
      'string.min': 'First name must be at least 2 characters long',
      'string.max': 'First name cannot exceed 45 characters'
    }),
  lastName: joi.string()
    .min(2)
    .max(45)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Last name can only contain letters and spaces',
      'string.min': 'Last name must be at least 2 characters long',
      'string.max': 'Last name cannot exceed 45 characters'
    }),
  email: joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email cannot exceed 255 characters'
    }),
  password: joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  phoneNumber: joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
});

const loginSchema = joi.object({
  email: joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  password: joi.string()
    .min(1)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required'
    }),
});

const verifyEmailSchema = joi.object({
  email: joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  code: joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'Verification code must be 6 digits',
      'string.pattern.base': 'Verification code must contain only numbers'
    }),
});

const resendVerificationSchema = joi.object({
  email: joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
});

const userTypeSchema = joi.object({
  userTypeId: joi.number()
    .integer()
    .min(1)
    .max(3)
    .required()
    .messages({
      'number.min': 'User type ID must be between 1 and 3',
      'number.max': 'User type ID must be between 1 and 3'
    }),
});

const interestsSchema = joi.object({
  interestIds: joi.array()
    .items(joi.number().integer().min(1))
    .min(1)
    .max(10)
    .unique()
    .required()
    .messages({
      'array.min': 'At least one interest must be selected',
      'array.max': 'Cannot select more than 10 interests',
      'array.unique': 'Duplicate interests are not allowed'
    }),
});

const travelPreferencesSchema = joi.object({
  travelFrequency: joi.string()
    .valid('Once a year', '2 - 3 times per year', 'Weekly', 'Monthly')
    .required()
    .messages({
      'any.only': 'Travel frequency must be one of: Once a year, 2 - 3 times per year, Weekly, Monthly'
    }),
  budgetRange: joi.string()
    .valid('Under $500', '$500 - $1500', '$1500 - $3000', 'Above $3000')
    .required()
    .messages({
      'any.only': 'Budget range must be one of: Under $500, $500 - $1500, $1500 - $3000, Above $3000'
    }),
});


const forgotPasswordSchema = joi.object({
  email: joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
});

const resetPasswordSchema = joi.object({
  token: joi.string().required().messages({
    'string.empty': 'Reset token is required'
  }),
  newPassword: joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
});

const changePasswordSchema = joi.object({
  oldPassword: joi.string().required().messages({
    'string.empty': 'Current password is required'
  }),
  newPassword: joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
});

const rateLimit = require('express-rate-limit');

const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      status: 'error',
      message: message || 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};


const authRateLimit = createRateLimit(
  15 * 60 * 1000, 
  5, 
  'Too many authentication attempts, please try again in 15 minutes.'
);

const generalRateLimit = createRateLimit(
  15 * 60 * 1000, 
  100, 
  'Too many requests, please try again in 15 minutes.'
);

const strictRateLimit = createRateLimit(
  15 * 60 * 1000, 
  10, 
  'Too many requests to this endpoint, please try again in 15 minutes.'
);


const passwordResetRateLimit = createRateLimit(
  60 * 60 * 1000, 
  3, 
  'Too many password reset attempts, please try again in 1 hour.'
);

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  userTypeSchema,
  interestsSchema,
  travelPreferencesSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  authRateLimit,
  generalRateLimit,
  strictRateLimit,
  passwordResetRateLimit,
};