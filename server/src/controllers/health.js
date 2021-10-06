const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

router.post('/register',authToken,async(req,res,next) =>{
    
  // Get user input
  const {HealthParameterName,description,Constant,AskEveryXDay,Graph,IsRequired} = req.body;

  // check if course already exist
  const oldHealthParameters = await models.healthparameter.findOne({
    where: {
        Str_HealthParameterName: HealthParameterName,
    },
  });

  if (oldHealthParameters) {
    return res.status(409).json({
      res: false,
      data: "This Health Parameter name is already exist. please edit it or try to choose another unique name.",
    });
  }

  models.healthparameter
    .create({
      Str_HealthParameterName: HealthParameterName,
      Str_description: description,
      Bit_Constant: Constant,
      Int_AskEveryXDay: AskEveryXDay,
      bit_Graph: Graph,
      Bit_IsRequired: IsRequired,
    })
    .then((course) => {
      res.status(200).json({
        res: true,
        data: course,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during registering new health parameter. Please try again a bit later!",
      });
    });

})

router.put('/edit',authToken,async(req,res,next) =>{
    
  // Get user input
  const {id, HealthParameterName,description,Constant,AskEveryXDay,Graph,IsRequired} = req.body;


  // check if course already exist
  const oldHealthParameters = await models.healthparameter.findOne({
    where: {
        Prk_HealthParameter: id,
    },
  });

  if (!oldHealthParameters) {
    return res.status(409).json({
      res: false,
      data: "The specific health parameter doesn't exist! it must've deleted before.",
    });
  }

  //TOOD: check class activity, it can't be deleted if there were established seasions.

  oldHealthParameters
    .update({
        Str_HealthParameterName: HealthParameterName,
        Str_description: description,
        Bit_Constant: Constant,
        Int_AskEveryXDay: AskEveryXDay,
        bit_Graph: Graph,
        Bit_IsRequired: IsRequired,
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
        data: "something wrong happend during editing health parameter. Please try again a bit later!",
      });
    });

})

router.delete('/delete',authToken,async(req,res,next) =>{
   
    // Get user input
    const {id} = req.body;


    // check if course already exist
    const oldHealthParameters = await models.healthparameter.findOne({
    where: {
        Prk_HealthParameter: id,
    },
    });

    if (!oldHealthParameters) {
      return res.status(409).json({
        res: false,
        data: "The specific health parameter doesn't exist! it must've deleted before.",
      });
    }

    oldHealthParameters.destroy()
    .then((rowDeleted) => {
      if (rowDeleted === 1) {
        res.status(200).json({
          res: true,
          data: updatedrecord,
        });
      } else {
        res.status(200).json({
          res: false,
          data: "something wrong happend during deleting health parameter. Please try again a bit later!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        res: false,
        data: "something wrong happend during deleting health parameter. Please try again a bit later!",
      });
    });


})

 module.exports = router;  