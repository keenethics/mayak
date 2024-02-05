/** @type {import('tailwindcss').Config} */
import presets from './src/app/styles/tailwind/index.js';

const config = {
  content: ['./src/app/**/*.{js, jsx, mdx}'],
  presets: [presets],
  plugins: [],
};

export default config;
