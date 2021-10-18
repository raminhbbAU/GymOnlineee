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
    res.send('the getRegisteredCourses API called');
})

router.post('/registerStudentHealthParameters',authToken,async(req,res,next) =>{
      
        // Get user input
       const {Student,HealthParameter,Value,Description} = req.body;

       models.studentVhealthparameter
         .create({
           Frk_student: Student,
           Frk_HealthParameter: HealthParameter,
           Str_Value = Value,
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
            Int_Status = Status,
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