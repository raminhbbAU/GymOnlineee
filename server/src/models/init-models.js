let DataTypes = require("sequelize").DataTypes;

let _course = require("./course");
let _courseofftimes = require("./courseofftimes");
let _courseweeklyschedule = require("./courseweeklyschedule");
let _gym = require("./gym");
let _healthparameter = require("./healthparameter");
let _login = require("./login");
let _student = require("./student");
let _studentbill = require("./studentbill");
let _studentCheckinCheckout = require("./studentCheckinCheckout");
let _studentpayment = require("./studentpayment");
let _studentvcourse = require("./studentvcourse");
let _studentVhealthparameter = require("./studentVhealthparameter");
let _trainer = require("./trainer");

init = (sequelize) => {

  let course = _course(sequelize, DataTypes);
  let courseofftimes = _courseofftimes(sequelize, DataTypes);
  let courseweeklyschedule = _courseweeklyschedule(sequelize, DataTypes);
  let gym = _gym(sequelize, DataTypes);
  let healthparameter = _healthparameter(sequelize, DataTypes);
  let login = _login(sequelize, DataTypes);
  let student = _student(sequelize, DataTypes);
  let studentbill = _studentbill(sequelize, DataTypes);
  let studentCheckinCheckout = _studentCheckinCheckout(sequelize, DataTypes);
  let studentpayment = _studentpayment(sequelize, DataTypes);
  let studentvcourse = _studentvcourse(sequelize, DataTypes);
  let studentVhealthparameter = _studentVhealthparameter(sequelize, DataTypes);
  let trainer = _trainer(sequelize, DataTypes);

  return {
    course,courseofftimes,courseweeklyschedule,gym,healthparameter,login
    ,student,studentbill,studentCheckinCheckout,studentpayment,studentvcourse,studentVhealthparameter
    ,trainer
  };
}
module.exports = init;
