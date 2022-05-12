import axios from "axios";

import {apiPath} from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const getGymByID =  async(gymID) => {

    let token = getFromStorage('JWT_Token') 
    
    let res = await axios.get(apiPath + 'gym/getGymByID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID,
        }
    });

    return res;
}


const editGym =  async(GymID,GymName,OwnerTitle,Address,Tel,Gmail,Mobile,UserName,Password,Description) => {

    let token = getFromStorage('JWT_Token') 
    console.log(GymID);

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


export  {editGym,getGymByID};