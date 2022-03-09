import axios from "axios";

import {apiPath} from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";



const getDashboardInfo =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.get(apiPath + 'common/getDashboardInfo',
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

export {getDashboardInfo};