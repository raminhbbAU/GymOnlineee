import axios from "axios";

import apiPath from "../constants/api.config";
import {setToStorage,getFromStorage,removeFromStorage,removeAllFromStorage} from "../storage/localstorage.js";

//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuaWxvb2JraC5hdUBnbWFpbC5jb20iLCJpYXQiOjE2MzgwNzg3NzQsImV4cCI6MTYzODA4MjM3NH0.txAeYd_pEhAk9f3q7Kv8xL68nOmDpGQgWt7E9i-rDe8';

const getByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'studentinfo/getStudentInfoByGymID',
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


export default {getByGymID};