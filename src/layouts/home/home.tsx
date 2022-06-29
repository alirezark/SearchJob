import React from 'react';
import CoreLayout from '../core/coreLayout';
import Link from 'next/link';
import SearchBox from './searchBox';
import { Box, Typography, Container, Stack, Divider } from '@mui/material';
import OveralInfo from './overalInfo';
import CompanyLogos from './companyLogos';
import JobsList from './jobsList';
import HomeHead from './home.head';

type HomeProps = {
  jobsAndCompaniesCount: any;
};

export default function Home({ jobsAndCompaniesCount }: HomeProps) {
  // const navigate = useNavigate();

  return (
    <CoreLayout>
      <HomeHead></HomeHead>
      <Box sx={{ minHeight: 'calc(100vh - 360px)' }}>
        <Box sx={{ background: '#f1f5ff', position: 'relative', pb: 16, mb: 6.5 }}>
          <Stack alignItems="center">
            <Link href="/">
              <img
                src="/static/images/logo.svg"
                style={{ width: '270px', maxWidth: '90%', height: '130px', marginTop: 50 }}
                alt="logo"
              />
            </Link>
            <Typography variant="h4" color="primary" sx={{ textAlign: 'center', fontSize: [16, 20] }}>
              +{jobsAndCompaniesCount.countOverAllActiveJob} موقعیت شغلی فعال در بیش از ۷ پلتفرم کاریابی
            </Typography>
          </Stack>
          <Box sx={{ position: 'absolute', bottom: -55, width: '100%' }}>
            <SearchBox />
          </Box>
        </Box>
        <OveralInfo jobsAndCompaniesCount={jobsAndCompaniesCount} />
      </Box>
      <CompanyLogos />
      <Box sx={{ background: '#fafbfc', pb: 5, mt: 5 }}>
        <Divider sx={{ mb: 8 }} />
        <Container>
          <JobsList />
        </Container>
      </Box>
    </CoreLayout>
  );
}
