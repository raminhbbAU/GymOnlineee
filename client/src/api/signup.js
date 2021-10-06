import axios from "axios";

import apiPath from "../constants/api.config";

const gymSignUp =  async(gymname,mobile,gmail,password) => {
   
    let res = await axios.post(apiPath + 'gym/register',{
        GymName:gymname,
        Gmail:gmail,
        Mobile:mobile,
        UserName:gmail,
        Password:password,
    });

    return res;
}


export default {gymSignUp};