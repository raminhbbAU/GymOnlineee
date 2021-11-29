import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layout/dashboardLayout';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// //
// import Login from './pages/Login';
// import Register from './pages/Register';

import DashboardApp from '../pages/dashboard/DashboardApp';
import Gym from '../pages/gym/gym';
import Trainer from '../pages/trainer/trainer';
import Course from '../pages/course/course';
import Student from '../pages/student/student';
import NewStudent from '../pages/student/studentform';
import NotFound from '../pages/page404/page404';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/gym',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'gym', element: <Gym /> },
        { path: 'trainer', element: <Trainer /> },
        { path: 'course', element: <Course /> },
        { path: 'Student', element: <Student /> },
        { path: 'NewStudent', element: <NewStudent /> },
      ]
    }
    ,
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
