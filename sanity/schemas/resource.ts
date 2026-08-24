import { defineType, defineField } from 'sanity';

export const resourceSchema = defineType({
  name: 'resource',
  title: 'Downloadable Brochure & TDS',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '1. Document / Brochure Title',
      description: 'Title shown on the download card (e.g. "VM Graphite Complete Product Catalog 2025").',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '2. Document Badge Type',
      description: 'Badge displayed on the card: Company Brochure / Product Catalog / Technical Datasheet / Quality Certificate.',
      type: 'string',
      options: {
        list: [
          { title: 'Company Brochure', value: 'brochure' },
          { title: 'Product Catalog', value: 'catalog' },
          { title: 'Technical Datasheet', value: 'datasheet' },
          { title: 'Quality Certificate', value: 'certification' },
        ],
      },
      initialValue: 'catalog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '3. Short Summary',
      description: 'Brief overview of contents inside the PDF file.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'file',
      title: '4. PDF File Upload',
      description: 'Upload the PDF document here for visitors to download.',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: '5. Display Order Priority',
      description: 'Sort order (e.g. 1 for top card, 2, 3...).',
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
