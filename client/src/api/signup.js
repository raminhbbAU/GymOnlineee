import axios from "axios";

import apiPath from "../constants/api.config";

const gymSignUp =  async(gymname,ownertitle,mobile,gmail,password) => {
   
    let res = await axios.post(apiPath + 'gym/register',{
        GymName:gymname,
        OwnerTitle:ownertitle,
        Address:'',
        Tel:'0',
        Gmail:gmail,
        Mobile:mobile,
        UserName:gmail,
        Password:password,
        Description:''
    });

    return res;
}


export default {gymSignUp};