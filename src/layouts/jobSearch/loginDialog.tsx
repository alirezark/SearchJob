import React from 'react';
import { Box, Button, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import SimpleDialog from '@/components/dialog/simpleDialog';

const LoginDialog = ({ open }) => {
  return (
    <SimpleDialog open={open} handleClose={() => null} title="ورود به سایت">
      <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
        برای ادامه فرایند می بایست ابتدا لاگین کنید
        <Box sx={{ p: 1, mt: 3, textAlign: 'center' }}>
          <Link href={'https://account.web.site/auth'}>
            <div>
              <Button variant="contained" color="primary" sx={{ fontWeight: 700, width: 180 }}>
                ورود
              </Button>
            </div>
          </Link>
        </Box>
      </Typography>
    </SimpleDialog>
  );
};

export default LoginDialog;
