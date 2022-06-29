import React from 'react';
import baseText from './_base.text';

const _base = () => ({
  ...baseText,
  html: {
    fontSize: 14,
    fontFamily:
      'YekanBakh,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  body: {
    background: '#fafbfc',
  },
  '.svg-baseline': {
    position: 'relative',
    top: '.345em',
  },
});

export default _base;
