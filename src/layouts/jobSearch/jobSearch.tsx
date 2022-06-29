import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, Grid, Pagination, Box, Stack, Container, Divider, Skeleton } from '@mui/material';
import Link from 'next/link';
import SearchService from '@/services/search.service';
import CardView from '@/components/job/cardView';
import { toIRHJob } from '@/services/job.service';
import SearchInput from '@/components/searchInput';
import CardViewLoading from '@/components/job/cardView/cardView.loading';
import JobSearchFilter, { FilterQueries } from './jobSearch.filter';
import { pickBy } from 'lodash';
import { useCookies } from 'react-cookie';
import LoginDialog from './loginDialog';
import { useQueryParams, withDefault, NumberParam } from 'next-query-params';
import EmptyResult from './jobSearch.emptyResult';
import CoreLayout from '../core/coreLayout';
import JobSearchHead from './jobSearch.head';
import PaginationItem from '@mui/material/PaginationItem';
import useResponsive from '@/utils/responsive';
import JobFaq from './jobSearch.footer.faq';
import { provinces } from '@/constants/provinces';

function JobSearch({ data }: any) {
  const { push: navigate, query: routeQuery, asPath } = useRouter();
  const { sm } = useResponsive();
  const { query: q } = routeQuery;
  const [query, setQuery] = useQueryParams({
    ...FilterQueries,
    page: withDefault(NumberParam, 0),
  });
  const [cookies, setSearchHistory] = useCookies(['searchHistory']);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const mounted = useRef(false);

  const isLogin = false; // !!OtpAuthService.getCurrentUser();

  const searchHistory = cookies.searchHistory || [];

  const apiData = { state: query.province, ...query };

  const [{ jobs, availableFields, totalCount, pages, loadingJobs }, setJobs] = useState({
    jobs: data?.content,
    availableFields: data?.availableField,
    totalCount: data?.totalElements,
    pages: data?.totalPages,
    loadingJobs: false,
  });

  const [searchText, setSearchText] = useState<string>(q as string);

  useEffect(() => {
    // prevent to load data on first render
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    // if (!!q && searchHistory?.indexOf(q) === -1 && !isLogin) {
    //   if (searchHistory.length >= 2) {
    //     setShowLoginDialog(true);
    //     return;
    //   }
    //
    //   setSearchHistory('searchHistory', [...searchHistory, q]);
    // }

    // show login dialog on third try

    // check if query has any value more than page
    if (Object.keys(pickBy(query, (q) => q !== undefined))?.length > 1) {
      searchWithFilter();
    } else {
      getResult(searchText, apiData?.page || 0, 20);
    }
  }, [q, query]);

  const getResult = (searchText, page, size) => {
    setJobs((prevState) => ({
      ...prevState,
      loadingJobs: true,
    }));
    const res = SearchService.getSearchResult(searchText, page, size);
    res.then(
      (r) => {
        if (r.data?.totalPages === 0) {
          setJobs((prevState) => ({
            ...prevState,
            loadingJobs: false,
            jobs: [],
          }));
        } else {
          setJobs({
            jobs: r.data.content,
            availableFields: r.data.availableField,
            totalCount: r.data.totalElements,
            pages: r.data.totalPages,
            loadingJobs: false,
          });
        }
      },
      (err) => {
        setJobs((prevState) => ({
          ...prevState,
          loadingJobs: false,
        }));
      }
    );
  };

  const handleOnSearchClick = () => {
    if (searchText.length < 2) {
      return;
    }
    navigate('/search/' + searchText);
  };

  const searchWithFilter = () => {
    const res = SearchService.getFilterResult({
      text: searchText,
      ...apiData,
      keyWord: apiData?.keyWord !== undefined ? apiData?.keyWord.split('|') : undefined,
      size: 20,
    });
    setJobs({
      totalCount: 0,
      pages: 0,
      jobs: [],
      loadingJobs: true,
      availableFields: availableFields,
    });
    res.then(
      (r) => {
        setJobs({
          jobs: r.data?.content,
          availableFields: r.data?.availableField,
          totalCount: r.data?.totalElements,
          pages: r.data.totalPages,
          loadingJobs: false,
        });
      },
      (err) => {
        setJobs((prevState) => ({
          ...prevState,
          loadingJobs: false,
        }));
      }
    );
  };

  const getPageTitle = () => {
    return (
      <>
        {totalCount} فرصت شغلی برای{' '}
        {q ? q : query?.province ? provinces.find((p) => p.id === query.province)?.label : ''} یافت شد
      </>
    );
  };

  function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return uri + separator + key + '=' + value;
    }
  }

  return (
    <CoreLayout>
      <JobSearchHead searchText={searchText} province={query?.province} />
      <Container
        maxWidth="xl"
        sx={{
          mt: 3,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #eee',
            pb: 3,
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            {sm && <Typography variant="h6">جستجوی شغل: </Typography>}
            <SearchInput
              sx={{
                width: 500,
                m: 0,
              }}
              label="عنوان شغلی"
              value={searchText}
              bordered
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleOnSearchClick();
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: 140,
                height: 42,
                fontSize: '1rem',
                fontWeight: 500,
              }}
              onClick={() => {
                handleOnSearchClick();
              }}
            >
              {sm ? 'جستجو در مشاغل' : 'جستو'}
            </Button>
          </Stack>
        </Box>
        <Box sx={{ mt: 2, pb: 8 }}>
          <Grid container spacing={[0, 3]}>
            <Grid item sx={{ maxWidth: 370, mx: 'auto' }}>
              <Box
                style={{
                  width: '100%',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <JobSearchFilter availableFilters={availableFields} />
              </Box>
            </Grid>
            {sm && <Divider orientation="vertical" flexItem sx={{ mt: 1, borderColor: '#eee' }} />}
            <Grid item xs>
              {!loadingJobs && jobs?.length === 0 && <EmptyResult />}
              {loadingJobs && <Skeleton variant="text" width="88%" height={36} animation="wave" />}
              {loadingJobs && Array.from(Array(5)).map((_, index) => <CardViewLoading key={index} />)}

              {!loadingJobs && jobs?.length > 0 && (
                <Box>
                  <Box>
                    <Typography variant={sm ? 'h1' : 'h1'} sx={{ color: '#777', fontWeight: 500, mt: 2, mb: [3, 4] }}>
                      {getPageTitle()}
                    </Typography>
                  </Box>
                  {jobs.map((job, index) => (
                    <CardView key={index} jobInfo={toIRHJob(job)} small />
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
                  sx={{ mt: 3 }}
                  count={pages}
                  color="primary"
                  renderItem={(item) => (
                    <Link href={updateQueryStringParameter(asPath, 'page', item.page)} passHref>
                      <PaginationItem {...item} />
                    </Link>
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <LoginDialog open={showLoginDialog} />
      </Container>
      {!!searchText && jobs?.length > 0 && <JobFaq searchText={searchText} />}
    </CoreLayout>
  );
}

export default JobSearch;
