import axios from "axios";

import {apiPath} from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";



const getGymDashboardInfo =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.get(apiPath + 'common/getGymDashboardInfo',
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


const getStudentDashboardInfo =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.get(apiPath + 'common/getStudentDashboardInfo',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID: studentID,
        }
    });

    return res;
}

const getTrainerDashboardInfo =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.get(apiPath + 'common/getTrainerDashboardInfo',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            trainerID: trainerID,
        }
    });

    return res;
}

export {getGymDashboardInfo,getStudentDashboardInfo,getTrainerDashboardInfo};