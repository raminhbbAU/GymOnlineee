const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer',{
        Prk_Trainer:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_gym:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_TrainerName:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        Str_TrainerFamily:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        Str_Mobile:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Str_WhatsApp:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Str_Gmail:{
            type: DataTypes.STRING(100),
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
        Str_Avatar:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        Bit_Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Str_ConfirmationCode: {
          type: DataTypes.STRING(5000),
          allowNull: false
        }
    },
    {
        timestamps: false
    })
}