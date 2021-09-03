var DataTypes = require("sequelize").DataTypes;
var _tbl_gym = require("./tbl_gym");
var _tbl_student = require("./tbl_student");

function initModels(sequelize) {
  var tbl_gym = _tbl_gym(sequelize, DataTypes);
  var tbl_student = _tbl_student(sequelize, DataTypes);

  return {
    tbl_gym,
    tbl_student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
