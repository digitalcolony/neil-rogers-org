import { defineCollection, z } from "astro:content";

const stories = defineCollection({
	schema: z.object({
		author: z.string(),
		date: z.string(),
		description: z.string(),
		title: z.string(),
	}),
	type: "content",
});

export const collections = { stories };
