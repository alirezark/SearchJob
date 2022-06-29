import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { default as JobComponent } from '@/layouts/job/job';
import { loadJob } from '@/services/job.service';

type GenericObject = { [key: string]: any };

type JobProps = {
  job: GenericObject;
};

export async function getServerSideProps(context) {
  try {
    const {
      params: { id },
    } = context;
    const jobData = await loadJob(id);

    if (!!jobData) {
      return {
        props: {
          job: jobData,
          isReadyToRender: true,
          serializedDataset: 'test',
        },
      };
    }

    return {
      props: {
        isReadyToRender: true,
        serializedDataset: 'test',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        isReadyToRender: true,
        serializedDataset: 'test',
      },
    };
  }
}

const Job: NextPage<JobProps> = ({ job }: JobProps): JSX.Element => {
  return <JobComponent job={job} />;
};

export default Job;
