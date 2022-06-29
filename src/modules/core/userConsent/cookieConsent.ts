import { Theme } from '@emotion/react';
import { createLogger } from '@/modules/core/logging/logger';
import BrowserCookies from 'js-cookie';
import includes from 'lodash.includes';
import size from 'lodash.size';
import { UserConsent } from './types/UserConsent';

const fileLabel = 'modules/core/userConsent/cookieConsent';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

export type InitOptions = {
  allowedPages?: string[]; // On which pages should the cookie consent be enabled, if it's not an empty array then it's enabled everywhere
  theme: Theme;
  userConsent: UserConsent;
};

/**
 * Defines whether the user do not consent to data tracking by default (until they've made a choice)
 * XXX The value should depends on the laws applying to the end-user.
 *
 * For instance, in France (GDPR + CNIL), consent is required before tracking any data, unless in a very particular exception where it's allowed.
 * For NRN, we consider consent is not required before tracking analytics data, because no personal data is ever processed.
 */
export const IS_USER_OPT_OUT_BY_DEFAULT = false;

/**
 * Name of the cookie that will store the user consent.
 * Will be used by the application to know what is the choice of the user.
 */
export const CONSENT_COOKIE_NAME = 'cookieconsent_status';

/**
 * Resolves whether the user has opt-in or opt-out for analytics tracking.
 * Handles special cases when users have dismissed or not made a choice yet.
 */
export const getUserConsent = (): UserConsent => {
  const userConsentChoice: string = BrowserCookies.get(CONSENT_COOKIE_NAME);
  const isUserOptOut: boolean = userConsentChoice === 'deny';
  const isUserOptIn: boolean = userConsentChoice === 'allow' || (userConsentChoice === 'dismiss' && IS_USER_OPT_OUT_BY_DEFAULT);
  let isUserOptedOutOfAnalytics;

  if (isUserOptOut) {
    isUserOptedOutOfAnalytics = true;
  } else if (isUserOptIn) {
    isUserOptedOutOfAnalytics = false;
  } else {
    // User hasn't made a choice yet
    isUserOptedOutOfAnalytics = IS_USER_OPT_OUT_BY_DEFAULT;
  }

  return {
    isUserOptedOutOfAnalytics: isUserOptedOutOfAnalytics,
    hasUserGivenAnyCookieConsent: userConsentChoice === 'allow' || userConsentChoice === 'deny',
  };
};

/**
 * Resolves whether the current page should display the cookie consent popup.
 *
 * @param allowedPages
 */
export const shouldDisplayConsentPopup = (allowedPages: string[] | null): boolean => {
  if (!size(allowedPages)) {
    return true;
  }

  return includes(allowedPages, window.location.href);
};

/**
 * Initialise the Cookie Consent UI popup
 * Relies on Osano open source "cookieconsent" software (v3) https://github.com/osano/cookieconsent
 *
 * XXX This component lives completely outside of React render tree, it could/should probably be rewritten as a React component to be more "react-friendly"
 * XXX You'll need to refresh the browser when updating this file or changes won't be applied
 *
 * @param options
 *
 * @see https://github.com/osano/cookieconsent
 * @see https://www.osano.com/cookieconsent/documentation/
 * @see https://www.osano.com/cookieconsent/documentation/javascript-api/
 * @see https://www.osano.com/cookieconsent/download/
 */
