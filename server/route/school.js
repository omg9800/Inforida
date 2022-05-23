const express = require("express");
const router = express.Router();
var auth = require("../middleware/auth");

const school = require("../controller/school");

router.get("/", school.getAllSchools);
router.get("/:id", auth.auth, school.getSchoolsByUserId);

router.post("/", auth.auth, school.addSchool);
router.put("/:schoolId", school.updateSchool);
router.delete("/:schoolId", school.deleteSchool);

module.exports = router;
