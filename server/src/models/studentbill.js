const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("studentbill",{
        Prk_StudentBill:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Student:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_StudentCourse:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_Diet:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_BillType:{  // 1:Course 2:Diet
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_Title:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        Int_Amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_GenerateDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_GenerateTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}