import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function BriefCase(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 22 19">
      <path
        d="M13.07 0a1.84 1.84 0 0 1 1.776 1.63l.006.14v2.214h-2V2H8.885v1.984h-2V1.77c0-.894.76-1.687 1.643-1.764L8.668 0h4.402z"
        opacity=".5"
      />
      <path d="M19.17 3.213H2.797C1.247 3.213 0 4.454 0 6.001v12.524h21.967V6c0-1.547-1.247-2.788-2.797-2.788zm0 2l.102.006c.397.048.695.376.695.782v10.523H2V6.001c0-.44.35-.788.797-.788H19.17z" />
      <path
        d="M20.786 8.049l.362 1.967-9.28 1.709.001.521h-2l-.001-.573-8.823-1.657.369-1.966 8.454 1.588.001-.376h2l-.001.429z"
        opacity=".5"
      />
    </SvgIcon>
  );
}

export default BriefCase;
