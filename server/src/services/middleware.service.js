const bodyParser = require('body-parser');
const cors = require('cors');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');


// setup global middleware here
module.exports = (app) => {

  console.log('middleware initialization >>>>>>')
 
  dotenv.config();

  const PORT = 3000;
  var corsOptions = {origin: [`http://localhost:${PORT}`,`http://localhost:3001`]}; 
  
  app.use(cors(corsOptions));
  //app.use(favicon(path.join(__dirname, '../../src/favicon.ico')));
  
  app.use(logger('dev'));
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(cookieParser());
};
