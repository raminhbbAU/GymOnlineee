const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { studentRegisterSchema,studentLoginSchema } = require('../validationSchema/yup.validation.js');
const {getDate,getTime,generateUUID} = require('../services/utility.service');
const {sendEmail,htmlMaker} = require('../services/notification.service');


 router.post('/registerNewStudent',yupValidator(studentRegisterSchema), async (req,res,next) => {
    
    // Get user input
    const { gymID,Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,UserName,Password,Description } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Str_UserName:UserName,
            Frk_gym:gymID
        }
    });

     if (oldStudent) {
        return res.status(409).json({
            res: false,
            data: "Student already exist. Please login to your account",
          });
     }  


     //Encrypt user password
    randomCode = generateUUID()
    encryptedPassword = await bcrypt.hash(Password, 10);
    confirmationCode = await bcrypt.hash(getDate() + getTime(), 10);
    confirmationCode = randomCode + confirmationCode;
    confirmationCode = confirmationCode.toString().replaceAll('-','').replaceAll(':','').replaceAll('/','').replaceAll('\\','').replaceAll('$','').replaceAll('&','').replaceAll('+','').replaceAll('.','');

    

     // create New User
    models.student.create({
        Frk_gym:gymID,
        Str_Name:Name,
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
        Str_Description:Description,
        Str_ConfirmationCode:confirmationCode,
     }).then( (student) => {

             // send confirmation email
             sendEmail(Gmail,"Account Activation",htmlMaker(Name,'?type=student&uuid=' +confirmationCode))

            res.status(200).json({
                res:true,
                auth:true,
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

router.post('/loginStudent',yupValidator(studentLoginSchema), async (req,res,next) => {
    
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

router.put('/activeDeactiveStudent',authToken,async(req,res,next) =>{
    // Get user input
    const { id } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Prk_Student_AutoID:id
        }
    });

    if (!oldStudent) {
        return res.status(409).json({
            res: false,
            data: "The specific student doesn't exist! it must've deleted before.",
          });
    }


    oldStudent.update({
        Bit_Active: !oldStudent.Bit_Active,
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


})

router.post('/studentActivateAccount',async(req,res,next) =>{
    
    // Get user input
    const { uuid} = req.body;
 
    // check if user already exist
    const oldStudent = await models.student.findOne({
       where:{
         Str_ConfirmationCode:uuid
       }
   });
 
    if (!oldStudent) {
       return res.status(409).json({
           res: false,
           data: "The activation link is not a valid link. please check carefully and try again",
         });
    }
    else {
 
     if (oldStudent.Bit_Active === true)
     {
         return res.status(409).json({
             res: false,
             data: "The account has been activated before! Please login into your account",
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
                 data: "something wrong happend during activating Student. Please try again a bit later!",
             });
        })
     }
 
    }
 
 })

router.put('/editStudentInfo',authToken,async(req,res,next) =>{
    
    // Get user input
    const { studentID, Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,Description } = req.body;

     // check if user already exist
     const oldStudent = await models.student.findOne({
        where:{
            Prk_Student_AutoID:studentID
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

router.get('/getStudentInfoByStudentID',authToken,async(req,res,next) =>{

    // Get user input
    const { gymID,studentID } = req.query;

    if (!gymID) {
        return res.status(409).json({
            res: false,
            data: "gymID is not provided!",
        });
    }

    if (!studentID) {
        return res.status(409).json({
            res: false,
            data: "studentID is not provided!",
        });
    }

    // check if Off Time already exist
    const studentInfo = await models.student.findOne({
        where: {
            Frk_gym: gymID,
            Prk_Student_AutoID: studentID,
        },
    });
     
    if (!studentInfo) {
        return res.status(409).json({
            res: false,
            data: "There is no student related to this specific gym.",
        });
    }
    else
    {
        res.status(200).json({
            res: true,
            data: studentInfo,
        });
    }   

})

router.get('/getStudentInfoByGymID',authToken,async(req,res,next) =>{

    // Get user input
    const { gymID } = req.query;

    if (!gymID) {
        return res.status(409).json({
            res: false,
            data: "gymID is not provided!",
        });
    }

    // check if Off Time already exist
    const studentList = await models.student.findAll({
        where: {
            Frk_gym: gymID,
        },
    });
     
    if (!studentList) {
        return res.status(409).json({
            res: false,
            data: "There is no student related to this specific gym.",
        });
    }
    else
    {
        res.status(200).json({
            res: true,
            data: studentList,
        });
    }   

})

router.get('/getByCourseID',authToken,async(req,res,next) =>{
    
    // Get user input
    const { courseID } = req.body;

    // check if Off Time already exist
    const studentList = await models.studentvcourse.findAll({
        where: {
            Frk_Course: courseID,
        },
    });
     
    if (!studentList) {
        return res.status(409).json({
            res: false,
            data: "There is no student related to this specific course.",
        });
    }
    else
    {
        res.status(200).json({
            res: true,
            data: studentList,
        });
    }   

})


 module.exports = router;  