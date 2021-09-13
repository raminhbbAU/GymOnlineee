const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { studentRegisterSchema,studentLoginSchema } = require('../validationSchema/yup.validation.js');

 router.post('/register',yupValidator(studentRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,UserName,Password,Description } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Str_UserName:UserName
        }
    });

     if (oldStudent) {
        return res.status(409).send("Student already exist. Please login to your account");
     }


     //Encrypt user password
    encryptedPassword = await bcrypt.hash(Password, 10);


     // create New User
    models.student.create({
        Str_Name:Name ,
        Str_Family:Family,
        Str_Mobile:Mobile,
        Str_WhatsApp:WhatsApp,
        Str_Telegram:Telegram,
        Str_Gmail:Gmail,
        Str_Address:Address,
        Str_Birthday:Birthday,
        Str_RegisterDate,
        Str_RegisterTime,
        Str_UserName:UserName,
        Str_Password:Password,
        Bit_Active:true,
        Str_Description:Description

     }).then( (student) => {

            // create new token
            let token = jwt.sign({ id: student.Prk_Student_AutoID ,username:student.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:student
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).send('There was a problem registering the student.');    
     })

})

router.post('/login',yupValidator(studentLoginSchema), async (req,res,next) => {
    
    // Get user input
    const { UserName, Password } = req.body;

    // check if user already exist
    const oldStudent = await models.student.findOne({
        where:{
            Str_UserName:UserName
        }
    });


    // Check User & Password
    if (oldStudent && (await bcrypt.compare(Password,oldStudent.Str_Password) ) ) {
        
            // create new token
            let token = jwt.sign({ id: oldStudent.Prk_Student_AutoID ,username:oldStudent.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:oldStudent
            })       
    }
    else
    {
        return res.status(409).send("User or Password is wrong. Please Try again");
    }

})

router.post('/forgetPasswordbyGmail',authToken, async(req,res,next) => {
    res.send('the forgetPasswordbyGmail API called');
})

router.post('/forgetPasswordbyMobile',authToken, async(req,res,next) => {
    res.send('the forgetPasswordbyMobile API called');
})


 module.exports = router;  