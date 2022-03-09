import axios from "axios";

import {apiPath} from "../constants/api.config";
import {getFromStorage} from "../storage/localstorage.js";


const registerNewCourse =  async(GymID,CourseName,CourseDescription,TrainerID, Active,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,TimeFrom,TimeTo) => {
   
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
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        TimeFrom,
        TimeTo,
        token
    });

    return res;
}

const editCourse =  async(courseID,CourseName,CourseDescription,trainerID,StartDate,EndDate,TrainerPercent,CourseType,PerSessionCost,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,TimeFrom,TimeTo) => {
   
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
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        TimeFrom,
        TimeTo,
        token
    });

    return res;
}

const activeDeactiveCourse =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'course/activeDeactiveCourse',
    {
        id:courseID,
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

const getEnrolledCoursesByCourseID =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getEnrolledCoursesByCourseID',
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

const getEnrolledCoursesByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getEnrolledCoursesByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID
        }
    });

    return res;
}

const getUpcomingSessionsByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    console.log(token);

    let res = await axios.get(apiPath + 'course/getUpcomingSessionsByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID
        }
    });

    return res;
}

export {registerNewCourse,editCourse,activeDeactiveCourse,getCourseByGymID,getCourseInfoByID,getEnrolledCoursesByCourseID,getEnrolledCoursesByGymID,getUpcomingSessionsByGymID};