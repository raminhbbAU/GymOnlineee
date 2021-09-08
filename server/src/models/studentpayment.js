const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("studentpayment",{
        Prk_StudentPayment:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Frk_Student:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_Amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Int_PayType:{ // 1: Cash  2:Card-Transfer 3:Online
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Frk_OnlinePaymentDetail:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Str_TraceNumber:{
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}