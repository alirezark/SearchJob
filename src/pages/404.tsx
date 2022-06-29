import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import PublicLayout from '@/layouts/public/components/PublicLayout';
import { getPublicLayoutStaticProps } from '@/layouts/public/publicLayoutSSG';
import { createLogger } from '@/modules/core/logging/logger';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { Fragment } from 'react';
import CoreLayout from '@/layouts/core/coreLayout';

const fileLabel = 'pages/404';
/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getPublicLayoutStaticProps({
  enable404Redirect: false,
});

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SoftPageProps;

const En404 = (): JSX.Element => {
  return (
    <CoreLayout>
      <h1>Page not found</h1>

      <p>The page you're looking for doesn't exist</p>
    </CoreLayout>
  );
};

/**
 * "404 not found" page, doesn't support i18n
 *
 * Doesn't use "getStaticPaths" because it's not supported by Next.js "getStaticPaths can only be used with dynamic pages, not '/404'."
 *
 * XXX The "locale" cannot be resolved properly using SSG on 404 pages, because this file doesn't belong to the "/[locale]" folder and thus doesn't benefit from url rewriting
 *  Therefore, the page will be displayed based on the DEFAULT_LOCALE value and not on the actual end-user locale
 *
 * @param props
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
const NotFound404Page: NextPage<Props> = (props): JSX.Element => {
  // We can display a custom message based on the lang, but the other parts of the app won't be translated (nav, footer)
  // Also, it has to be hardcoded, it cannot be stored on Locize, because we don't have access to translations from other languages
  return (
    <CoreLayout>
      <PublicLayout {...props}>
        <div
          css={css`
            text-align: center;
            color: #434343;
          `}
        >
          <FontAwesomeIcon icon="exclamation-triangle" size={'4x'} />
          <h1>صفحه‌ای یافت نشد</h1>
        </div>
      </PublicLayout>
    </CoreLayout>
  );
};

export const NotFound404PageName = NotFound404Page.name;

export default NotFound404Page;
