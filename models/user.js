const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

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
