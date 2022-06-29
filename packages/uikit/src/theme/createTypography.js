import { mapValues } from 'lodash';
import {
  defaultTypographyFontSize,
  xsTypographyFontSizes,
  smTypographyFontSizes,
  fontFamilies,
  fontWeights,
} from './variables/_font';

export const defaultFontWeight = 400;

export const defaultHtmlFontSize = 14;

/*
 *  create constant result for typography with fontSize and fontWeight
 */

const typography = mapValues(defaultTypographyFontSize, (value, key) => ({
  fontSize: value,
  fontWeight: fontWeights[key] || defaultFontWeight,
}));

typography.htmlFontSize = defaultHtmlFontSize;

typography.fontFamily = fontFamilies;

export const createTypography = () => typography;

export const responseTypography = (theme) => {
  theme.typography = mapValues(theme.typography, (value, key) =>
    typeof value !== 'object'
      ? value
      : {
          ...value,
          [theme.breakpoints.down('sm')]: {
            fontSize: smTypographyFontSizes[key] || value.fontSize,
          },
          [theme.breakpoints.down('xs')]: {
            fontSize: xsTypographyFontSizes[key] || value.fontSize,
          },
        }
  );
  return theme;
};
