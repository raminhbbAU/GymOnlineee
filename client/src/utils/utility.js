const getDate = () => {
    var today = new Date();
    return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
}

const getTime = () => {
    var today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
}

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {getDate,getTime,delay}