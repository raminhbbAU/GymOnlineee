const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { courseRegisterSchema } = require('../validationSchema/yup.validation.js');
const {getDayOfWeek} = require('../services/utility.service')

router.post("/registerNewCourse", authToken,yupValidator(courseRegisterSchema), async (req, res, next) => {
  
  // Get user input
  const {
    CourseName,
    CourseDescription,
    GymID,
    TrainerID,
    Active,
    StartDate,
    EndDate,
    TrainerPercent,
    CourseType,
    PerSessionCost,
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    TimeFrom,
    TimeTo
  } = req.body;


  console.log(req.body);


  // check if course already exist
  const oldCourse = await models.course.findOne({
    where: {
      Str_CourseName: CourseName,
      Frk_Gym:GymID,
      Frk_Trainer:TrainerID,
    },
  });

  if (oldCourse) {
    return res.status(409).json({
      res: false,
      data: "This course name is already exist. please edit it or try to choose another unique name.",
    });
  }




   // start Transaction
   let newCourse; 
   const transaction = await models.sequelize.transaction();

   try {


      //Register new course
      newCourse = await models.course.create({
        Str_CourseName: CourseName,
        Str_CourseDescription: CourseDescription,
        Frk_Gym: GymID,
        Frk_Trainer: TrainerID,
        Bit_Active: Active,
        Str_StartDate: StartDate,
        Str_EndDate: EndDate,
        Int_TrainerPercent: TrainerPercent,
        Int_CourseType: CourseType,
        Int_PerSessionCost: PerSessionCost,
      }, { transaction});

      newCourse = newCourse.dataValues;



      // Register Course's working days and hours
      if (Sunday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:0,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Monday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:1,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Tuesday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:2,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Wednesday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:3,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Thursday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:4,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Friday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:5,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Saturday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:6,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      await transaction.commit();     

  } catch (err) {

      await transaction.rollback();

      console.log(err);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during registering new course. Please try again a bit later!",
      });

  }

  res.status(200).json({
    res: true,
    data: newCourse,
  });


});

router.put("/editCourse", authToken, async (req, res, next) => {
  
  // Get user input
  const {courseID,CourseName,CourseDescription,trainerID,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,TimeFrom,TimeTo} = req.body;

  console.log(req.body);

  // check if course already exist
  const oldCourse = await models.course.findOne({
    where: {
      Prk_Course: courseID,
    },
  });

  if (!oldCourse) {
    return res.status(409).json({
      res: false,
      data: "The specific course doesn't exist! it must've deleted before.",
    });
  }


  //TOOD: check class activity, it can't be deleted if there were established seasions.


  

   // start Transaction
   let newCourse; 
   let rowcount;
   const transaction = await models.sequelize.transaction();

   try {


      //Register new course
      newCourse = await oldCourse.update({
        Str_CourseName: CourseName,
        Str_CourseDescription: CourseDescription,
        Frk_Trainer: trainerID,
        Str_StartDate: StartDate,
        Str_EndDate: EndDate,
        Int_TrainerPercent: TrainerPercent,
        Int_CourseType: CourseType,
        Int_PerSessionCost: PerSessionCost,
      }, { transaction});

      
      // Delete Old Working Hours
      console.log('///////////////////')
      rowcount = await models.courseweeklyschedule.destroy({
        where:{
          Frk_Course: courseID,
        }     
      },{transaction})
      console.log(rowcount)
      console.log('///////////////////')


      // Register Course's working days and hours
      if (Sunday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:0,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Monday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:1,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Tuesday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:2,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Wednesday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:3,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Thursday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:4,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Friday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:5,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      if (Saturday)
      {
        await models.courseweeklyschedule.create({
          Frk_Course: newCourse.Prk_Course,
          Int_DayOfWeek:6,
          Str_StartTime: TimeFrom,
          Str_EndTime:TimeTo,
        }, { transaction});
      }

      await transaction.commit();     

  } catch (err) {

      await transaction.rollback();

      console.log(err);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during editing course. Please try again a bit later!",
      });

  }

  res.status(200).json({
    res: true,
    data: newCourse,
  });




    
});

