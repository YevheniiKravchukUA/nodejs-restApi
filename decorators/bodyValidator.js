const { HttpError } = require("../helpers");

function bodyValidator(schema) {
  function decorator(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  }

  return decorator;
}

module.exports = { bodyValidator };
