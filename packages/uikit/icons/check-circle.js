import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function CheckCircle(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M15.9844 8.48438L10.5 13.9219L8.01562 11.4844C7.73438 11.1562 7.26562 11.1562 6.98438 11.4844C6.70312 11.8125 6.65625 12.2344 6.98438 12.5156L9.98438 15.5156C10.125 15.6562 10.3125 15.75 10.5 15.75C10.6875 15.75 10.875 15.6562 11.0156 15.5156L17.0156 9.51562C17.3438 9.23438 17.3438 8.76562 17.0156 8.48438C16.6875 8.20312 16.2656 8.15625 15.9844 8.48438ZM12 0.75C5.76562 0.75 0.75 5.76562 0.75 12C0.75 18.2344 5.76562 23.25 12 23.25C18.2344 23.25 23.25 18.2344 23.25 12C23.25 5.76562 18.2344 0.75 12 0.75ZM12 21.75C6.60938 21.75 2.25 17.3906 2.25 12C2.25 6.60938 6.60938 2.25 12 2.25C17.3906 2.25 21.75 6.60938 21.75 12C21.75 17.3906 17.3906 21.75 12 21.75Z" />
    </SvgIcon>
  );
}

export default CheckCircle;