import { clsx } from 'clsx';
import { configuredTwMerge } from './configuredTwMerge';

export default function cn(...inputs) {
  return configuredTwMerge(clsx(...inputs));
}
