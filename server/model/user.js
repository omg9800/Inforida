const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 25, required: true },
  email: {
    type: String,
    minlength: 10,
    maxlength: 25,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 15,
    required: true,
  },
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(25).required(),
    email: Joi.string().min(10).max(25).required(),
    password: Joi.string().min(5).max(100).required(),
    phone: Joi.string().min(10).max(15).required(),
  };
  return Joi.validate(user, schema);
}

const User = mongoose.model("user", userSchema);

exports.User = User;
exports.validateUser = validateUser;
