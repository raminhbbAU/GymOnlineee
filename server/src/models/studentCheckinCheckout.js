const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("studentcheckincheckout",{
        Prk_StudentCheckInCheckOut:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_StudentVCourse:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_Course:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_Date:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Int_Status:{ //1:Present   2:Absent   3:AbsentWithReason
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_AbsentReason:{
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        Str_TrainerNote:{
            type: DataTypes.STRING(5000),
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}