const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    Prk_Student_AutoID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Frk_gym:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Str_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Family: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Mobile: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Str_WhatsApp: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Str_Telegram: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Str_Gmail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Str_Address: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Str_Birthday: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Str_RegisterDate: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Str_RegisterTime: {
      type: DataTypes.STRING(10),
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
    Bit_Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Str_Description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Str_ConfirmationCode: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, 
  {
    timestamps: false
  });
};
