exports.sendServerError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    error: error,
  });
};
//sends server error
