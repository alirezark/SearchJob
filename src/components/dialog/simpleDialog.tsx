import React from 'react';
import {
  Dialog as DialogComponent,
  DialogTitle as DialogTitleComponent,
  DialogContent,
  Typography,
  DialogProps,
  Stack,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const DialogTitle = styled(DialogTitleComponent)(({ theme }) => ({
  background: '#eceff1',
  padding: '12px 12px 12px 16px',
  '& .MuiTypography-root': {
    marginTop: 3,
    fontWeight: 700,
    color: theme.palette.grey[600],
  },
}));

const Dialog = styled(DialogComponent)({
  '& .MuiPaper-root': {
    borderRadius: 8,
  },
});

const useStyles = {
  root: {
    borderRadius: '24px!important',
  },
  content: {
    p: 2,
    '&&': {
      pt: 2,
    },
  },
  closeButton: {
    '& svg': {
      fontSize: '1.3rem',
    },
  },
};

const SimpleDialog = ({ children, title, showCloseButton = false, onClose = () => null, open, ...dialogProps }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth {...dialogProps}>
      <DialogTitle>
        <Stack justifyContent="space-between" direction="row" alignItems="center">
          <Typography variant="body1">{title}</Typography>
          {showCloseButton && (
            <IconButton size="small" sx={useStyles.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={useStyles.content}>{children}</DialogContent>
    </Dialog>
  );
};

export default SimpleDialog;
