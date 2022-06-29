import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { DEMO_LAYOUT_QUERY } from '@exam/data/src/gql/demoLayoutQuery';
import {
  GetCoreLayoutServerSideProps,
  GetCoreServerSidePropsOptions,
} from '@/layouts/core/types/GetCoreLayoutServerSideProps';
import { PublicHeaders } from '@/layouts/core/types/PublicHeaders';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { Customer } from '@/modules/core/data/types/Customer';
import { GraphCMSDataset } from '@/modules/core/data/types/GraphCMSDataset';
import { getGraphcmsDataset } from '@/modules/core/gql/getGraphcmsDataset';
import { prepareGraphCMSLocaleHeader } from '@/modules/core/gql/graphcms';
import { ApolloQueryOptions } from '@/modules/core/gql/types/ApolloQueryOptions';
import {
  StaticCustomer,
  StaticDataset,
} from '@/modules/core/gql/types/StaticDataset';
import { createLogger } from '@/modules/core/logging/logger';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import {
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { IncomingMessage } from 'http';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import NextCookies from 'next-cookies';

const fileLabel = 'layouts/core/coreLayoutSSR';
const logger = createLogger({
  fileLabel,
});


/**
 * "getCoreLayoutServerSideProps" returns only part of the props expected in SSRPageProps.
 * To avoid TS errors, we omit those that we don't return, and add those necessary to the "getServerSideProps" function.
 */
export type GetCoreLayoutServerSidePropsResults = Omit<SSRPageProps, '__APOLLO_STATE__' | 'customer'> & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  layoutQueryOptions: ApolloQueryOptions;
  headers: PublicHeaders;
}

/**
 * Returns a "getServerSideProps" function.
 *
 * Disables redirecting to the 404 page when building the 404 page.
 *
 * @param options
 */
export const getCoreLayoutServerSideProps: GetCoreLayoutServerSideProps = (options?: GetCoreServerSidePropsOptions) => {
  const {
    enable404Redirect = true,
  } = options || {};

  /**
   * Only executed on the server side, for every request.
   * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps.
   *
   * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries.
   * This improves performances, by only running one GQL query instead of many (consumer's choice).
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   *
   * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
   */
  const getServerSideProps: GetServerSideProps<GetCoreLayoutServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCoreLayoutServerSidePropsResults>> => {
    const {
      query,
      params,
      req,
      res,
      ...rest
    } = context;
    const readonlyCookies: Cookies = NextCookies(context); // Parses Next.js cookies in a universal way (server + client)
    const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res); // Cannot be forwarded as pageProps, because contains circular refs
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
    const { headers }: IncomingMessage = req;
    const publicHeaders: PublicHeaders = {
      'accept-language': headers?.['accept-language'],
      'user-agent': headers?.['user-agent'],
      'host': headers?.host,
    };
    const bestCountryCodes: string[] = ['fa'];
    const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
    // XXX This part is not using "getGraphcmsDataset" because I'm not sure how to return the "apolloClient" instance when doing so, as it'll be wrapped and isn't returned
    //  So, code is duplicated, but that works fine
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
    const layoutQueryOptions: ApolloQueryOptions = {
      displayName: 'DEMO_LAYOUT_QUERY',
      query: DEMO_LAYOUT_QUERY,
      context: {
        headers: {
          'gcms-locales': gcmsLocales,
        },
      },
    };

    const dataset: StaticDataset | GraphCMSDataset = await getGraphcmsDataset(gcmsLocales);
    const customer: StaticCustomer | Customer = dataset?.customer;

    // Do not serve pages using locales the customer doesn't have enabled
    if (enable404Redirect) {
      return {
        notFound: true,
      };
    }

    // Most props returned here will be necessary for the app to work properly (see "SSRPageProps")
    // Some props are meant to be helpful to the consumer and won't be passed down to the _app.render (e.g: apolloClient, layoutQueryOptions)
    return {
      props: {
        apolloClient,
        bestCountryCodes,
        serializedDataset: null, // We don't send the dataset yet (we don't have any because we haven't fetched the database yet), but it must be done by SSR pages in"getServerSideProps"
        headers: publicHeaders,
        gcmsLocales,
        isReadyToRender: true,
        isServerRendering: true,
        layoutQueryOptions,
        readonlyCookies,
        userSession,
      },
    };
  };

  return getServerSideProps;
};
