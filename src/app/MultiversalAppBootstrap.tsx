import Loader from '@/components/animations/Loader';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import datasetContext from '@/modules/core/data/contexts/datasetContext';
import { createLogger } from '@/modules/core/logging/logger';
import previewModeContext from '@/modules/core/previewMode/contexts/previewModeContext';

import { isBrowser } from '@unly/utils';
import isEmpty from 'lodash.isempty';
import React, { useState } from 'react';
import { MultiversalAppBootstrapProps } from './types/MultiversalAppBootstrapProps';
import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './BrowserPageBootstrap';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './ServerPageBootstrap';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@exam/uikit';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { NextQueryParamProvider } from 'next-query-params';
import { SnackbarProvider } from 'notistack';
import Splash from '@/components/splash';

const fileLabel = 'app/components/MultiversalAppBootstrap';
const logger = createLogger({
  fileLabel,
});

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const queryClient = new QueryClient();

type Props = MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>;

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const MultiversalAppBootstrap: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { pageProps, router } = props;

  const { session } = pageProps;
  // When using SSG with "fallback: true" and the page hasn't been generated yet then isSSGFallbackInitialBuild is true
  const [isSSGFallbackInitialBuild] = useState<boolean>(isEmpty(pageProps) && router?.isFallback === true);

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // Avoids log clutter on server
    console.debug('MultiversalAppBootstrap.props', props); // eslint-disable-line no-console
  }

  // Display a loader (we could use a skeleton too) when this happens, so that the user doesn't face a white page until the page is generated and displayed
  if (isSSGFallbackInitialBuild && router?.isFallback) {
    // When router.isFallback becomes "false", then it'll mean the page has been generated and rendered and we can display it, instead of the loader
    return <Loader />;
  }

  if (pageProps.isReadyToRender || pageProps.statusCode === 404) {
    if (!process.env.IS_SERVER_INITIAL_BUILD) {
      // Avoids noise when building the whole app
      logger.info('MultiversalAppBootstrap - App is ready, rendering...');
    }

    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && isBrowser()) {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-console
    }

    let isPreviewModeEnabled;
    let previewData;

    if ('preview' in pageProps) {
      // SSG
      isPreviewModeEnabled = pageProps?.preview;
      previewData = pageProps?.previewData;
    } else {
      // SSR
      isPreviewModeEnabled = false;
      previewData = null;
    }

    let browserPageBootstrapProps: BrowserPageBootstrapProps;
    let serverPageBootstrapProps: ServerPageBootstrapProps;

    if (isBrowser()) {
      browserPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          isSSGFallbackInitialBuild: isSSGFallbackInitialBuild,
        },
      };
    } else {
      serverPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          isSSGFallbackInitialBuild: isSSGFallbackInitialBuild,
        },
      };
    }

    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <datasetContext.Provider value={null}>
            <NextQueryParamProvider>
              <CookiesProvider>
                <SnackbarProvider>
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <Splash />
                      <previewModeContext.Provider
                        value={{
                          isPreviewModeEnabled: isPreviewModeEnabled,
                          previewData,
                        }}
                      >
                        <>
                          <>
                            {isBrowser() ? (
                              <BrowserPageBootstrap {...browserPageBootstrapProps} />
                            ) : (
                              <ServerPageBootstrap {...serverPageBootstrapProps} />
                            )}
                          </>
                        </>
                      </previewModeContext.Provider>
                    </ThemeProvider>
                  </CacheProvider>
                </SnackbarProvider>
              </CookiesProvider>
            </NextQueryParamProvider>
          </datasetContext.Provider>
        </QueryClientProvider>
      </SessionProvider>
    );
  } else {
    // We wait for out props to contain "isReadyToRender: true", which means they've been set correctly by either getInitialProps/getStaticProps/getServerProps
    // This helps avoid multiple useless renders (especially in development mode) and thus avoid noisy logs
    // XXX I've recently tested without it and didn't notice any more logs than expected/usual. Maybe this was from a time where there were multiple full-renders? It may be removed if so (TODO later with proper testing)
    // eslint-disable-next-line no-console
    console.info('MultiversalAppBootstrap - App is not ready yet, waiting for isReadyToRender');
    return null;
  }
};

export default MultiversalAppBootstrap;
