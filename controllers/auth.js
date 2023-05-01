const { HttpError } = require("../helpers");
const { controllersWrapper } = require("../decorators");

async function userReg(req, res) {}

async function userAuth(req, res) {}

module.exports = {
  userReg: controllersWrapper(userReg),
  userAuth: controllersWrapper(userAuth),
};
