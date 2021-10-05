const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

 router.post('/register',yupValidator(gymRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { CourseName,CourseDescription,Trainer,Active,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost} = req.body;

     // check if user already exist
     const oldCourse = await models.course.findOne({
        where:{
            Str_CourseName:CourseName
        }
    });

     if (oldCourse) {
        return res.status(409).send("This course name is already exist. please edit it or try to choose another unique name.");
     }


    models.course.create({
        Str_CourseName:CourseName,
        Str_CourseDescription:CourseDescription,
        Frk_Trainer:Trainer,
        Bit_Active:Active,
        Str_StartDate:StartDate,
        Str_EndDate:EndDate,
        Int_TrainerPercent:TrainerPercent,
        Int_CourseType:CourseType,
        Int_PerSessionCost:PerSessionCost
     
    }).then( (course) => {

            res.status(200).json({
                res:true,
                data:course
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).send('There was a problem registering the user.');
    
     })

})

router.post('/edit',yupValidator(gymLoginSchema), async (req,res,next) => {
    
    // Get user input
    const { UserName, Password } = req.body;

    // check if user already exist
    const oldGym = await models.gym.findOne({
        where:{
            Str_UserName:UserName
        }
    });


    // Check User & Password
    if (oldGym && (await bcrypt.compare(Password,oldGym.Str_Password) ) ) {
        
            // create new token
            let token = jwt.sign({ id: oldGym.Prk_Gym_AutoID,username:oldGym.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:oldGym
            })
        
    }
    else
    {
        return res.status(409).send("User or Password is wrong. Please Try again");
    }

})

router.delete('/delete',authToken,async(req,res,next) =>{
    res.send('the delete API called');
})

router.post('/registerOffTime',authToken,async(req,res,next) =>{
    res.send('the registerOffTime API called');
})

router.put('/editOffTime',authToken,async(req,res,next) =>{
    res.send('the editOffTime API called');
})

router.delete('/deleteOffTime',authToken,async(req,res,next) =>{
    res.send('the deleteOffTime API called');
})

router.get('/getByGymID',authToken,async(req,res,next) =>{
    res.send('the getByGymID API called');
})

 module.exports = router;  