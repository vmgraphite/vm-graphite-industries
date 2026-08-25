import { defineType, defineField } from 'sanity';

export const downloadsPageSchema = defineType({
  name: 'downloadsPage',
  title: 'Downloads Page Content',
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
    // ① TOP BANNER (Header of Downloads Page)
    // ==========================================
    defineField({
      name: 'badge',
      title: '1. Top Pill Badge',
      description: 'Small badge above main heading (Default: "Technical Documentation").',
      type: 'string',
      group: 'content',
      initialValue: 'Technical Documentation',
    }),
    defineField({
      name: 'title',
      title: '2. Downloads Page Title',
      description: 'Main heading on the Downloads & Resources page.',
      type: 'string',
      group: 'content',
      initialValue: 'Downloads & Resource Hub',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '3. Downloads Page Subtitle',
      description: 'Supporting description text under the main banner heading.',
      type: 'string',
      group: 'content',
      initialValue: 'Access official PDF datasheets, product catalogs, engineering guidelines, and ISO 9001 quality certificates.',
    }),

    // ==========================================
    // ② FILTER TABS CUSTOM LABELS
    // ==========================================
    defineField({
      name: 'allTabLabel',
      title: '4. "All Resources" Filter Tab Label',
      description: 'Label for the first all-inclusive filter tab (Default: "All Resources").',
      type: 'string',
      group: 'content',
      initialValue: 'All Resources',
    }),
    defineField({
      name: 'catalogTabLabel',
      title: '5. "Product Catalogs" Filter Tab Label',
      type: 'string',
      group: 'content',
      initialValue: 'Catalogs',
    }),
    defineField({
      name: 'brochureTabLabel',
      title: '6. "Corporate Brochures" Filter Tab Label',
      type: 'string',
      group: 'content',
      initialValue: 'Brochures',
    }),
    defineField({
      name: 'datasheetTabLabel',
      title: '7. "Technical Datasheets" Filter Tab Label',
      type: 'string',
      group: 'content',
      initialValue: 'Technical Datasheets',
    }),
    defineField({
      name: 'certificationTabLabel',
      title: '8. "Quality Certifications" Filter Tab Label',
      type: 'string',
      group: 'content',
      initialValue: 'Certifications',
    }),

    // ==========================================
    // ③ EMPTY FILTER STATE
    // ==========================================
    defineField({
      name: 'emptyStateHeading',
      title: '9. Empty State Title',
      description: 'Title shown when a filter has no documents.',
      type: 'string',
      group: 'content',
      initialValue: 'No Documents Found',
    }),
    defineField({
      name: 'emptyStateText',
      title: '10. Empty State Message',
      description: 'Message shown when no documents match the filter.',
      type: 'string',
      group: 'content',
      initialValue: 'No downloadable resources found matching the selected filter category.',
    }),

    // ==========================================
    // ④ CUSTOM CTA BANNER (Bottom of Downloads Page)
    // ==========================================
    defineField({
      name: 'ctaBadge',
      title: '11. Bottom CTA Banner - Pill Badge',
      type: 'string',
      group: 'content',
      initialValue: 'Custom Engineering Requirements',
    }),
    defineField({
      name: 'ctaTitle',
      title: '12. Bottom CTA Banner - Title',
      type: 'string',
      group: 'content',
      initialValue: 'Need Custom Material Formulations or Specific Test Reports?',
    }),
    defineField({
      name: 'ctaDescription',
      title: '13. Bottom CTA Banner - Description',
      type: 'text',
      rows: 2,
      group: 'content',
      initialValue: 'Contact our laboratory and metallurgy engineering team directly to request proprietary spectroscopic reports, chemical lot certifications, or customized dimensions.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: '14. Bottom CTA Banner - Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Contact Technical Engineering Desk',
    }),

    // ==========================================
    // ⑤ SEO & SOCIAL SHARING (Dedicated Tab)
    // ==========================================
    defineField({
      name: 'seo',
      title: 'Downloads Page Search Engine (SEO) Settings',
      description: 'Google search title, description, and social media preview card for Downloads & Resources.',
      type: 'seo',
      group: 'seo',
    }),
  ],
});
