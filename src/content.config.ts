import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  notes: defineCollection({ loader: glob({
    pattern: '**/*.md',
    base: './content',
    // Default glob IDs can use frontmatter.slug, which would discard the folder tree.
    generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
  }) }),
};
