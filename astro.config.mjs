import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";

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
		AstroPWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === "document",
						handler: "NetworkFirst",
						options: {
							cacheName: "pages-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
							},
						},
					},
					{
						urlPattern: ({ request }) => request.destination === "image",
						handler: "CacheFirst",
						options: {
							cacheName: "images-cache",
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
							},
						},
					},
					{
						urlPattern: /\/sounds\/.*\.mp3$/,
						handler: "CacheFirst",
						options: {
							cacheName: "audio-cache",
							expiration: {
								maxEntries: 20, // Only cache first 20 audio files
								maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
							},
						},
					},
				],
			},
			manifest: {
				name: "Neil Rogers Show Soundboard",
				short_name: "Neil Rogers",
				description: "The Neil Rogers Show soundboard and archives",
				theme_color: "#1a1a1a",
				background_color: "#ffffff",
				display: "standalone",
				orientation: "portrait-primary",
				scope: "/",
				start_url: "/",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/apple-touch-icon.png",
						sizes: "180x180",
						type: "image/png",
					},
				],
				categories: ["entertainment", "music"],
				shortcuts: [
					{
						name: "Soundboard",
						short_name: "Sounds",
						description: "Access the Neil Rogers soundboard",
						url: "/soundboard",
						icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
					},
				],
			},
		}),
	],
});
