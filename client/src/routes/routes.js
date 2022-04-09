import { Navigate, useRoutes } from 'react-router-dom';

import {getFromStorage} from "../storage/localstorage.js";

// layouts
import DashboardLayout from '../layout/dashboardLayout';
import SimpleLayout from '../layout/simpleLayout/simpleLayout';


import DashboardApp from '../pages/dashboard/DashboardApp';
import GymForm from '../pages/gym/gymform';
import Trainer from '../pages/trainer/trainer';
import NewTrainer from '../pages/trainer/trainerform';
import Course from '../pages/course/course';
import NewCourse from '../pages/course/courseform';
import Student from '../pages/student/student';
import NewStudent from '../pages/student/studentform';
import Enrolment from '../pages/enrolment/enrolment';
import NewEnrolment from '../pages/enrolment/enrolmentform';
import NotFound from '../pages/page404/page404';
import CheckIn from '../pages/checkin/checkIn';
import NewCheckIn from '../pages/checkin/checkInForm';
import StudentBalance from '../pages/balance/studentbalance';
import StudentBill from '../pages/bill/bill';
import StudentPayment from '../pages/payment/payment';
import NewPayment from '../pages/payment/paymentform';
import ConfirmationSendMessage from '../pages/confirmationmessage/ConfirmationSendMessage.js';
import EmailConfirmation from '../pages/confirmationmessage/EmailConfirmation.js';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';




// ----------------------------------------------------------------------

export default function Router() {

  const isAuth = getFromStorage('isAuth') || false;
  const logininfo = JSON.parse(getFromStorage('logininfo')) || null;

  const myRoute = (isAuth && logininfo) ? authRoutes(logininfo) : nonAuthRoutes() ;

  return useRoutes(myRoute);
}

const nonAuthRoutes = () => {

  return (
    [
      {path: '',element: <Login />},
      {path: '/',element: <Login />},
      {path: '*',element: <Navigate to="/login" replace />,},
      {path: 'login',element: <Login />,},
      {path: 'signup',element: <Signup />,},
      {path: 'gymSignup',element: <Signup />,},
      {path: '404',element: <NotFound />,},
      {path: 'ConfirmationSendMessage',element: <ConfirmationSendMessage />,},
      {path: 'emailconfirmation',element: <EmailConfirmation />,}
    ]
  )
} 

const authRoutes = (logininfo) => {

    if (!logininfo) return nonAuthRoutes();

    switch (logininfo.loginType) {
      case 'gym':
        return gymRoutes();
        break;
      case 'student':
        return studentRoutes();
        break;
      case 'trainer':
        return trainerRoutes();
        break;
      default:
        return nonAuthRoutes();
        break;
    }

}

const gymRoutes = () => {

  return(
    [
      {
        path: '/gym',
        element: <DashboardLayout />,
        children: [
          { path: 'Dashboard', element: <DashboardApp /> },
          { path: 'Gym', element: <GymForm /> },
          { path: 'Trainer', element: <Trainer /> },
          { 
            path: 'NewTrainer', 
            element: <NewTrainer />,
            children: [
              { path: ':trainerID', element: <NewTrainer /> },
            ]
          },
          { path: 'Course', element: <Course /> },
          { 
            path: 'NewCourse', 
            element: <NewCourse />,
            children: [
              { path: ':courseID', element: <NewCourse /> },
            ]
          },
          { path: 'Student', element: <Student /> },
          { 
            path: 'NewStudent', 
            element: <NewStudent />,
            children: [
              { path: ':studentID', element: <NewStudent /> },
            ]
          },
          { path: 'Enrolment', element: <Enrolment /> },
          { 
            path: 'NewEnrolment', 
            element: <NewEnrolment />,
            children: [
              { path: ':enrolmentID', element: <NewEnrolment /> },
            ]
          },
          { 
            path: 'EnrolmentByCourse', 
            element: <Enrolment />,
            children: [
              { path: ':courseID', element: <Enrolment /> },
            ]
          },
          { 
            path: 'EnrolmentByStudent', 
            element: <Enrolment />,
            children: [
              { path: ':studentID', element: <Enrolment /> },
            ]
          },
          { path: 'CheckIn', element: <CheckIn /> },
          { 
            path: 'NewCheckIn', 
            element: <NewCheckIn />,
            children: [
              { path: ':studentCheckInCheckOutId', element: <NewCheckIn/> },
            ]
          },
          { 
            path: 'CheckInByCourse', 
            element: <CheckIn />,
            children: [
              { path: ':courseID', element: <CheckIn /> },
            ]
          },
          { 
            path: 'CheckInByStudent', 
            element: <CheckIn />,
            children: [
              { path: ':studentID', element: <CheckIn /> },
            ]
          },
          { 
            path: 'StudentBalance', 
            element: <StudentBalance />,
            children: [
              { path: ':studentID', element: <StudentBalance /> },
            ]
          },
          { path: 'Bill', element: <StudentBill /> },
          { 
            path: 'BillByStudent', 
            element: <StudentBill />,
            children: [
              { path: ':studentID', element: <StudentBill /> },
            ]
          },
          { path: 'Payment', element: <StudentPayment /> },
          { 
            path: 'PaymentByStudent', 
            element: <StudentPayment />,
            children: [
              { path: ':studentID', element: <StudentPayment /> },
            ]
          },
          { path: 'newpayment', element: <NewPayment /> },
          { 
            path: 'newPaymentByStudent', 
            element: <NewPayment />,
            children: [
              { path: ':studentID', element: <NewPayment /> },
            ]
          },
        ]
      }
      ,
      {
        path: '/',
        element: <SimpleLayout />,
        children: [
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      { path: '*', element: <StudentPayment /> },
      { path: '/', element: <Navigate to="/gym/Dashboard" replace /> },
      { path: '', element: <Navigate to="/gym/Dashboard" replace /> }
    ]
  )

}

const studentRoutes = () => {

  return(
    [
      {
        path: '/student',
        element: <DashboardLayout />,
        children: [
          { path: 'Dashboard', element: <DashboardApp /> },
          { path: 'Course', element: <Course /> },
          { path: 'CheckIn', element: <CheckIn /> },
          { path: 'StudentBalance', element: <StudentBalance /> },
        ]
      }
      ,
      {
        path: '/',
        element: <SimpleLayout />,
        children: [
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      { path: '*', element: <Navigate to="/student/Dashboard" replace /> },
      { path: '/', element: <Navigate to="/student/Dashboard" replace /> },
      { path: '', element: <Navigate to="/student/Dashboard" replace /> }
    ]
  )

}

const trainerRoutes = () => {
    return(
      []
    )
}