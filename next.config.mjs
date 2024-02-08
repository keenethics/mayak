import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Render SVG icons with @svgr/webpack
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      exclude: [resolve(__dirname, 'src/app/icon.svg'), resolve(__dirname, 'src/app/opengraph-image.png')],
    });

    return config;
  },
};

export default nextConfig;
