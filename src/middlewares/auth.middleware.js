const jwt = require("jsonwebtoken");
const response = require("../utils/controller-response");
const { appEnv } = require("../config/variables");

const guard = (req, res, next) => {
  const token = req.header("x-auth-token");

  jwt.verify(token, appEnv.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError" ||
        err.name === "NotBeforeError"
      ) {
        return response(res, 401, "Invalid or Expired token");
      }
    }
    if (decoded && typeof decoded === "object") {
      // req.body = { ...req.body, ...decoded.data };
      req.user = decoded.data;
    }

    return next();
  });
};

module.exports = { guard };
