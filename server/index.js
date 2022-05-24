const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
var cors = require("cors");
app.use(cors());
const user = require("./route/user");
const school = require("./route/school");

// "mongodb://localhost:/inforida"
const database = process.env.DATABASE;

mongoose
  .connect(database)
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log(err, "Could not connect to mongodb"));

app.use(express.json());
app.use("/api/user", user);
app.use("/api/school", school);

const port = 6400;

app.listen(port, () => console.log(`listening on port ${port}...`));
