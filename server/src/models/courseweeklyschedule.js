const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("courseweeklyschedule",{
        Prk_CourseWeeklySchedule:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Course:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_DayOfWeek:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_StartTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_EndTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}