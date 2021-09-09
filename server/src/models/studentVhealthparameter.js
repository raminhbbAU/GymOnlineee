const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studentvhealthparameter',{
        Prk_StudentVHealthParameter:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_student:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_HealthParameter:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_Value:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        Str_RegisterDate:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_RegisterTime:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Str_Description:{
            type: DataTypes.STRING(5000),
            allowNull: false
        }

    },{
        timestamps: false
    })
}