var _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { User, validateUser } = require("../model/user");

module.exports.getAllUser = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};

module.exports.getUser = (req, res) => {
  const id = req.params.id;

  User.findOne({
    _id: id,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => console.log(err));
};

module.exports.register = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "Data is undefined",
    });
  } else {
    let user = await User.findOne({ phone: req.body.phone });
    let userEmail = await User.findOne({ email: req.body.email });

    if (user || userEmail)
      return res.status(400).json({ message: "User already registered." });
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });

    user = new User(_.pick(req.body, ["name", "email", "password", "phone"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    jwt.sign({ _id: user._id }, process.env.SECRET_KEY, (err, token) => {
      res.json(_.pick(user, ["_id", "name", "email", "phone"]));
    });
  }
};

module.exports.login = async (req, res) => {
  let user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).json({ message: "User not registered." });
  if (user) {
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (valid) {
      jwt.sign({ _id: user._id }, process.env.SECRET_KEY, (err, token) => {
        res.status(200).json({ user, token });
      });
    } else res.status(400).json({ message: "Invalid Password or Username." });
  }
};

module.exports.deleteUser = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "User id should be provided",
    });
  } else {
    User.findOne({ id: req.params.id })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  }
};
