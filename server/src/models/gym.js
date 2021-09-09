const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes)  {

  return sequelize.define('gym', {

    Prk_Gym_AutoID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Str_GymName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_OwnerTitle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Address: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Str_Tel: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Gmail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Mobile: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Str_UserName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    timestamps: false
  });

};
