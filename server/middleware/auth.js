const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(401);
      else {
        req.user = user;
      }
    });
  }
  next();
};
