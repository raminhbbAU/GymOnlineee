const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('login',{
        Prk_LoginLogID:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Gym:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_Trainer:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_Student:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_TokenType:{ // 1: GymOwner   2:Trainer   3:Student
            type: DataTypes.INTEGER,
            allowNull: false
        },
        str_Token:{
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        Str_TokenExpire:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Str_LoginDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_LoginTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        }
    })
}