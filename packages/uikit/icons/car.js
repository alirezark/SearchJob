import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Car(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 21">
      <path d="M21.6094 8.0625L20.1094 2.71875C19.6406 1.125 18.1406 0 16.5 0H7.5C5.85938 0 4.35938 1.125 3.89062 2.71875L2.39062 8.0625C0.984375 8.8125 0 10.2656 0 12V20.25C0 20.6719 0.328125 21 0.75 21C1.17188 21 1.5 20.6719 1.5 20.25V18H22.5V20.25C22.5 20.6719 22.8281 21 23.25 21C23.6719 21 24 20.6719 24 20.25V12C24 10.2656 23.0156 8.8125 21.6094 8.0625ZM5.34375 3.14062C5.625 2.15625 6.51562 1.5 7.5 1.5H16.5C17.4844 1.5 18.375 2.15625 18.6562 3.14062L19.9219 7.54688C19.7812 7.54688 19.6406 7.5 19.5 7.5H4.5C4.35938 7.5 4.21875 7.54688 4.07812 7.54688L5.34375 3.14062ZM22.5 15C22.5 15.8438 21.8438 16.5 21 16.5H3C2.15625 16.5 1.5 15.8438 1.5 15V12C1.5 10.3594 2.85938 9 4.5 9H19.5C21.1406 9 22.5 10.3594 22.5 12V15ZM4.875 11.25C4.26562 11.25 3.75 11.7656 3.75 12.375C3.75 12.9844 4.26562 13.5 4.875 13.5C5.48438 13.5 6 12.9844 6 12.375C6 11.7656 5.48438 11.25 4.875 11.25ZM19.125 11.25C18.5156 11.25 18 11.7656 18 12.375C18 12.9844 18.5156 13.5 19.125 13.5C19.7344 13.5 20.25 12.9844 20.25 12.375C20.25 11.7656 19.7344 11.25 19.125 11.25Z" />
    </SvgIcon>
  );
}

export default Car;
