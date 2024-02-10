import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  fallback: ['Arial', 'sans-serif'],
});

export default montserrat;
