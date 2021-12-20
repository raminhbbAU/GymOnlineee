const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { studentRegisterSchema,studentLoginSchema } = require('../validationSchema/yup.validation.js');
const {getDate,getTime} = require('../services/utility.service')



router.post('/registerNewBill',authToken,async(req,res,next) =>{
  
  // Get user input
  const {Student,StudentCourse,Diet,BillType,Title,Amount} = req.body;


  models.studentbill
    .create({
      Frk_Student: Student,
      Frk_StudentCourse: StudentCourse,
      Frk_Diet: Diet,
      Int_BillType: BillType,
      Str_Title: Title,
      Int_Amount: Amount,
      Str_GenerateDate:getDate(),
      Str_GenerateTime:getTime(),
      Bit_Active: true
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
        data: "something wrong happend during registering new bill. Please try again a bit later!",
      });
    });


})

router.put('/deactivateStudentBill',authToken,async(req,res,next) =>{
  
  // Get user input
const { ID } = req.body;

   // check if user already exist
  const oldBill = await models.studentbill.findOne({
      where:{
        Prk_StudentBill:ID
      }
  });

  if (!oldBill) {
      return res.status(409).json({
          res: false,
          data: "The specific bill doesn't exist! it must've deleted before.",
        });
  }

  oldBill
  .update({
    Bit_Active: false,
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
      data: "something wrong happend during deactivating bill. Please try again a bit later!",
    });
  });

})

router.get('/getBillListByGymID',authToken,async(req,res,next) =>{
  
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
  const gymBills = await models.sequelize.query("select Int_BillType, Prk_StudentBill,Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime,Frk_Student,studentbills.Bit_Active,Str_Name,Str_Family from studentbills inner join students on studentbills.Frk_Student = students.Prk_Student_AutoID where students.Frk_gym=" + gymID + ";");


  if (!gymBills[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no bill for students in this given gym.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: gymBills[0],
      });
  }

})

router.get('/getBillListByStudentID',authToken,async(req,res,next) =>{

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
const studentBills = await models.sequelize.query("select Int_BillType, Prk_StudentBill,Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime,Frk_Student,studentbills.Bit_Active,Str_Name,Str_Family from studentbills inner join students on studentbills.Frk_Student = students.Prk_Student_AutoID where Frk_Student=" + studentID + ";");


if (!studentBills[0]) {
return res.status(409).json({
  res: false,
  data: "There is no bill for this given student.",
});
}
else
{
res.status(200).json({
    res: true,
    data: studentBills[0],
  });
}

})





router.post('/registerNewPayment',authToken,async(req,res,next) =>{
  
    // Get user input
  const {Student,Amount,PayType,OnlinePaymentDetail,TraceNumber} = req.body;

  
  models.studentpayment
    .create({
      Frk_Student: Student,
      Int_Amount: Amount,
      Int_PayType: PayType,
      Frk_OnlinePaymentDetail: OnlinePaymentDetail,
      Str_TraceNumber: TraceNumber,
      Str_GenerateDate:getDate(),
      Str_GenerateTime:getTime(),
      Bit_Active: true
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
        data: "something wrong happend during registering new payment. Please try again a bit later!",
      });
    });


})

router.put('/deactivateStudentPayment',authToken,async(req,res,next) =>{
  
  // Get user input
const { ID } = req.body;

   // check if user already exist
  const oldPayment = await models.studentpayment.findOne({
      where:{
        Prk_StudentPayment:ID
      }
  });

  if (!oldPayment) {
      return res.status(409).json({
          res: false,
          data: "The specific payment doesn't exist! it must've deleted before.",
        });
  }

  oldPayment
  .update({
    Bit_Active: false,
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
      data: "something wrong happend during deactivating payment. Please try again a bit later!",
    });
  });

})

router.get('/getPaymentListByGymID',authToken,async(req,res,next) =>{
  
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
  const gymPayment = await models.sequelize.query("select Int_PayType, Prk_StudentPayment,Frk_gym,Frk_Student, case Int_PayType when 1 then 'cash' when 2 then 'card-transfer' else 'online payment' end as Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime, studentpayments.Bit_Active,Str_Name,Str_Family from studentpayments inner join students on studentpayments.Frk_Student = students.Prk_Student_AutoID where Frk_gym=" + gymID + ";");


  if (!gymPayment[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no bill for students in this given gym.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: gymPayment[0],
      });
  }

})

