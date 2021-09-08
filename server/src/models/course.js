const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("course",{
        Prk_Course:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Str_CourseName:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Str_CourseDescription:{
            type: DataTypes.STRING(500),
            allowNull: false
        },
        Frk_Trainer:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Bit_Active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Str_StartDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_EndDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Int_TrainerPercent:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_CourseType:{ // 1:Gym  2:Online
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_PerSessionCost:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    ,{
        timestamps: false
    })
}