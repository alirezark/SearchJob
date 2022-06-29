import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import CoreLayout from '@/layouts/core/coreLayout';
import ConstructionIcon from '@mui/icons-material/Construction';

function Blog() {
  return (
    <CoreLayout>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <Box
          component={Stack}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          m={4}
          color="#434343"
        >
          <ConstructionIcon sx={{ fontSize: 80 }} />
          <Typography variant="h3">به زودی ...</Typography>
        </Box>
      </Container>
    </CoreLayout>
  );
}

export default Blog;
