import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ArrowRight(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 17 16">
      <g transform="matrix(-1 0 0 1 15.5 1)">
        <path d="M6.293.133a1 1 0 0 1 1.497 1.32l-.083.094L2.255 7l5.452 5.453a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-6.16-6.16a1 1 0 0 1-.083-1.32l.083-.094 6.16-6.16z" />
        <path d="M13.16 6a1 1 0 0 1 .117 1.993L13.16 8H.84a1 1 0 0 1-.117-1.993L.84 6h12.32z" />
      </g>
    </SvgIcon>
  );
}

export default ArrowRight;
