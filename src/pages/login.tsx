import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { default as LoginComponent } from '@/layouts/auth/login';
import { getSession } from 'next-auth/react';

type StaticProps = { isReadyToRender: boolean };
type Props = { isReadyToRender: boolean };

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  console.log('session:', session);

  return {
    props: {
      isReadyToRender: true,
      serializedDataset: 'test',
    },
  };
};

const Login: NextPage<Props> = (props): JSX.Element => {
  return <LoginComponent />;
};

export default Login;
