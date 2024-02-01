import { breakpoints } from './theme/ui/index';

const device = {
  mobileS: `(min-width: ${breakpoints.xs})`,
  mobileM: `(min-width: ${breakpoints.sm})`,
  tablet: `(min-width: ${breakpoints.md})`,
  desktop: `(min-width: ${breakpoints.lg})`,
  desktopL: `(min-width: ${breakpoints.xl})`,
  desktopHD: `(min-width: ${breakpoints.xxl})`,
};

export default device;
