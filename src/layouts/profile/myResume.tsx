import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography, Stack } from '@mui/material';

const Resume = () => {
  return (
    <Box component={Stack} direction="row" alignItems="center" spacing={2} m={4} color="#434343">
      <ConstructionIcon sx={{ fontSize: 80 }} />
      <Typography variant="h3">به زودی ...</Typography>
    </Box>
  );
};

export default Resume;
