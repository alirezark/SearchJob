import { palettes } from '../variables/_color';

const root = {
  borderRadius: 4,
  height: 48,
  padding: '10px 16px',
  overflow: 'hidden',
  color: palettes.palette.gray[600],
};

const sizeSmall = {
  borderRadius: 4,
  height: 48,
  padding: '10px 16px',
};

const label = {
  whiteSpace: 'nowrap',
};

const contained = {
  boxShadow: 'none',
};

export const MuiButton = {
  root,
  sizeSmall,
  label,
  contained,
};
