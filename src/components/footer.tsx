import React from 'react';
import { Box, Grid, Container, Typography, Link, Divider } from '@mui/material';
import { useAuth } from '@/modules/auth';
// import LinkedInIcon from 'theme/icons/linkedin';
// import InstagramIcon from 'theme/icons/instagram';
// import TelegramIcon from 'theme/icons/telegram';
// import TwitterIcon from 'theme/icons/twitter';
// import AparatIcon from 'theme/icons/aparat';
import useResponsive from '@/utils/responsive';

const links = [
  {
    title: 'وبلاگ',
    address: 'https://blog.web.site',
  },
  {
    title: 'قوانین و مقررات',
    address: 'https://account.web.site/term-of-condition',
  },
  {
    title: 'تعهدات وب سایت',
    address: 'https://account.web.site/webSite-commitments',
  },
  {
    title: 'قوانین انتشار آگهی',
    address: 'https://account.web.site/advertising-rules',
  },
];

const styles = {
  root: {
    py: 3,
    borderTop: `1px solid #eee`,
    background: '#fafbfc',
    textAlign: 'center',
  },
  linkItem: {
    position: 'relative',
  },
  divider: {
    mx: 1.5,
    borderColor: '#e9e9e9',
  },
  link: {
    display: 'block',
    color: 'primary.main',
    fontWeight: 700,
    textDecoration: 'none',
  },
  copy: {
    marginTop: 2,
    color: '#4F4F4F',
    fontWeight: 500,
  },
};

const Footer = () => {
  return (
    <Box component="footer" sx={styles.root}>
      <Box>
        <Container>
          <Grid container justifyContent="center" alignItems="center">
            {links.map((link, index) => (
              <>
                <Grid item key={index} sx={styles.linkItem}>
                  <Link variant="body2" sx={styles.link} href={link.address}>
                    {link.title}
                  </Link>
                </Grid>
                {index < links.length - 1 && (
                  <Divider key={index} flexItem orientation="vertical" sx={styles.divider} />
                )}
              </>
            ))}
          </Grid>
          <Typography variant="body2" sx={styles.copy}>
            تمامی حقوق مادی و معنوی این سایت متعلق به وب سایت است.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
