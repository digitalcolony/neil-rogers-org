import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://neilrogers.org",
	adapter: netlify({
		cacheOnDemandPages: true,
	}),
	responsiveStyles: true,
	layout: "constrained",
	integrations: [
		react(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
		}),
	],
});
