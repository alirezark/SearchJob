import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function People(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 22 14">
      <g stroke="#3dc296" fill="none" strokeWidth="1.5">
        <circle cx="11" cy="4.8" r="2.1" />
        <path d="M15.3 13.6c0-2.4-1.9-4.3-4.3-4.3s-4.3 2-4.3 4.3" />
        <circle cx="17.6" cy="2.9" r="1.6" opacity=".5" />
        <path d="M15.4 7.8c.6-.5 1.3-.8 2.1-.8a3.37 3.37 0 0 1 3.4 3.4" opacity=".5" />
        <circle cx="4.3" cy="2.9" r="1.6" opacity=".5" />
        <path d="M6.4 7.8C5.8 7.3 5.1 7 4.3 7a3.37 3.37 0 0 0-3.4 3.4" opacity=".5" />
      </g>
    </SvgIcon>
  );
}

export default People;
