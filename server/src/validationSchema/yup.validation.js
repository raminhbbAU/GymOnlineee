const yup = require('yup');


const addressValidator = yup.string().max(300,'Address is too long.')
const telValidator = yup.number("Tel doesn't accept characters");
const gmailValidator = yup.string().required('The valid Gmail address is required').email('The provided email is not a valid Gmail address.');
const mobileValidator =  yup.number().required('The mobile number is required').min(11,'The mobile number should contain 11 digits.')
const userNameValidator =  yup.string().required('The username is required.').min(3,'The username is too short').max(100,'The username is too long.');
const passwordValidator =  yup.string().required('The password is required.').min(3,'The password is too short').max(100,'The password is too long.');
const descriptionValidator =  yup.string().max(500,'Description is too long.')
const nameValidator = yup.string().required('The Name is required.').min(3,'Name is too short.').max(300,'Name is too long.')
const familyValidator = yup.string().required('The Family is required.').min(3,'Name is too short.').max(300,'Family is too long.')


const gymRegisterSchema = yup.object({
    GymName:yup.string().required('Gym Name is required.').min(3,'Gym Name is too short.').max(100,'Gym Name is too long'),
    OwnerTitle:yup.string().required('Owner Title is required.').min(3,'Owner Title is too short.').max(100,'Gym Name is too long'),
    Address: addressValidator,
    Tel: telValidator,
    Gmail: gmailValidator,
    Mobile:mobileValidator,
    UserName:userNameValidator,
    Password:passwordValidator,
    Description: descriptionValidator
})

const gymLoginSchema = yup.object({
    UserName:userNameValidator,
    Password:passwordValidator,
})


const trainerRegisterSchema = yup.object({
    TrainerName:nameValidator,
    TrainerFamily:familyValidator,
    Mobile:mobileValidator,
    WhatsApp:mobileValidator,
    Gmail:gmailValidator,
    UserName:userNameValidator,
    Password:passwordValidator,
    Avatar:yup.string()
})

const trainerLoginSchema = yup.object({
    UserName:userNameValidator,
    Password:passwordValidator,
})


const studentRegisterSchema = yup.object({
    Name:nameValidator ,
    Family:familyValidator,
    Mobile:mobileValidator,
    WhatsApp:mobileValidator,
    Telegram:mobileValidator,
    Gmail:gmailValidator,
    Address:addressValidator,
    Birthday:yup.required().date(),
    UserName:userNameValidator,
    Password:passwordValidator,
    Description:descriptionValidator
})

const studentLoginSchema = yup.object({
    UserName:userNameValidator,
    Password:passwordValidator,
})

module.exports = {
    gymRegisterSchema,gymLoginSchema,
    trainerRegisterSchema,trainerLoginSchema,
    studentRegisterSchema,studentLoginSchema
}