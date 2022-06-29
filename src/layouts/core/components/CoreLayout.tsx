import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import DefaultErrorLayout from '@/modules/core/errorHandling/DefaultErrorLayout';
import { createLogger } from '@/modules/core/logging/logger';
import ErrorPage from '@/pages/_error';
import { css, SerializedStyles } from '@emotion/react';
import classnames from 'classnames';
import React from 'react';

const fileLabel = 'layouts/core/components/CoreLayout';

export type Props = {
  /**
   * Content to display within the layout.
   *
   * Essentially, the page's content.
   */
  children: React.ReactNode;

  /**
   * Name of the layout.
   *
   * Will be used as CSS class for the main wrapper element.
   */
  layoutName: 'public-layout' | 'demo-layout';

  /**
   * CSS applied to the main wrapper element.
   *
   * @example layoutBaseCSS={css`
   *   margin: 20px;
   * `}
   */
  layoutBaseCSS?: SerializedStyles;

  /**
   * Force hiding the nav.
   */
  hideNav?: boolean;

  /**
   * Force hiding the preview banner.
   */
  hidePreviewBanner?: boolean;

  /**
   * Component to use as Nav.
   *
   * @default BaseNav
   */
  Nav?: React.FunctionComponent;
} & SoftPageProps;

/**
 * Handles the positioning of top-level elements within the page.
 *
 * It does the following:
 *  - Adds a Nav/Footer component, and the dynamic Next.js "Page" component in between.
 *  - Automatically track page views (Amplitude).
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 */
const CoreLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    layoutName,
    layoutBaseCSS,
    hideNav,
    hidePreviewBanner = true,
    Nav = null,
  } = props;
  const isPreviewModeBannerDisplayed = !hidePreviewBanner && process.env.NEXT_PUBLIC_APP_STAGE !== 'production';
  const isNavDisplayed = !hideNav && Nav;

  return (
    <main
      role={'main'}
      className={layoutName}
      css={css`
        ${layoutBaseCSS || ''}
      `}
    >
      {isPreviewModeBannerDisplayed && <></>}

      {isNavDisplayed && <Nav />}

      <div className={classnames('page-wrapper')}>
        {
          // If an error happened, we display it instead of displaying the page
          // We display a custom error instead of the native Next.js error by providing children (removing children will display the native Next.js error)
          error ? (
            <ErrorPage statusCode={500} isReadyToRender={true} err={error}>
              <DefaultErrorLayout error={error} />
            </ErrorPage>
          ) : (children)
        }
      </div>
    </main>
  );
};

export default CoreLayout;
