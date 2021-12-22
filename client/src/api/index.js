export {gymLogin,trainerLogin,studentLogin,registerNewGym} from './auth';
export {registerNewCourse,editCourse,getCourseByGymID,getCourseInfoByID,getEnrolledCoursesByCourseID,getEnrolledCoursesByGymID} from './course';
export {editGym} from './gym';
export {registerNewStudent,editStudentInfo,newStudentCourseEnrollment,editStudentCourseEnrollment,
        registerStudentAttendance,batchRegisterStudentAttendance,getStudentInfoByGymID,getStudentInfoByStudentID,
        getStudentEnrolledCourses,getStudentEnrolledCoursesByID,getStudentEnrolledCoursesByCourseID,
        getStudentAttendanceListbyGymID,getStudentAttendanceListbyStudentID,getStudentAttendanceListbyCourseID,
        getFinancialStudentBalanceByID,getBillListByStudentID,getBillListByGymID,getPaymentListByStudentID,
        getPaymentListByGymID} from './student';
export {getTrainerByGymID,registerNewTrainer} from './trainer';
