// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mistericy.github.io',
  base: process.env.BASE_PATH || '/merge-council/', // BASE_PATH set by GitHub Actions for Pages
  vite: {
    plugins: [tailwindcss()],
  },
});
