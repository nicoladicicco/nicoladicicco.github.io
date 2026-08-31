import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const calendarDate = z.coerce.date().transform((date) => date.toISOString().slice(0, 10));

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: calendarDate,
		updatedDate: calendarDate.optional(),
		draft: z.boolean().default(false),
	}),
});

const about = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/about' }),
	schema: z.object({ role: z.string() }),
});

export const collections = { blog, about };
