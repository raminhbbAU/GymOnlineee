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
import NotFound from '../pages/page404/page404';
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
        { path: 'NewCourse', element: <NewCourse /> },
        { path: 'Student', element: <Student /> },
        { 
          path: 'NewStudent', 
          element: <NewStudent />,
          children: [
            { path: ':studentID', element: <NewStudent /> },
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
