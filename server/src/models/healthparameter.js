const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('healthparameter',{
        Prk_HealthParameter:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Str_HealthParameterName:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        Str_description:{
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        Bit_Constant:{ // blood Group
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Int_AskEveryXDay:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bit_Graph:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Bit_IsRequired:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        timestamps: false
    })
}