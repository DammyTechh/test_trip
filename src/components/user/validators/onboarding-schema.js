const joi = require("joi");
module.exports = {
  userTypeSchema: () => {
    return joi.object({
      user_type_id: joi.string().required(),
    });
  },

  updateInterestSchema: () => {
    return joi.object({
      interest_ids: joi.array().items(joi.string().uuid()).min(1).required(),
      travel_frequency: joi
        .string()
        .valid("Weekly", "Monthly", "Once a year", "2 - 3 times per year")
        .required(),
      budget_currency: joi.string().length(3).uppercase().default("USD"), //
      budget_min: joi.number().min(0).required().messages({
        "number.min": "Minimum budget must be at least 0",
        "any.required": "Please specify your minimum budget",
      }),
      budget_max: joi
        .alternatives()
        .try(joi.number().min(joi.ref("budget_min")), joi.valid(0))
        .required()
        .messages({
          "number.min":
            "Maximum budget must be greater than or equal to minimum budget",
          "any.only": "Use 0 to indicate no upper limit",
        }),
    });
  },
  updateUserSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
          "string.max": "Email cannot exceed 255 characters",
        }),
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
  updatePlannerSchema: () => {
    return joi.object({
      planning_experience_years: joi.number().required(joi.string().required()),
      planning_rate: joi.number().required(),
      planner_currency: joi.string().uppercase().default("USD"),
      destination_specialties: joi.array().items(joi.string()).required(),
    });
  },
  userTypeSchema: () => {
    return joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required()
        .messages({
          "string.email": "Please provide a valid email address",
          "string.max": "Email cannot exceed 255 characters",
        }),
      user_type_id: joi.string().uuid().required(),
    });
  },
  userIdSchema: () => {
    return joi.object({ user_id: joi.string().uuid().required() });
  },
  tripPurposeSchema: () => {
    return joi.object({
      trip_purpose: joi.string().trim().required(),
    });
  },
};
