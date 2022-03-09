const nodemailer = require("nodemailer");
const {userName,password,port,smpt,confirmationURL} = require('../config/email.config')

const sendEmail = async (gmailAddress,title,content) => {

    let transporter = nodemailer.createTransport({
        host: smpt,
        port: port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: userName, 
          pass: password, 
        },
      });
    

    let info = await transporter.sendMail({
        from: '"Nill Team" <' + userName + '>', // sender address
        to: gmailAddress, // list of receivers
        subject: title, // Subject line
        html: content, // plain text body
    });

    return true;
}

const htmlMaker = (username,link) => {

    let breakLine = '<br>'
    let greating = `<h1>Welcome ${username}! </h1>`
    let message = `<p>To activate your account please click on the below link:</p>`
    let linksection = `<a target="_blank" href='${confirmationURL}/${link}'> ${confirmationURL}/${link}</a>`
    //let Button = `<form action=${confirmationURL}/${link}> <input type="submit" value="Activate your account"/> </form>`
    //let google = `<input type="button" onclick="location.href='${confirmationURL}/${link}';" value="Go to Google" />`

    return greating + message + breakLine + linksection + breakLine + Button + breakLine +  google

}

module.exports = {sendEmail,htmlMaker}