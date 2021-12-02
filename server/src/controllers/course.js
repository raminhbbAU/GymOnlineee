const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

router.post("/register", authToken, async (req, res, next) => {
  // Get user input
  const {
    CourseName,
    CourseDescription,
    Gym,
    Trainer,
    Active,
    StartDate,
    EndDate,
    TrainerPercent,
    CourseType,
    PerSessionCost,
  } = req.body;

  // check if course already exist
  const oldCourse = await models.course.findOne({
    where: {
      Str_CourseName: CourseName,
    },
  });

  if (oldCourse) {
    return res.status(409).json({
      res: false,
      data: "This course name is already exist. please edit it or try to choose another unique name.",
    });
  }

  models.course
    .create({
      Str_CourseName: CourseName,
      Str_CourseDescription: CourseDescription,
      Frk_Gym: Gym,
      Frk_Trainer: Trainer,
      Bit_Active: Active,
      Str_StartDate: StartDate,
      Str_EndDate: EndDate,
      Int_TrainerPercent: TrainerPercent,
      Int_CourseType: CourseType,
      Int_PerSessionCost: PerSessionCost,
    })
    .then((course) => {
      res.status(200).json({
        res: true,
        data: course,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during registering new course. Please try again a bit later!",
      });
    });
});

router.put("/edit", authToken, async (req, res, next) => {
  // Get user input
  const {
    id,
    CourseName,
    CourseDescription,
    Gym,
    Trainer,
    Active,
    StartDate,
    EndDate,
    TrainerPercent,
    CourseType,
    PerSessionCost,
  } = req.body;

  // check if course already exist
  const oldCourse = await models.course.findOne({
    where: {
      Prk_Course: id,
    },
  });

  if (!oldCourse) {
    return res.status(409).json({
      res: false,
      data: "The specific course doesn't exist! it must've deleted before.",
    });
  }

  //TOOD: check class activity, it can't be deleted if there were established seasions.

  oldCourse
    .update({
      Str_CourseName: CourseName,
      Str_CourseDescription: CourseDescription,
      Frk_Gym: Gym,
      Frk_Trainer: Trainer,
      Bit_Active: Active,
      Str_StartDate: StartDate,
      Str_EndDate: EndDate,
      Int_TrainerPercent: TrainerPercent,
      Int_CourseType: CourseType,
      Int_PerSessionCost: PerSessionCost,
    })
    .then((updatedrecord) => {
      res.status(200).json({
        res: true,
        data: updatedrecord,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during editing course. Please try again a bit later!",
      });
    });
    
});

router.delete("/delete", authToken, async (req, res, next) => {
  // Get user input
  const { id } = req.body;

  // check if course already exist
  const oldCourse = await models.course.findOne({
    where: {
      Prk_Course: id,
    },
  });

  if (!oldCourse) {
    return res.status(409).json({
      res: false,
      data: "The specific course doesn't exist! it must've deleted before",
    });
  }

  oldCourse
    .destroy()
    .then((rowDeleted) => {
      if (rowDeleted === 1) {
        res.status(200).json({
          res: true,
          data: updatedrecord,
        });
      } else {
        res.status(500).json({
          res: false,
          data: "something wrong happend during deleting course. Please try again a bit later!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during deleting course. Please try again a bit later!",
      });
    });

});

router.post("/registerOffTime", authToken, async (req, res, next) => {
  // Get user input
  const { Course, Date, StartTime, EndTime, Reason } = req.body;

  // check if off time already exist
  const oldOFFTime = await models.courseofftimes.findOne({
    where: {
      Frk_Course: Course,
      Str_Date: Date,
      Str_StartTime: StartTime,
      Str_EndTime: EndTime,
    },
  });

  if (oldOFFTime) {
    return res.status(409).json({
      res: false,
      data: "This course off time is already exist. please edit it or try to choose another unique time period.",
    });
  }

  models.courseofftimes
    .create({
        Frk_Course: Course,
        Str_Date: Date,
        Str_StartTime: StartTime,
        Str_EndTime: EndTime,
        Str_Reason:Reason,
    })
    .then((courseofftimes) => {
      res.status(200).json({
        res: true,
        data: courseofftimes,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during registering new course off time. Please try again a bit later!",
      });
    });

});

router.put("/editOffTime", authToken, async (req, res, next) => {
  res.send("the editOffTime API called");
});

router.delete("/deleteOffTime", authToken, async (req, res, next) => {
    
    // Get user input
    const { id } = req.body;

    // check if Off Time already exist
    const oldOffTime = await models.courseofftimes.findOne({
      where: {
        Prk_CourseOffTimes: id,
      },
    });
  
    if (!oldOffTime) {
      return res.status(409).json({
        res: false,
        data: "The specific course off time doesn't exist! it must've deleted before",
      });
    }
  
    oldOffTime
      .destroy()
      .then((rowDeleted) => {
        if (rowDeleted === 1) {
          res.status(200).json({
            res: true,
            data: updatedrecord,
          });
        } else {
          res.status(200).json({
            res: 500,
            data: "something wrong happend during deleting course off time. Please try again a bit later!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          res: false,
          data: "something wrong happend during deleting course off time. Please try again a bit later!",
        });
      });
});

router.get("/getCourseByGymID", authToken, async (req, res, next) => {
  
  // Get user input
  const { gymID } = req.query;

  if (!gymID) {
        return res.status(409).json({
            res: false,
            data: "gymID is not provided!",
        });
  }

  if(isNaN(gymID)){
    return res.status(409).json({
      res: false,
      data: "gymID is not properly provided!",
  });
  }
    
  //console.log(models.sequelize);
  const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer where courses.Frk_gym=" + gymID + ";");

  //console.log(courseList);
  console.log(JSON.stringify(courseList[0], null, 2));


 if (!courseList[0]) {
   return res.status(409).json({
     res: false,
     data: "There is no course related to this specific gym.",
   });
 }
 else
 {
    res.status(200).json({
        res: true,
        data: courseList[0],
     });
 }

});

module.exports = router;
