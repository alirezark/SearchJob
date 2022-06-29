import React, { useEffect, useState } from 'react';
import { Typography, Grid, Link } from '@mui/material';
import dataList from './jobsList.data';

const styles = {
  header: {
    mb: 2,
  },
  link: {
    mb: 1,
    color: '#828282',
    cursor: 'pointer',
  },
  linkMore: {
    fontWeight: 900,
    pt: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLink: {
    margin: '8px 0',
  },
};

const JobsList = () => {
  const [links] = useState(dataList);

  return (
    <>
      <Grid container spacing={2}>
        {links.map((job, index) => (
          <Grid item xs={12} md key={index}>
            <Typography variant="h4" sx={styles.header} component="h2">
              {job.title}
            </Typography>
            <Grid container>
              {job.links.map((l, i) => (
                <Grid key={i} sx={styles.itemLink} item xs={6} md={12}>
                  <Link variant="body1" href={l.address} sx={styles.link}>
                    {l.title}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Link href="/jobs" sx={styles.linkMore} variant="body1" color="primary">
        {'مشاهده تمام شغل‌ها >'}
      </Link>
    </>
  );
};

export default JobsList;
