import axios from "axios";

import apiPath from "../constants/api.config";

const login = async(userName,password,type) => {
    switch(type){
        case "Gym":
            return await gymLogin(userName,password);
            break;
        case "Trainer":
            return await trainerLogin(userName,password);
            break;
        case "Athlete":
            return await athleteLogin(userName,password);
            break;
        default:
            throw 'The usertype is not defined';
            break;
    }
}

const gymLogin =  async(userName,password) => {
   
    await axios.post(apiPath + 'gym/login',{
        UserName:userName,
        Password:password
    }).then( (res) => {
        return res;
    }).catch( (error) => {
        return Promise.reject(error);
    })
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

export default {login};