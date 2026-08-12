import { defineType, defineField } from 'sanity';

export const resourceSchema = defineType({
  name: 'resource',
  title: 'Resource / Downloadable File',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'file',
      title: 'Document PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Resource Category',
      type: 'string',
      options: {
        list: [
          { title: 'Company Brochure', value: 'brochure' },
          { title: 'Product Catalog', value: 'catalog' },
          { title: 'Technical Specification Sheet', value: 'datasheet' },
          { title: 'Quality & Technical Certifications', value: 'certification' },
        ],
      },
      initialValue: 'catalog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
