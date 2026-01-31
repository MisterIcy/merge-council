// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const basePath = process.env.BASE_PATH || "/merge-council/";
const origin = "https://mistericy.github.io";
const site = `${origin}${basePath.replace(/^\/?/, "/").replace(/\/?$/, "/")}`;

export default defineConfig({
  site,
  base: basePath,
  vite: {
    plugins: [tailwindcss()],
  },
});
