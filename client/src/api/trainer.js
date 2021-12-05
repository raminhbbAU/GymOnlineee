import axios from "axios";

import apiPath from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const registerNewTrainer =  async(GymID,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail, UserName , Password,  Avatar) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'trainer/registerNewTrainer',
    {
        GymID,
        TrainerName,
        TrainerFamily,
        Mobile,
        WhatsApp,
        Gmail,
        UserName,
        Password,
        Avatar,
        token
    });

    return res;
}

const getTrainerByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'trainer/getTrainerByGymID',
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


export default {getTrainerByGymID,registerNewTrainer};