const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('courseofftimes',{
        Prk_CourseOffTimes:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Course:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_Date:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_StartTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_EndTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_Reason:{
            type: DataTypes.STRING(5000),
            allowNull: false
        }
    },{
        timestamps: false
    })
}