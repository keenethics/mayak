/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import presets from './src/app/styles/tailwind/index.js';

const config = {
  content: ['./src/app/**/*.{js, jsx, mdx}'],
  presets: [presets],
  plugins: [forms],
};

export default config;
