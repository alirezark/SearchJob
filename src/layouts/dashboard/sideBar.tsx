import { NextPage } from 'next';
import { Stack, Avatar, Box } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import Menu from './components/menu';
import NavBar from './components/navbar';

type Props = {};

const style = {
  root: {
    width: 256,
    backgroundColor: '#fff',
    p: '20px 16px',
    borderRight: '1px solid #e5e5e5',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  avatar: {
    width: 60,
    height: 60,
  },
};

const SideBar: NextPage<Props> = (props): JSX.Element => {
  return (
    <Stack sx={style.root} spacing={1}>
      <Avatar alt="avatar" src={''} sx={style.avatar} />
      <Menu userName={'علی سوری'} />
      <NavBar />
    </Stack>
  );
};

export default SideBar;
