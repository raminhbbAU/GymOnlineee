import axios from "axios";

import apiPath from "../constants/api.config";

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

const athleteLogin =  async(userName,password) => {

    await axios.post(apiPath + 'student/login',{
        UserName:userName,
        Password:password
    }).then( (res) => {
        return res;
    }).catch( (error) => {
        return Promise.reject(error);
    })
    
}

export default {gymLogin,trainerLogin,athleteLogin};