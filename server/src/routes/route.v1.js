let router = require('express').Router();


// const gym = require('./routes/gym');
// const course = require('./routes/course.js');

// router.use('/',gym,course)

router.use('/gym', require('../controllers/gym'));  
router.use('/trainer', require('../controllers/trainer'));  
router.use('/student', require('../controllers/student'));  


module.exports = router;