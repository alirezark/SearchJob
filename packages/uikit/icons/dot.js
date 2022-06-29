import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Dot(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 15 15">
      <circle cx="2" cy="2" r="2" />
    </SvgIcon>
  );
}

const DotSvg = (color = 'e5e5e5') =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'><circle fill='%23${color}' cx='2' cy='2' r='2'/></svg>`;

export { DotSvg };
export default Dot;
