import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function FolderAdd(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 4.5H12.75L10.6406 2.39062C10.0781 1.82812 9.28125 1.5 8.53125 1.5H3C1.35938 1.5 0 2.85938 0 4.5V19.5C0 21.1406 1.35938 22.5 3 22.5H21C22.6406 22.5 24 21.1406 24 19.5V7.5C24 5.85938 22.6406 4.5 21 4.5ZM22.5 19.5C22.5 20.3438 21.8438 21 21 21H3C2.15625 21 1.5 20.3438 1.5 19.5V4.5C1.5 3.65625 2.15625 3 3 3H8.53125C8.90625 3 9.28125 3.14062 9.5625 3.42188L11.6719 5.57812L12.1406 6H21C21.8438 6 22.5 6.65625 22.5 7.5V19.5ZM15 12.75H12.75V10.5C12.75 10.0781 12.4219 9.75 12 9.75C11.5781 9.75 11.25 10.0781 11.25 10.5V12.75H9C8.57812 12.75 8.25 13.0781 8.25 13.5C8.25 13.9219 8.57812 14.25 9 14.25H11.25V16.5C11.25 16.9219 11.5781 17.25 12 17.25C12.4219 17.25 12.75 16.9219 12.75 16.5V14.25H15C15.4219 14.25 15.75 13.9219 15.75 13.5C15.75 13.0781 15.4219 12.75 15 12.75Z" />
    </SvgIcon>
  );
}

export default FolderAdd;