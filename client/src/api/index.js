export {gymLogin,trainerLogin,studentLogin,registerNewGym,gymActivateAccount,studentActivateAccount,trainerActivateAccount} from './auth';

export {registerNewCourse,editCourse,activeDeactiveCourse,getCourseByGymID,getCourseInfoByID,getEnrolledCoursesByCourseID,
        getEnrolledCoursesByGymID,getUpcomingSessionsByGymID} from './course';

export {editGym} from './gym';

export {registerNewStudent,editStudentInfo,activeDeactiveStudent,newStudentCourseEnrollment,editStudentCourseEnrollment,
        registerStudentAttendance,batchRegisterStudentAttendance,getStudentInfoByGymID,getStudentInfoByStudentID,
        getStudentEnrolledCourses,getStudentEnrolledCoursesByID,getStudentEnrolledCoursesByCourseID,
        getStudentAttendanceListbyGymID,getStudentAttendanceListbyStudentID,getStudentAttendanceListbyCourseID,
        getFinancialStudentBalanceByID,getBillListByStudentID,getBillListByGymID,getPaymentListByStudentID,
        getPaymentListByGymID,registerNewPayment,getNeedToEnrolStudentListByGymID,getDebtorStudentListByGymID} from './student';

export {registerNewTrainer,editTrainer,activeDeactiveTrainer,getTrainerByGymID,getTrainerInfoByTrainerID} from './trainer';

export {getGymDashboardInfo,getStudentDashboardInfo,getTrainerDashboardInfo} from './common';
