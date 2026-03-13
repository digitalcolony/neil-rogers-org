import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
	schema: z.object({
		author: z.string(),
		date: z.string(),
		description: z.string(),
		title: z.string(),
	}),
});

export const collections = { stories };
