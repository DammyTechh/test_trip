const joi = require("joi");
module.exports = {
    userTypeSchema: () => {
        return joi.object({
            user_type_id: joi.string().required(),
        });
    },
    interestSchema: () => {
        return joi.object({
            interest_ids: joi.array().items(),
        });
    },
    travelPreferencesSchema: () => {
        return joi.object({
            travel_frequency: joi.string().required(),
            budget_range: joi.string().required()
        });
    },
    tripPurpose: ()=> {
        return joi.object({
            trip_purpose: joi.string().trim().required()
        })
    }
};
