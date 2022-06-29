import { Box, Typography } from '@mui/material';
import React from 'react';

const EmptyResult = ({ text = 'نتیجه‌ای یافت نشد'}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 4,
        background: '#fff',
        width: 380,
        maxWidth: '90%',
        mx: 'auto',
        border: '1px solid #eee',
        borderRadius: 2,
        boxSizing: 'border-box',
      }}
    >
      <img src="/static/images/empty-folder.png" alt="empty-icon" />
      <Typography variant="h5">{text}</Typography>
    </Box>
  );
};

export default EmptyResult;
