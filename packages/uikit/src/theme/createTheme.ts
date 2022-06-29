import { createTheme } from '@mui/material/styles';
import { createTypography, responseTypography } from './createTypography';
import { palettes } from './variables/_color';
import { createOverrides } from './createOverrides';

declare module "@mui/material/styles" {
  interface Theme {
    direction: string;
    palettes: string;
    overrides: any;
  }

  interface ThemeOptions {
    palettes?: string;
    overrides?: any;
  }
}

export const theme = createTheme({
  direction: 'rtl',
  ...palettes,
  overrides: { ...createOverrides() },
  typography: createTypography(),
});

export const examTheme = ({ direction = 'rtl' }) => {
  theme.direction = direction;
  return responseTypography(theme);
};
