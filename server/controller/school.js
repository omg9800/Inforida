const { School, validateSchool } = require("../model/school");

module.exports.getAllSchools = (req, res) => {
  School.find()
    .then((schools) => {
      res.json(schools);
    })
    .catch((err) => console.log(err));
};

module.exports.getSchoolsByUserId = (req, res) => {
  const id = req.params.id;

  School.find({
    userId: id,
  })
    .then((school) => {
      res.json(school);
    })
    .catch((err) => console.log(err));
};

module.exports.addSchool = (req, res, next) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    console.log(req.body);
    const { error } = validateSchool(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });

    const school = new School({
      userId: req.body.userId,
      name: req.body.name,

      city: req.body.city,
      pincode: req.body.pincode,
      phone: req.body.phone,

      about: req.body.about,
      mission: req.body.mission,
      vision: req.body.vision,
      logoUrl: req.body.logoUrl,
    });

    school
      .save()
      .then((school) => res.json(school))
      .catch((err) => console.log(err));
  }
};

module.exports.updateSchool = (req, res, next) => {
  if (typeof req.body == undefined || !req.params.schoolId) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    const { error } = validateSchool(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });

    School.findByIdAndUpdate(
      { _id: req.params.schoolId },
      {
        userId: req.body.userId,
        name: req.body.name,

        city: req.body.city,
        pincode: req.body.pincode,
        phone: req.body.phone,

        about: req.body.about,
        mission: req.body.mission,
        vision: req.body.vision,
        logoUrl: req.body.logoUrl,
      }
    )
      .then((school) => {
        res.json(school);
      })
      .catch((err) => console.log(err));
  }
};

module.exports.deleteSchool = (req, res) => {
  if (req.params.schoolId == null) {
    res.status(400).json({
      status: "error",
      message: "School id should be provided",
    });
  } else {
    School.findByIdAndDelete({ _id: req.params.schoolId })
      .then(() => {
        res.status(200).json({ _id: schoolId });
      })
      .catch((err) =>
        res.status(400).json({
          status: "error",
          message: err,
        })
      );
  }
};
