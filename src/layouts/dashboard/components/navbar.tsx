import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Dashboard from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import ListItemButton from './ListItemButton';

const navLinks = [
  {
    title: `داشبورد`,
    path: `/dashboard`,
    icon: <Dashboard />,
  },
  {
    title: `دفترچه‌ها`,
    path: `/booklets`,
    icon: <MessageIcon />,
  },
  {
    title: `دسته های شغلی`,
    path: `/job-categories`,
    icon: <AssignmentIcon />,
    subItems: [
      {
        title: 'تست1',
        path: '',
      },
      {
        title: 'تست2',
        path: '',
      },
      {
        title: 'تست3',
        path: '',
      },
    ],
  },
  {
    title: `مدیریت کاربران`,
    path: `/user-management`,
    icon: <GroupIcon />,
  },
];

const Navbar = (): JSX.Element => {

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '256px',
      }}
      component="nav"
    >
      {navLinks.map(({ title, path, icon, subItems }, i) => (
        <ListItemButton title={title} path={path} icon={icon} subItems={subItems} key={i} />
      ))}
      <Divider />
    </List>
  );
};

export default Navbar;
