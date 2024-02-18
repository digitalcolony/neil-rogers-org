import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/static";

import react from "@astrojs/react";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
	site: "https://neilrogers.org",
	adapter: netlify({
		cacheOnDemandPages: true,
	}),
	integrations: [
		react(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
		}),
		metaTags(),
	],
});
