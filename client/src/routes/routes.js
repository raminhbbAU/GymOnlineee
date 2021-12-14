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
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';


// ----------------------------------------------------------------------

export default function Router() {

  const isAuth = getFromStorage('isAuth') || false;
  const myRoute = isAuth ? [
    {
      path: '/gym',
      element: <DashboardLayout />,
      children: [
        { path: 'Dashboard', element: <DashboardApp /> },
        { path: 'Gym', element: <GymForm /> },
        { path: 'Trainer', element: <Trainer /> },
        { path: 'NewTrainer', element: <NewTrainer /> },
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
            { path: ':studentCheckInCheckOutId', element: <NewCheckIn /> },
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
    { path: '*', element: <Navigate to="/404" replace /> }
  ] : 
  [
    {path: '/',element: <Login />},
    {path: '*',element: <Navigate to="/login" replace />,},
    {path: 'login',element: <Login />,},
    {path: 'signup',element: <Signup />,},
    {path: '404',element: <NotFound />,}
  ];

  return useRoutes(myRoute);
}
