import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Email(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M21 3H3C1.35938 3 0 4.35938 0 6V18C0 19.6406 1.35938 21 3 21H21C22.6406 21 24 19.6406 24 18V6C24 4.35938 22.6406 3 21 3ZM3 4.5H21C21.8438 4.5 22.5 5.15625 22.5 6V7.6875L13.3594 14.5312C12.5625 15.1406 11.4375 15.1406 10.6406 14.5312L1.5 7.6875V6C1.5 5.15625 2.15625 4.5 3 4.5ZM22.5 18C22.5 18.8438 21.8438 19.5 21 19.5H3C2.15625 19.5 1.5 18.8438 1.5 18V9.5625L9.75 15.75C10.4062 16.2656 11.2031 16.5 12 16.5C12.7969 16.5 13.5938 16.2656 14.25 15.75L22.5 9.5625V18Z" />
    </SvgIcon>
  );
}

export default Email;