const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

 router.post('/register',yupValidator(gymRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { GymName,OwnerTitle,Address,Tel,Gmail,Mobile,UserName,Password,Description} = req.body;

     // check if user already exist
     const oldGym = await models.gym.findOne({
        where:{
            Str_UserName:UserName
        }
    });

     if (oldGym) {
        return res.status(409).send("User already exist. Please login to your account");
     }


     //Encrypt user password
    encryptedPassword = await bcrypt.hash(Password, 10);

     // create New User
    models.gym.create({
        Str_GymName:GymName,
        Str_OwnerTitle:OwnerTitle,
        Str_Address:Address,
        Str_Tel:Tel,
        Str_Gmail:Gmail,
        Str_Mobile:Mobile,
        Str_UserName:UserName,
        Str_Password:encryptedPassword,
        Str_Description:Description
     }).then( (gym) => {

            // create new token
            let token = jwt.sign({ id: gym.Prk_Gym_AutoID,username:gym.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:gym
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).send('There was a problem registering the user.');
    
     })

})

router.post('/login',yupValidator(gymLoginSchema), async (req,res,next) => {
    
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

router.post('/forgetPasswordbyGmail',authToken, async(req,res,next) => {
    res.send('the forgetPasswordbyGmail API called');
})

router.post('/forgetPasswordbyMobile',authToken, async(req,res,next) => {
    res.send('the forgetPasswordbyMobile API called');
})


 module.exports = router;  