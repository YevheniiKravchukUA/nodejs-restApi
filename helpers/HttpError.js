const MESSAGES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

function HttpError(status, message = MESSAGES[status]) {
  const error = new Error(message);
  error.status = status;

  return error;
}

module.exports = HttpError;
