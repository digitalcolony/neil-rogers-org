import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: "https://neilrogers.org",
  integrations: [react(), sitemap({
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date()
  }), metaTags()]
});