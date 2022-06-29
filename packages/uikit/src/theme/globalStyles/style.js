import { makeStyles } from '@material-ui/core/styles';

import _base from './_base';

export const globalStyles = makeStyles((theme) => ({
  '@global': {
    ..._base(theme),
  },
}));
