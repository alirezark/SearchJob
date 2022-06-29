import React from 'react';
import CoreLayout from '../core/coreLayout';
import JobView from '@/components/job/jobView';
import { Container } from '@mui/material';

const Job = ({ job }) => {
  console.log(job);
  return (
    <CoreLayout>
      <Container>
        <JobView jobInfo={job} small={false} onSave={() => null} />
      </Container>
    </CoreLayout>
  );
};

export default Job;
