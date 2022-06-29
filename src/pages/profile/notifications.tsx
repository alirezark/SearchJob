import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { default as NotificationComponent } from '@/layouts/profile/notifications';
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

const Notification: NextPage<Props> = (props): JSX.Element => {
  return (
    <ProfileLayout>
      <NotificationComponent />
    </ProfileLayout>
  );
};

export default Notification;
