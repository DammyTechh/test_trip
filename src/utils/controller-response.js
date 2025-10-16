 const response = (
  res,
  statusCode,
  message,
  data
) => {
  const status = String(statusCode).startsWith("2") ? "success" : "error";
  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports= response;