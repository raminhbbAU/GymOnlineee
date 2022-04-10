import axios from "axios";
import {apiPath} from "../constants/api.config";


const gymLogin = async(userName,password) => {
   
    let res =  await axios.post(apiPath + 'gym/gymLogin',{
        UserName:userName,
        Password:password
    });

    return res;
}

const trainerLogin =  async(userName,password) => {

    let res =  await axios.post(apiPath + 'trainer/trainerlogin',{
        UserName:userName,
        Password:password
    });

    return res;

}

const studentLogin =  async(userName,password) => {

    let res =  await axios.post(apiPath + 'student/studentLogin',{
        UserName:userName,
        Password:password
    });

    return res;
}

const registerNewGym =  async(gymname,mobile,gmail,password) => {
   
    let res = await axios.post(apiPath + 'gym/registerNewGym',{
        GymName:gymname,
        OwnerTitle:gymname,
        Gmail:gmail,
        Mobile:mobile,
        UserName:gmail,
        Password:password,
    });

    return res;
}

const gymActivateAccount =  async(uuid) => {
   
    let res = await axios.post(apiPath + 'gym/gymActivateAccount',{
        uuid
    });

    return res;
}

const studentActivateAccount =  async(uuid) => {
   
    let res = await axios.post(apiPath + 'student/studentActivateAccount',{
        uuid
    });

    return res;
}

const trainerActivateAccount =  async(uuid) => {
   
    let res = await axios.post(apiPath + 'trainer/trainerActivateAccount',{
        uuid
    });

    return res;
}

export {gymLogin, trainerLogin, studentLogin, registerNewGym,gymActivateAccount,studentActivateAccount,trainerActivateAccount}