const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const {getFirstDayOfMonth,getLastDayOfMonth} = require('../services/utility.service')

router.get('/getGymDashboardInfo',authToken,async(req,res,next) =>{

    // Get user input
    const { gymID } = req.query;
    let activeStudentCount=0;
    let activeCourseCount=0;
    let monthlyIncome=0;
    let totalReminder=0

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

      let queryResult = await models.sequelize.query("SELECT Count(*) as MyStudentCount FROM onlinegym.students where Bit_Active=1 and Frk_gym=" + gymID + ";");
      activeStudentCount = queryResult[0][0].MyStudentCount

      queryResult = await models.sequelize.query("SELECT Count(*) as MyCourseCount FROM onlinegym.courses where Bit_Active=1 and Frk_Gym=" + gymID + ";");
      activeCourseCount = queryResult[0][0].MyCourseCount

      queryResult = await models.sequelize.query("SELECT Sum(Int_Amount) as monthlyIncome FROM onlinegym.studentpayments inner join students on students.Prk_Student_AutoID = studentpayments.Frk_Student WHERE  (Str_GenerateDate BETWEEN '"+ getFirstDayOfMonth() + "' AND '" + getLastDayOfMonth() + "') and studentpayments.Bit_Active=1 and Frk_gym =" + gymID + ";");
      monthlyIncome = queryResult[0][0].monthlyIncome

      queryResult = await models.sequelize.query("Select ((SELECT  IFNULL(Sum(Int_Amount),0) as bill FROM studentbills inner join students on students.Prk_Student_AutoID = studentbills.Frk_Student where studentbills.Bit_Active=1 and Frk_gym=" + gymID + ") - (SELECT IFNULL(Sum(Int_Amount),0) as payment FROM studentpayments inner join students on students.Prk_Student_AutoID = studentpayments.Frk_Student where studentpayments.Bit_Active=1 and Frk_gym=" + gymID + ")) as totalReminder;");
      totalReminder = queryResult[0][0].totalReminder

    
        res.status(200).json({
            res:true,
            data:  {
                activeStudentCount,
                activeCourseCount,
                monthlyIncome,
                totalReminder,
            },
         });

    } catch (error) {
        console.log(error);
        return res.status(409).json({
            res: false,
            data: "something wrong was happend!",
          });
    }

    //const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer where courses.Prk_Course=" + courseID + ";");
  

  
  })

router.get('/getStudentDashboardInfo',authToken,async(req,res,next) =>{

    // Get user input
    const { studentID } = req.query;
    let activeCourseCount=0;
    let totalDebt =0
    let latestBMI=0;
    let latestWeight=0

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

      let queryResult = await models.sequelize.query("SELECT Count(*) as MyCourseCount FROM onlinegym.studentvcourses where Bit_Active=1 and Frk_student=" + studentID + ";");
      activeCourseCount = queryResult[0][0].MyCourseCount

      queryResult = await models.sequelize.query("Select ((SELECT  IFNULL(Sum(Int_Amount),0) as bill FROM studentbills inner join students on students.Prk_Student_AutoID = studentbills.Frk_Student where studentbills.Bit_Active=1 and Prk_Student_AutoID=" + studentID + ") - (SELECT IFNULL(Sum(Int_Amount),0) as payment FROM studentpayments inner join students on students.Prk_Student_AutoID = studentpayments.Frk_Student where studentpayments.Bit_Active=1 and Prk_Student_AutoID=" + studentID + ")) as totalDebt;");
      totalDebt = queryResult[0][0].totalDebt

      latestBMI=0

      latestWeight=0

    
        res.status(200).json({
            res:true,
            data:  {
                activeCourseCount,
                totalDebt,
                latestBMI,
                latestWeight,
            },
         });

    } catch (error) {
        console.log(error);
        return res.status(409).json({
            res: false,
            data: "something wrong was happend!",
          });
    }
  
  })

router.get('/getTrainerDashboardInfo',authToken,async(req,res,next) =>{

    /////////////////////////////////
    //TODO : It's not complete
    /////////////////////////////////

    // Get user input
    const { TrainerID } = req.query;
    let activeStudentCount=0;
    let activeCourseCount=0;
    let monthlyIncome=0;
    let totalReminder=0

    if (!TrainerID) {
          return res.status(409).json({
              res: false,
              data: "TrainerID is not provided!",
          });
    }
  
    if(isNaN(TrainerID)){
      return res.status(409).json({
        res: false,
        data: "TrainerID is not properly provided!",
    });
    }
    

    try {

      let queryResult = await models.sequelize.query("SELECT Count(*) as MyStudentCount FROM onlinegym.students where Bit_Active=1 and Frk_gym=" + gymID + ";");
      activeStudentCount = queryResult[0][0].MyStudentCount

      queryResult = await models.sequelize.query("SELECT Count(*) as MyCourseCount FROM onlinegym.courses where Bit_Active=1 and Frk_Gym=" + gymID + ";");
      activeCourseCount = queryResult[0][0].MyCourseCount

      queryResult = await models.sequelize.query("SELECT Sum(Int_Amount) as monthlyIncome FROM onlinegym.studentpayments inner join students on students.Prk_Student_AutoID = studentpayments.Frk_Student WHERE  (Str_GenerateDate BETWEEN '"+ getFirstDayOfMonth() + "' AND '" + getLastDayOfMonth() + "') and studentpayments.Bit_Active=1 and Frk_gym =" + gymID + ";");
      monthlyIncome = queryResult[0][0].monthlyIncome

      queryResult = await models.sequelize.query("Select ((SELECT  IFNULL(Sum(Int_Amount),0) as bill FROM studentbills inner join students on students.Prk_Student_AutoID = studentbills.Frk_Student where studentbills.Bit_Active=1 and Frk_gym=" + gymID + ") - (SELECT IFNULL(Sum(Int_Amount),0) as payment FROM studentpayments inner join students on students.Prk_Student_AutoID = studentpayments.Frk_Student where studentpayments.Bit_Active=1 and Frk_gym=" + gymID + ")) as totalReminder;");
      totalReminder = queryResult[0][0].totalReminder

    
        res.status(200).json({
            res:true,
            data:  {
                activeStudentCount,
                activeCourseCount,
                monthlyIncome,
                totalReminder,
            },
         });

    } catch (error) {
        console.log(error);
        return res.status(409).json({
            res: false,
            data: "something wrong was happend!",
          });
    }

    //const courseList = await models.sequelize.query("SELECT courses.*,trainers.Str_TrainerName,trainers.Str_TrainerFamily FROM courses inner join trainers on Frk_Trainer = Prk_Trainer where courses.Prk_Course=" + courseID + ";");
  

  
  })

module.exports = router;  