router.get('/getPaymentListByStudentID',authToken,async(req,res,next) =>{

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
const studentPayments = await models.sequelize.query("select Int_PayType, Prk_StudentPayment,Frk_gym,Frk_Student, case Int_PayType when 1 then 'cash' when 2 then 'card-transfer' else 'online payment' end as Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime, studentpayments.Bit_Active,Str_Name,Str_Family from studentpayments inner join students on studentpayments.Frk_Student = students.Prk_Student_AutoID where Frk_Student=" + studentID + ";");


if (!studentPayments[0]) {
  return res.status(409).json({
    res: false,
    data: "There is no bill for this given student.",
  });
}
else
{
  res.status(200).json({
      res: true,
      data: studentPayments[0],
    });
}

})

router.get('/getFinancialStudentBalanceByID',authToken,async(req,res,next) =>{
 
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
  const studentBalance = await models.sequelize.query("select * from (select 1 as logType, Int_BillType as Status, Prk_StudentBill as AutoID,Str_Title,0 as deposits,Int_Amount as Withdrawals,Str_GenerateDate,Str_GenerateTime,Frk_Student,Bit_Active from studentbills UNION  select 2 as logType, Int_PayType as Status, Prk_StudentPayment as AutoID, case Int_PayType when 1 then 'cash' when 2 then 'card-transfer' else 'online payment' end as Str_Title,Int_Amount as deposits,0 as Withdrawals,Str_GenerateDate,Str_GenerateTime,Frk_Student, Bit_Active from studentpayments) as t where t.Frk_Student =" + studentID + " order by t.Str_GenerateDate desc,t.Str_GenerateTime desc;");


  if (!studentBalance[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no financial activity for given student.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: studentBalance[0],
      });
  }
    

})






router.post('/newStudentCourseEnrollment',authToken,async(req,res,next) =>{

    // Get user input
    const {Course,Student,RegisteredSession,ValidUntillTo} = req.body;

    // check if user already exist
    const oldStudentCourse = await models.studentvcourse.findOne({
        where:{
            Frk_Course:Course,
            Frk_Student:Student,
            Str_RegisterDate:getDate(),
        }
    });

    if (oldStudentCourse) {
        return res.status(409).json({
            res: false,
            data: "Student is already a member of this course.",
          });
     }  
  
    const courseInfo = await models.course.findOne({
      where: {
        Prk_Course: Course,
      },
    }); 

    if (!courseInfo) {
      return res.status(409).json({
          res: false,
          data: "course info is not avilable at this time maybe it has been deleted before!",
        });
   }  



   // start Transaction
   let newCourse; 
   const transaction = await models.sequelize.transaction();

   try {

      //console.log("insert new studentvcourse");

      newCourse = await models.studentvcourse.create({
        Frk_Course: Course,
        Frk_student: Student,
        Int_RegisteredSession:RegisteredSession,
        Str_ValidUntillTo:ValidUntillTo,
        Str_RegisterDate: getDate(),
        Str_RegisterTime: getTime()
      }, { transaction});

      newCourse = newCourse.dataValues;
      // console.log(newCourse);
      // console.log("generate new studentbill");

      await models.studentbill.create({
        Frk_Student: Student,
        Frk_StudentCourse: newCourse.Prk_StudentVCourse,
        Frk_Diet: 0,
        Int_BillType:1, //bill for course
        Str_Title:'[' + courseInfo.Str_CourseName + '] bill',
        Int_Amount:RegisteredSession * courseInfo.Int_PerSessionCost,
        Str_GenerateDate: getDate(),
        Str_GenerateTime: getTime(),
        Bit_Active: true,
      }, { transaction});

      await transaction.commit();     

  } catch (err) {

      await transaction.rollback();

      console.log(err);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during registering new student's course. Please try again a bit later!",
      });

  }

  res.status(200).json({
    res: true,
    data: newCourse,
  });
    
  

})

