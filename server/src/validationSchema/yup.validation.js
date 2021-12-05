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
const activationValidator = yup.boolean('Activation status is required.').required('it is required')
const dateValidator = yup.date('the given date is invalid.').required('it is required')
const percentageValidator = yup.number('the given value is not a valid number').required('it is required').min(0,'The valid number is between 0 to 100.').max(100,'The valid number is between 0 to 100.')

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
    Birthday:yup.date().required('The birthday is required'),
    UserName:userNameValidator,
    Password:passwordValidator,
    Description:descriptionValidator
})

const studentLoginSchema = yup.object({
    UserName:userNameValidator,
    Password:passwordValidator,
})


const courseRegisterSchema = yup.object({
    CourseName:yup.string().required('Course Name is required.').min(3,'Course Name is too short.').max(100,'Course Name is too long'),
    CourseDescription:descriptionValidator,
    GymID: yup.number().min(1,'The specific gym is not valid'),
    TrainerID: yup.number().min(1,'The specific trainer is not valid'),
    Active:activationValidator,
    StartDate: dateValidator,
    EndDate: dateValidator,
    TrainerPercent:percentageValidator,
    CourseType:yup.number('the course type is invalid').min(1,'the course type is invalid').max(2,'the course type is invalid'),
    PerSessionCost:yup.number('the Per session cost is invalid').min(1,'the Per session cost is invalid').max(999999999,'the Per session cost is invalid')
})

module.exports = {
    gymRegisterSchema,gymLoginSchema,
    trainerRegisterSchema,trainerLoginSchema,
    studentRegisterSchema,studentLoginSchema,
    courseRegisterSchema
}