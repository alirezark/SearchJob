import CoreLayout, { Props as CoreLayoutProps } from '@/layouts/core/components/CoreLayout';
import { css } from '@emotion/react';
import React from 'react';

type Props = Omit<CoreLayoutProps, 'layoutName'>;

/**
 * Overrides the CoreLayout to adapt it to the Public layout.
 *
 * Hides nav, footer and preview banner and applies some custom CSS for demonstration purpose.
 */
const PublicLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <CoreLayout
      layoutBaseCSS={css`
        display: block;
        padding-top: 100px;

        .page-container {
          padding: 50px !important;
        }
      `}
      layoutName={'public-layout'}
      hideNav={true}
      hidePreviewBanner={true}
      {...props}
    />
  );
};

export default PublicLayout;
