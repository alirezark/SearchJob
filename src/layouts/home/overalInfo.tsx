import React, { useEffect } from 'react';
import { Grid, Stack, Box, Divider, Typography, Skeleton } from '@mui/material';
import CaseIcon from '@mui/icons-material/HomeRepairService';
import CompanyIcon from '@exam/uikit/icons/companyDetail';
import { useLoadCountActiveJobAndCompany } from '@/services/base.sevice';

const styles = {
  infoContain: {
    p: ['8px 12px', '8px 32px'],
  },
  circleIcon: {
    borderRadius: '50%',
    width: 52,
    height: 52,
    border: '1px solid #4884F9',
    color: 'primary.main',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIconGreen: {
    borderColor: 'secondary.main',
    color: 'secondary.main',
  },
};

const OveralInfo = ({ jobsAndCompaniesCount }: any) => {
  const { data, isFetching, refetch } = useLoadCountActiveJobAndCompany({
    initialData: jobsAndCompaniesCount,
  });

  useEffect(() => {
    if (isFetching) {
      return;
    }
    const fetchData = setTimeout(() => refetch(), 20000);

    return () => clearTimeout(fetchData);
  }, [isFetching]);

  return (
    <Box sx={{ background: '#fff', width: 470, mx: 'auto', maxWidth: '85%', borderRadius: '0 0 16px 16px', py: 2 }}>
      <Grid container>
        <Grid item xs>
          <Box component={Stack} alignItems="center" direction="row" spacing={2} sx={styles.infoContain}>
            <Box sx={styles.circleIcon}>
              <CaseIcon />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: -0.5 }} color="primary">
                {data.countAllActiveJob}
              </Typography>
              <Typography variant="body2" color="primary">
                شغل فعال
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Divider
          flexItem
          orientation="vertical"
          sx={{ borderColor: 'primary.main', opacity: '0.5' }}
          variant="middle"
        />
        <Grid item xs>
          <Box component={Stack} alignItems="center" direction="row" spacing={2} sx={styles.infoContain}>
            <Box sx={{ ...styles.circleIcon, ...styles.circleIconGreen }}>
              <CompanyIcon color="#46D7A7" />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: -0.5 }} color="secondary">
                {data.countAllCompany}
              </Typography>
              <Typography variant="body2" color="secondary">
                شرکت ایرانی
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OveralInfo;
