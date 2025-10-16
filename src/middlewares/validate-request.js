const response = require("../utils/controller-response");

const validate = (schema, part = "body") => {
  return async (req, res, next) => {
    const contentType = req.headers["content-type"];
    if (
      part === "body" &&
      ["POST", "PUT", "PATCH"].includes(req.method.toUpperCase()) &&
      (!contentType || !contentType.includes("application/json"))
    ) {
      return response(
        res,
        415,
        "Unsupported Media Type. This endpoint only accepts JSON payloads. Please include a 'Content-Type: application/json' header."
      );
    }

    try {
      // Validate request data
      const value = await schema.validateAsync(req[part], { abortEarly: false });
      req[part] = value;
      next();
    } catch (error) {
      // Handle Joi validation errors
      if (error.isJoi) {
        const expectedKeys = Object.keys(schema.describe().keys);
        const errors = error.details.map((detail) => {
          const path = detail.path.join(".");
          return `${path ? `"${path}"` : ""} ${detail.message.replace(/["]/g, "")}`;
        });

        return response(res, 400, `Validation failed for ${part}.`, {
          expected_fields: expectedKeys,
          errors,
        });
      }
      next(error);
    }
  };
};

module.exports = { validate };