router.put('/editStudentCourseEnrollment',authToken,async(req,res,next) =>{

  // Get user input
  const {enrolmentID,Course,Student,RegisteredSession,ValidUntillTo} = req.body;

  // check if user already exist
  const oldStudentCourse = await models.studentvcourse.findOne({
          where:{
            Prk_StudentVCourse:enrolmentID
          }
  });
  
  if (!oldStudentCourse) {
          return res.status(409).json({
              res: false,
              data: "The specific enrolment doesn't exist! it must've deleted before.",
            });
  }

  const courseInfo = await models.course.findOne({
    where: {
      Prk_Course: Course,
    },
  }); 

  if (!courseInfo) {
    return res.status(409).json({
        res: false,
        data: "course info is not avilable at this time maybe it has been deleted before!",
      });
 }  

  const oldStudentCourseBill = await models.studentbill.findOne({
    where:{
      Frk_StudentCourse:enrolmentID,
      Bit_Active: true,
    }
  });


   // start Transaction
   let updatedrecord;
   const transaction = await models.sequelize.transaction();

   try {

      //console.log("insert new studentvcourse");

      updatedrecord = await oldStudentCourse.update({
        Frk_Course: Course,
        Frk_student: Student,
        Int_RegisteredSession:RegisteredSession,
        Str_ValidUntillTo:ValidUntillTo,
      }, { transaction});

      if (oldStudentCourseBill)
      {
        await oldStudentCourseBill.update({
          Bit_Active: false,
          Str_Title: oldStudentCourseBill.Str_Title + ' - delete by modification'
        }, { transaction});
      }

      await models.studentbill.create({
        Frk_Student: Student,
        Frk_StudentCourse: enrolmentID,
        Frk_Diet: 0,
        Int_BillType:1, //bill for course
        Str_Title:'[' + courseInfo.Str_CourseName + '] bill',
        Int_Amount:RegisteredSession * courseInfo.Int_PerSessionCost,
        Str_GenerateDate: getDate(),
        Str_GenerateTime: getTime(),
        Bit_Active:true,
      }, { transaction});

      await transaction.commit();     

  } catch (err) {

      await transaction.rollback();

      console.log(err);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during editing enrolment. Please try again a bit later!",
      });

  }

  return res.status(200).json({
    res: true,
    data: updatedrecord,
  });



          // oldStudentCourse.update({
          //   Frk_Course: Course,
          //   Frk_student: Student,
          //   Int_RegisteredSession:RegisteredSession,
          //   Str_ValidUntillTo:ValidUntillTo,
          // }).then( (updatedrecord) => {
          //     res.status(200).json({
          //         res: true,
          //         data: updatedrecord,
          //       });
          // }).catch( (error) => {
          //         console.log(error);
          //         return res.status(500).json({
          //             res: false,
          //             data: "something wrong happend during editing enrolment. Please try again a bit later!",
          //         });
          // })
  

})

router.get('/getStudentEnrolledCourses',authToken,async(req,res,next) =>{
    
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
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,Str_ValidUntillTo,0 as Present,0 as Absent, 0 as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where students.Prk_Student_AutoID=" + studentID + ";");


  if (!studentRegisteredCourseList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no registered course related to this specific student.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: studentRegisteredCourseList[0],
      });
  }
    
})

router.get('/getStudentEnrolledCoursesByID',authToken,async(req,res,next) =>{
    
  // Get user input
  const { enrolmentID } = req.query;

  if (!enrolmentID) {
        return res.status(409).json({
            res: false,
            data: "enrolmentID is not provided!",
        });
  }

  if(isNaN(enrolmentID)){
    return res.status(409).json({
      res: false,
      data: "enrolmentID is not properly provided!",
  });
  }
    
  //console.log(models.sequelize);
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,Str_ValidUntillTo,0 as Present,0 as Absent, 0 as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where Prk_StudentVCourse=" + enrolmentID + ";");


  if (!studentRegisteredCourseList[0][0]) {
    return res.status(409).json({
      res: false,
      data: "There is no registered course with given enrolment id.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: studentRegisteredCourseList[0][0],
      });
  }
    
})

router.get('/getStudentEnrolledCoursesByCourseID',authToken,async(req,res,next) =>{
    
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
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,Str_ValidUntillTo,0 as Present,0 as Absent, 0 as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where Prk_Course=" + courseID + ";");


  if (!studentRegisteredCourseList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no enrolled students with given course id.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: studentRegisteredCourseList[0],
      });
  }
    
})






