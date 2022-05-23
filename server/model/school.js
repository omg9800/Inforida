const mongoose = require("mongoose");
const Joi = require("joi");
const schema = mongoose.Schema;

const schoolSchema = new schema({
  userId: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  logoUrl: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  city: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  pincode: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 15,
    required: true,
  },
  about: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
  },
  mission: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
  },
  vision: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
  },
});

function validateSchool(school) {
  const schema = {
    userId: Joi.string().min(5).max(30).required(),
    name: Joi.string().min(5).max(30).required(),
    logoUrl: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(5).max(30).required(),
    pincode: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(5).max(15).required(),
    mission: Joi.string().min(5).max(500).required(),
    about: Joi.string().min(5).max(500).required(),
    vision: Joi.string().min(5).max(500).required(),
  };

  return Joi.validate(school, schema);
}

const School = mongoose.model("School", schoolSchema);
exports.validateSchool = validateSchool;
exports.School = School;
