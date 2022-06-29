import React from 'react';
import { Paper, Skeleton, Grid } from '@mui/material';

const styles = {
  root: {
    margin: '24px 0',
    marginTop: 1,
    maxWidth: 1024,
    padding: 2,
    borderRadius: 2,
    background: 'transparent',
  },
  borderLessPanel: {
    background: 'transparent',
    boxShadow: 'none',
    border: 'none',
  }
};

const CardViewLoading = ({ borderLess = false }) => {
  return (
    <Paper variant="outlined" sx={{ ...styles.root, ...(borderLess ? styles.borderLessPanel : {}) }}>
      <Grid container spacing={2}>
        <Grid item>
          <Skeleton variant="rectangular" width={56} height={56} sx={{ borderRadius: 1 }} animation="wave" />
        </Grid>
        <Grid item xs>
          <Skeleton variant="text" width="55%" height={36} animation="wave" />
          <Skeleton variant="text" width={140} height={24} sx={{ mt: 1 }} animation="wave" />
          <Skeleton variant="text" width={120} height={24} animation="wave" />
          <Skeleton variant="text" width={120} height={24} sx={{ mt: 2 }} animation="wave" />
          <Skeleton variant="text" width={220} height={24} animation="wave" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardViewLoading;
