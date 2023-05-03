const { HttpError } = require("../helpers");
const { controllersWrapper } = require("../decorators");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

async function userReg(req, res) {
  const alreadyAdded = await User.findOne({ email: req.body.email });
  if (alreadyAdded) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const data = await User.create({
    email: req.body.email,
    password: hashPassword,
    subscription: "starter",
  });

  return res.status(201).json({
    email: data.email,
    subscription: "starter",
  });
}

async function userAuth(req, res) {
  const data = await User.findOne({ email: req.body.email });
  if (!data) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(
    req.body.password,
    data.password
  );

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign(data.id, process.env.SECRET_KEY, { expiresIn: "1h" });

  const updatedUser = await User.findOneAndUpdate(
    { email: req.body.email },
    { token },
    { new: true }
  );

  return res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
    token: updatedUser.token,
  });
}

module.exports = {
  userReg: controllersWrapper(userReg),
  userAuth: controllersWrapper(userAuth),
};
