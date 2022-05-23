const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
var cors = require("cors");
app.use(cors());
const user = require("./route/user");
const school = require("./route/school");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else cb(null, false);
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

mongoose
  .connect("mongodb://localhost:/inforida")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Could not connect to mongodb"));

app.use(express.json());
app.use("/api/user", user);
app.use("/api/school", school);

const port = 6400;

app.listen(port, () => console.log(`listening on port ${port}...`));
