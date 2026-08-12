import { defineType, defineField } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Main Headline',
      type: 'string',
      initialValue: 'Advanced Graphite & Industrial Material Solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Supporting Subtext',
      type: 'text',
      rows: 3,
      initialValue: 'Engineered high-temperature graphite products, coating, metalizing solutions, and industrial sealing materials designed for rigorous manufacturing operations.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background / Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
      initialValue: 'Explore Products',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string',
      initialValue: 'Get a Quote',
    }),
    defineField({
      name: 'strengthsHeadline',
      title: 'Company Strengths Headline',
      type: 'string',
      initialValue: 'Pioneering Excellence in Industrial Graphite Manufacturing',
    }),
    defineField({
      name: 'capabilitiesHeadline',
      title: 'Manufacturing & Capabilities Headline',
      type: 'string',
      initialValue: 'State-of-the-Art Precision Manufacturing Capabilities',
    }),
    defineField({
      name: 'capabilitiesDescription',
      title: 'Capabilities Technical Overview',
      type: 'text',
      rows: 4,
      initialValue: 'Our modern manufacturing plant is equipped with precision machinery for high-density graphite machining, high-temperature thermal coating, custom roll metalizing, and specialized slit-gasket processing to strict industry specifications.',
    }),
    defineField({
      name: 'whyChooseUsHeadline',
      title: 'Why Choose Us Headline',
      type: 'string',
      initialValue: 'Why Industry Leaders Trust VM Graphite',
    }),
    defineField({
      name: 'seo',
      title: 'Home Page SEO Metadata',
      type: 'seo',
    }),
  ],
});
