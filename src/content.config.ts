import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  postType: z.enum(["issue", "pr", "release"]),
  targetLink: z.string().optional(),
  draft: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional(),
});

const blog = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/README.md"],
    base: "./src/content/blog",
  }),
  schema: blogSchema,
});

export const collections = { blog };
