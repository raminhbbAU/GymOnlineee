const {router,models,bcrypt,jwt,authToken,yupValidator} = require('./index')
const { gymRegisterSchema, gymLoginSchema } = require('../validationSchema/yup.validation.js');

router.post('/register',authToken,async(req,res,next) =>{
    res.send('the register API called');
})

router.put('/edit',authToken,async(req,res,next) =>{
    res.send('the edit API called');
})

router.delete('/delete',authToken,async(req,res,next) =>{
    res.send('the delete API called');
})

 module.exports = router;  