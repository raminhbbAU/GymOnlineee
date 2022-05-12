const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');
const {sendEmail,htmlMaker} = require('../services/notification.service')
const {getDate,getTime,generateUUID} = require('../services/utility.service')

 router.post('/registerNewGym',yupValidator(gymRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { GymName,OwnerTitle,Gmail,Mobile,UserName,Password} = req.body;

     // check if user already exist
     const oldGym = await models.gym.findOne({
        where:{
            Str_UserName:UserName
        }
    });

     if (oldGym) {
        return res.status(409).json({
            res: false,
            data: "User already exist. Please login to your account",
          });
     }

     //Encrypt user password
    randomCode = generateUUID()
    encryptedPassword = await bcrypt.hash(Password, 10);
    confirmationCode = await bcrypt.hash(getDate() + getTime(), 10);
    confirmationCode = randomCode + confirmationCode;
    confirmationCode = confirmationCode.toString().replaceAll('-','').replaceAll(':','').replaceAll('/','').replaceAll('\\','').replaceAll('$','').replaceAll('&','').replaceAll('+','').replaceAll('.','');

     // create New User
    models.gym.create({
        Str_GymName:GymName,
        Str_OwnerTitle:OwnerTitle,
        Str_Address:'',
        Str_Tel:'',
        Str_Gmail:Gmail,
        Str_Mobile:Mobile,
        Str_UserName:UserName,
        Str_Password:encryptedPassword,
        Bit_Active:false,
        Str_Description:'',
        Str_ConfirmationCode : confirmationCode,
     }).then( (gym) => {
 
            // send confirmation email
            sendEmail(Gmail,"Account Activation",htmlMaker(GymName,'?type=gym&uuid=' +confirmationCode))

            // return response to user
            res.status(200).json({
                res:true,
                data:Gmail
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).json({
            res: false,
            data: 'There was a problem registering new gym.',
          });
     })

})

router.post('/gymLogin',yupValidator(gymLoginSchema), async (req,res,next) => {
    
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
        
            // check activation           
            if (oldGym.Bit_Active === false )
            {
                res.status(409).json({
                    res:false,
                    data: "Your account has not been activated yet! please check your e-mail inbox",
                })
            }
            else 
            {
                // create new token
                let token = jwt.sign({ id: oldGym.Prk_Gym_AutoID,username:oldGym.Str_UserName}, process.env.JWT_SECRET, {
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
                    data:{loginType:'gym', loginId:oldGym.Prk_Gym_AutoID, loginName:oldGym.Str_GymName ,loginUserName: oldGym.Str_UserName}
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


router.get('/getGymByID',authToken,async(req,res,next) => {

    console.log('///////////\\\\\\\\\\\\\/////////////////\\\\\\\\\\\\\\\\\/////////////');
    console.log(req);
    const {gymID} = req.query;

    if (!gymID){
        return res.status(409).json({
            res:false,
            data:"GymID is not provided"
        })
    }

    if (isNaN(gymID)){
        return res.status(409).json({
            res:false,
            data:"gymID is not properly provided!"
        })
    }

    const oldGym = await models.gym.findOne({
        where:{
            Prk_Gym_AutoID:gymID
        }
    });

    if (!oldGym){
        return res.status(409).json({
            res:false,
            data:"The specific gym doesn't exist! it must've deleted before."
        })
    }
    else
    {
        res.status(200).json({
            res: true,
            data: oldGym,
        });
    }

})

router.put('/editGym',authToken,yupValidator(gymRegisterSchema),async(req,res,next) =>{
    
   // Get user input
   const { GymID,GymName,OwnerTitle,Address,Tel,Gmail,Mobile,UserName,Password,Description} = req.body;
   
   // check if user already exist
   const oldGym = await models.gym.findOne({
      where:{
        Prk_Gym_AutoID:GymID
      }
  });

   if (!oldGym) {
      return res.status(409).json({
          res: false,
          data: "The specific gym doesn't exist! it must've deleted before.",
        });
   }
   else {

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(Password, 10);

      oldGym.update({
          Str_GymName:GymName,
          Str_OwnerTitle:OwnerTitle,
          Str_Address:Address,
          Str_Tel:Tel,
          Str_Gmail:Gmail,
          Str_Mobile:Mobile,
        //   Str_UserName:UserName,
        //   Str_Password:encryptedPassword,
          Str_Description:Description,
      }).then( (updatedrecord) => {
          res.status(200).json({
              res: true,
              data: updatedrecord,
            });
    }).catch( (error) => {
          console.log(error);
          return res.status(500).json({
          res: false,
          data: "something wrong happend during editing gym. Please try again a bit later!",
          });
    })

   }

})

router.post('/gymActivateAccount',async(req,res,next) =>{
    
   // Get user input
   const { uuid} = req.body;

   // check if user already exist
   const oldGym = await models.gym.findOne({
      where:{
        Str_ConfirmationCode:uuid
      }
  });

   if (!oldGym) {
      return res.status(409).json({
          res: false,
          data: "The activation link is not a valid link. please check carefully and try again",
        });
   }
   else {

    if (oldGym.Bit_Active === true)
    {
        return res.status(409).json({
            res: false,
            data: "The account has been activated before! Please login into your account",
          });
    }
    else
    {
        oldGym.update({
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
                data: "something wrong happend during activating gym. Please try again a bit later!",
            });
       })
    }

   }

})



 module.exports = router;  