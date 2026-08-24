import { defineType, defineField } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page Content',
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
    // ① HERO SECTION (Top of Home Page)
    // ==========================================
    defineField({
      name: 'heroHeadline',
      title: '1. Hero Main Title',
      description: 'Large heading displayed on the homepage hero banner (e.g. "Advanced Graphite & Industrial Material Solutions").',
      type: 'string',
      group: 'content',
      initialValue: 'Advanced Graphite & Industrial Material Solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: '2. Hero Supporting Subtitle',
      description: 'Paragraph text displayed directly below the main title on the hero banner.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: 'Precision-manufactured high-density graphite crucibles, colloidal graphite suspensions, synthetic seals, and high-tensile doctor blades engineered for severe thermal and chemical operating environments.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCtaText',
      title: '3. Left Button Text',
      description: 'Text for the primary button (Default: "Explore Product Range").',
      type: 'string',
      group: 'content',
      initialValue: 'Explore Product Range',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: '4. Right Button Text',
      description: 'Text for the quote button (Default: "Request Custom Quote").',
      type: 'string',
      group: 'content',
      initialValue: 'Request Custom Quote',
    }),
    defineField({
      name: 'heroProducts',
      title: '5. Hero Product Showcase (Choose products to feature in Hero interactive card)',
      description: 'Select products to showcase in the interactive tabs on the right side of the hero banner (Recommended: 3-4 products).',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'coreCapabilities',
      title: '6. Core Manufacturing Capabilities (Pills under hero buttons)',
      description: 'Add, edit, or reorder the capability pills displayed directly below the hero buttons.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      initialValue: [
        'Isostatic Hot Pressing',
        'Sub-Micron Dispersions',
        'CNC Machining ±0.02mm',
        'Global Export 20+ Countries',
      ],
    }),

    // ==========================================
    // ② KEY PERFORMANCE METRICS BAR (Under Hero)
    // ==========================================
    defineField({
      name: 'metrics',
      title: '7. Key Performance Metrics Bar (4 Statistics)',
      description: 'The 4 metric highlights displayed directly below the hero banner. You can edit numbers, labels, and subtexts.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Metric Number/Value', type: 'string', description: 'e.g. "99.9%", "3000°C", "20+", "100%"' }),
            defineField({ name: 'label', title: 'Label Title', type: 'string', description: 'e.g. "Carbon Purity", "Max Thermal Rating"' }),
            defineField({ name: 'subtext', title: 'Subtitle Description', type: 'string', description: 'e.g. "Ultra-pure synthetic grades"' }),
          ],
          preview: {
            select: { title: 'metric', subtitle: 'label' },
          },
        },
      ],
      initialValue: [
        { metric: '99.9%', label: 'Carbon Purity', subtext: 'Ultra-pure synthetic grades' },
        { metric: '3000°C', label: 'Max Thermal Rating', subtext: 'Extreme heat resistance' },
        { metric: '20+', label: 'Countries Served', subtext: 'Worldwide export network' },
        { metric: '100%', label: 'ISO 9001:2015', subtext: 'Zero defect inspection' },
      ],
    }),

    // ==========================================
    // ③ PRODUCT DIVISIONS (Categories Spotlight)
    // ==========================================
    defineField({
      name: 'categoriesSectionBadge',
      title: '8. Product Divisions - Section Badge / Pill',
      description: 'Pill badge above the divisions title (Default: "Product Divisions").',
      type: 'string',
      group: 'content',
      initialValue: 'Product Divisions',
    }),
    defineField({
      name: 'categoriesSectionTitle',
      title: '9. Product Divisions - Section Title',
      description: 'Heading above the division cards (Default: "Engineered for Extreme Operations").',
      type: 'string',
      group: 'content',
      initialValue: 'Engineered for Extreme Operations',
    }),
    defineField({
      name: 'categoriesSectionDescription',
      title: '10. Product Divisions - Section Description',
      description: 'Paragraph explaining the 3 divisions.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'From metallurgical melting and hot forging to high-precision printing doctoring, our three specialized divisions supply certified industrial-grade solutions.',
    }),
    defineField({
      name: 'categoriesButtonText',
      title: '11. Product Divisions - Top Right Button Text',
      description: 'Button text in the header of the divisions section (Default: "View Full Catalog").',
      type: 'string',
      group: 'content',
      initialValue: 'View Full Catalog',
    }),
    defineField({
      name: 'categoriesCardLinkText',
      title: '12. Product Divisions - Card Bottom Link Text',
      description: 'Link text inside each division card (Default: "Explore Products").',
      type: 'string',
      group: 'content',
      initialValue: 'Explore Products',
    }),
    defineField({
      name: 'featuredCategories',
      title: '13. Product Divisions Selector (Choose categories to display on Home Page)',
      description: 'Select the product categories to display as division cards on the homepage (If none are selected, all categories are displayed automatically).',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),

    // ==========================================
    // ④ WHAT WE MANUFACTURE & SUPPLY (Bento Grid)
    // ==========================================
    defineField({
      name: 'manufactureSectionBadge',
      title: '14. What We Manufacture - Section Badge / Pill',
      description: 'Badge above section heading (Default: "Product Portfolio").',
      type: 'string',
      group: 'content',
      initialValue: 'Product Portfolio',
    }),
    defineField({
      name: 'manufactureSectionTitle',
      title: '15. What We Manufacture - Section Title',
      description: 'Main heading for the products showcase grid (Default: "What We Manufacture & Supply").',
      type: 'string',
      group: 'content',
      initialValue: 'What We Manufacture & Supply',
    }),
    defineField({
      name: 'manufactureSectionDescription',
      title: '16. What We Manufacture - Section Description',
      description: 'Paragraph explaining product quality and batch inspection.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'Engineered for ultra-high temperature endurance, chemical inertness, and tight mechanical tolerances. Every product is 100% batch inspected.',
    }),
    defineField({
      name: 'manufactureButtonText',
      title: '17. What We Manufacture - Top Right Button Text',
      description: 'Button text in the header of the manufacture section (Default: "Browse All Products").',
      type: 'string',
      group: 'content',
      initialValue: 'Browse All Products',
    }),
    defineField({
      name: 'manufactureCardLinkText',
      title: '18. What We Manufacture - Card Link Text',
      description: 'Link text inside each product card (Default: "View Full Specs").',
      type: 'string',
      group: 'content',
      initialValue: 'View Full Specs',
    }),
    defineField({
      name: 'manufactureShowcaseProducts',
      title: '19. What We Manufacture - Products Selector (Choose products for Bento grid)',
      description: 'Select products to showcase in this section (The first product will be large/featured, followed by up to 5 grid cards).',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),

    // ==========================================
    // ⑤ INFRASTRUCTURE & CAPABILITIES PIPELINE
    // ==========================================
    defineField({
      name: 'capabilitiesBadge',
      title: '20. Capabilities Section Badge / Pill',
      description: 'Pill badge above capabilities heading (Default: "Manufacturing Infrastructure").',
      type: 'string',
      group: 'content',
      initialValue: 'Manufacturing Infrastructure',
    }),
    defineField({
      name: 'capabilitiesHeadline',
      title: '21. Capabilities Section Title',
      description: 'Heading displayed above the manufacturing infrastructure pipeline (Middle of page).',
      type: 'string',
      group: 'content',
      initialValue: 'State-of-the-Art Precision Manufacturing Capabilities',
    }),
    defineField({
      name: 'capabilitiesDescription',
      title: '22. Capabilities Section Description',
      description: 'Introductory paragraph explaining plant machinery, CNC tooling, and cleanroom facilities.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: 'Our specialized manufacturing units house high-tech machinery engineered for extreme material processing. From high-purity synthetic graphite machining to automated colloidal dispersions, we enforce zero-defect quality control.',
    }),
    defineField({
      name: 'facilityStat1Number',
      title: '23. Facility Stat 1 - Number',
      description: 'Left facility stat number (Default: "50,000+").',
      type: 'string',
      group: 'content',
      initialValue: '50,000+',
    }),
    defineField({
      name: 'facilityStat1Label',
      title: '24. Facility Stat 1 - Label',
      description: 'Left facility stat description (Default: "Sq. Ft. Production Floor").',
      type: 'string',
      group: 'content',
      initialValue: 'Sq. Ft. Production Floor',
    }),
    defineField({
      name: 'facilityStat2Number',
      title: '25. Facility Stat 2 - Number',
      description: 'Right facility stat number (Default: "100%").',
      type: 'string',
      group: 'content',
      initialValue: '100%',
    }),
    defineField({
      name: 'facilityStat2Label',
      title: '26. Facility Stat 2 - Label',
      description: 'Right facility stat description (Default: "Batch Spectro Inspection").',
      type: 'string',
      group: 'content',
      initialValue: 'Batch Spectro Inspection',
    }),
    defineField({
      name: 'capabilitiesSteps',
      title: '27. 4-Stage Manufacturing Pipeline Steps',
      description: 'The 4 processing steps shown on the right side of the capabilities section.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string', description: 'e.g. "01", "02", "03", "04"' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string', description: 'e.g. "Isostatic & Hydrostatic Pressing"' }),
            defineField({ name: 'desc', title: 'Step Description', type: 'text', rows: 2 }),
            defineField({ name: 'metric', title: 'Metric Tag', type: 'string', description: 'e.g. "1.95 g/cm³ Density", "±0.02 mm Tolerance"' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'metric' },
          },
        },
      ],
    }),

    // ==========================================
    // ⑥ WHY CHOOSE US & KEY STRENGTHS
    // ==========================================
    defineField({
      name: 'whyChooseUsBadge',
      title: '28. Why Choose Us Section Badge / Pill',
      description: 'Pill badge above section heading (Default: "B2B Manufacturing Advantage").',
      type: 'string',
      group: 'content',
      initialValue: 'B2B Manufacturing Advantage',
    }),
    defineField({
      name: 'whyChooseUsHeadline',
      title: '29. Why Choose Us Section Title',
      description: 'Heading displayed above the 6 key differentiators and strengths grid.',
      type: 'string',
      group: 'content',
      initialValue: 'Why Industrial Leaders Choose VM Graphite',
    }),
    defineField({
      name: 'whyChooseUsSubtitle',
      title: '30. Why Choose Us Subtitle / Description',
      description: 'Introductory sentence under the section title.',
      type: 'string',
      group: 'content',
      initialValue: 'Decades of combined engineering leadership, specialized material science formulations, and certified export-grade reliability.',
    }),
    defineField({
      name: 'strengthsList',
      title: '31. Core Strengths Cards (6 Points)',
      description: 'Customize the 6 differentiators shown in the Why Choose Us grid.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Card Number', type: 'string', description: 'e.g. "01", "02", ...' }),
            defineField({ name: 'title', title: 'Strength Title', type: 'string', description: 'e.g. "Advanced Alubonding™ Technology"' }),
            defineField({ name: 'description', title: 'Strength Explanation', type: 'text', rows: 2 }),
            defineField({ name: 'metric', title: 'Tag / Badge', type: 'string', description: 'e.g. "Proprietary R&D", "Timely Delivery SLA"' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'metric' },
          },
        },
      ],
    }),

    // ==========================================
    // ⑦ DOWNLOAD BROCHURE CTA BANNER (Bottom of Page)
    // ==========================================
    defineField({
      name: 'brochureBadge',
      title: '32. Brochure Banner - Badge / Pill',
      description: 'Pill badge above brochure heading (Default: "Official Technical Documentation").',
      type: 'string',
      group: 'content',
      initialValue: 'Official Technical Documentation',
    }),
    defineField({
      name: 'brochureTitle',
      title: '33. Brochure Banner - Main Heading',
      description: 'Heading for the brochure download CTA banner.',
      type: 'string',
      group: 'content',
      initialValue: 'Download VM Graphite Corporate Catalog & Technical Brochure',
    }),
    defineField({
      name: 'brochureDescription',
      title: '34. Brochure Banner - Description',
      description: 'Description paragraph explaining the catalog contents.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'Access complete product dimensions, thermal performance charts, chemical resistance matrices, and ISO manufacturing certifications in a single convenient PDF brochure.',
    }),
    defineField({
      name: 'brochureFeatures',
      title: '35. Brochure Banner - Bullet Features List',
      description: 'The 4 bullet points shown on the left side of the brochure section.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      initialValue: [
        'Product dimensions & tolerances',
        'Thermal performance charts',
        'ISO 9001:2015 certifications',
        'Spectrographic analysis data',
      ],
    }),
    defineField({
      name: 'brochureCardTag',
      title: '36. Brochure Card - Top Badge',
      description: 'Badge tag in the top right of the floating brochure card (Default: "PDF Specification").',
      type: 'string',
      group: 'content',
      initialValue: 'PDF Specification',
    }),
    defineField({
      name: 'brochureCardTitle',
      title: '37. Brochure Card - Card Title',
      description: 'Main heading inside the floating brochure card (Default: "Corporate Brochure & Product Catalog").',
      type: 'string',
      group: 'content',
      initialValue: 'Corporate Brochure & Product Catalog',
    }),
    defineField({
      name: 'brochureCardSubtitle',
      title: '38. Brochure Card - Subtitle Description',
      description: 'Subtitle inside the floating brochure card (Default: "Comprehensive technical reference for engineers & buyers").',
      type: 'string',
      group: 'content',
      initialValue: 'Comprehensive technical reference for engineers & buyers',
    }),
    defineField({
      name: 'brochureButtonText',
      title: '39. Brochure Banner - Download Button Text',
      description: 'Primary button text (Default: "Download PDF Brochure").',
      type: 'string',
      group: 'content',
      initialValue: 'Download PDF Brochure',
    }),
    defineField({
      name: 'brochureSecondaryButtonText',
      title: '40. Brochure Banner - Secondary Button Text',
      description: 'Secondary button text (Default: "View All Technical Datasheets").',
      type: 'string',
      group: 'content',
      initialValue: 'View All Technical Datasheets',
    }),
    defineField({
      name: 'brochureCardCertText',
      title: '41. Brochure Card - Bottom Certification Tag',
      description: 'Certification label at the bottom of the card (Default: "ISO 9001:2015 Certified Documentation").',
      type: 'string',
      group: 'content',
      initialValue: 'ISO 9001:2015 Certified Documentation',
    }),

    // ==========================================
    // ⑧ SEO & SOCIAL SHARING (Dedicated Tab)
    // ==========================================
    defineField({
      name: 'seo',
      title: 'Home Page Search Engine (SEO) Settings',
      description: 'Google search title, description, and social media preview card for the homepage.',
      type: 'seo',
      group: 'seo',
    }),
  ],
});
