import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { default as CompanyComponent } from '@/layouts/company/company';
import { loadCompany } from '@/services/company.service';
import { mapValues, assignIn } from 'lodash';
import { isNumeric } from '@/utils/functions';

type JobSearchProps = {
  isServer: boolean;
  data: any;
};

export async function getServerSideProps(context) {
  const FilterQueries = {
    page: 1,
    size: 20,
  };

  const {
    params: { id },
    query: _filters,
  } = context;

  const filter = assignIn(
    FilterQueries,
    mapValues(_filters, (value) => (isNumeric(value) ? parseInt(value, 10) : value))
  );

  try {
    const res = await loadCompany(id, filter.page - 1, filter.size);

    return {
      props: {
        data: res,
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
  return <CompanyComponent data={data} isServer={isServer} />;
};

export default JobSearch;
