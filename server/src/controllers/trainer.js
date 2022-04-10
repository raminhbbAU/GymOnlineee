const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { trainerRegisterSchema,trainerLoginSchema } = require('../validationSchema/yup.validation.js');
const {getDate,getTime,generateUUID} = require('../services/utility.service');
const {sendEmail,htmlMaker} = require('../services/notification.service');

 router.post('/registerNewTrainer',yupValidator(trainerRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { GymID,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail, UserName , Password,  Avatar} = req.body;

     // check if user already exist
     const oldTrainer = await models.trainer.findOne({
        where:{
            Str_UserName:UserName,
            Frk_gym: GymID
        }
    });

     if (oldTrainer) {
        return res.status(409).json({
            res: false,
            data: "Trainer already exist.",
          });
     }


     //Encrypt user password
    randomCode = generateUUID()
    encryptedPassword = await bcrypt.hash(Password, 10);
    confirmationCode = await bcrypt.hash(getDate() + getTime(), 10);
    confirmationCode = randomCode + confirmationCode;
    confirmationCode = confirmationCode.toString().replaceAll('-','').replaceAll(':','').replaceAll('/','').replaceAll('\\','').replaceAll('$','').replaceAll('&','').replaceAll('+','').replaceAll('.','');


     // create New User
    models.trainer.create({
        Frk_gym:GymID,
        Str_TrainerName:TrainerName,
        Str_TrainerFamily:TrainerFamily,
        Str_Mobile:Mobile,
        Str_WhatsApp:WhatsApp,
        Str_Gmail:Gmail,
        Str_UserName:UserName,
        Str_Password:encryptedPassword,
        Str_Avatar:Avatar,
        Bit_Active:false,
        Str_ConfirmationCode:confirmationCode,
     }).then( (trainer) => {

        // send confirmation email
        sendEmail(Gmail,"Account Activation",htmlMaker(TrainerName,'?type=trainer&uuid=' +confirmationCode))

        return res.status(200).json({
            res:true,
            data:trainer
        })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).json({
            res: false,
            data: 'There was a problem registering new trainer.',
          });
     })

})

router.post('/trainerlogin',yupValidator(trainerLoginSchema), async (req,res,next) => {
    
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


            // check activation           
            if (oldTrainer.Bit_Active === false )
            {
                res.status(409).json({
                    res:false,
                    data: "Your account has not been activated yet! please check your e-mail inbox",
                })
            }
            else 
            {
                // create new token
                let token = jwt.sign({ id: oldTrainer.Prk_Trainer,username:oldTrainer.Str_UserName}, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
                });
      
                if (!token) return res.status(500).json({
                  res: false,
                  data: 'There was a problem during token generation',
                }); 
      
              res.status(200).json({
                  res:true,
                  auth:true,
                  token,
                  data:{loginType:'trainer', loginId:oldTrainer.Prk_Trainer, loginName:oldTrainer.Str_TrainerName + ' ' + oldTrainer.Str_TrainerFamily ,loginUserName: oldTrainer.Str_UserName}
              }) 
            }


    }
    else
    {
        return res.status(409).json({
            res: false,
            data: "User or Password is wrong. Please Try again",
          });
    }

})

router.put('/activeDeactiveTrainer',authToken,async(req,res,next) =>{
  // Get user input
  const { id } = req.body;

   // check if user already exist
   const oldTrainer = await models.trainer.findOne({
      where:{
        Prk_Trainer:id
      }
  });

  if (!oldTrainer) {
      return res.status(409).json({
          res: false,
          data: "The specific trainer doesn't exist! it must've deleted before.",
        });
  }


  oldTrainer.update({
      Bit_Active: !oldTrainer.Bit_Active,
  }).then( (updatedrecord) => {
      res.status(200).json({
          res: true,
          data: updatedrecord,
        });
  }).catch( (error) => {
          console.log(error);
          return res.status(500).json({
              res: false,
              data: "something wrong happend during activating trainer. Please try again a bit later!",
          });
  })


})

