import { css } from '@emotion/react';
import * as React from 'react';
import { GenericObject } from '../data/types/GenericObject';
import ErrorDebug from './ErrorDebug';

type Props = {
  error: Error;
  context?: GenericObject;
}

/**
 * Default error layout, used by DefaultLayout to display errors instead of the page's content, when an error is caught
 *
 * Displays a report dialog modal allowing end-users to provide a manual feedback about what happened.
 * You may want to customise this component to display different error messages to the end users, based on statusCode or other information.
 */
const DefaultErrorLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    error,
    context,
  } = props;

  return (
    <div
      css={css`
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;

        .title {
          margin-top: 30px;
          margin-bottom: 30px;
        }
      `}
    >
      <div className={'title'}>
        <h1>Service currently unavailable</h1>
        <pre>Error 500.</pre>
      </div>

      <div>
        <p>
          Try to refresh the page. Please contact our support below if the issue persists.
        </p>
        <button
          color={'primary'}
        >
          Contact support
        </button>
      </div>

      {
        process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && (
          <ErrorDebug
            error={error}
            context={context}
          />
        )
      }
    </div>
  );
};

export default DefaultErrorLayout;
