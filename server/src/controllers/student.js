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
  const {Student,Amount,PayType,OnlinePaymentDetail,TraceNumber,Date} = req.body;

  
  models.studentpayment
    .create({
      Frk_Student: Student,
      Int_Amount: Amount,
      Int_PayType: PayType,
      Frk_OnlinePaymentDetail: OnlinePaymentDetail,
      Str_TraceNumber: TraceNumber,
      Str_GenerateDate:Date || getDate(),
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

router.get('/getDebtorStudentListByGymID',authToken,async(req,res,next) =>{
  
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
  const debtorStudentList = await models.sequelize.query("select *,Int_BillAmount - Int_PayAmount as Int_Reminder from (select Prk_Student_AutoID,CONCAT_WS(' ', Str_Name, Str_Family) as Str_StudentFullName,Str_Mobile,IFNUll((select Sum(Int_Amount) as Int_BillAmount from studentbills where studentbills.Frk_Student = students.Prk_Student_AutoID and studentbills.Bit_Active = 1),0) as Int_BillAmount ,IFNUll((select Sum(Int_Amount) as Int_PayAmount from studentpayments where studentpayments.Frk_Student = students.Prk_Student_AutoID and studentpayments.Bit_Active = 1),0) as Int_PayAmount from students where students.Bit_Active = 1 and Frk_gym = " + gymID + ") as t where (Int_BillAmount - Int_PayAmount) > 0;");


  if (!debtorStudentList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no debtor students for given gym.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: debtorStudentList[0],
      });
  }

})

router.get('/getDebtorStudentListByStudentID',authToken,async(req,res,next) =>{
  
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
  const debtorStudentList = await models.sequelize.query("select *,Int_BillAmount - Int_PayAmount as Int_Reminder from (select Prk_Student_AutoID,CONCAT_WS(' ', Str_Name, Str_Family) as Str_StudentFullName,Str_Mobile,IFNUll((select Sum(Int_Amount) as Int_BillAmount from studentbills where studentbills.Frk_Student = students.Prk_Student_AutoID and studentbills.Bit_Active = 1),0) as Int_BillAmount ,IFNUll((select Sum(Int_Amount) as Int_PayAmount from studentpayments where studentpayments.Frk_Student = students.Prk_Student_AutoID and studentpayments.Bit_Active = 1),0) as Int_PayAmount from students where students.Bit_Active = 1 and students.Prk_Student_AutoID = " + studentID + ") as t where (Int_BillAmount - Int_PayAmount) > 0;");


  if (!debtorStudentList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no debt for the given student.",
    });
  }
  else
  {
    res.status(200).json({
        res: true,
        data: debtorStudentList[0],
      });
  }

})

router.get('/getDebtorStudentListByTrainerID',authToken,async(req,res,next) =>{
  
 

})




