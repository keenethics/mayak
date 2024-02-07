import { clsx } from 'clsx';
import { configuredTwMerge } from './extendedTwMerge';

export default function cn(...inputs) {
  return configuredTwMerge(clsx(inputs));
}
