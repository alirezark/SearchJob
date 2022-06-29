import React from 'react';
import { NextPage } from 'next';
import SideBar from './sideBar';
// import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

const Index: NextPage<Props> = ({ children }): JSX.Element => {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <>
      <SideBar />
      <Box>{children}</Box>
    </>
  );
};

export default Index;
