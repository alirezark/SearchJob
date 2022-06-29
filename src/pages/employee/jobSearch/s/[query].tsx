import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { default as JobSearchComponent } from '@/layouts/jobSearch/jobSearch';
import SearchService from '@/services/search.service';
import { mapValues, assignIn } from 'lodash';
import { isNumeric } from '@/utils/functions';

type JobSearchProps = {
  isServer: boolean;
  data: any;
};

export async function getServerSideProps(context) {
  const FilterQueries = {
    province: undefined,
    gender: undefined,
    militaryStatus: undefined,
    salary: undefined,
    workExperience: undefined,
    companyCapacity: undefined,
    degree: undefined,
    board: undefined,
  };

  const {
    params: { query },
    query: filters,
  } = context;

  const filter = assignIn(
    FilterQueries,
    mapValues(filters, (value) => (isNumeric(value) ? parseInt(value, 10) : value))
  );

  filter.text = query;
  filter.state = filter.province;

  delete filter.query;
  delete filter.province;

  try {
    const res = await SearchService.getFilterResult({
      ...filter,
      page: filter.page || 0,
      size: 20,
    });

    return {
      props: {
        data: res.data,
        isReadyToRender: true,
        serializedDataset: 'test',
      },
    };
  } catch (error) {
    return {
      props: {
        data: {
          content: [],
          totalPages: 0,
        },
        isReadyToRender: true,
        serializedDataset: 'test',
      },
    };
  }
}

const JobSearch: NextPage<JobSearchProps> = ({ data, isServer }: JobSearchProps): JSX.Element => {
  return <JobSearchComponent data={data} isServer={isServer} />;
};

export default JobSearch;
