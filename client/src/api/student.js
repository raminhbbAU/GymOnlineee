import axios from "axios";

import apiPath from "../constants/api.config";

const getByGymID =  async(gymID) => {
   
    let res = await axios.get(apiPath + 'studentinfo/getByGymID',{
        gymID:gymID,
    });

    return res;
}


export default {getByGymID};