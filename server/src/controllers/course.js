var router = require('express').Router();
var sequelize = require("sequelize");

var initModels = require("../models/init-models");

router.get('/', function(req, res, next) {  
    console.log("course called!");
   
    var models = initModels(sequelize);
    console.log(models);

    models.User.findAll().then({
        
    });

   
    res.json('this is a fucking course');
 });


 module.exports = router;  