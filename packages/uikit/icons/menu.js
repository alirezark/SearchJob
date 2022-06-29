import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Menu(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 22 18">
      <path
        d="M0.785714 1.63636H21.2143C21.6562 1.63636 22 1.27841 22 0.818182C22 0.357955 21.6562 0 21.2143 0H0.785714C0.34375 0 0 0.357955 0 0.818182C0 1.27841 0.34375 1.63636 0.785714 1.63636ZM21.2143 8.18182H0.785714C0.34375 8.18182 0 8.53977 0 9C0 9.46023 0.34375 9.81818 0.785714 9.81818H21.2143C21.6562 9.81818 22 9.46023 22 9C22 8.53977 21.6562 8.18182 21.2143 8.18182ZM21.2143 16.3636H0.785714C0.34375 16.3636 0 16.7216 0 17.1818C0 17.642 0.34375 18 0.785714 18H21.2143C21.6562 18 22 17.642 22 17.1818C22 16.7216 21.6562 16.3636 21.2143 16.3636Z"
        fill="black"
      />
    </SvgIcon>
  );
}

export default Menu;