import { defineType, defineField } from 'sanity';

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optimal length: 55-60 characters. Recommended format: [Page Name] | VM Graphite Industries',
      validation: (Rule) => Rule.max(70).warning('Title should ideally be under 70 characters for best Google display.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 150-160 characters. Summarize the page content for search engine snippets.',
      validation: (Rule) => Rule.max(165).warning('Description should ideally be under 165 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph / Social Sharing Image',
      type: 'image',
      description: 'Image displayed when link is shared on WhatsApp, LinkedIn, Twitter, etc. (Recommended: 1200x630px)',
      options: { hotspot: true },
    }),
  ],
});
