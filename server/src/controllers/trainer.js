const router = require('express').Router();
const models  = require('../models/sequlizeDb.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('../services/auth.service.js');
const yupValidator = require('../services/validation.service.js');
const { trainerRegisterSchema,trainerLoginSchema } = require('../validationSchema/yup.validation.js');

 router.post('/register',yupValidator(trainerRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail, UserName , Password,  Avatar} = req.body;

     // check if user already exist
     const oldTrainer = await models.trainer.findOne({
        where:{
            Str_UserName:UserName
        }
    });

     if (oldTrainer) {
        return res.status(409).send("Trainer already exist. Please login to your account");
     }


     //Encrypt user password
    encryptedPassword = await bcrypt.hash(Password, 10);


     // create New User
    models.trainer.create({
        Str_TrainerName:TrainerName,
        Str_TrainerFamily:TrainerFamily,
        Str_Mobile:Mobile,
        Str_WhatsApp:WhatsApp,
        Str_Gmail:Gmail,
        Str_UserName:UserName,
        Str_Password:Password,
        Str_Avatar:Avatar

     }).then( (trainer) => {

            // create new token
            let token = jwt.sign({ id: trainer.Prk_Trainer,username:trainer.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:trainer
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).send('There was a problem registering the trainer.');    
     })

})

router.post('/login',yupValidator(trainerLoginSchema), async (req,res,next) => {
    
    // Get user input
    const { UserName, Password } = req.body;

    // check if user already exist
    const oldTrainer = await models.trainer.findOne({
        where:{
            Str_UserName:UserName
        }
    });


    // Check User & Password
    if (oldTrainer && (await bcrypt.compare(Password,oldTrainer.Str_Password) ) ) {
        
            // create new token
            let token = jwt.sign({ id: oldTrainer.Prk_Trainer,username:oldTrainer.Str_UserName}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });
    
            if (!token) return res.status(500).send('There was a problem during token generation');
    
            res.status(200).json({
                auth:true,
                token,
                data:oldTrainer
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