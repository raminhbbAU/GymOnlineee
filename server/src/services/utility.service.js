const { v4: uuidv4 } = require('uuid');

const getDate = () => {
    var today = new Date();
    return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
}

const getTime = () => {
    var today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
}


const getFirstDayOfMonth = () => {
    var today = new Date();
    return `${today.getFullYear()}/${(today.getMonth()+1).toString().padStart(2, '0')}/01`
}

const getLastDayOfMonth = () => {
    var today = new Date();
    var targetDate = new Date(today.getFullYear(),today.getMonth()+1, 0);
    return `${targetDate.getFullYear()}/${(targetDate.getMonth()+1).toString().padStart(2, '0')}/${targetDate.getDate().toString().padStart(2, '0')}`
}

const getDayOfWeek = () => {
    var today = new Date();
    return today.getDay();
}


const generateUUID = () => {
    return uuidv4();
}

module.exports = {getDate,getTime,getFirstDayOfMonth,getLastDayOfMonth,getDayOfWeek,generateUUID}