import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
  Slider,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import Value from '@/constants/select.value';
import { jobBoards } from '@/constants/jobBoards';
import { useQueryParams, NumberParam, StringParam } from 'next-query-params';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { mapValues } from 'lodash';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const FilterQueries = {
  province: NumberParam,
  gender: NumberParam,
  militaryStatus: NumberParam,
  salary: NumberParam,
  workExperience: NumberParam,
  companyCapacity: NumberParam,
  degree: NumberParam,
  keyWord: StringParam,
  board: NumberParam
};

type GenericObject = {
  [key: string]: any;
};

const AutoCompleteInput = ({ options, label, name }) => {
  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          sx={{ width: 300, background: '#fff' }}
          renderInput={(params) => <TextField {...params} label={label}></TextField>}
          onChange={(event, newValue) => field.onChange(newValue.id)}
          value={options.find((o) => o.id === field.value) || options[0]}
        />
      )}
      name={name}
    />
  );
};

export type JobSearchFilterProps = {
  availableFilters: string[];
};

const JobSearchFilter = ({ availableFilters }: JobSearchFilterProps) => {
  const [query, setQuery] = useQueryParams(FilterQueries);

  const formMethods = useForm({
    defaultValues: {
      ...query,
      salary: !!query?.salary ? Number(query.salary) / 1000000 : undefined,
      keyWord: !!query?.keyWord ? query.keyWord.split('|') : [],
    },
  });

  const hasFilter = Object.values(query).some((value) => value !== undefined);

  const {
    stateOptions,
    genderOption,
    militaryOption,
    salaryOption,
    workExperienceOption,
    companyCapacityOption,
    degreeOption,
  } = Value;

  const salary = formMethods.watch('salary', -1);

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  const handleOpenAdvancedFilter = () => {
    setShowAdvancedFilter(true);
  };

  const handleCloseAdvancedFilter = () => {
    setShowAdvancedFilter(false);
  };

  const removeAllFilters = () => {
    setQuery(mapValues(query, () => undefined));

    Object.keys(query).forEach((key: any) => formMethods.setValue(key, key === 'keyWord' ? [] : undefined));
  };

  const onSubmit = (data) => {
    const filters = {
      ...mapValues(data, (v, k) => (v === 0 || v === undefined ? undefined : v)),
      salary: data.salary !== undefined && Number(data.salary) < 100 ? data.salary * 1000000 : data.salary,
      keyWord: data.keyWord !== undefined ? data.keyWord.join('|') : undefined,
      board: data.board === -1 ? undefined : data.board
    };

    setQuery(filters);
  };

  const showFilter = (filterKey) => availableFilters?.indexOf(filterKey) !== -1;

  return (
    <FormProvider {...formMethods}>
      <Divider sx={{ my: 2 }}>
        <Typography
          sx={{
            fontWeight: 500,
            color: '#777',
          }}
        >
          فیلترهای جستجو
        </Typography>
      </Divider>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <List>
          {showFilter('State') && (
            <ListItem>
              <AutoCompleteInput options={stateOptions} label="استان" name="province" />
            </ListItem>
          )}

          <ListItem>
            <Controller
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  defaultValue={[]}
                  options={[]}
                  freeSolo
                  fullWidth
                  onChange={(event, newValue) => field.onChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="کلید واژه"
                      sx={{ '& input::placeholder': { color: '#333', opacity: 0.8 }, background: '#fff' }}
                      InputLabelProps={{ shrink: true }}
                      placeholder="کلید واژه"
                    />
                  )}
                />
              )}
              name="keyWord"
            />
          </ListItem>
          <ListItem>
            <AutoCompleteInput options={jobBoards} label="پلتفرم" name="board" />
          </ListItem>
          {showFilter('Gender') && (
            <ListItem>
              <AutoCompleteInput options={genderOption} label="جنسیت" name="gender" />
            </ListItem>
          )}
          {showFilter('MilitaryStatus') && (
            <ListItem>
              <AutoCompleteInput options={militaryOption} label="وضعیت سربازی" name="militaryStatus" />
            </ListItem>
          )}
          <Collapse in={showAdvancedFilter}>
            {showFilter('Salary') && (
              <ListItem>
                <Stack sx={{ width: '100%' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">حداقل پرداخت</Typography>
                    <Typography>{salary} میلیون تومان</Typography>
                  </Stack>
                  <Controller
                    render={({ field }) => (
                      <Slider
                        {...field}
                        defaultValue={5}
                        min={0}
                        max={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                      />
                    )}
                    name="salary"
                  />
                </Stack>
              </ListItem>
            )}
            {showFilter('WorkExperience') && (
              <ListItem>
                <AutoCompleteInput options={workExperienceOption} label="سابقه کاری" name="workExperience" />
              </ListItem>
            )}
            {/*<ListItem>*/}
            {/*  <AutoCompleteInput options={militaryOption} label="کلید واژه" name="militaryStatus" />*/}
            {/*</ListItem>*/}
            {showFilter('CompanyCapacity') && (
              <ListItem>
                <AutoCompleteInput options={companyCapacityOption} label="اندازه سازمان" name="companyCapacity" />
              </ListItem>
            )}
            {showFilter('Degree') && (
              <ListItem>
                <AutoCompleteInput options={degreeOption} label="مدرک تحصیلی" name="degree" />
              </ListItem>
            )}
          </Collapse>
          {/*<Divider sx={{ my: 2 }}>*/}
          {/*  <Button*/}
          {/*    onClick={() => (showAdvancedFilter ? handleCloseAdvancedFilter() : handleOpenAdvancedFilter())}*/}
          {/*    size="small"*/}
          {/*  >*/}
          {/*    <Typography>{showAdvancedFilter && 'بستن'} فیلتر های پیشرفته</Typography>*/}
          {/*  </Button>*/}
          {/*</Divider>*/}
          <br />
          <ListItem>
            <Grid container spacing={1}>
              <Grid item xs>
                <Button type="submit" variant="contained" size="large" sx={{ width: '100%' }}>
                  <Typography>اعمال فیلتر</Typography>
                </Button>
              </Grid>
              {hasFilter && (
                <Grid item xs={6}>
                  <Button
                    startIcon={<CloseRoundedIcon />}
                    size="large"
                    onClick={() => removeAllFilters()}
                    sx={{
                      width: '100%',
                      fontWeight: 700,
                      color: '#666',
                      '& *': {
                        fontWeight: 500,
                      },
                      '& .MuiButton-startIcon': {
                        marginRight: 0.5,
                        marginTop: '-2px',
                      },
                      '& svg': { color: 'rgba(211, 47, 47, 1)' },
                    }}
                  >
                    <Typography>حذف فیلترها</Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
          </ListItem>
        </List>
      </form>
    </FormProvider>
  );
};

export default JobSearchFilter;
