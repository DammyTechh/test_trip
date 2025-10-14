const joi = require("joi");
module.exports = {
  userTypeSchema: () => {
    return joi.object({
      user_type_id: joi.string().required(),
    });
  },
  interestSchema: () => {
    return joi.object({
      interest_ids: joi
        .array()
        .items(
          joi
            .string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .message("Each interest_id must be a valid Id")
        )
        .min(1)
        .required()
        .messages({
          "array.base": "interest_ids must be an array",
          "array.min": "At least one interest_id is required",
        }),
    });
  },
  travelPreferencesSchema: () => {
    return joi.object({
      travel_frequency: joi.string().required(),
      budget_range: joi.string().required(),
    });
  },
  tripPurpose: () => {
    return joi.object({
      trip_purpose: joi.string().trim().required(),
    });
  },
};
