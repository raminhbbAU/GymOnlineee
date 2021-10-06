const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { trainerRegisterSchema,trainerLoginSchema } = require('../validationSchema/yup.validation.js');

 router.post('/register',yupValidator(trainerRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { GymID,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail, UserName , Password,  Avatar} = req.body;

     // check if user already exist
     const oldTrainer = await models.trainer.findOne({
        where:{
            Str_UserName:UserName
        }
    });

     if (oldTrainer) {
        return res.status(409).json({
            res: false,
            data: "Trainer already exist.",
          });
     }


     //Encrypt user password
    encryptedPassword = await bcrypt.hash(Password, 10);


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
        Str_Avatar:Avatar

     }).then( (trainer) => {
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
    
              if (!token) return res.status(500).json({
                res: false,
                data: 'There was a problem during token generation',
              }); 
    
            res.status(200).json({
                res:true,
                auth:true,
                token,
                data:oldTrainer
            }) 
    }
    else
    {
        return res.status(409).json({
            res: false,
            data: "User or Password is wrong. Please Try again",
          });
    }

})

router.post('/activateAccount',authToken,async(req,res,next) =>{
    res.send('the activateAccount API called');
})

router.put('/edit',authToken,async(req,res,next) =>{
    
    // Get user input
    const { id,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail, UserName , Password,  Avatar} = req.body;

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

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(Password, 10);

    oldTrainer.update
    ({
        Str_TrainerName:TrainerName,
        Str_TrainerFamily:TrainerFamily,
        Str_Mobile:Mobile,
        Str_WhatsApp:WhatsApp,
        Str_Gmail:Gmail,
        Str_UserName:UserName,
        Str_Password:encryptedPassword,
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
        data: "something wrong happend during editing course. Please try again a bit later!",
      });
    });

})

router.delete('/delete',authToken,async(req,res,next) =>{
   
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

router.get('/getByGymID',authToken,async(req,res,next) =>{
   
    // Get user input
    const { GymID } = req.body;

    // check if user already exist
    const trainerList = await models.trainer.findAll({
        where:{
            Frk_gym:GymID
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



 module.exports = router;  