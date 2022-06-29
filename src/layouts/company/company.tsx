import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Typography, Avatar, Pagination, Box, Stack, Container, Divider,
} from '@mui/material';
import Link from 'next/link';
import BuildingIcon from '@exam/uikit/icons/building';
import CardView from '@/components/job/cardView';
import { toIRHJob } from '@/services/job.service';
import { loadCompany } from '@/services/company.service';
import CardViewLoading from '@/components/job/cardView/cardView.loading';
import { useQueryParams, withDefault, NumberParam } from 'next-query-params';
import CoreLayout from '../core/coreLayout';
import PaginationItem from '@mui/material/PaginationItem';
import useResponsive from '@/utils/responsive';
import EmptyResult from '@/layouts/jobSearch/jobSearch.emptyResult';
import CompanyHead from './company.head';

const styles = {
  companyLogo: {
    width: 92,
    height: 92,
    backgroundColor: '#E8F3FF',
  }
};

function Company({ data }: any) {
  const { push: navigate, query: routeQuery, asPath } = useRouter();
  const { id: companyId } = routeQuery;
  const { sm } = useResponsive();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
  });
  const mounted = useRef(false);
  const [{
    jobs, totalCount, pages, loadingJobs
  }, setJobs] = useState({
    jobs: data?.content,
    totalCount: data?.totalElements,
    pages: data?.totalPages,
    loadingJobs: false,
  });

  const companyName = jobs?.[0]?.companyName;
  const avatarUrl = jobs?.[0]?.imageUrl;


  useEffect(() => {
    // prevent to load data on first render
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    setJobs((prevState) => ({
      ...prevState,
      loadingJobs: false,
    }));
    loadCompany(companyId, query.page - 1, 20).then((data) => {
      setJobs((prevState) => ({
        ...prevState,
        jobs: data?.content,
        loadingJobs: false,
        pages: data?.totalPages,
      }));
    });
  }, [query]);


  function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return uri + separator + key + '=' + value;
    }
  }

  if (!data || data?.totalPages === 0) {
    return <CoreLayout>
      <Box mt={16}>
        <EmptyResult text="شرکتی یافت نشد" />
      </Box>
    </CoreLayout>;
  }

  return (
    <CoreLayout>
      <CompanyHead companyName={companyName}></CompanyHead>
      <Container
        maxWidth='md'
        sx={{
          mt: 3,
          mx: 'auto',
        }}
      >
        <Box sx={{ mt: 2, mb: 12, pb: 4, background: '#fff', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd' }}>
          <Stack direction="row" alignItems="center" spacing={4} p={2} sx={{ background: '#fafafa', borderBottom: '1px solid #ddd', color: '#333' }}>
            <Avatar variant="rounded" src={avatarUrl} sx={styles.companyLogo}>
              <BuildingIcon color="#4884F9" />
            </Avatar>
            <Typography variant="h2" component="h1">{companyName}</Typography>
          </Stack>
          <Stack direction={['column', 'row']} justifyContent="space-between" alignItems="center" p={2} pt={4}>
            <Typography variant="h3" sx={{ mb: [2, 0] }}>موقعیت های شغلی {companyName}:</Typography>
            <Typography variant="body1" sx={{ background: '#eee', fontWeight: 700, px: 1, py: 0.5, borderRadius: 1 }}>{totalCount} موقعیت شغلی</Typography>
          </Stack>
          {loadingJobs && Array.from(Array(5)).map((_, index) => <>
            <Divider light />
            <CardViewLoading borderLess key={index} />
          </>)}

          {!loadingJobs && jobs?.length > 0 && (
            <Box>
              {jobs.map((job, index) => (
                <>
                  <Divider light />
                  <CardView key={index} jobInfo={toIRHJob(job)} borderLess small />
                </>
              ))}
            </Box>
          )}

          {jobs?.length > 0 && (
            <Pagination
              defaultPage={query.page || 1}
              onChange={(e, p) =>
                setQuery({
                  ...query,
                  page: p,
                })
              }
              sx={{ mt: 3, '& ul': { justifyContent: 'center'} }}
              count={pages}
              color='primary'
              renderItem={(item) => (
                <Link href={updateQueryStringParameter(asPath, 'page', item.page)} passHref>
                  <PaginationItem {...item} />
                </Link>
              )}
            />
          )}
        </Box>
      </Container>
    </CoreLayout>
  );
}

export default Company;
