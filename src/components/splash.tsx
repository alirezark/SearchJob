import React from 'react';
import { Box } from '@mui/material';

const Splash = () => {
  return (
    <Box sx={{ display: 'none' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#fff',
          zIndex: 9999,
        }}
      />
    </Box>
  );
};

export default Splash;
