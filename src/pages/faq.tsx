import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Typography, Paper } from '@mui/material';
import CoreLayout from '@/layouts/core/coreLayout';
import Head from 'next/head';
import { makeTitle } from '@/utils/pageTitle';
import { GetStaticProps } from 'next';

const faqData = [
  {
    title: 'در وب سایت چه آگهی های شغلی را میتوان دید؟',
    description: 'در وب سایت میتوانید از میان تمام آگهی های شغلی موجود در جاب برد ها جستجو کنید.',
  },
  {
    title: 'آیا در وب سایت امکان ساخت رزومه دارم؟',
    description: 'در وب سایت امکان ساخت و مدیریت رزومه را در پروفایل خود دارید.',
  },
  {
    title: 'در وب سایت چه آگهی های شغلی را میتوان دید؟',
    description: 'در وب سایت میتوانید از میان تمام آگهی های شغلی موجود در جاب برد ها جستجو کنید.',
  },
  {
    title: 'آیا در وب سایت امکان ساخت رزومه دارم؟',
    description: 'در وب سایت امکان ساخت و مدیریت رزومه را در پروفایل خود دارید.',
  },
];

export const getStaticProps = () => {
  return {
    props: {
      isReadyToRender: true,
      serializedDataset: 'test',
    },
  };
};

function FAQ() {
  return (
    <CoreLayout>
      <Head>
        <title>{makeTitle('سوالات متداول')}</title>
      </Head>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <Paper sx={{ overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              p: 2,
              textAlign: 'center',
              background: '#f8f9fa',
              borderBottom: '1px solid #eee',
              mb: 3,
              fontWeight: 500,
            }}
          >
            سوالات متداول
          </Typography>

          {faqData.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                  {faq.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </CoreLayout>
  );
}

export default FAQ;
