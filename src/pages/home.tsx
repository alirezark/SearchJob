import { NextPage } from 'next';
import React from 'react';
import { default as HomeComponent } from '@/layouts/home/home';
import { loadCountActiveJobAndCompany } from '@/services/base.sevice';

type Props = { isReadyToRender: boolean; jobsAndCompaniesCount: any };

export async function getServerSideProps() {
  try {
    const jobsAndCompaniesCount = await loadCountActiveJobAndCompany();
    return {
      props: {
        isReadyToRender: true,
        serializedDataset: 'test',
        jobsAndCompaniesCount,
      },
    };
  } catch (error) {
    return {
      props: {
        isReadyToRender: false,
        jobsAndCompaniesCount: {},
      },
    };
  }
}

const Home: NextPage<Props> = ({ jobsAndCompaniesCount }): JSX.Element => {
  return <HomeComponent jobsAndCompaniesCount={jobsAndCompaniesCount} />;
};

export default Home;
