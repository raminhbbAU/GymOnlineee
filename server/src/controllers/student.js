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
      Str_GenerateTime:getTime()
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

router.get('/getBillList',authToken,async(req,res,next) =>{
    res.send('the getBillList API called');
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
      Str_TraceNumber: TraceNumber
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

router.get('/getPaymentList',authToken,async(req,res,next) =>{
    res.send('the getPaymentList API called');
})

router.get('/getFinancialStatment',authToken,async(req,res,next) =>{
    res.send('the getFinancialStatment API called');
})

router.post('/registerStudentCourse',authToken,async(req,res,next) =>{

    // Get user input
    const {Course,Student} = req.body;

    // check if user already exist
    const oldStudentCourse = await models.studentvcourse.findOne({
        where:{
            Frk_Course:Course,
            Frk_Student:Student
        }
    });

     if (oldStudentCourse) {
        return res.status(409).json({
            res: false,
            data: "Student is already a member of this course.",
          });
     }  
    

    models.studentvcourse
      .create({
        Frk_Course: Course,
        Frk_Student: Student,
        Str_RegisterDate: getDate(),
        Str_RegisterTime: getTime()
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
          data: "something wrong happend during registering new student's course. Please try again a bit later!",
        });
      });

})

router.get('/getRegisteredCourses',authToken,async(req,res,next) =>{
    
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
  const studentRegisteredCourseList = await models.sequelize.query("SELECT Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,studentvcourses.Str_RegisterDate,Int_RegisteredSession,0 as Present,0 as Absent, 0 as AcceptableAbsence FROM courses inner join studentvcourses on Frk_Course = Prk_Course inner join students on Frk_student = Prk_Student_AutoID inner join trainers on Frk_Trainer = Prk_Trainer where students.Prk_Student_AutoID=" + studentID + ";");


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
        const {StudentVCourse,Date,Status,AbsentReason,TrainerNote} = req.body;

        models.studentcheckincheckout
          .create({
            Frk_StudentVCourse: StudentVCourse,
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

router.get('/getStudentAttendanceList',authToken,async(req,res,next) =>{
    res.send('the getStudentAttendanceList API called');
})


 module.exports = router;  