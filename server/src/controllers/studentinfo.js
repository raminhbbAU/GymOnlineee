const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { studentRegisterSchema,studentLoginSchema } = require('../validationSchema/yup.validation.js');
const {getDate,getTime} = require('../services/utility.service')

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
        return res.status(409).json({
            res: false,
            data: "Student already exist. Please login to your account",
          });
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
        Str_RegisterDate:getDate(),
        Str_RegisterTime:getTime(),
        Str_UserName:UserName,
        Str_Password:Password,
        Bit_Active:false,
        Str_Description:Description

     }).then( (student) => {

            // create new token
            let token = jwt.sign({ id: student.Prk_Student_AutoID ,username:student.Str_UserName}, process.env.JWT_SECRET, {
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
                data:student
            })

     }).catch( (error) => {
        console.log(error);
        return res.status(500).json({
            res: false,
            data: 'There was a problem registering new gym.',
          });   
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
    
              if (!token) return res.status(500).json({
                res: false,
                data: 'There was a problem during token generation',
              }); 
    
            res.status(200).json({
                res:true,
                auth:true,
                token,
                data:oldStudent
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
    // Get user input
    const { ID } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Prk_Student_AutoID:ID
        }
    });

    if (!oldStudent) {
        return res.status(409).json({
            res: false,
            data: "The specific student doesn't exist! it must've deleted before.",
          });
    }
    else
    {
        oldStudent.update({
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
                    data: "something wrong happend during activating student. Please try again a bit later!",
                });
        })
    }
})

router.put('/edit',authToken,async(req,res,next) =>{
    
    // Get user input
    const { ID, Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,Description } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Prk_Student_AutoID:ID
        }
    });

    if (!oldStudent) {
        return res.status(409).json({
            res: false,
            data: "The specific student doesn't exist! it must've deleted before.",
          });
    }
    else
    {
        oldStudent.update({
            Str_Name:Name ,
            Str_Family:Family,
            Str_Mobile:Mobile,
            Str_WhatsApp:WhatsApp,
            Str_Telegram:Telegram,
            Str_Gmail:Gmail,
            Str_Address:Address,
            Str_Birthday:Birthday,
            Str_Description:Description
        }).then( (updatedrecord) => {
            res.status(200).json({
                res: true,
                data: updatedrecord,
              });
        }).catch( (error) => {
                console.log(error);
                return res.status(500).json({
                    res: false,
                    data: "something wrong happend during editing student. Please try again a bit later!",
                });
        })
    }


})

router.delete('/delete',authToken,async(req,res,next) =>{
  
    // Get user input
  const { ID } = req.body;

     // check if user already exist
    const oldStudent = await models.student.findOne({
        where:{
            Prk_Student_AutoID:ID
        }
    });

    if (!oldStudent) {
        return res.status(409).json({
            res: false,
            data: "The specific student doesn't exist! it must've deleted before.",
          });
    }

    oldStudent
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
          data: "something wrong happend during deleting student. Please try again a bit later!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during deleting student. Please try again a bit later!",
      });
    });

})

router.get('/getByGymID',authToken,async(req,res,next) =>{
   
    // Get user input
    const { gymID } = req.body;

    // check if Off Time already exist
    const studentsByGymID = await models.student.findOne({
        where: {
            Frk_gym: gymID,
        },
    });

    if (!studentsByGymID) {
        return res.status(409).json({
            res: false,
            data: "There is no student related to this specific gym.",
        });
    }
    else
    {
        res.status(200).json({
            res: true,
            data: studentsByGymID,
        });
    }   
})

router.get('/getByCourseID',authToken,async(req,res,next) =>{
    res.send('the getByCourseID API called');
})


 module.exports = router;  