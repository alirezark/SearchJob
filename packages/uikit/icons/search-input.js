import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function SearchInput(props) {
  return (
    <SvgIcon viewBox="0 0 15 15" {...props}>
      <g fill="none">
        <path
          d="M12.3583 6.82142C12.3583 7.57647 12.2117 8.32413 11.9269 9.02171C11.6421 9.71929 11.2247 10.3531 10.6985 10.887C10.1723 11.4209 9.54754 11.8444 8.86 12.1334C8.17245 12.4223 7.43555 12.5711 6.69136 12.5711C5.18839 12.5711 3.74698 11.9653 2.68422 10.887C1.62147 9.80876 1.02441 8.34632 1.02441 6.82142C1.02441 5.29652 1.62147 3.83407 2.68422 2.75581C3.74698 1.67754 5.18839 1.07178 6.69136 1.07178C8.19432 1.07178 9.63573 1.67754 10.6985 2.75581C11.7612 3.83407 12.3583 5.29652 12.3583 6.82142V6.82142Z"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M13.7526 14L10.6235 11.1422"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
    </SvgIcon>
  );
}

export default SearchInput;
