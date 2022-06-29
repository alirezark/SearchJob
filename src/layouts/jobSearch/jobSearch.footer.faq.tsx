import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Typography, Divider, Box } from '@mui/material';

const styles = {
  root: {
    py: 2,
    background: '#fafbfc',
    borderTop: '1px solid #e1e4e8',
  },
  faq: {
    my: 2,
  },
  faqContain: {
    mt: 3,
  },
};

function JobFaq({ searchText }) {
  const faqData = [
    {
      title: 'در وب سایت چه آگهی های شغلی مرتبط با استخدام ' + searchText + ' میتوان دید؟',
      description:
        'در وب سایت میتوانید از میان تمام آگهی های شغلی موجود در پلتفرم های کاریابی در رابطه با ' +
        searchText +
        ' جستجو کنید.',
    },
    {
      title: 'چگونه میتوانم در رابطه با  مهارت ها و ویژگی های یک ' + searchText + ' آشنا شوم؟',
      description:
        'با مراجعه به بخش وبلاگ وب سایت میتوانید مطالب مفیدی درباره مهارت ها و ویژگی های یک ' +
        searchText +
        ' مطالعه کنید.',
    },
  ];
  return (
    <Box sx={styles.root}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'left',
            my: 2,
            fontWeight: 700,
          }}
        >
          {'سوالات متداول درباره آگهی های استخدام ' + searchText}
        </Typography>
        <Box sx={styles.faqContain}>
          {faqData.map((faq, index) => (
            <>
              <Box sx={styles.faq}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {faq.title}
                </Typography>
                <Typography variant="body1">{faq.description}</Typography>
              </Box>
              {index !== faqData.length - 1 && <Divider light />}
            </>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default JobFaq;
