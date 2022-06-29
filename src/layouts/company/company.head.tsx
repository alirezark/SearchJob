import React from 'react';
import Head from 'next/head';
import { provinces } from '@/constants/provinces';
import { makeTitleCompany } from '@/utils/pageTitle';

export type JobSearchHeadProps = {
    companyName: string;
};

const companyHead = ({ companyName }: JobSearchHeadProps): JSX.Element => {
  let title = makeTitleCompany(' استخدام در ' + companyName);
  let keyWord = 'استخدام, ' + companyName ;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={"تمام موقعیت های شغلی استخدام در " + companyName }></meta>
      <meta name="keywords" content={keyWord}></meta>
    </Head>
  );
};

export default companyHead;
