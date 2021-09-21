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
   
    console.log(apiPath);

    axios.post(apiPath + 'gym/login',{
        UserName:userName,
        Password:password
    }).then( (res) => {
        console.log(res);
    }).catch( (error) => {
        console.log('something wrong happen!!!!!');
        console.log(error);
    })
}

const trainerLogin =  async(userName,password) => {
    throw 'this service is unreachable now.'
    return 1;
}

const athleteLogin =  async(userName,password) => {
    throw 'this service is unreachable now.'
    return 1;
}

export default {login};