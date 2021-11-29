import * as yup from 'yup';

const addressValidator = yup.string().max(300,'Address is too long.')
const telValidator = yup.number("Tel doesn't accept characters");
const gmailValidator = yup.string().required('The valid Gmail address is required').email('The provided email is not a valid Gmail address.');
const mobileValidator =  yup.number().required('The mobile number is required').min(11,'The mobile number should contain 11 digits.')
const userNameValidator =  yup.string().required('The username is required.').min(3,'The username is too short').max(100,'The username is too long.');
const passwordValidator =  yup.string().required('The password is required.').min(3,'The password is too short').max(100,'The password is too long.');
const descriptionValidator =  yup.string().max(500,'Description is too long.')
const nameValidator = yup.string().required('The Name is required.').min(3,'Name is too short.').max(300,'Name is too long.')
const familyValidator = yup.string().required('The Family is required.').min(3,'Name is too short.').max(300,'Family is too long.')


const studentRegisterSchema = yup.object({
    Name:nameValidator ,
    Family:familyValidator,
    Mobile:mobileValidator,
    WhatsApp:mobileValidator,
    Telegram:mobileValidator,
    Gmail:gmailValidator,
    Address:addressValidator,
    Birthday:yup.date().required('The birthday is required'),
    UserName:userNameValidator,
    Password:passwordValidator,
    Description:descriptionValidator
})

export {studentRegisterSchema}