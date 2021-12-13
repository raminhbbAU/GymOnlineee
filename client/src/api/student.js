import axios from "axios";

import apiPath from "../constants/api.config";
import {setToStorage,getFromStorage,removeFromStorage,removeAllFromStorage} from "../storage/localstorage.js";

//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuaWxvb2JraC5hdUBnbWFpbC5jb20iLCJpYXQiOjE2MzgwNzg3NzQsImV4cCI6MTYzODA4MjM3NH0.txAeYd_pEhAk9f3q7Kv8xL68nOmDpGQgWt7E9i-rDe8';

const registerNewStudent =  async(gymID,Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,UserName,Password,Description) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'studentinfo/registerNewStudent',
    {
        gymID,
        Name,
        Family,
        Mobile,
        WhatsApp,
        Telegram,
        Gmail,
        Address,
        Birthday,
        UserName,
        Password,
        Description,
        token
    });

    return res;
}

const editStudentInfo =  async(studentID,Name,Family,Mobile,WhatsApp,Telegram,Gmail,Address,Birthday,UserName,Password,Description) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'studentinfo/editStudentInfo',
    {
        studentID,
        Name,
        Family,
        Mobile,
        WhatsApp,
        Telegram,
        Gmail,
        Address,
        Birthday,
        UserName,
        Password,
        Description,
        token
    });

    return res;
}

const getStudentInfoByGymID =  async(gymID) => {
   
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

const getStudentInfoByStudentID =  async(gymID,studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'studentinfo/getStudentInfoByStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID: gymID,
            studentID: studentID,
        }
    });

    return res;
}

const getStudentEnrolledCourses =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'student/getStudentEnrolledCourses',
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

export default {registerNewStudent,editStudentInfo,getStudentInfoByGymID,getStudentInfoByStudentID,getStudentEnrolledCourses};