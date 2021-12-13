import axios from "axios";

import apiPath from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const registerNewCourse =  async(GymID,CourseName,CourseDescription,TrainerID, Active,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'course/registerNewCourse',
    {
        GymID,
        CourseName,
        CourseDescription,
        TrainerID,
        Active,
        StartDate,
        EndDate,
        TrainerPercent,
        CourseType,
        PerSessionCost,
        token
    });

    return res;
}

const editCourse =  async(courseID,CourseName,CourseDescription,trainerID,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'course/editCourse',
    {
        courseID,
        CourseName,
        CourseDescription,
        trainerID,
        StartDate,
        EndDate,
        TrainerPercent,
        CourseType,
        PerSessionCost,
        token
    });

    return res;
}

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

const getCourseInfoByID =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getCourseInfoByID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            courseID,
        }
    });

    return res;
}

const getEnrolledCourses =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getEnrolledCourses',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            courseID: courseID,
        }
    });

    return res;
}

export default {registerNewCourse,editCourse,getCourseByGymID,getCourseInfoByID,getEnrolledCourses};