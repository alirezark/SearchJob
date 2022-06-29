import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, Grid, Divider, Paper, Avatar, Button, Box, Hidden, Stack } from '@mui/material';
import { findIndex, find } from 'lodash';
import { jobBenefits } from '@/constants/jobBenefits';
import jMoment from 'moment-jalaali';
import CompanyIcon from '@exam/uikit/icons/companyDetail';
import StarIcon from '@mui/icons-material/Star';
import FlagIcon from '@exam/uikit/icons/flag';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LocationOnOutlinedIcon from '@exam/uikit/icons/location';
import BuildingIcon from '@exam/uikit/icons/building';
// import { compensationText } from '@/utils/salary';
import { styles } from './cardView.style';
import useResponsive from '@/utils/responsive';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function JobView({ jobInfo, small, onSave }) {
  // const { user, isEmployer } = useAuth();
  const { sm } = useResponsive();
  const classes = styles;
  const {
    jobTitle,
    companyName,
    cooperationType,
    jobDescription,
    whyWorkHere,
    companyWebsite,
    companyAddress,
    salary = 'توافقی',
    url,
    jobBenefit,
    saveDate: postedDate,
    companyLogo,
    jobCity,
    imageUrl,
    jobBoardPersian,
    shortLink
  } = jobInfo;

  const specs = [
    {
      label: 'آدرس',
      show: !small && companyAddress,
      content: companyAddress,
    },
    {
      label: 'وبسایت',
      show: !small && companyWebsite,
      content: (
        <a href={companyWebsite} target="_blank">
          {companyWebsite}
        </a>
      ),
    },
    {
      label: 'حقوق',
      show: salary?.length > 0 ? salary : 'توافقی',
      content: salary?.length > 0 ? salary : 'توافقی',
    },
    {
      label: 'نوع قرارداد',
      show: cooperationType,
      content: cooperationType,
    },
    {
      label: 'تاریخ',
      show: postedDate?.length > 0,
      content: jMoment(postedDate).format('jDD jMMMM, jYYYY'),
    },
    {
      label: 'مزایا',
      show:
        !small &&
        Array.isArray(jobBenefit) &&
        jobBenefit.filter((jb) => findIndex(jobBenefits, (j) => j.value === jb) > -1).length > 0 &&
        jobBenefit.indexOf('noneOfThis') === -1,
      content:
        Array.isArray(jobBenefit) &&
        jobBenefit
          .filter((jb) => findIndex(jobBenefits, (j) => j.value === jb) > -1)
          .map((jb) => find(jobBenefits, (j) => j.value === jb).text)
          .join('، '),
    },
  ];

  return (
    // @ts-ignore
    <Paper sx={classes.root} elevation={2}>
      <Grid container alignItems="center" spacing={3} mb={2}>
        <Grid item {...(sm ? {} : { xs: 12 })}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Avatar variant="rounded" alt={companyName} src={imageUrl} sx={classes.companyLogo}>
              <BuildingIcon color="#4884F9" />
            </Avatar>
            {!sm && (
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mt: 1,
                  color: '#777',
                  fontWeight: 700,
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '4px',
                }}
              >
                {jobBoardPersian}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography color="textSecondary" variant="h5">
              استخدام
            </Typography>
            <Typography sx={classes.title} color="textSecondary" variant="h5" component="h5">
              {jobTitle}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        {sm && (
          <Grid item flexBasis={84}>
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#888', fontWeight: 700 }}>
              {jobBoardPersian}
            </Typography>
          </Grid>
        )}
        <Grid item xs>
          <Box sx={classes.mainTitle}>
            <Box sx={classes.nameIcon}>
              <CompanyIcon sx={classes.icon} />
              <Typography variant="body2" component="h2" sx={classes.nameValue}>
                {companyName}
              </Typography>
            </Box>
            {!!jobCity && (
              <Box sx={classes.nameIcon}>
                <LocationOnOutlinedIcon sx={classes.icon} />
                <Typography variant="body2" component="h2" sx={classes.nameValue}>
                  {jobCity}
                </Typography>
              </Box>
            )}
          </Box>
          <Grid container mt={4}>
            {specs.map(
              (spec) =>
                spec.show && (
                  <Grid item xs={12} sm={small ? 12 : 6}>
                    <Box sx={classes.specs}>
                      <Typography sx={classes.label} variant="body2">
                        {spec.label}:
                      </Typography>
                      <Typography className="value" variant="body2">
                        {spec.content}
                      </Typography>
                    </Box>
                  </Grid>
                )
            )}
          </Grid>
          <Box mt={1} sx={classes.scrollContent}>
            {jobDescription && (
              <>
                <Typography color="textSecondary" variant="h5" className="font-weight-700">
                  توضیحات موقعیت شغلی:
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{ __html: jobDescription }}
                  mt={1}
                  sx={{ '& *': { fontFamily: 'YekanBakh' }, fontFamily: 'YekanBakh' }}
                />
              </>
            )}
            {!small && whyWorkHere && (
              <>
                <br />
                <br />
                <Typography color="textSecondary" variant="h5" className="font-weight-700">
                  به چه دلیلی باید در شرکت شما کار کنند؟
                </Typography>
                <br />
                <Typography variant="body2" gutterBottom align="justify">
                  {whyWorkHere}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Stack alignItems="center" justifyContent="center" p="60px 0 30px">
        <a href={shortLink?shortLink:url} target="_blank" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ width: 200, height: 48 }}>
            مشاهده شغل
          </Button>
        </a>
      </Stack>
    </Paper>
  );
}

export default JobView;
