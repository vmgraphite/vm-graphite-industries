import { defineType, defineField } from 'sanity';

export const categorySchema = defineType({
  name: 'category',
  title: 'Product Category',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Category Info',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO & Search Engine',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: '1. Category Name',
      description: 'Title of the division (e.g. "Graphite Crucibles & Accessories").',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: '2. Category Division Banner Photo',
      description: 'Image displayed on the homepage division cards and catalog header.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: '3. Category Summary',
      description: 'Brief description shown on homepage category cards and catalog overview.',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'displayOrder',
      title: '4. Display Order Priority',
      description: 'Numerical sort order (e.g. 1 for Division 01, 2 for Division 02, 3 for Division 03).',
      type: 'number',
      group: 'content',
      initialValue: 0,
    }),
    defineField({
      name: 'slug',
      title: '5. Website URL Slug',
      description: 'Click "Generate" to create the web URL for this category (e.g. "graphite-crucibles").',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'Category Search Engine (SEO) Settings',
      description: 'Google search title and description for this category page.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
});
