import { defineType, defineField } from 'sanity';

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Page Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO & Search Engine',
    },
  ],
  fields: [
    // ==========================================
    // ① TOP BANNER (Header of About Us Page)
    // ==========================================
    defineField({
      name: 'title',
      title: '1. About Page Main Title',
      description: 'Large title on the top banner (Default: "About VM Graphite Industries").',
      type: 'string',
      group: 'content',
      initialValue: 'About VM Graphite Industries LLP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '2. About Page Tagline / Subtitle',
      description: 'Supporting text under the main banner title.',
      type: 'string',
      group: 'content',
      initialValue: "Striving to Become India's Leading Supplier of Unmatched Quality Graphite Suspension and Foil Tape.",
    }),

    // ==========================================
    // ② CORPORATE AIM & VISION BANNER
    // ==========================================
    defineField({
      name: 'aimHeading',
      title: '3. Corporate Aim Small Tag',
      description: 'Small tag above the vision quote (Default: "Our Corporate Aim").',
      type: 'string',
      group: 'content',
      initialValue: 'Our Corporate Aim',
    }),
    defineField({
      name: 'aimQuote',
      title: '4. Corporate Aim Vision Quote',
      description: 'Full quote displayed in the dark gradient banner.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: '"VM Graphite Industries LLP: Striving to Become India\'s Leading Supplier of Unmatched Quality Graphite Suspension and Foil Tape."',
    }),

    // ==========================================
    // ③ COMPANY OVERVIEW & PLANT SPOTLIGHT
    // ==========================================
    defineField({
      name: 'heroImage',
      title: '5. Plant / Facility Photograph',
      description: 'Main photograph showing manufacturing plant and R&D facilities on the left of the overview section.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'manufacturingHeading',
      title: '6. Overview Section Heading',
      description: 'Heading for the story section (e.g. "Advanced Alubonding Technology & Technical Manufacturing Excellence").',
      type: 'string',
      group: 'content',
      initialValue: 'Advanced Alubonding Technology & Technical Manufacturing Excellence',
    }),
    defineField({
      name: 'companyIntroduction',
      title: '7. Company Story & History Paragraphs',
      description: 'Rich text paragraphs detailing the founding in 2021 by Ayush Patel & Himanshu Bisth, proprietary Alubonding R&D, and product scope.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'leadershipTitle',
      title: '8. Leadership Box - Names',
      description: 'Names displayed in the leadership box (Default: "Ayush Patel & Himanshu Bisth").',
      type: 'string',
      group: 'content',
      initialValue: 'Ayush Patel & Himanshu Bisth',
    }),
    defineField({
      name: 'leadershipSubtitle',
      title: '9. Leadership Box - Subtitle',
      description: 'Subtitle in the leadership box (Default: "Partners & Co-Founders").',
      type: 'string',
      group: 'content',
      initialValue: 'Partners & Co-Founders',
    }),
    defineField({
      name: 'innovationTitle',
      title: '10. Innovation Box - Title',
      description: 'Core innovation title (Default: "Alubonding Technology").',
      type: 'string',
      group: 'content',
      initialValue: 'Alubonding Technology',
    }),
    defineField({
      name: 'innovationSubtitle',
      title: '11. Innovation Box - Subtitle',
      description: 'Core innovation subtitle (Default: "Proprietary R&D Process").',
      type: 'string',
      group: 'content',
      initialValue: 'Proprietary R&D Process',
    }),

    // ==========================================
    // ④ PRODUCTION CAPACITY BANNER
    // ==========================================
    defineField({
      name: 'capacityStatement',
      title: '12. Production Capacity Statement',
      description: 'Highlighted quotation in the central bordered box.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: '"We pride ourselves on our exceptional production capacity and commitment to timely delivery, ensuring that your orders are fulfilled on schedule with the highest standards of quality. Discover how our solutions can meet your industrial needs with speed and excellence."',
    }),

    // ==========================================
    // ⑤ QUALITY ASSURANCE
    // ==========================================
    defineField({
      name: 'qualityHeading',
      title: '13. Quality Assurance Section Heading',
      description: 'Heading displayed above the quality testing cards (Default: "Rigorous Quality & Production Standards").',
      type: 'string',
      group: 'content',
      initialValue: 'Rigorous Quality & Production Standards',
    }),
    defineField({
      name: 'qualitySubtitle',
      title: '14. Quality Assurance Description',
      description: 'Supporting paragraph below the quality heading.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'Every production lot undergoes rigorous physical, thermal, and chemical laboratory testing before dispatch.',
    }),

    // ==========================================
    // ⑥ SEO & SOCIAL SHARING (Dedicated Tab)
    // ==========================================
    defineField({
      name: 'seo',
      title: 'About Page Search Engine (SEO) Settings',
      description: 'Google search title, description, and social media preview card for About Us.',
      type: 'seo',
      group: 'seo',
    }),
  ],
});
