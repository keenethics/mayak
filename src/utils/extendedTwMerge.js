import { createTailwindMerge, getDefaultConfig } from 'tailwind-merge';
import { typography } from '@/app/styles/tailwind/ui';

export const configuredTwMerge = createTailwindMerge(() => {
  const config = getDefaultConfig();
  config.classGroups['font-size'] = Object.keys(typography).map(
    // prettier-ignore
    key => `text-${key}`,
  );
  return config;
});
