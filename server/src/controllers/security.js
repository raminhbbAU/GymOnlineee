const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

router.post('/forgetPasswordbyGmail', async(req,res,next) => {
    res.send('the forgetPasswordbyGmail API called');
})

router.post('/forgetPasswordbyMobile', async(req,res,next) => {
    res.send('the forgetPasswordbyMobile API called');
})


 module.exports = router;  