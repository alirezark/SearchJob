import React from 'react';
import { Container, Stack, Box, Paper, Typography, Button, Link } from '@mui/material';
import { jobs } from '@/constants/jobs';
import { useRouter } from 'next/router';
import CoreLayout from '@/layouts/core/coreLayout';
import { NextPage } from 'next';
import Head from 'next/head';
import { makeTitle } from '@/utils/pageTitle';

export type SiteMapProps = {
  list: string[];
};
// 177953
export async function getStaticPaths() {
  return {
    paths: Object.keys(jobs).map((job) => ({ params: { job } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  if (!context) {
    return {
      props: {
        list: Object.keys(jobs),
        isReadyToRender: true,
        serializedDataset: 'test',
      },
    };
  }
  const { job } = context.params;

  return {
    props: {
      list: !!job ? jobs[job] : Object.keys(jobs),
      isReadyToRender: true,
      serializedDataset: 'test',
    },
  };
}

const SiteMap: NextPage<SiteMapProps> = ({ list }: SiteMapProps) => {
  const {
    query: { job: category },
  } = useRouter();
  // const list = !!category ? jobs[category] : Object.keys(jobs);

  return (
    <CoreLayout>
      <Head>
        <title>{makeTitle(!!category ? 'لیست مشاغل ' + category : 'دسته‌های شغلی')}</title>
        <meta
          name="description"
          content={!!category ? 'جستجوی آگهی شغلی در لیست مشاغل ' + category : 'دسته‌های شغلی'}
        ></meta>
      </Head>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <Paper sx={{ overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1, p: 2, borderBottom: '1px solid #eee' }}
          >
            <Typography variant="h5">{!!category ? `مشاغل "${category}"` : 'دسته‌های شغلی'}</Typography>
            {!!category && (
              <Box>
                <Button component={Link} href="/jobs" sx={{ fontWeight: 700 }}>
                  بازگشت
                </Button>
              </Box>
            )}
          </Stack>
          {list?.map((data, index) => (
            <Button
              key={index}
              component={Link}
              href={`/${!!category ? 'search' : 'jobs'}/${data}`}
              sx={{ mb: 1, width: '30%' }}
            >
              {data}
            </Button>
          ))}
        </Paper>
      </Container>
    </CoreLayout>
  );
};

export default SiteMap;
