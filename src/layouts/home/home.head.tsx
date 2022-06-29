import React from 'react';
import Head from 'next/head';
import { provinces } from '@/constants/provinces';
import { makeTitle } from '@/utils/pageTitle';


const homeHead = (): JSX.Element => {
  return (
    <Head>
      <script type="application/ld+json">
          {'{'}
              "@context": "http://www.schema.org",
              "@type": "Organization",
              "name": "وب سایت",
              "alternateName":[
              "وب سایت",
              "webSite"
              ],
              "url": "https://web.site",
              "logo": "https://web.site/favicon.png",
              "description": "سامانه وب سایت (web.site) در سال ۱۳۹۸ راه‌اندازی شد تا پاسخی باشد به دغدغه‌های شرکت‌ها و صنایع مختلف کشور در حوزه کلیدی منابع انسانی. در وب سایت، به کارجویان راه های رسیدن به شغل مطلوبشان را آموزش داده ایم، و به آنها می‌آموزیم که چگونه مهارت های خود را برای شکوفایی شغلی افزایش دهند. همچنین تلاش می کنیم برای کارفرمایان و مدیران سرمایه انسانی، با مطالب به روز و تخصصی در جهت افزایش بهره وری سرمایه انسانی در سازمان متبوعشان گامی برداریم.",
              "address": {'{'}
              "@type": "PostalAddress",
              "streetAddress": "تهران، خیابان توحید، خیابان فرصت شیرازی، کوچه سامانی، برج توحید، پلاک ۱۸۱، طبقه پنجم",
              "addressLocality": "تهران",
              "addressRegion": "تهران",
              "postalCode": "1419913822",
              "addressCountry": "ایران"
          {'}'},
              "contactPoint": {'{'}
              "@type": "ContactPoint",
              "contactType": "customer service",
              "telephone": "+9821-72391100"
          {'}'},
              "sameAs": [
              "https://t.me/webSitesolutions",
              "https://instagram.com/webSitesolutions?igshid=7ffa61u1ygrg",
              "https://twitter.com/webSitesolutions"
              ]
          {'}'}
        </script>
        <script type="application/ld+json">
          {'{'}
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.web.site/",
            "potentialAction": [{'{'}
              "@type": "SearchAction",
              "target": {'{'}
                "@type": "EntryPoint",
                "urlTemplate": "https://web.site/search/{'{'}search_term_string{'}'}"
              {'}'},
              "query-input": "required name=search_term_string"
            {'}'}
            ]
          {'}'}
        </script>
    </Head>
  );
};

export default homeHead;
