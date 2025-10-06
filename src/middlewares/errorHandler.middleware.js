const { errorResponseMsg } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.error(err);

  
  if (err.name === 'QueryFailedError') {
    if (err.code === 'ER_DUP_ENTRY') {
      const message = 'Duplicate field value entered';
      error = { message, statusCode: 400 };
    } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      const message = 'Referenced resource not found';
      error = { message, statusCode: 400 };
    } else {
      const message = 'Database query failed';
      error = { message, statusCode: 400 };
    }
  }

  if (err.name === 'EntityNotFoundError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.constraints || {}).join(', ') || 'Validation failed';
    error = { message, statusCode: 400 };
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Server Error';

  errorResponseMsg(res, statusCode, message);
};

module.exports = errorHandler;