router.post('/registerStudentHealthParameters',authToken,async(req,res,next) =>{
      
        // Get user input
       const {Student,HealthParameter,Value,Description} = req.body;

       models.studentVhealthparameter
         .create({
           Frk_student: Student,
           Frk_HealthParameter: HealthParameter,
           Str_Value: Value,
           Str_RegisterDate: getDate(),
           Str_RegisterTime: getTime(),
           Str_Description: Description
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
             data: "something wrong happend during registering new student's health parameter. Please try again a bit later!",
           });
         });

})

router.get('/getStudentHealthParameters',authToken,async(req,res,next) =>{
    res.send('the getStudentHealthParameters API called');
})





router.post('/registerStudentAttendance',authToken,async(req,res,next) =>{
    
        // Get user input
        const {StudentVCourse,Course,Date,Status,AbsentReason,TrainerNote} = req.body;

        models.studentcheckincheckout
          .create({
            Frk_StudentVCourse: StudentVCourse,
            Frk_Course:Course,
            Str_Date: Date,
            Int_Status: Status,
            Str_AbsentReason: AbsentReason,
            Str_TrainerNote: TrainerNote
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
              data: "something wrong happend during registering new student's attendance. Please try again a bit later!",
            });
          });

})

router.post('/batchRegisterStudentAttendance',authToken,async(req,res,next) =>{
    
  // Get user input
  const {data,date,course} = req.body;

  console.log(req.body);

  models.studentcheckincheckout
  .destroy({
    where:{
      Frk_Course:course,
      Str_Date:date,
    }
  })
  .catch((error) => {
    console.log(error);
    return res.status(500).json({
      res: false,
      data: "something wrong happend during legacy data. Please try again a bit later!",
    });
  });

  models.studentcheckincheckout
    .bulkCreate(data)
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
        data: "something wrong happend during registering new student's attendance. Please try again a bit later!",
      });
    });

})

router.get('/getStudentAttendanceListbyGymID',authToken,async(req,res,next) =>{
    
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
    const StudentAttendanceList = await models.sequelize.query("SELECT Prk_StudentCheckInCheckOut,Str_Date,Int_Status,Str_AbsentReason,Str_TrainerNote,Prk_Course,Str_CourseName,Prk_Trainer,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_Family from studentcheckincheckouts inner join courses on studentcheckincheckouts.frk_Course = courses.Prk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer inner join studentvcourses on studentvcourses.Prk_StudentVCourse = studentcheckincheckouts.Frk_StudentVCourse inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student where courses.Frk_Gym=" + gymID + ";");


    if (!StudentAttendanceList[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no registered student attendance list related to this specific gym.",
      });
    }
    else
    {
      res.status(200).json({
          res: true,
          data: StudentAttendanceList[0],
        });
    }
      

})

router.get('/getStudentAttendanceListbyStudentID',authToken,async(req,res,next) =>{
    
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
  const StudentAttendanceList = await models.sequelize.query("SELECT Prk_StudentCheckInCheckOut,Str_Date,Int_Status,Str_AbsentReason,Str_TrainerNote,Prk_Course,Str_CourseName,Prk_Trainer,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_Family from studentcheckincheckouts inner join courses on studentcheckincheckouts.frk_Course = courses.Prk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer inner join studentvcourses on studentvcourses.Prk_StudentVCourse = studentcheckincheckouts.Frk_StudentVCourse inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student where Prk_Student_AutoID=" + studentID + ";");


  if (!StudentAttendanceList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no registered student attendance list related to this specific student.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: StudentAttendanceList[0],
      });
  }
    

})

router.get('/getStudentAttendanceListbyCourseID',authToken,async(req,res,next) =>{
    
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
  const StudentAttendanceList = await models.sequelize.query("SELECT Prk_StudentCheckInCheckOut,Str_Date,Int_Status,Str_AbsentReason,Str_TrainerNote,Prk_Course,Str_CourseName,Prk_Trainer,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_Family from studentcheckincheckouts inner join courses on studentcheckincheckouts.frk_Course = courses.Prk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer inner join studentvcourses on studentvcourses.Prk_StudentVCourse = studentcheckincheckouts.Frk_StudentVCourse inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student where Prk_Course=" + courseID + ";");


  if (!StudentAttendanceList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no registered student attendance list related to this specific course.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: StudentAttendanceList[0],
      });
  }
    

})

 module.exports = router;  