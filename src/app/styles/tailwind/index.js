import { colors, screens, typography, boxShadow } from './ui';

const presets = {
  theme: {
    colors,
    screens,
    fontSize: typography,
    extend: {
      boxShadow,
    },
  },
};

export default presets;
