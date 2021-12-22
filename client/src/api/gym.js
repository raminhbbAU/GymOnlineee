import axios from "axios";

import apiPath from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const editGym =  async(GymID,GymName,OwnerTitle,Address,Tel,Gmail,Mobile,UserName,Password,Description) => {

    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'gym/editGym',
    {
        GymID,
        GymName,
        OwnerTitle,
        Address,
        Tel,
        Gmail,
        Mobile,
        UserName,
        Password,
        Description,
        token
    });

    return res;
}


export  {editGym};