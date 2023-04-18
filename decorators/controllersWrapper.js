function controllersWrapper(controller) {
  async function decorator(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  return decorator;
}

module.exports = controllersWrapper;
