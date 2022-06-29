import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Layers(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 25">
      <g fill="none" fillRule="evenodd">
        <path
          fill="#3dc296"
          fillRule="nonzero"
          d="M18.793 9.761L23.73 12.8l-3.892 2.403 3.9 2.402L12.1 24.678.463 17.604l3.9-2.402L.45 12.785l4.97-2.931.762 1.292-2.83 1.668 8.748 5.403 8.77-5.417-2.863-1.761.786-1.278zm-.385 6.324L12.1 19.982l-6.308-3.897-2.455 1.511 8.763 5.326 8.762-5.326-2.454-1.51z"
          opacity=".5"
        />
        <path stroke="#3dc296" strokeWidth="1.5" d="M22.3 8.1l-10.2 6.2L1.9 8.1l10.2-6.3z" />
      </g>
    </SvgIcon>
  );
}

export default Layers;
