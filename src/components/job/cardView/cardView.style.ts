export const styles = {
  root: {
    margin: '24px 0',
    marginTop: 1,
    maxWidth: 1024,
    p: 2,
    pl: 0,
    borderRadius: 2,
    position: 'relative',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.25)',
    '&.blur': {
      filter: 'blur(5px)',
    },
  },
  borderLessRoot: {
    background: 'transparent',
    boxShadow: 'none',
  },
  title: {
    fontWeight: '700',
    margin: '4px 0 16px',
    display: 'block',

    '&:hover': {
      color: 'rgba(0, 0, 0, 0.8)',
    },
  },
  nameIcon: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItem: 'center',
    paddingRight: 8,
    mb: 1.5,
    '& svg': {
      color: '#999',
    },
    '& h2': {
      fontWeight: 500,
      color: '#666',
    },
    '&:last-child': {
      m: 0,
    },
  },
  groupIconAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItem: 'center',
  },
  icon: {
    fontSize: '16px',
    marginRight: '6px',
  },
  specs: {
    mb: 1,

    '& .label': {
      width: 50,
      fontWeight: 'bold',
    },
    '&:last-child': {
      m: 0,
    },
  },
  smallSpecs: {
    '& > *': {
      display: 'inline-block',
    },

    '& .label': {
      color: '#aaa',
      marginRight: '5px',
      fontWeight: 500,
    },
    '& .value': {
      fontWeight: 500,
      color: '#888',
    },
  },
  companyLogo: {
    width: 62,
    height: 62,
    backgroundColor: '#E8F3FF',
  },
  scrollContent: {
    marginBottom: 16,
    paddingRight: 8,
    overflowY: 'auto',
    maxHeight: 400,
  },
  simpleBtn: {
    margin: 16,
  },
  description: {
    textAlign: 'justify',
    fontFamily: 'YekanBakh',
  },
  truncate: {
    position: 'relative',
    maxHeight: 'calc(1.4rem * 3.5)',
    overflow: 'hidden',
    marginBottom: 8,
    '& h1, & h2, & h3, & h4': {
      marginTop: 0,
      marginBottom: '0.5rem',
      lineHeight: '1.5rem',
    },
    '& ul': {
      marginTop: 0,
      marginBottom: '1rem',
    },
    '&>p': {
      margin: 0,
    },
    '&:before': {
      position: 'absolute',
      content: '...',
      insetBlockEnd: 0 /* "bottom" */,
      insetInlineEnd: 0 /* "right" */,
    },
    '&:after': {
      content: '',
      position: 'absolute',
      insetBlockEnd: 0 /* "bottom" */,
      insetInlineEnd: 0,
      width: '1rem',
      height: '1rem',
      background: 'white',
    },
  },
  label: {
    fontWeight: 500,
    color: '#A0A0A0',
  },
};
