module.exports = {
  userTypeSchema: joi.object({
    userTypeId: joi.number().integer().min(1).max(3).required().messages({
      "number.min": "User type ID must be between 1 and 3",
      "number.max": "User type ID must be between 1 and 3",
    }),
  }),
  interestsSchema: joi.object({
    interestIds: joi
      .array()
      .items(joi.number().integer().min(1))
      .min(1)
      .max(10)
      .unique()
      .required()
      .messages({
        "array.min": "At least one interest must be selected",
        "array.max": "Cannot select more than 10 interests",
        "array.unique": "Duplicate interests are not allowed",
      }),
    travelPreferencesSchema: joi.object({
      travelFrequency: joi
        .string()
        .valid("Once a year", "2 - 3 times per year", "Weekly", "Monthly")
        .required()
        .messages({
          "any.only":
            "Travel frequency must be one of: Once a year, 2 - 3 times per year, Weekly, Monthly",
        }),
      budgetRange: joi
        .string()
        .valid("Under $500", "$500 - $1500", "$1500 - $3000", "Above $3000")
        .required()
        .messages({
          "any.only":
            "Budget range must be one of: Under $500, $500 - $1500, $1500 - $3000, Above $3000",
        }),
    }),
  }),
};
