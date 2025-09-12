const { errorResponseMsg } = require('../utils/response');

const notFound = (req, res) => {
  errorResponseMsg(res, 404, `Not Found - ${req.originalUrl}`);
};

module.exports = notFound;