const express = require("express");
const router = express.Router();
const user = require("../controller/user");

router.get("/", user.getAllUser);
router.get("/:id", user.getUser);

router.post("/signup", user.register);
router.post("/signin", user.login);

module.exports = router;
