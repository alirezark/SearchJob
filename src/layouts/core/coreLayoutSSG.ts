import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { DEMO_STATIC_DATA_QUERY } from '@exam/data/src/gql/demoStaticDataQuery';
import {
  GetCoreLayoutStaticPaths,
  GetCoreLayoutStaticPathsOptions,
} from '@/layouts/core/types/GetCoreLayoutStaticPaths';
import {
  GetCoreLayoutStaticProps,
  GetCoreLayoutStaticPropsOptions,
} from '@/layouts/core/types/GetCoreLayoutStaticProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import {
  APOLLO_STATE_PROP_NAME,
  getApolloState,
  initializeApollo,
} from '@/modules/core/apollo/apolloClient';
import { Customer } from '@/modules/core/data/types/Customer';
import { GraphCMSDataset } from '@/modules/core/data/types/GraphCMSDataset';
import { getGraphcmsDataset } from '@/modules/core/gql/getGraphcmsDataset';
import { prepareGraphCMSLocaleHeader } from '@/modules/core/gql/graphcms';
import {
  StaticCustomer,
  StaticDataset,
} from '@/modules/core/gql/types/StaticDataset';
import { createLogger } from '@/modules/core/logging/logger';
import { PreviewData } from '@/modules/core/previewMode/types/PreviewData';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import includes from 'lodash.includes';
import map from 'lodash.map';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';

const fileLabel = 'layouts/core/coreLayoutSSG';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns a "getStaticPaths" function.
 *
 * @param options
 */
export const getCoreLayoutStaticPaths: GetCoreLayoutStaticPaths = (options?: GetCoreLayoutStaticPathsOptions) => {
  const {
    fallback = false,
  } = options || {};

  /**
   * Only executed on the server side at build time.
   * Computes all static paths that should be available for all SSG pages.
   * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages.
   *
   * You can use "fallback" option to avoid building all page variants and allow runtime fallback.
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   * Can be overridden for per-page customisation (e.g: deepmerge).
   *
   * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
   *
   * @return Static paths that will be used by "getCoreLayoutStaticProps" to generate pages
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
   */
  const getStaticPaths: GetStaticPaths<CommonServerSideParams> = async (context: GetStaticPathsContext): Promise<StaticPathsOutput> => {
    const bestCountryCodes: string[] = ['fa'];
    const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
    const dataset: StaticDataset | GraphCMSDataset = await getGraphcmsDataset(gcmsLocales);
    const customer: StaticCustomer | Customer = dataset?.customer;

    // Generate only pages for languages that have been allowed by the customer
    const paths: StaticPath[] = map(customer?.availableLanguages, (availableLanguage: string): StaticPath => {
      return {
        params: {
        },
      };
    });

    return {
      fallback,
      paths,
    };
  };

  return getStaticPaths;
};

/**
 * Returns a "getStaticProps" function.
 *
 * Disables redirecting to the 404 page when building the 404 page.
 *
 * @param options
 */
export const getCoreLayoutStaticProps: GetCoreLayoutStaticProps = (options?: GetCoreLayoutStaticPropsOptions): GetStaticProps<SSGPageProps, CommonServerSideParams> => {
  const {
    enable404Redirect = true,
  } = options || {};

  /**
   * Only executed on the server side at build time.
   * Computes all static props that should be available for all SSG pages.
   *
   * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
   * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   * Can be overridden for per-page customisation (e.g: deepmerge).
   *
   * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
   *
   * @return Props (as "SSGPageProps") that will be passed to the Page component, as props (known as "pageProps" in _app).
   *
   * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
   */
  const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
    const preview: boolean = props?.preview || false;
    const previewData: PreviewData = props?.previewData || null;
    const bestCountryCodes: string[] = ['fa'];
    const gcmsLocales = 'fa';
    const dataset: StaticDataset | GraphCMSDataset = await getGraphcmsDataset(gcmsLocales);
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();


    // XXX Updating apollo client cache with static data
    apolloClient.writeQuery({
      query: DEMO_STATIC_DATA_QUERY,
      data: dataset,
    });

    const {
      customer,
    } = dataset || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

    // Do not serve pages using locales the customer doesn't have enabled (useful during preview mode and in development env)
    if (enable404Redirect) {
      return {
        notFound: true,
      };
    }

    return {
      // Props returned here will be available as page properties (pageProps)
      props: {
        [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
        bestCountryCodes,
        serializedDataset: serializeSafe(dataset),
        gcmsLocales,
        isReadyToRender: true,
        isStaticRendering: true,
        preview,
        previewData,
      },
    };
  };

  return getStaticProps;
};
