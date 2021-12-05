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
const activationValidator = yup.boolean('Activation status is required.').required('it is required')
const dateValidator = yup.date('the given date is invalid.').required('it is required')
const percentageValidator = yup.number('the given value is not a valid number').required('it is required').min(0,'The valid number is between 0 to 100.').max(100,'The valid number is between 0 to 100.')


const studentRegisterSchema = yup.object({
    Name:nameValidator ,
    Family:familyValidator,
    Mobile:mobileValidator,
    WhatsApp:mobileValidator,
    Telegram:mobileValidator,
    Gmail:gmailValidator,
    Address:addressValidator,
    Birthday:yup.date().required('The birthday is required'),
    // UserName:userNameValidator,
    // Password:passwordValidator,
    Description:descriptionValidator
})


const trainerRegisterSchema = yup.object({
    TrainerName:nameValidator,
    TrainerFamily:familyValidator,
    Mobile:mobileValidator,
    WhatsApp:mobileValidator,
    Gmail:gmailValidator
    // UserName:userNameValidator,
    // Password:passwordValidator,
    // Avatar:yup.string()
})


const courseRegisterSchema = yup.object({
    CourseName:yup.string().required('Course Name is required.').min(3,'Course Name is too short.').max(100,'Course Name is too long'),
    CourseDescription:descriptionValidator,
    StartDate: dateValidator,
    EndDate: dateValidator,
    TrainerPercent:percentageValidator,
    CourseType:yup.number('the course type is invalid').min(1,'the course type is invalid').max(2,'the course type is invalid'),
    PerSessionCost:yup.number('the Per session cost is invalid').min(1,'the Per session cost is invalid').max(999999999,'the Per session cost is invalid')
})


export {studentRegisterSchema,trainerRegisterSchema,courseRegisterSchema}