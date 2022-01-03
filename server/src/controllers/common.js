const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')

router.get('/getDashboardInfo',authToken,async(req,res,next) =>{

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