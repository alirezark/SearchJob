import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ArrowLeft(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 17 16">
      <path d="M7.793 1.133a1 1 0 0 1 1.497 1.32l-.083.094L3.755 8l5.452 5.453a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-6.16-6.16a1 1 0 0 1-.083-1.32l.083-.094 6.16-6.16z" />
      <path d="M14.66 7a1 1 0 0 1 .117 1.993L14.66 9H2.34a1 1 0 0 1-.117-1.993L2.34 7h12.32z" />
    </SvgIcon>
  );
}

export default ArrowLeft;
