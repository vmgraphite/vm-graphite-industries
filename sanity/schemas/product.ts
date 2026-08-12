import { defineType, defineField } from 'sanity';

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'SEO Slug / URL Path',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Summary / Teaser',
      type: 'text',
      rows: 3,
      description: 'Concise summary for catalog cards and search previews.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Detailed Product Description & Features',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Comprehensive overview of applications, material grade, features, and operating conditions.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Primary Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Images Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'specifications',
      title: 'Structured Technical Specifications (Key - Value Pairs)',
      type: 'array',
      of: [{ type: 'specRow' }],
      description: 'Add rows for technical attributes like Material, Density, Temp Resistance, Purity, Dimensions, Tensile Strength.',
    }),
    defineField({
      name: 'productPdf',
      title: 'Product Technical Specification PDF / Datasheet',
      type: 'file',
      description: 'Upload PDF datasheet downloadable on product page.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mark as Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Featured products appear on home page and top catalog sections.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Priority / Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related / Recommended Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'Product SEO & Social Metadata',
      type: 'seo',
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