router.post('/newStudentCourseEnrollment',authToken,async(req,res,next) =>{

    // Get user input
    const {Course,Student,RegisteredSession,ValidUntillTo} = req.body;
  
    const courseInfo = await models.course.findOne({
      where: {
        Prk_Course: Course,
      },
    }); 

    if (!courseInfo) {
      return res.status(409).json({
          res: false,
          data: "course info is not available at this time maybe it has been deleted before!",
        });
    }  


    const oldStudentCourse = await models.studentvcourse.findOne({
        where:{
            Frk_Course:Course,
            Frk_Student:Student,
            Bit_Active:true,
        }
    });



   // start Transaction
   let newCourse; 
   let updatedrecord;
   const transaction = await models.sequelize.transaction();

   try {

      //console.log("insert new studentvcourse");

      //Enroll new course for student
      newCourse = await models.studentvcourse.create({
        Frk_Course: Course,
        Frk_student: Student,
        Int_RegisteredSession:RegisteredSession,
        Str_ValidUntillTo:ValidUntillTo,
        Str_RegisterDate: getDate(),
        Str_RegisterTime: getTime(),
        Bit_Active:true,
      }, { transaction});

      newCourse = newCourse.dataValues;

      // Gnerate auto bill
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


      // deactive old enrolled courses
      if (oldStudentCourse)
      {
          updatedrecord = await oldStudentCourse.update({
            Bit_Active: false,
          }, { transaction});
      }


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
        data: "course info is not available at this time maybe it has been deleted before!",
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
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,(select Count(*) as Present from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 1) as Present,(select Count(*) as Absent from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 2) as Absent,(select Count(*) as AcceptableAbsence from studentcheckincheckouts where Frk_StudentVCourse = Prk_StudentVCourse and Int_Status = 3) as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where students.Prk_Student_AutoID=" + studentID + ";");


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
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,Str_ValidUntillTo,0 as Present,0 as Absent, 0 as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where studentvcourses.Bit_Active = 1 and courses.Bit_Active = 1 and students.Bit_Active = 1 and Prk_Course=" + courseID + ";");


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

router.get('/getNeedToEnrolStudentListByGymID',authToken,async(req,res,next) =>{
    
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

    let UpcomingSessions = await models.sequelize.query("Select *,Int_RegisteredSession - Int_AttendanceCount as Int_ReminderSession from (select Prk_StudentVCourse,Prk_Course,Str_CourseName,Prk_Student_AutoID,CONCAT_WS(' ', Str_Name, Str_Family) as Str_StudentFullName,Int_RegisteredSession,(select Count(*) as Int_AttendanceCount from studentcheckincheckouts where (Int_Status=1 or Int_Status=2) and Frk_StudentVCourse = Prk_StudentVCourse) as Int_AttendanceCount from studentvcourses inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student inner join courses on courses.Prk_Course = studentvcourses.Frk_Course where studentvcourses.Bit_Active = 1 and courses.Frk_Gym = " + gymID + ") as t where (Int_RegisteredSession - Int_AttendanceCount) <=2;");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no student for enrolling.",
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

router.get('/getNeedToEnrolStudentListByStudentID',authToken,async(req,res,next) =>{
    
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

    let UpcomingSessions = await models.sequelize.query("Select *,Int_RegisteredSession - Int_AttendanceCount as Int_ReminderSession from (select Prk_StudentVCourse,Prk_Course,Str_CourseName,Prk_Student_AutoID,CONCAT_WS(' ', Str_Name, Str_Family) as Str_StudentFullName,Int_RegisteredSession,(select Count(*) as Int_AttendanceCount from studentcheckincheckouts where (Int_Status=1 or Int_Status=2) and Frk_StudentVCourse = Prk_StudentVCourse) as Int_AttendanceCount from studentvcourses inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student inner join courses on courses.Prk_Course = studentvcourses.Frk_Course where studentvcourses.Bit_Active = 1 and studentvcourses.Frk_student = " + studentID + ") as t where (Int_RegisteredSession - Int_AttendanceCount) <=2;");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no student for enrolling.",
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

router.get('/getNeedToEnrolStudentListByTrainerID',authToken,async(req,res,next) =>{
    
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

    let UpcomingSessions = await models.sequelize.query("Select *,Int_RegisteredSession - Int_AttendanceCount as Int_ReminderSession from (select Prk_StudentVCourse,Prk_Course,Str_CourseName,Prk_Student_AutoID,CONCAT_WS(' ', Str_Name, Str_Family) as Str_StudentFullName,Int_RegisteredSession,(select Count(*) as Int_AttendanceCount from studentcheckincheckouts where (Int_Status=1 or Int_Status=2) and Frk_StudentVCourse = Prk_StudentVCourse) as Int_AttendanceCount from studentvcourses inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student inner join courses on courses.Prk_Course = studentvcourses.Frk_Course where studentvcourses.Bit_Active = 1 and courses.Frk_Trainer = " + trainerID + ") as t where (Int_RegisteredSession - Int_AttendanceCount) <=2;");


    if (!UpcomingSessions[0]) {
      return res.status(409).json({
        res: false,
        data: "There is no student for enrolling.",
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

        const courseInfo = await models.course.findOne({
          where: {
            Prk_Course: Course,
          },
        }); 
    
        if (!courseInfo) {
          return res.status(409).json({
              res: false,
              data: "course info is not available at this time maybe it has been deleted before!",
            });
        }  


        const studentCourse = await models.studentvcourse.findOne({
          where: {
            Prk_StudentVCourse: StudentVCourse,
          },
        }); 
    
        if (!studentCourse) {
          return res.status(409).json({
              res: false,
              data: "student info is not available at this time maybe it has been deleted before!",
            });
        }  

        console.log('//////////////////////%%%%%%%%%%%%%%%%%%%');


        const transaction = await models.sequelize.transaction();

        try {
     
          
          await models.studentcheckincheckout
          .destroy({
            where:{
              Frk_Course:Course,
              Frk_StudentVCourse:StudentVCourse,
              Str_Date:Date,
            }
          }, { transaction})  


          newCheckIn = await models.studentcheckincheckout
          .create({
            Frk_StudentVCourse: StudentVCourse,
            Frk_Course:Course,
            Str_Date: Date,
            Int_Status: Status,
            Str_AbsentReason: AbsentReason,
            Str_TrainerNote: TrainerNote
          }, { transaction})
     

          newCheckIn = newCheckIn.dataValues;
     
          await transaction.commit();     
     
       } catch (err) {
     
           await transaction.rollback();
     
           console.log(err);
           return res.status(500).json({
             res: false,
             data: "something wrong happend during registering new student's attendance. Please try again a bit later!",
           });
     
       }
     
       res.status(200).json({
         res: true,
         data: newCheckIn,
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

router.get('/getStudentAttendanceListbyTrainerID',authToken,async(req,res,next) =>{
    
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
  const StudentAttendanceList = await models.sequelize.query("SELECT Prk_StudentCheckInCheckOut,Str_Date,Int_Status,Str_AbsentReason,Str_TrainerNote,Prk_Course,Str_CourseName,Prk_Trainer,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_Family from studentcheckincheckouts inner join courses on studentcheckincheckouts.frk_Course = courses.Prk_Course inner join trainers on courses.Frk_Trainer = trainers.Prk_Trainer inner join studentvcourses on studentvcourses.Prk_StudentVCourse = studentcheckincheckouts.Frk_StudentVCourse inner join students on students.Prk_Student_AutoID = studentvcourses.Frk_student where prk_Trainer = " + trainerID + ";");


  if (!StudentAttendanceList[0]) {
    return res.status(409).json({
      res: false,
      data: "There is no registered student attendance list related to this specific trainer.",
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