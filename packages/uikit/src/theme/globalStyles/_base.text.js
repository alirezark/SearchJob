import { palettes } from '../variables/_color';

const baseText = {
  '.font-weight-300': { fontWeight: 300 },
  '.font-weight-400': { fontWeight: '400!important' },
  '.font-weight-500': { fontWeight: '500!important' },
  '.font-weight-700': { fontWeight: '700!important' },
  '.font-weight-900': { fontWeight: '900!important' },
};

for (const weight in palettes.palette.gray) {
  baseText[`.color-gray-${weight}`] = { color: palettes.palette.gray[weight] };
}

for (const weight in palettes.palette.blueGray) {
  baseText[`.color-blueGray-${weight}`] = { color: palettes.palette.blueGray[weight] };
}

export default baseText;
