var router = require('express').Router();
//var db = require('../services/sequelizeDb.service.js')

router.get('/', function(req, res, next) {  
   
    // let tbl_gym = new db().getInstance().models.tbl_gym;
    
    // tbl_gym.findAll()
    // .then(gym => {
    //   console.log(gym);
    //   res.status(200).send(gym);
    // })
    // .catch(error => {
    //   console.log(error);
    //   res.status(402).send(error);
    // })

 });

 module.exports = router;  