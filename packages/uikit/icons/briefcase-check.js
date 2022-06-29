import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function BriefCaseCheck(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 30 26">
      <g fill="none" fillRule="evenodd">
        <path
          fill="#3dc296"
          fillRule="nonzero"
          d="M15.762.845c.843 0 1.617.729 1.696 1.563l.006.14v1.987h5.44c1.548 0 2.801 1.199 2.889 2.723l.005.17v5.641h-1.5v-1.164l-10.406 1.977v1.047h-1.5V13.88L1.988 11.863v8.625h15.339v1.5H.488V7.428c0-1.547 1.198-2.8 2.722-2.887l.171-.005h5.321V2.547c0-.844.73-1.617 1.563-1.696l.14-.007h5.357zm7.143 5.19H3.38c-.73 0-1.32.547-1.387 1.258l-.006.136v2.906l10.404 2.016v-1.113h1.5v1.117l10.405-1.977v-2.95a1.38 1.38 0 0 0-1.257-1.386l-.135-.006zm-7.143-3.69h-5.357c-.052 0-.158.098-.192.166l-.01.037v1.987h5.761V2.548c0-.052-.097-.158-.166-.192l-.036-.01z"
          opacity=".5"
        />
        <g stroke="#3dc296" strokeWidth="1.5">
          <path d="M22.05 19.35l1.35 1.4 2.9-2.85" strokeLinecap="round" />
          <circle cx="24.2" cy="19.35" r="5" />
        </g>
      </g>
    </SvgIcon>
  );
}

export default BriefCaseCheck;
