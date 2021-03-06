import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Verification(props) {
  const { tickColor, ...rest } = props;

  return (
    <SvgIcon {...rest}>
      <path d="M12.69.211l2.64 2.026 3.386-.161a1.07 1.07 0 0 1 1.089.754l.886 3.129 2.839 1.774c.423.266.598.777.415 1.229l-1.207 3.021 1.207 3.026c.18.451.007.96-.415 1.222l-2.839 1.776-.886 3.127a1.07 1.07 0 0 1-1.089.754l-3.386-.161-2.64 2.031c-.394.302-.953.302-1.346 0l-2.64-2.035-3.386.161c-.504.024-.957-.291-1.09-.754l-.885-3.129-2.837-1.774c-.423-.262-.597-.771-.415-1.222l1.205-3.022L.092 8.956c-.185-.451-.01-.965.415-1.229l2.839-1.774.885-3.127a1.07 1.07 0 0 1 1.09-.754l3.386.166L11.344.211c.394-.302.953-.302 1.346 0z" />
      <path
        d="M15.237 8.966a1.54 1.54 0 0 1 2.182 0 1.54 1.54 0 0 1 .139 2.023l-.137.158-5.829 5.837a1.54 1.54 0 0 1-2.025.139l-.158-.137-2.777-2.777a1.54 1.54 0 0 1 0-2.182 1.54 1.54 0 0 1 2.023-.137l.158.137 1.685 1.685z"
        fill={!!tickColor ? tickColor : '#4884fa'}
      />
    </SvgIcon>
  );
}

export default Verification;
