// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eazyfix.gr',
  i18n: {
    defaultLocale: 'el',
    locales: ['el', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: 'static',
});
