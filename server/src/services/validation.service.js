const yup = require('yup');

const { GymName,OwnerTitle,Address,Tel,Gmail,Mobile,UserName,Password,Description} = req.body;


const gymRegisterValidator = yup.object({
    GymName:yup.string().required('Gym Name is required.').min(3,'Gym Name is too short.').max(100,'Gym Name is too long'),
    OwnerTitle:yup.string().required('Gym Name is required.').min(3,'Gym Name is too short.').max(100,'Gym Name is too long'),
    Address: yup.string().max(300,'Address is too long.'),
    Tel: yup.number("Tel doesn't accept characters"),
    Gmail: yup.string().required('The Valid Gmail address is required').matches('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$','The provided email is not a valid Gmail address.'),
    Mobile: yup.string(),
    UserName:yup.string(),
    Password:yup.string(),
    Description: yup.string().max(500,'Description is too long.')
})

module.exports = {gymRegisterValidator}