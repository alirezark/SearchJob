import React from 'react';
import Head from 'next/head';
import { provinces } from '@/constants/provinces';
import { makeTitle } from '@/utils/pageTitle';

export type JobSearchHeadProps = {
  searchText: string;
  province?: number;
};

const JobSearchHead = ({ searchText, province }: JobSearchHeadProps): JSX.Element => {
  let title = makeTitle('استخدام ' + (searchText ? searchText : ''));

  const faqData = [
    {
      title: 'در وب سایت چه آگهی های شغلی مرتبط با استخدام ' + searchText + ' میتوان دید؟',
      description: 'در وب سایت میتوانید از میان تمام آگهی های شغلی موجود در پلتفرم های کاریابی در رابطه با استخدام ' + searchText + ' جستجو کنید.',
    },
    {
        title: 'چگونه میتوانم در رابطه با  مهارت ها و ویژگی های یک ' + searchText + ' آشنا شوم؟',
        description: 'با مراجعه به بخش وبلاگ وب سایت میتوانید مطالب مفیدی درباره مهارت ها و ویژگی های یک ' + searchText + ' مطالعه کنید.',
    }
  ];

  let keyWord = 'استخدام, ' + (searchText ? searchText:'') ;

  if (!!province) {
    title += ` در  ${provinces.find((p) => p.id === province)?.label}`;
    keyWord += `, ${provinces.find((p) => p.id === province)?.label}`;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={"تمام موقعیت های شغلی استخدام " + (searchText ? searchText:'') + (!!province ? ` در  ${provinces.find((p) => p.id === province)?.label}` : "")}></meta>
      <meta name="keywords" content={keyWord}></meta>
      <link rel="canonical" href={"https://web.site/search/" + (searchText ? searchText:'') + (!!province ? "?province="+province : "")} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={"تمام موقعیت های شغلی استخدام " + (searchText ? searchText:'') + (!!province ? ` در  ${provinces.find((p) => p.id === province)?.label}` : "")} />
      <meta property="og:url" content={"https://web.site/search/" + (searchText ? searchText:'') + (!!province ? "?province="+province : "")} />
      <meta property="og:site_name" content="وب سایت" />
      {searchText && (
        <script type="application/ld+json">
          {'{'}
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{'{'}
              "@type": "Question",
              "name": "{faqData[0].title}",
              "acceptedAnswer": {'{'}
                "@type": "Answer",
                "text": "{faqData[0].description}"
                {'}'}
              {'}'},
              {'{'}
              "@type": "Question",
              "name": "{faqData[1].title}",
              "acceptedAnswer": {'{'}
                "@type": "Answer",
                "text": "{faqData[1].description}"
                {'}'}
              {'}'}
            ]
          {'}'}
        </script>
      )}
    </Head>
  );
};

export default JobSearchHead;
