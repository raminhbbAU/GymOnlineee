var DataTypes = require("sequelize").DataTypes;

var _tbl_gym = require("./tbl_gym");
var _tbl_student = require("./tbl_student");

init = (sequelize) => {

  console.log(sequelize.models);

  let tbl_gym = _tbl_gym(sequelize, DataTypes);
  let tbl_student = _tbl_student(sequelize, DataTypes);

  return {
    tbl_gym,
    tbl_student,
  };
}
module.exports = init;
