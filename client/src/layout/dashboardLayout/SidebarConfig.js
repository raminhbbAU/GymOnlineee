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

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/gym/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Gym',
    path: '/gym/gym',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Trainer',
    path: '/gym/trainer',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Course',
    path: '/gym/course',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Student',
    path: '/gym/student',
    icon: getIcon(lockFill)
  },
  {
    title: 'Enrolment',
    path: '/gym/enrolment',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Check-In',
    path: '/gym/CheckIn',
    icon: getIcon(pieChart2Fill)
  }
];

export default sidebarConfig;
