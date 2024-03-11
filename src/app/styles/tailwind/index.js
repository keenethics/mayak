import { boxShadow, colors, screens, typography } from './ui';

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
