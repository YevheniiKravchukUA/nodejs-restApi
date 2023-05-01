const express = require("express");
const bodyValidator = require("../../decorators/bodyValidator");
const schemas = require("../../models/users");
const controllers = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  bodyValidator(schemas.userRegSchema),
  controllers.userReg
);

router.post(
  "/login",
  bodyValidator(schemas.userAuthSchema),
  controllers.userAuth
);

module.exports = router;
