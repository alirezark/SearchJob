import React, { useEffect, useState } from 'react';
import { TextField, Container, FormControl, FormLabel, Typography, Divider, Autocomplete } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterJalali from '@date-io/date-fns-jalali';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Value from '@/constants//select.value';
import { useUpdateProfile, useProfile } from '@/services/user.service';
import { useAuth } from '@/modules/auth';
import { pickBy } from 'lodash';
import { useSnackbar } from 'notistack';

const styles = {
  form: {
    m: 0,
    '& .MuiFormLabel-root': {
      fontWeight: 500,
      color: '#000',
    },
  },
};

export type userProfile = {
  firstName: string;
  lastName: string;
  nationalCode: string;
  certificateNo: string;
  birthDate: string;
  cityBorn: string;
  address: string;
  linkedinUrl: string;
  jobinjaUrl: string;
  jobVisionUrl: string;
};

function Informations() {
  const { isLogin } = useAuth();
  const { data: profile, isLoading: getProfileLoading } = useProfile({});
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateProfile, isLoading: updateProfileLoading } = useUpdateProfile({
    onSuccess: () => {
      enqueueSnackbar('اطلاعات شما ثبت شد', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('خطا در ثبت اطلاعات', { variant: 'error' });
    },
  });

  const formMethods = useForm<userProfile>({
    defaultValues: {
      birthDate: '',
    },
  });
  const { errors } = formMethods.formState;

  useEffect(() => {
    if (!getProfileLoading && profile) {
      if (!!profile.birthDate) {
        profile.birthDate = new Date(profile.birthDate);
      }
      formMethods.reset(profile);
    }
  }, [getProfileLoading]);

  const provinces = Value.stateOptions.slice(1, Value.stateOptions.length);

  const handleSubmit = (data) => {
    const postData = pickBy(data, (value) => !!value && value !== '');
    if (!!postData.birthDate) {
      postData.birthDate = new Date(postData.birthDate).toISOString();
    }
    updateProfile(postData);
  };

  return (
    <Container sx={{ m: 1 }}>
      <Typography variant="h4" sx={{ py: 2, fontWeight: 500 }}>
        مشخصات فردی
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <FormProvider {...formMethods}>
        <Container maxWidth="sm" component="form" onSubmit={formMethods.handleSubmit(handleSubmit)} sx={styles.form}>
          <FormControl fullWidth margin="dense">
            <FormLabel>نام</FormLabel>
            <Controller
              rules={{ required: 'نام خود را وارد کنید' }}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="نام"
                  helperText={errors.firstName?.message}
                  error={!!errors?.firstName}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>نام خانوادگی</FormLabel>
            <Controller
              rules={{ required: 'نام خانوادگی خود را وارد کنید' }}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="نام خانوادگی"
                  helperText={errors.lastName?.message}
                  error={!!errors?.lastName}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>کد ملی</FormLabel>
            <Controller
              name="nationalNo"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="کد ملی"
                  helperText={errors.nationalCode?.message}
                  error={!!errors?.nationalCode}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>شماره شناسنامه</FormLabel>
            <Controller
              name="certificateNo"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="شماره شناسنامه"
                  helperText={errors.certificateNo?.message}
                  error={!!errors?.certificateNo}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>تاریخ تولد</FormLabel>
            <Controller
              name="birthDate"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterJalali}>
                  <DatePicker
                    mask="____/__/__"
                    {...field}
                    renderInput={(params) => (
                      <TextField sx={{ textAlign: 'right', direction: 'rtl' }} {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>محل تولد</FormLabel>
            <Controller
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={provinces}
                  renderInput={(params) => <TextField {...params} placeholder="محل تولد"></TextField>}
                  onChange={(event, newValue: any) => field.onChange(newValue?.id)}
                  value={provinces.find((o) => o.id === field.value) || { value: '', label: '' }}
                />
              )}
              name="cityBorn"
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>آدرس</FormLabel>
            <Controller name="address" render={({ field }) => <TextField multiline {...field} placeholder="آدرس" />} />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>لینک لینکدین</FormLabel>
            <Controller
              name="linkedinUrl"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="لینک لینکدین"
                  helperText={errors.linkedinUrl?.message}
                  error={!!errors?.linkedinUrl}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>لینک جابینجا</FormLabel>
            <Controller
              name="jobinjaUrl"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="لینک جابینجا"
                  helperText={errors.jobinjaUrl?.message}
                  error={!!errors?.jobinjaUrl}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel>لینک جابویژن</FormLabel>
            <Controller
              name="jobVisionUrl"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="لینک جابویژن"
                  helperText={errors.jobVisionUrl?.message}
                  error={!!errors?.jobVisionUrl}
                />
              )}
            />
          </FormControl>

          <LoadingButton loading={updateProfileLoading} type="submit" sx={{ width: 140, mt: 3 }} variant="contained">
            ثبت
          </LoadingButton>
        </Container>
      </FormProvider>
    </Container>
  );
}

export default Informations;
