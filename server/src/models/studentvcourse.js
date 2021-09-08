const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("studentvcourse",{
        Prk_StudentVCourse:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Course:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_student:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_RegisterDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_RegisterTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },{
        timestamps: false
    })
}