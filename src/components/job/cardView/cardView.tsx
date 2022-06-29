import React, { useState } from 'react';
import clsx from 'clsx';
import { Typography, Grid, Link, Avatar, Stack, Box, Link as MLink, Button, Paper as MPaper } from '@mui/material';
import { findIndex, find } from 'lodash';
import { jobBenefits } from '@/constants/jobBenefits';
import jMoment from 'moment-jalaali';
// import Link from 'next/link';

import CompanyIcon from '@exam/uikit/icons/companyDetail';
import LocationOnOutlinedIcon from '@exam/uikit/icons/location';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import BuildingIcon from '@exam/uikit/icons/building';
import { styles } from './cardView.style';
import useResponsive from '@/utils/responsive';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function CardView({ jobInfo, small, borderLess = false }) {
  const { sm } = useResponsive();
  const classes = styles;
  const [showDetail, setShowDetail] = useState(false);
  const {
    jobTitle,
    companyName,
    employmentType,
    company,
    jobDescription,
    whyWorkHere,
    companyWebsite,
    companyAddress,
    salary,
    jobBenefit,
    postedDate,
    companyLogo,
    strLocation,
    imageUrl,
    strJobBoard,
    uniqueCode,
  } = jobInfo;

  const url = '/job/' + uniqueCode + '/' + jobTitle?.replaceAll(' ', '-');

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
        <MLink color="secondary" href={companyWebsite} target="_blank">
          {companyWebsite}
        </MLink>
      ),
    },
    {
      label: 'حقوق',
      show: salary,
      content: salary,
    },
    {
      label: 'نوع قرارداد',
      show: employmentType,
      content: employmentType,
    },
    {
      label: 'تاریخ',
      show: !small && postedDate,
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
    <MPaper sx={{ ...classes.root, ...(borderLess ? classes.borderLessRoot : {}) }}>
      <Grid container>
        <Grid item xs>
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ width: 100 }}>
              <Stack alignItems="center" justifyContent="space-between" sx={{ minHeight: '100%' }}>
                <Avatar variant="rounded" alt={companyName} src={imageUrl} sx={classes.companyLogo}>
                  <BuildingIcon color="#4884F9" />
                </Avatar>
                <Typography variant="h5" sx={{ fontSize: 14, color: '#bbb', fontWeight: 700 }}>
                  {strJobBoard}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography sx={classes.title} color="textSecondary" variant="h4" component={Link} href={url}>
                    {jobTitle}
                  </Typography>
                  {companyName && (
                    <Stack direction="row" alignItems="center" sx={classes.nameIcon}>
                      <CompanyIcon sx={classes.icon} />
                      {company ? (
                        <Link href={`/company/${company?.uniqueCode}/${companyName?.replaceAll(' ', '-')}`}>
                          <Typography variant="body2" component="h2">
                            {companyName}
                          </Typography>
                        </Link>
                      ) : (
                        <Typography variant="body2" component="h2">
                          {companyName}
                        </Typography>
                      )}
                    </Stack>
                  )}
                  <Stack direction="row" alignItems="center" sx={classes.nameIcon}>
                    <LocationOnOutlinedIcon sx={classes.icon} />
                    <Typography variant="body2" component="h2">
                      {strLocation}
                    </Typography>
                  </Stack>
                  <Grid container>
                    {specs.map(
                      (spec) =>
                        spec.show && (
                          <Grid item xs={12} sm={small ? 12 : 6}>
                            <Box sx={{ ...classes.specs, ...classes.smallSpecs }}>
                              <Typography className="label" sx={classes.label} variant="body2">
                                {spec.label}:
                              </Typography>
                              <Typography className="value" variant="body2">
                                {spec.content}
                              </Typography>
                            </Box>
                          </Grid>
                        )
                    )}
                    {/*<Grid item>*/}
                    {/*  <Box sx={{ ...classes.description }}>{jobDescription}</Box>*/}
                    {/*</Grid>*/}
                  </Grid>
                </Grid>
                <Grid item {...(sm ? {} : { xs: 12 })}>
                  <Grid container spacing={1} alignItems="center" sx={{ width: ['100%', 140], mt: [2, 0] }}>
                    <Grid item xs={6} sm={12}>
                      <Link href={url} sx={{ width: '100%' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size={sm ? 'medium' : 'small'}
                          fullWidth
                          sx={{ borderRadius: 1, pt: '10px', pb: '6px' }}
                        >
                          مشاهده
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                      <Box>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<StarBorderRoundedIcon />}
                          sx={{
                            color: '#999',
                            borderColor: '#ccc',
                            fontWeight: 500,
                            ml: [1, 0],
                            '& svg': { mt: -0.5 },
                            pt: '4px',
                            pb: '1px',
                          }}
                        >
                          نشان
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MPaper>
  );
}

export default CardView;
