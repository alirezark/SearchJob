import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { default as InformationComponent } from '@/layouts/profile/information';
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

const Information: NextPage<Props> = (props): JSX.Element => {
  return (
    <ProfileLayout>
      <InformationComponent />
    </ProfileLayout>
  );
};

export default Information;