const initCookieConsent = (options: InitOptions): void => {
  const {
    allowedPages = null,
    userConsent,
  } = options;
  const {
    isUserOptedOutOfAnalytics,
    hasUserGivenAnyCookieConsent,
  } = userConsent;

  if (!shouldDisplayConsentPopup(allowedPages)) {
    return;
  }

  // Don't init this module if it's been loaded already (avoids loading it multiple times when navigating on different pages)
  if (typeof window?.['cookieconsent'] !== 'undefined') {
    logger.debug('"cookieconsent" already loaded');
    return;
  } else {
    logger.debug('"cookieconsent" loading');
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('cookieconsent'); // XXX Requiring it will make it available in the browser (cannot be used properly as a module)

  // @ts-ignore
  const cc = window.cookieconsent;
  const additionalMessage = hasUserGivenAnyCookieConsent ? isUserOptedOutOfAnalytics ? `cookieConsent.message.userDenied` : `cookieConsent.message.userAllowed` : '';
  const message = `${additionalMessage}`;

  // Use https://www.osano.com/cookieconsent/download/ "Start Coding" to use the UI configuration builder
  // See https://www.osano.com/cookieconsent/documentation/javascript-api/ for advanced API options and documentation
  const cookieConsentSettings = {
    // Behavior
    autoOpen: true,
    autoAttach: true,
    type: 'opt-out', // We consider the user is opt-in by default and must opt-out manually to disable tracking
    revokable: true, // Doesn't seem to work as expected, stuff gets revoked even when set to false, and also depends on the country
    whitelistPage: [], // Doesn't seem to work at all, no visible effect
    blacklistPage: [],
    location: false, // XXX Can also be an object with advanced configuration to implement your own geolocation resolvers
    cookie: {
      name: CONSENT_COOKIE_NAME,
      path: '/',
      domain: window.location.hostname, // Uses the current domain
      expiryDays: 365,
      secure: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Always use a secure cookie on non-dev stages
    },
    dismissOnScroll: false,
    dismissOnTimeout: false, // XXX Beware there is a bug, buggy, will override previous choice stored in cookie
    dismissOnWindowClick: false,

    // UI (colors, visual design)
    theme: 'classic',
    position: 'bottom-right',
    // elements: {
    //   header: '<span class="cc-header"></span>',
    //   message: '<span id="cookieconsent:desc" class="cc-message"></span>',
    //   messagelink: '<span id="cookieconsent:desc" class="cc-message"> <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a></span>',
    //   dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss"></a>',
    //   allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow"></a>',
    //   deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny"></a>',
    //   link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a>',
    //   close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close"></span>',
    // },
    // window: '<div role="”dialog”" aria-label="”cookieconsent”" aria-describedby="”cookieconsent:desc”" class="”cc-window" ”></div>',
    // compliance: {
    //   'info': '<div class="cc-compliance"></div>',
    //   'opt-in': '<div class="cc-compliance cc-highlight"></div>',
    //   'opt-out': '<div class="cc-compliance cc-highlight"></div>',
    // },

    // Content (texts, wording)
    content: {
      header: 'cookieConsent.content.header',
      message: message,
      dismiss: `Ok !`,
      allow: `Accepter`,
      deny: `Refuser`,
      link: 'cookieConsent.content.link',
      href: `/demo/terms`,
      target: ``, // Use "_blank" if you use an external "href" value
      close: `&#x274c;`,
      policy: 'cookieConsent.content.policy',
    },

    // Events

    /**
     * Triggers when the lib initialises
     * Will provide the value contained in CONSENT_COOKIE_NAME cookie
     */
    onInitialise: function (status) {
      // eslint-disable-next-line no-console
      logger.info('onInitialise', `User consent from "${CONSENT_COOKIE_NAME}" cookie:`, status);
    },

    /**
     * When the user selects another choice (initial choice, or change) then we toggle analytics tracking
     *
     * The previousChoice is for the status
     * This event may trigger multiple times (once per status changed)
     *
     * @param status
     * @param previousChoice
     */
    onStatusChange: function () {},

    /**
     * Triggers when the current choice has been revoked.
     *
     * When the popup is opened, the cookie is automatically deleted.
     * IMHO, this is a very bad design choice because the end user doesn't know it...
     * It may seems fine when not using "opt-out" type, but when consent is given by default then users might discard their previous choice (deny) and revoke it without knowing.
     * This should be fixed in the CC OSS lib.
     */
    onRevokeChoice: function () {
      // eslint-disable-next-line no-console
      logger.info('onRevokeChoice');
      // eslint-disable-next-line no-console
      logger.info(`Previous choice has been revoked, "${CONSENT_COOKIE_NAME}" cookie has been deleted.`);
    },

    /**
     * Triggers when the popup opens
     */
    onPopupOpen: function () {
      // eslint-disable-next-line no-console
      logger.info('onPopupOpen');
    },

    /**
     * Triggers when the popup closes
     */
    onPopupClose: function () {
      // eslint-disable-next-line no-console
      logger.info('onPopupClose');
    },
  };

  try {
    cc.initialise(cookieConsentSettings);
  } catch (e) {
    // eslint-disable-next-line no-console
    logger.error(e);
  }
};

export default initCookieConsent;
