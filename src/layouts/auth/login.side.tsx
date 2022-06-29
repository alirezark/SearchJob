import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import logo from 'public/static/images/logos/logo512.png';
import React from 'react';

type Props = {};

const style = {
  title: {
    fontWeight: 600,
    width: '95%',
    mb: 10,
  },
  subtitle: {
    color: '#777777',
    paddingBottom: '12px',
  },
};

const LoginSide: NextPage<Props> = (): JSX.Element => {
  return (
    <Box>
      <Image src={logo} alt="site" width={180} height={180} />
      <Typography variant="h2" sx={style.title}>
        سامانه سوالات آزمون
      </Typography>
      <Typography variant="body2" sx={style.subtitle}>
        آزمون استخدام بخش خصوصی
      </Typography>
    </Box>
  );
};

export { LoginSide };
