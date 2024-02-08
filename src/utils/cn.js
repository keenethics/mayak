import { clsx } from 'clsx';
import { configuredTwMerge } from './configuredTwMerge';

export function cn(...classes) {
  return configuredTwMerge(clsx(...classes));
}
