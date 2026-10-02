// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Αλλάξτε σε 'https://eazyfix.gr' όταν συνδεθεί το custom domain
  site: 'https://eazyfix.vivinails.workers.dev',
  output: 'server',
  session: false,
  adapter: cloudflare(),
});
