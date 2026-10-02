// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://eazyfix.gr',
  output: 'server',
  session: false,
  adapter: cloudflare(),
});
