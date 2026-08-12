import { defineType, defineField } from 'sanity';

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'About Page Title',
      type: 'string',
      initialValue: 'About VM Graphite Industries LLP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle / Tagline',
      type: 'string',
      initialValue: 'Engineering High-Performance Industrial Materials Since Inception',
    }),
    defineField({
      name: 'heroImage',
      title: 'About Page Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'companyIntroduction',
      title: 'Company Overview & History',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'manufacturingHeading',
      title: 'Manufacturing Capabilities Heading',
      type: 'string',
      initialValue: 'Advanced Precision Infrastructure',
    }),
    defineField({
      name: 'manufacturingContent',
      title: 'Manufacturing & Process Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'qualityHeading',
      title: 'Quality Commitment Heading',
      type: 'string',
      initialValue: 'Rigorous Quality Assurance Standards',
    }),
    defineField({
      name: 'qualityContent',
      title: 'Quality Control Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seo',
      title: 'About Page SEO Metadata',
      type: 'seo',
    }),
  ],
});
