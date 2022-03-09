import axios from "axios";
import {apiPath} from "../constants/api.config";


const gymLogin = async(userName,password) => {
   
    let res =  await axios.post(apiPath + 'gym/login',{
        UserName:userName,
        Password:password
    });

    return res;
}

const trainerLogin =  async(userName,password) => {

    await axios.post(apiPath + 'trainer/login',{
        UserName:userName,
        Password:password
    }).then( (res) => {
        return res;
    }).catch( (error) => {
        return Promise.reject(error);
    })

}

const studentLogin =  async(userName,password) => {

    await axios.post(apiPath + 'student/login',{
        UserName:userName,
        Password:password
    }).then( (res) => {
        return res;
    }).catch( (error) => {
        return Promise.reject(error);
    })
    
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


export {gymLogin, trainerLogin, studentLogin, registerNewGym}