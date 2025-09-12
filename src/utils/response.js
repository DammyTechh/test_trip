module.exports = {
  serviceResponse: (success, status, message, data) => ({
    success,
    status,
    message,
    data,
  }),
  errorResponseMsg: (res, status, message, data) =>
    res.status(status).json({
      status: 'error',
      message,
      data,
    }),

  successResponseMsg: (res, status = 200, message, data) =>
    res.status(status).json({
      status: 'success',
      message,
      data,
    }),

  sessionSuccessResponseMsg: (res, status, message, token, user) =>
    res.status(status || 200).json({
      status: 'success',
      message,
      data: {
        authenticated: true,
        token,
        user,
      },
    }),
};