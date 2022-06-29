import React, { useState, useEffect, useRef } from 'react';
import { TextField, Stack, Typography, Card, FormControl, Paper, Box, InputAdornment } from '@mui/material';
import OtpService from '../../services/otp-login-service';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PinInput from 'react-pin-input';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/modules/auth';
import { signIn, useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { makeTitle } from '@/utils/pageTitle';
import Head from 'next/head';
import CoreLayout from '@/layouts//core/coreLayout';

const styles = {
  pinInput: {
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
  },
  pinContainer: {
    '& input:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)!important',
    },
    '& input:focus': {
      borderColor: '#1976d2!important',
      boxShadow: '0 0 2px 0 #1976d2 inset !important',
    },
  },
};

const phoneRegex = /(09)\d{9}/;

function Login() {
  const { setLogin } = useAuth();
  const { data: session, status } = useSession();
  const pinInput = useRef<any>();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedPhone, setSelectedPhone] = useState<string | undefined>();
  const [verifyCode, setVerifyCode] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const [countDown, setCountDown] = useState(120);

  const second = countDown % 60;

  const strTime =
    (countDown >= 120 ? '02' : countDown >= 60 ? '01' : '00') + ':' + (second > 9 ? second : '0' + second);

  useEffect(() => {
    if (!selectedPhone || countDown === 0) {
      return;
    }

    const timer = setTimeout(() => {
      if (countDown > 0) {
        setCountDown((prevState) => --prevState);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedPhone, countDown]);

  useEffect(() => {
    if (!!selectedPhone) {
      pinInput.current?.focus();
    }
  }, [selectedPhone]);

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleValidateOtp = (value?: string) => {
    setMessage('');
    setLoading(true);

    OtpService.validateOtp(value || verifyCode, selectedPhone).then(
      (data) => {
        setLogin(data);
        if (!!data.token) {
          signIn('credentials', {
            phone: selectedPhone,
            token: data.token,
            callbackUrl: '/',
          });
        } else {
          enqueueSnackbar('کد وارد شده صحیح نیست', { variant: 'error' });
        }
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        enqueueSnackbar('کد وارد شده صحیح نیست', { variant: 'error' });
        setVerifyCode('');
        pinInput.current?.clear();
      }
    );
  };

  const handleGetOtp = () => {
    setMessage('');
    if (!phoneRegex.test(phone)) {
      enqueueSnackbar('شماره وارد شده معتبر نمی بایشد', { variant: 'error' });
      return;
    }
    setLoading(true);

    OtpService.getOtp(phone).then(
      (res) => {
        setCountDown(120);
        setSelectedPhone(phone);
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <CoreLayout>
      <div className="col-md-12">
        <Head>
          <title>{makeTitle('ورود')}</title>
        </Head>
        {!!selectedPhone && (
          <Paper
            sx={{
              maxWidth: 400,
              px: 3,
              py: 6,
              textAlign: 'center',
              m: '85px auto',
              boxShadow: '0 1px 3px rgba(0 ,0, 0, 0.3)',
            }}
          >
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
              کد تایید برای
              {selectedPhone} ارسال شد
            </Typography>
            <Typography variant="body2">کد ارسال شده را در این قسمت وارد کنید</Typography>
            <br />
            <Box sx={styles.pinContainer}>
              <PinInput
                ref={(n) => (pinInput.current = n)}
                length={6}
                initialValue={verifyCode}
                onChange={(value, index) => setVerifyCode(value)}
                type="numeric"
                inputMode="number"
                style={{ direction: 'ltr' }}
                inputStyle={styles.pinInput}
                inputFocusStyle={{ borderColor: 'blue' }}
                onComplete={(value, index) => handleValidateOtp(value)}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ mt: 4 }}>
              <LoadingButton
                loading={loading}
                sx={{ minWidth: 120 }}
                variant="contained"
                onClick={() => handleValidateOtp()}
              >
                ورود
              </LoadingButton>
              <LoadingButton disabled={countDown > 0} onClick={() => handleGetOtp()}>
                ارسال مجدد کد {countDown > 0 && `(${strTime})`}
              </LoadingButton>
            </Stack>
          </Paper>
        )}
        {!selectedPhone && (
          <Card className="card card-container">
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 4 }}>
              ورود
            </Typography>
            <FormControl fullWidth>
              <TextField
                helperText={message}
                variant="outlined"
                placeholder="شماره تلفن"
                sx={{ width: '100%', '& input': { textAlign: 'right', direction: 'rtl' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => onChangePhone(e)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    handleGetOtp();
                  }
                }}
              />
            </FormControl>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <LoadingButton loading={loading} onClick={() => handleGetOtp()} sx={{ width: 160 }} variant="contained">
                ارسال پیامک
              </LoadingButton>
            </Box>
          </Card>
        )}
      </div>
    </CoreLayout>
  );
}

export default Login;
