const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleContactError } = require("../helpers");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

userSchema.post("save", handleContactError);

// Joi validation

const userRegSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const userAuthSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email fields",
  }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userRegSchema,
  userAuthSchema,
};
