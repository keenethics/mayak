import { extendTailwindMerge } from 'tailwind-merge';
import { typography } from '@/app/styles/tailwind/ui';

export const configuredTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(typography).map(key => `text-${key}`),
    },
  },
});

export default configuredTwMerge;
