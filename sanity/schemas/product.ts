import { defineType, defineField } from 'sanity';

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Product Info',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO & Search Engine',
    },
  ],
  fields: [
    // ① PRODUCT HEADER (Top of Product Page)
    defineField({
      name: 'name',
      title: '1. Product Title',
      description: 'Full commercial name of the product (e.g. "Silicon Carbide Graphite Crucible").',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '2. Product Category',
      description: 'Select the industrial division / category this product belongs to.',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: '3. Short Summary / Overview',
      description: 'Summary paragraph displayed under product title and on catalog cards.',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // ② PRODUCT PHOTOGRAPHY & DATASHEET (Left Column & Action Buttons)
    defineField({
      name: 'mainImage',
      title: '4. Primary Product Photo',
      description: 'Main product image displayed on the product page and catalog cards.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: '5. Additional Photos Gallery (Optional)',
      description: 'Extra product images shown as clickable thumbnails below the main photo.',
      type: 'array',
      group: 'content',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'productPdf',
      title: '6. Technical Specification Datasheet (PDF)',
      description: 'Upload PDF datasheet. Adds a "Download Tech Datasheet (PDF)" button next to the quote button.',
      type: 'file',
      group: 'content',
      options: { accept: '.pdf' },
    }),

    // ③ TECHNICAL SPECIFICATIONS MATRIX (Middle of Product Page)
    defineField({
      name: 'specifications',
      title: '7. Technical Specifications Matrix',
      description: 'Add rows for attributes shown in the table (e.g. Material: Synthetic Graphite, Max Temp: 3000°C, Density: 1.85 g/cm³, Carbon: 99.9%).',
      type: 'array',
      group: 'content',
      of: [{ type: 'specRow' }],
    }),

    // ④ DETAILED DESCRIPTION & APPLICATIONS (Lower Section)
    defineField({
      name: 'fullDescription',
      title: '8. Detailed Description & Applications Overview',
      description: 'Detailed industrial explanation shown under "Detailed Product Overview & Applications".',
      type: 'text',
      group: 'content',
      rows: 6,
    }),

    // ⑤ DISPLAY & SEO SETTINGS
    defineField({
      name: 'slug',
      title: '9. Website URL Slug',
      description: 'Click "Generate" to automatically create the web URL path for this product.',
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
      title: 'Product Search Engine (SEO) Settings',
      description: 'Google search title, description, and social media sharing image.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'mainImage',
    },
  },
});
