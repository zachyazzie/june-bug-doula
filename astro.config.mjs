// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: confirm production domain with the business owner before launch
  site: 'https://www.junebugdoula.com',
  output: 'static',
  integrations: [sitemap()]
});