router.put("/activeDeactiveCourse", authToken, async (req, res, next) => {
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
    .update({
      Bit_Active: !oldCourse.Bit_Active,
    })
    .then( (updatedrecord) => {
      res.status(200).json({
          res: true,
          data: updatedrecord,
        });
    }).catch( (error) => {
          console.log(error);
          return res.status(500).json({
          res: false,
          data: "something wrong happend during activating/deactivating course. Please try again a bit later!",
          });
})

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

router.get('/getCourseInfoByID',authToken,async(req,res,next) =>{

  // Get user input
  const { courseID } = req.query;

  if (!courseID) {
        return res.status(409).json({
            res: false,
            data: "courseID is not provided!",
        });
  }

  if(isNaN(courseID)){
    return res.status(409).json({
      res: false,
      data: "courseID is not properly provided!",
  });
  }
    
  //console.log(models.sequelize);
  const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer where courses.Prk_Course=" + courseID + ";");

 if (!courseList[0][0]) {
   return res.status(409).json({
     res: false,
     data: "There is no course related to this specific given course ID.",
   });
 }
 else
 {
    res.status(200).json({
        res: true,
        data: courseList[0][0],
     });
 }

})

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

router.get("/getCourseByStudentID", authToken, async (req, res, next) => {
  
  // Get user input
  const { studentID } = req.query;

  if (!studentID) {
        return res.status(409).json({
            res: false,
            data: "studentID is not provided!",
        });
  }

  if(isNaN(studentID)){
    return res.status(409).json({
      res: false,
      data: "studentID is not properly provided!",
  });
  }
    
  //console.log(models.sequelize);
  const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer inner join studentvcourses on studentvcourses.Frk_Course = courses.Prk_Course where studentvcourses.Frk_student=" + studentID + ";");


 if (!courseList[0]) {
   return res.status(409).json({
     res: false,
     data: "There is no course related to this specific student.",
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

router.get("/getCourseByTrainerID", authToken, async (req, res, next) => {
  
  // Get user input
  const { trainerID } = req.query;

  if (!trainerID) {
        return res.status(409).json({
            res: false,
            data: "trainerID is not provided!",
        });
  }

  if(isNaN(trainerID)){
    return res.status(409).json({
      res: false,
      data: "trainerID is not properly provided!",
  });
  }
    
  //console.log(models.sequelize);
  const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer inner join studentvcourses on studentvcourses.Frk_Course = courses.Prk_Course where courses.Frk_Trainer=" + trainerID + ";");


 if (!courseList[0]) {
   return res.status(409).json({
     res: false,
     data: "There is no course related to this specific trainer.",
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

router.get('/getEnrolledCoursesByCourseID',authToken,async(req,res,next) =>{
    
  // Get user input
  const { courseID } = req.query;

  if (!courseID) {
        return res.status(409).json({
            res: false,
            data: "courseID is not provided!",
        });
  }

  if(isNaN(courseID)){
    return res.status(409).json({
      res: false,
      data: "courseID is not properly provided!",
  });
  }
  

  let EnrolledCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,(select Count(*) as Present from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 1) as Present,(select Count(*) as Absent from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 2) as Absent,(select Count(*) as AcceptableAbsence from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 3) as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where Prk_Course=" + courseID + ";");

  

  if (!EnrolledCourseList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no enrolled course related to this specific course id.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: EnrolledCourseList[0],
      });
  }
    
})

router.get('/getEnrolledCoursesByGymID',authToken,async(req,res,next) =>{
    
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
  

  let EnrolledCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,(select Count(*) as Present from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 1) as Present,(select Count(*) as Absent from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 2) as Absent,(select Count(*) as AcceptableAbsence from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 3) as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where courses.Frk_Gym=" + gymID + ";");


  if (!EnrolledCourseList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no enrolled course related to this specific course id.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: EnrolledCourseList[0],
      });
  }
    
})

router.get('/getUpcomingSessionsByGymID',authToken,async(req,res,next) =>{
    
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
  

  try {

    let UpcomingSessions = await models.sequelize.query("SELECT Prk_Course,Str_CourseName,CONCAT_WS(' ', Str_TrainerName, Str_TrainerFamily) as Str_TrainerFullName,Int_DayOfWeek,Str_StartTime,Str_EndTime,case Int_DayOfWeek when 0 then 'Sunday' when 1 then 'Monday'  when 2 then 'Tuesday'  when 3 then 'Wednesday'  when 4 then 'Thursday'  when 5 then 'Friday' when 6 then 'Saturday'   else '' end as Str_DayOfWeek FROM courses INNER JOIN courseweeklyschedules ON courses.Prk_Course = courseweeklyschedules.Frk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer where Int_DayOfWeek=" + getDayOfWeek().toString() + " and courses.Frk_Gym=" + gymID + ";");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no scheduled course for today related to this specific gym id.",
      });
    }
    else
    {
      res.status(200).json({
          res: true,
          data: UpcomingSessions[0],
        });
    }

  } catch (error) {
      return res.status(500).json({
        res: false,
        data: "Something wrong was happend!",
      });
  }


    
})

router.get('/getUpcomingSessionsByStudentID',authToken,async(req,res,next) =>{
    
  // Get user input
  const { studentID } = req.query;

  if (!studentID) {
        return res.status(409).json({
            res: false,
            data: "studentID is not provided!",
        });
  }

  if(isNaN(studentID)){
    return res.status(409).json({
      res: false,
      data: "studentID is not properly provided!",
  });
  }
  

  try {

    let UpcomingSessions = await models.sequelize.query("SELECT Prk_Course,Str_CourseName,CONCAT_WS(' ', Str_TrainerName, Str_TrainerFamily) as Str_TrainerFullName,Int_DayOfWeek,Str_StartTime,Str_EndTime,case Int_DayOfWeek when 0 then 'Sunday' when 1 then 'Monday'  when 2 then 'Tuesday'  when 3 then 'Wednesday'  when 4 then 'Thursday'  when 5 then 'Friday' when 6 then 'Saturday'   else '' end as Str_DayOfWeek FROM courses INNER JOIN courseweeklyschedules ON courses.Prk_Course = courseweeklyschedules.Frk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer inner join studentvcourses on studentvcourses.Frk_Course = courses.Prk_Course  where Int_DayOfWeek=" + getDayOfWeek().toString() + " and studentvcourses.Frk_student=" + studentID + ";");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no scheduled course for today related to this specific student id.",
      });
    }
    else
    {
      res.status(200).json({
          res: true,
          data: UpcomingSessions[0],
        });
    }

  } catch (error) {
      return res.status(500).json({
        res: false,
        data: "Something wrong was happend!",
      });
  }


    
})

router.get('/getUpcomingSessionsByTrainerID',authToken,async(req,res,next) =>{
    
  // Get user input
  const { trainerID } = req.query;

  if (!trainerID) {
        return res.status(409).json({
            res: false,
            data: "trainerID is not provided!",
        });
  }

  if(isNaN(trainerID)){
    return res.status(409).json({
      res: false,
      data: "trainerID is not properly provided!",
  });
  }
  

  try {

    let UpcomingSessions = await models.sequelize.query("SELECT Prk_Course,Str_CourseName,CONCAT_WS(' ', Str_TrainerName, Str_TrainerFamily) as Str_TrainerFullName,Int_DayOfWeek,Str_StartTime,Str_EndTime,case Int_DayOfWeek when 0 then 'Sunday' when 1 then 'Monday'  when 2 then 'Tuesday'  when 3 then 'Wednesday'  when 4 then 'Thursday'  when 5 then 'Friday' when 6 then 'Saturday'   else '' end as Str_DayOfWeek FROM courses INNER JOIN courseweeklyschedules ON courses.Prk_Course = courseweeklyschedules.Frk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer where Int_DayOfWeek=" + getDayOfWeek().toString() + " and trainers.Prk_Trainer=" + trainerID + ";");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no scheduled course for today related to this specific trainer id.",
      });
    }
    else
    {
      res.status(200).json({
          res: true,
          data: UpcomingSessions[0],
        });
    }

  } catch (error) {
      return res.status(500).json({
        res: false,
        data: "Something wrong was happend!",
      });
  }


    
})

module.exports = router;
