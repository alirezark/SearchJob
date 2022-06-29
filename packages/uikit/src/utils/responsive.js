import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useResponsive = () => {
  const theme = useTheme();

  return {
    mdDown: useMediaQuery(theme.breakpoints.down('md')),
    smDown: useMediaQuery(theme.breakpoints.down('sm')),
    xsDown: useMediaQuery(theme.breakpoints.down('xs')),
  };
};
