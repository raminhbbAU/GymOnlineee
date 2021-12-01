import axios from "axios";

import apiPath from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const getCourseByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getCourseByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID: gymID,
        }
    });

    return res;
}


export default {getCourseByGymID};