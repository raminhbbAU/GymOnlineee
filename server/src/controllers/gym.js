var router = require('express').Router();

router.get('/', function(req, res, next) {  
    console.log("gym called!");
 });


 module.exports = router;  