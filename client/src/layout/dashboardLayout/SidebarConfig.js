import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const gymSidebarItems = (t) => {

  return(
    [
      {
        title: t('Dashboard'),
        path: '/gym/dashboard',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: t('Profile'),
        path: '/gym/profile',
        icon: getIcon(peopleFill)
      },
      {
        title: 'divider',
        path: '',
        icon:{}
      },
      {
        title: t('Enrolment'),
        path: '/gym/enrolment',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: t('Check-In'),
        path: '/gym/CheckIn',
        icon: getIcon(pieChart2Fill)
      }
      ,
      {
        title: t('Bills'),
        path: '/gym/Bill',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: t('Payment'),
        path: '/gym/Payment',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'divider',
        path: '',
        icon:{}
      },
      {
        title: t('Trainer'),
        path: '/gym/trainer',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: t('Course'),
        path: '/gym/course',
        icon: getIcon(fileTextFill)
      },
      {
        title: t('Student'),
        path: '/gym/student',
        icon: getIcon(lockFill)
      }
    ]
  )
}


const studentSidebarItems = (t) => {
  return(
    [
      {
        title: 'Dashboard',
        path: '/student/dashboard',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'Profile',
        path: '/student/profile',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'divider',
        path: '',
        icon:{}
      },
      {
        title: 'Course',
        path: '/student/course',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Check-In',
        path: '/student/CheckIn',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'Financial',
        path: '/student/StudentBalance',
        icon: getIcon(pieChart2Fill)
      }
    ]
  )
}


const trainerSidebarItems = (t) => {
  return(
    [
      {
        title: 'Dashboard',
        path: '/trainer/dashboard',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'Profile',
        path: '/trainer/profile',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'divider',
        path: '',
        icon:{}
      },
      {
        title: 'Course',
        path: '/trainer/course',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Check-In',
        path: '/trainer/CheckIn',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'Financial',
        path: '/trainer/TrainerBalance',
        icon: getIcon(pieChart2Fill)
      }
    ]
  )
}


export {gymSidebarItems,studentSidebarItems,trainerSidebarItems};
