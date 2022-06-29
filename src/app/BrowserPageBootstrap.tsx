import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import useDataset from '@/modules/core/data/hooks/useDataset';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import { cypressContext } from '@/modules/core/testing/contexts/cypressContext';
import { CYPRESS_WINDOW_NS, detectCypress } from '@/modules/core/testing/cypress';
import userConsentContext from '@/modules/core/userConsent/contexts/userConsentContext';
import initCookieConsent, { getUserConsent } from '@/modules/core/userConsent/cookieConsent';
import { UserConsent } from '@/modules/core/userConsent/types/UserConsent';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import { userSessionContext } from '@/modules/core/userSession/userSessionContext';
import { useTheme } from '@emotion/react';
import React from 'react';
import { MultiversalAppBootstrapPageProps } from './types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from './types/MultiversalAppBootstrapProps';

const fileLabel = 'app/components/BrowserPageBootstrap';
const logger = createLogger({
  fileLabel,
});

export type BrowserPageBootstrapProps = MultiversalAppBootstrapProps<
  MultiversalPageProps & MultiversalAppBootstrapPageProps
>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps): JSX.Element => {
  const { Component, err, router } = props;
  // When the page is served by the browser, some browser-only properties are available
  const dataset = useDataset();
  const customer: Customer = useCustomer();
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(); // On browser, we can access cookies directly (doesn't need req/res or page context)
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const userId = userSession.id;
  const injectedPageProps: MultiversalPageProps<OnlyBrowserPageProps> = {
    ...props.pageProps,
    cookiesManager,
    userSession,
  };
  const theme = useTheme();
  const isCypressRunning = detectCypress();
  const userConsent: UserConsent = getUserConsent();
  // Init the Cookie Consent popup, which will open on the browser
  initCookieConsent({
    allowedPages: [
      // We only allow it on those pages to avoid display that boring popup on every page
      `${window.location.origin}/${'locale'}/demo/terms`,
      `${window.location.origin}/${'locale'}/demo/privacy`,
      `${window.location.origin}/${'locale'}/demo/built-in-features/cookies-consent`,
    ],
    theme,
    userConsent,
  });

  // XXX Inject data so that Cypress can use them to run dynamic tests.
  //  Those data mustn't be sensitive. They'll be available in the DOM, no matter the stage of the app.
  //  This is needed to run E2E tests that are specific to a customer. (dynamic testing)
  window[CYPRESS_WINDOW_NS] = {
    dataset,
    customer,
  };

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    window['router'] = router;
  }

  return (
    <cypressContext.Provider value={{ isCypressRunning }}>
      <userSessionContext.Provider value={{ ...userSession }}>
        <userConsentContext.Provider value={{ ...userConsent }}>
          <Component
            {...injectedPageProps}
            // @ts-ignore
            error={err}
          />
        </userConsentContext.Provider>
      </userSessionContext.Provider>
    </cypressContext.Provider>
  );
};

export default BrowserPageBootstrap;
