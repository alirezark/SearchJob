import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { default as ResumeComponent } from '@/layouts/profile/myResume';
import ProfileLayout from '@/layouts/profile/layout';

type StaticProps = { isReadyToRender: boolean };
type Props = { isReadyToRender: boolean };

export const getStaticProps: GetStaticProps<StaticProps> = () => {
  return {
    props: {
      isReadyToRender: true,
      serializedDataset: 'test',
    },
  };
};

const Resume: NextPage<Props> = (props): JSX.Element => {
  return (
    <ProfileLayout>
      <ResumeComponent />
    </ProfileLayout>
  );
};

export default Resume;
