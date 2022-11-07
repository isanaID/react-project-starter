import {MdDashboard} from 'react-icons/md';
import {RiHealthBookFill, RiUserHeartFill} from 'react-icons/ri';
import {AiFillSetting} from 'react-icons/ai';

export const MENU_ITEMS = [
  {
    groupTitle: undefined,
    children: [
      {
        title: 'Home',
        icon: MdDashboard,
        to: '/home',
      },
      {
        title: 'Admin',
        icon: MdDashboard,
        to: '/admin',
      },
      {
        title: 'Company',
        icon: MdDashboard,
        to: '/company',
      },
      {
        title: 'Log Activity',
        icon: MdDashboard,
        to: '/log-activity',
      },
      {
        title: 'Health Kiosk',
        icon: MdDashboard,
        to: '/kiosk',
      },
      {
        title: 'Face Recognition',
        icon: MdDashboard,
        to: '/fatmor',
      },
    ],
  },
];
