import { yellow } from '@mui/material/colors';

export const styles = {
  root: {
    margin: '12px 0',
    mt: 5,
    minHeight: 280,
    position: 'relative',
    p: [2, 3],
    borderRadius: 5,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontWeight: '700',
    margin: '4px 0 6px',
    display: 'block',
    // [theme.breakpoints.down('sm')]: {
    //   margin: '0 0 2px',
    // },
  },
  nameIcon: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignItem: 'center',
    paddingRight: 8,
    my: [2, 0],
  },
  groupIconAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItem: 'center',
  },
  icon: {
    fontSize: '18px',
    marginRight: '6px',
  },
  nameValue: {
    fontWeight: 700,
    color: '#444',
    background: '#f0f0f0',
    padding: '3px 6px 2px',
    borderRadius: 1,
  },
  favButton: {
    border: `1px solid #ccc`,
    padding: 7,
    ml: 1,
  },
  favButtonSaved: {
    border: 0,
    background: yellow[700],

    '&:hover': {
      background: yellow[600],
    },
  },
  specs: {
    marginBottom: 3,

    '& .label': {
      fontWeight: 'bold',
    },
    '& .value': {
      fontWeight: 700,
      color: '#fff',
      background: '#777',
      display: 'inline-block',
      p: '2px 8px',
      borderRadius: 1,
    },
  },
  smallSpecs: {
    '& > *': {
      display: 'inline-block',
    },

    '& .label': {
      color: '#999',
      marginRight: 5,
      fontWeight: 'normal',
    },
  },
  companyLogo: {
    width: 76,
    height: 76,
    backgroundColor: '#E8F3FF',
  },
  scrollContent: {
    marginBottom: 16,
    mt: 2,
    paddingRight: '8px',
    overflowY: 'auto',
    maxHeight: 400,
  },
  simpleBtn: {
    margin: 2,
  },
  buttons: {
    // [theme.breakpoints.down('sm')]: {
    //   marginTop: theme.spacing(3),
    // },
  },
  description: {
    textAlign: 'justify',
    // [theme.breakpoints.down('sm')]: {
    //   textAlign: 'left',
    // },
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
    fontWeight: 600,
    color: '#777',
    mb: 1,
  },
  mainTitle: {
    display: ['block', 'flex'],
    // [theme.breakpoints.down('sm')]: {
    //   display: 'block',
    // },
  },
};
