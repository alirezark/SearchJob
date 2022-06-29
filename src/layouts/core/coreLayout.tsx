import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomizedAppBar from '@/components/general/customizedAppBar';
import Footer from '@/components/footer';

const DefaultLayout = ({ children }) => (
  <Box style={{ width: '100%', height: '100%' }} dir="rtl">
    <CustomizedAppBar />
    <Box style={{ width: '100%', height: '100%', minHeight: '61vh' }}>{children}</Box>
    <Footer />
  </Box>
);

export default DefaultLayout;
