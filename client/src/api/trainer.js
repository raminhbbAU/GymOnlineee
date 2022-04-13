import axios from "axios";

import {apiPath} from "../constants/api.config";
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

const editTrainer =  async(trainerID,TrainerName , TrainerFamily,  Mobile,  WhatsApp,  Gmail,  Avatar) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'trainer/editTrainer',
    {
        id:trainerID,
        TrainerName,
        TrainerFamily,
        Mobile,
        WhatsApp,
        Gmail,
        Avatar,
        token
    });

    return res;
}


const activeDeactiveTrainer =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'trainer/activeDeactiveTrainer',
    {
        id:trainerID,
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

const getTrainerInfoByTrainerID =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'trainer/getTrainerInfoByTrainerID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            trainerID:trainerID,
        }
    });

    return res;
}


export {registerNewTrainer,editTrainer,activeDeactiveTrainer,getTrainerByGymID,getTrainerInfoByTrainerID};