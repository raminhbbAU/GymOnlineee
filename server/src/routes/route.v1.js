let router = require('express').Router();

const fs = require('fs');
const path = require('path');


fs.readdirSync(path.join(__dirname, '..','controllers'))
  .forEach(file => {
    if (file !== 'index.js')
    {
      router.use('/' + file.replace('.js',''), require('../controllers/' + file.replace('.js','')));  
    }
  })

module.exports = router;