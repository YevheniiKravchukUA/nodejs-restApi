function handleContactError(error, data, next) {
  error.status = 400;
  next();
}

module.exports = handleContactError;
