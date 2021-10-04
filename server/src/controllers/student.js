const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { studentRegisterSchema,studentLoginSchema } = require('../validationSchema/yup.validation.js');



router.post('/registerNewBill',authToken,async(req,res,next) =>{
    res.send('the registerNewBill API called');
})

router.get('/getBillList',authToken,async(req,res,next) =>{
    res.send('the getBillList API called');
})

router.post('/registerNewPayment',authToken,async(req,res,next) =>{
    res.send('the registerNewPayment API called');
})

router.get('/getPaymentList',authToken,async(req,res,next) =>{
    res.send('the getPaymentList API called');
})

router.get('/getFinancialStatment',authToken,async(req,res,next) =>{
    res.send('the getFinancialStatment API called');
})

router.post('/registerStudentCourse',authToken,async(req,res,next) =>{
    res.send('the registerStudentCourse API called');
})

router.get('/getRegisteredCourses',authToken,async(req,res,next) =>{
    res.send('the getRegisteredCourses API called');
})

router.post('/registerStudentHealthParameters',authToken,async(req,res,next) =>{
    res.send('the registerStudentHealthParameters API called');
})

router.get('/getStudentHealthParameters',authToken,async(req,res,next) =>{
    res.send('the getStudentHealthParameters API called');
})

router.post('/registerStudentAttendance',authToken,async(req,res,next) =>{
    res.send('the registerStudentAttendance API called');
})

router.get('/getStudentAttendanceList',authToken,async(req,res,next) =>{
    res.send('the getStudentAttendanceList API called');
})


 module.exports = router;  