import axios from "axios";

import {apiPath} from "../constants/api.config";
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

const activeDeactiveStudent =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'studentinfo/activeDeactiveStudent',
    {
        id:studentID,
        token
    });

    return res;
}

const getStudentInfoByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

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







const newStudentCourseEnrollment =  async(Course,Student,RegisteredSession,ValidUntillTo) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'student/newStudentCourseEnrollment',
    {
        Course,
        Student,
        RegisteredSession,
        ValidUntillTo,
        token
    });

    return res;
}

const editStudentCourseEnrollment =  async(enrolmentID,Course,Student,RegisteredSession,ValidUntillTo) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.put(apiPath + 'student/editStudentCourseEnrollment',
    {
        enrolmentID,
        Course,
        Student,
        RegisteredSession,
        ValidUntillTo,
        token
    });

    return res;
}

const getStudentEnrolledCourses =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

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

const getStudentEnrolledCoursesByID =  async(enrolmentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentEnrolledCoursesByID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            enrolmentID,
        }
    });

    return res;
}

const getStudentEnrolledCoursesByCourseID =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentEnrolledCoursesByCourseID',
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

const getNeedToEnrolStudentListByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getNeedToEnrolStudentListByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID: gymID
        }
    });

    return res;
}

const getNeedToEnrolStudentListByStudentID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getNeedToEnrolStudentListByStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID
        }
    });

    return res;
}

const getNeedToEnrolStudentListByTrainerID =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getNeedToEnrolStudentListByTrainerID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            trainerID
        }
    });

    return res;
}
 



const registerStudentAttendance =  async(StudentVCourse,Course,Date,Status,AbsentReason,TrainerNote) => {
   
    let token = getFromStorage('JWT_Token') 

    console.log(StudentVCourse);
    console.log(Course);

    let res = await axios.post(apiPath + 'student/registerStudentAttendance',
    {
        StudentVCourse,
        Course,
        Date,
        Status,
        AbsentReason,
        TrainerNote,
        token
    });

    return res;
}

const batchRegisterStudentAttendance =  async(data,date,course) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'student/batchRegisterStudentAttendance',
    {
        data,
        date,
        course,
        token
    });

    return res;
}

const getStudentAttendanceListbyGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentAttendanceListbyGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID,
        }
    });

    return res;
}

const getStudentAttendanceListbyStudentID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentAttendanceListbyStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID,
        }
    });

    return res;
}

const getStudentAttendanceListbyCourseID =  async(courseID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentAttendanceListbyCourseID',
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

const getStudentAttendanceListbyTrainerID =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getStudentAttendanceListbyTrainerID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            trainerID,
        }
    });

    return res;
}





const registerNewPayment =  async(Student,Amount,PayType,OnlinePaymentDetail,TraceNumber,Date) => {
   
    let token = getFromStorage('JWT_Token') 

    let res = await axios.post(apiPath + 'student/registerNewPayment',
    {
        Student,
        Amount,
        PayType,
        OnlinePaymentDetail,
        TraceNumber,
        Date,
        token
    });

    return res;
}

const getFinancialStudentBalanceByID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getFinancialStudentBalanceByID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID,
        }
    });

    return res;
}

const getBillListByStudentID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getBillListByStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID,
        }
    });

    return res;
}

const getBillListByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getBillListByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID,
        }
    });

    return res;
}

const getPaymentListByStudentID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getPaymentListByStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID,
        }
    });

    return res;
}

const getPaymentListByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getPaymentListByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID,
        }
    });

    return res;
}

const getDebtorStudentListByGymID =  async(gymID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getDebtorStudentListByGymID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            gymID,
        }
    });

    return res;
}

const getDebtorStudentListByStudentID =  async(studentID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getDebtorStudentListByStudentID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            studentID,
        }
    });

    return res;
}

const getDebtorStudentListByTrainerID =  async(trainerID) => {
   
    let token = getFromStorage('JWT_Token') 
    

    let res = await axios.get(apiPath + 'student/getDebtorStudentListByTrainerID',
    {
        headers: {
            'x-access-token': token,
        },
        params: {
            trainerID,
        }
    });

    return res;
}


export {registerNewStudent,editStudentInfo,activeDeactiveStudent,newStudentCourseEnrollment,editStudentCourseEnrollment,
                registerStudentAttendance,batchRegisterStudentAttendance,getStudentInfoByGymID,getStudentInfoByStudentID,
                getStudentEnrolledCourses,getStudentEnrolledCoursesByID,getStudentEnrolledCoursesByCourseID,
                getStudentAttendanceListbyGymID,getStudentAttendanceListbyStudentID,getStudentAttendanceListbyCourseID,getStudentAttendanceListbyTrainerID,
                getFinancialStudentBalanceByID,getBillListByStudentID,getBillListByGymID,getPaymentListByStudentID,
                getPaymentListByGymID,registerNewPayment,getNeedToEnrolStudentListByGymID,getNeedToEnrolStudentListByStudentID,
                getNeedToEnrolStudentListByTrainerID,getDebtorStudentListByGymID,getDebtorStudentListByStudentID,getDebtorStudentListByTrainerID};