router.post('/trainerActivateAccount',async(req,res,next) =>{
    
  // Get user input
  const { uuid} = req.body;

  // check if user already exist
  const oldTrainer = await models.trainer.findOne({
     where:{
       Str_ConfirmationCode:uuid
     }
 });

  if (!oldTrainer) {
     return res.status(409).json({
         res: false,
         data: "The activation link is not a valid link. please check carefully and try again",
       });
  }
  else {

   if (oldTrainer.Bit_Active === true)
   {
       return res.status(409).json({
           res: false,
           data: "The account has been activated before! Please login into your account",
         });
   }
   else
   {
    oldTrainer.update({
           Bit_Active:true
       }).then( (updatedrecord) => {
           res.status(200).json({
               res: true,
               data: updatedrecord,
             });
      }).catch( (error) => {
           console.log(error);
           return res.status(500).json({
               res: false,
               data: "something wrong happend during activating trainer. Please try again a bit later!",
           });
      })
   }

  }

})

router.put('/editTrainer',authToken,async(req,res,next) =>{
    
    // Get user input
    const { id,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail,  Avatar} = req.body;

    // check if user already exist
    const oldTrainer = await models.trainer.findOne({
        where:{
            Prk_Trainer:id
        }
    });

    if (!oldTrainer) {
        return res.status(409).json({
          res: false,
          data: "The specific trainer doesn't exist! it must've deleted before.",
        });
    }

    oldTrainer.update
    ({
        Str_TrainerName:TrainerName,
        Str_TrainerFamily:TrainerFamily,
        Str_Mobile:Mobile,
        Str_WhatsApp:WhatsApp,
        Str_Gmail:Gmail,
        Str_Avatar:Avatar
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
        data: "something wrong happend during editing trainer. Please try again a bit later!",
      });
    });

})

router.delete('/deleteTrainer',authToken,async(req,res,next) =>{
   
    // Get user input
    const { id} = req.body;

    // check if user already exist
    const oldTrainer = await models.trainer.findOne({
        where:{
            Prk_Trainer:id
        }
    });

    if (!oldTrainer) {
        return res.status(409).json({
            res: false,
            data: "The specific trainer doesn't exist! it must've deleted before.",
        });
    }

    oldTrainer
    .destroy()
    .then((rowDeleted) => {
      if (rowDeleted === 1) {
        res.status(200).json({
          res: true,
          data: updatedrecord,
        });
      } else {
        res.status(500).json({
          res: false,
          data: "something wrong happend during deleting trainer. Please try again a bit later!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during deleting trainer. Please try again a bit later!",
      });
    });


})

router.get('/getTrainerByGymID',authToken,async(req,res,next) =>{
   
    // Get user input
    const { gymID } = req.query;

    if (!gymID) {
        return res.status(409).json({
            res: false,
            data: "gymID is not provided!",
        });
    }
    

    // check if user already exist
    const trainerList = await models.trainer.findAll({
        where:{
          Frk_gym:gymID
        }
    });

    
    if (!trainerList) {
        return res.status(409).json({
            res: false,
            data: "There is no trainer associated with this specific gym.",
        });
    }
    else
    {
        res.status(200).json({
            res: true,
            data: trainerList,
          });
    }

})

router.get('/getTrainerInfoByTrainerID',authToken,async(req,res,next) =>{
   
  // Get user input
  const { gymID,trainerID } = req.query;

  if (!gymID) {
      return res.status(409).json({
          res: false,
          data: "gymID is not provided!",
      });
  }

  if (!trainerID) {
    return res.status(409).json({
        res: false,
        data: "trainerID is not provided!",
    });
  }

  
  // check if user already exist
  const trainerList = await models.trainer.findOne({
      where:{
        Frk_gym:gymID,
        Prk_Trainer:trainerID,
      }
  });
 
  if (!trainerList) {
      return res.status(409).json({
          res: false,
          data: "There is no trainer associated with this specific information.",
      });
  }
  else
  {
      res.status(200).json({
          res: true,
          data: trainerList,
        });
  }

})


 module.exports = router;  