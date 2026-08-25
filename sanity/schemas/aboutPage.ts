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
      name: 'headerBadge',
      title: '1. Header Section Badge / Pill',
      description: 'Small badge above the main title (Default: "Company Profile & Vision").',
      type: 'string',
      group: 'content',
      initialValue: 'Company Profile & Vision',
    }),
    defineField({
      name: 'title',
      title: '2. About Page Main Title',
      description: 'Large title on the top banner (Default: "About VM Graphite Industries LLP").',
      type: 'string',
      group: 'content',
      initialValue: 'About VM Graphite Industries LLP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '3. About Page Tagline / Subtitle',
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
      title: '4. Corporate Aim Small Tag',
      description: 'Small tag above the vision quote (Default: "Our Corporate Aim").',
      type: 'string',
      group: 'content',
      initialValue: 'Our Corporate Aim',
    }),
    defineField({
      name: 'aimQuote',
      title: '5. Corporate Aim Vision Quote',
      description: 'Full quote displayed in the dark gradient banner.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: '"VM Graphite Industries LLP: Striving to Become India\'s Leading Supplier of Unmatched Quality Graphite Suspension and Foil Tape."',
    }),

    // ==========================================
    // ③ WHO WE ARE / COMPANY OVERVIEW & PLANT SPOTLIGHT
    // ==========================================
    defineField({
      name: 'whoWeAreBadge',
      title: '6. Who We Are - Section Badge / Pill',
      description: 'Pill badge above the overview heading (Default: "Who We Are").',
      type: 'string',
      group: 'content',
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'manufacturingHeading',
      title: '7. Overview Section Heading',
      description: 'Heading for the story section (e.g. "Advanced Alubonding Technology & Technical Manufacturing Excellence").',
      type: 'string',
      group: 'content',
      initialValue: 'Advanced Alubonding Technology & Technical Manufacturing Excellence',
    }),
    defineField({
      name: 'heroImage',
      title: '8. Plant / Facility Photograph',
      description: 'Main photograph showing manufacturing plant and R&D facilities on the left of the overview section.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'plantHubTag',
      title: '9. Facility Card - Hub & Center Tag',
      description: 'Tag displayed in the photo caption bar (Default: "Manufacturing Hub & R&D Center").',
      type: 'string',
      group: 'content',
      initialValue: 'Manufacturing Hub & R&D Center',
    }),
    defineField({
      name: 'plantLocation',
      title: '10. Facility Card - Units / Location Subtitle',
      description: 'Location text below hub tag (Default: "New Delhi & Gujarat Units").',
      type: 'string',
      group: 'content',
      initialValue: 'New Delhi & Gujarat Units',
    }),
    defineField({
      name: 'plantEstTag',
      title: '11. Facility Card - Established Tag',
      description: 'Established badge in the photo caption bar (Default: "EST. 2021").',
      type: 'string',
      group: 'content',
      initialValue: 'EST. 2021',
    }),
    defineField({
      name: 'companyIntroduction',
      title: '12. Company Story & History Paragraphs',
      description: 'Paragraphs detailing the founding in 2021 by Ayush Patel & Himanshu Bisth, proprietary Alubonding R&D, and product scope.',
      type: 'text',
      rows: 6,
      group: 'content',
    }),
    defineField({
      name: 'leadershipLabel',
      title: '13. Leadership Box - Tag / Label',
      description: 'Top label in the leadership highlight box (Default: "Founders & Leadership").',
      type: 'string',
      group: 'content',
      initialValue: 'Founders & Leadership',
    }),
    defineField({
      name: 'leadershipTitle',
      title: '14. Leadership Box - Names / Title',
      description: 'Names displayed in the leadership box (Default: "Ayush Patel & Himanshu Bisth").',
      type: 'string',
      group: 'content',
      initialValue: 'Ayush Patel & Himanshu Bisth',
    }),
    defineField({
      name: 'leadershipSubtitle',
      title: '15. Leadership Box - Role Subtitle',
      description: 'Subtitle in the leadership box (Default: "Partners & Co-Founders").',
      type: 'string',
      group: 'content',
      initialValue: 'Partners & Co-Founders',
    }),
    defineField({
      name: 'innovationLabel',
      title: '16. Innovation Box - Tag / Label',
      description: 'Top label in the innovation highlight box (Default: "Core Innovation").',
      type: 'string',
      group: 'content',
      initialValue: 'Core Innovation',
    }),
    defineField({
      name: 'innovationTitle',
      title: '17. Innovation Box - Title',
      description: 'Core innovation title (Default: "Alubonding Technology").',
      type: 'string',
      group: 'content',
      initialValue: 'Alubonding Technology',
    }),
    defineField({
      name: 'innovationSubtitle',
      title: '18. Innovation Box - Subtitle',
      description: 'Core innovation subtitle (Default: "Proprietary R&D Process").',
      type: 'string',
      group: 'content',
      initialValue: 'Proprietary R&D Process',
    }),

    // ==========================================
    // ④ PRODUCTION CAPACITY BANNER
    // ==========================================
    defineField({
      name: 'capacityBadge',
      title: '19. Capacity Banner - Badge / Pill',
      description: 'Pill badge above the capacity statement (Default: "Production Capacity & Quality Standard").',
      type: 'string',
      group: 'content',
      initialValue: 'Production Capacity & Quality Standard',
    }),
    defineField({
      name: 'capacityStatement',
      title: '20. Production Capacity Statement',
      description: 'Highlighted quotation in the central bordered box.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: '"We pride ourselves on our exceptional production capacity and commitment to timely delivery, ensuring that your orders are fulfilled on schedule with the highest standards of quality. Discover how our solutions can meet your industrial needs with speed and excellence."',
    }),

    // ==========================================
    // ⑤ QUALITY ASSURANCE & PRODUCTION STANDARDS
    // ==========================================
    defineField({
      name: 'qualityBadge',
      title: '21. Quality Section - Badge / Pill',
      description: 'Pill badge above quality heading (Default: "Quality Assurance").',
      type: 'string',
      group: 'content',
      initialValue: 'Quality Assurance',
    }),
    defineField({
      name: 'qualityHeading',
      title: '22. Quality Section - Heading',
      description: 'Heading displayed above the quality testing cards (Default: "Rigorous Quality & Production Standards").',
      type: 'string',
      group: 'content',
      initialValue: 'Rigorous Quality & Production Standards',
    }),
    defineField({
      name: 'qualitySubtitle',
      title: '23. Quality Section - Subtitle / Description',
      description: 'Supporting paragraph below the quality heading.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'Every production lot undergoes rigorous physical, thermal, and chemical laboratory testing before dispatch.',
    }),
    defineField({
      name: 'qualityPillars',
      title: '24. Quality Assurance Pillars (Cards Grid)',
      description: 'Customize the 3 quality pillars / testing capability cards shown in the grid.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              description: 'e.g. "Alubonding & Material R&D", "Foil Tape Custom Sizing", "Timely Delivery Guarantee"',
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 3,
              description: 'Detailed description of the quality process or capability.',
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Style / Type',
              type: 'string',
              description: 'Choose icon aesthetic: "shield" (R&D / testing), "layers" (custom sizing), "delivery" (delivery guarantee)',
              options: {
                list: [
                  { title: 'Shield / Verification (Default)', value: 'shield' },
                  { title: 'Layers / Dimensions / Sizing', value: 'layers' },
                  { title: 'Delivery / Speed / Logistics', value: 'delivery' },
                ],
              },
              initialValue: 'shield',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'iconType' },
          },
        },
      ],
      initialValue: [
        {
          title: 'Alubonding & Material R&D',
          description: 'Proprietary Alubonding thermal bonding and chemical formulation techniques yield superior heat resistance, low ash content, and structural integrity.',
          iconType: 'shield',
        },
        {
          title: 'Foil Tape Custom Sizing',
          description: 'Our high-purity graphite foil tape is engineered in various custom widths, thicknesses, and adhesive backings to suit diverse industrial sealing requirements.',
          iconType: 'layers',
        },
        {
          title: 'Timely Delivery Guarantee',
          description: 'Robust production scheduling and export-grade protective packaging ensure every order is fulfilled on schedule without compromising on quality.',
          iconType: 'delivery',
        },
      ],
    }),

    // ==========================================
    // ⑥ DOWNLOAD BROCHURE CTA BANNER (Bottom of Page)
    // ==========================================
    defineField({
      name: 'brochureBadge',
      title: '25. Brochure Banner - Badge / Pill',
      description: 'Pill badge above brochure heading (Default: "Official Technical Documentation").',
      type: 'string',
      group: 'content',
      initialValue: 'Official Technical Documentation',
    }),
    defineField({
      name: 'brochureTitle',
      title: '26. Brochure Banner - Main Heading',
      description: 'Heading for the brochure download CTA banner.',
      type: 'string',
      group: 'content',
      initialValue: 'Download VM Graphite Corporate Catalog & Technical Brochure',
    }),
    defineField({
      name: 'brochureDescription',
      title: '27. Brochure Banner - Description',
      description: 'Description paragraph explaining the catalog contents.',
      type: 'text',
      group: 'content',
      rows: 2,
      initialValue: 'Access complete product dimensions, thermal performance charts, chemical resistance matrices, and ISO manufacturing certifications in a single convenient PDF brochure.',
    }),
    defineField({
      name: 'brochureFeatures',
      title: '28. Brochure Banner - Bullet Features List',
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
      title: '29. Brochure Card - Top Badge',
      description: 'Badge tag in the top right of the floating brochure card (Default: "PDF Specification").',
      type: 'string',
      group: 'content',
      initialValue: 'PDF Specification',
    }),
    defineField({
      name: 'brochureCardTitle',
      title: '30. Brochure Card - Card Title',
      description: 'Main heading inside the floating brochure card (Default: "Corporate Brochure & Product Catalog").',
      type: 'string',
      group: 'content',
      initialValue: 'Corporate Brochure & Product Catalog',
    }),
    defineField({
      name: 'brochureCardSubtitle',
      title: '31. Brochure Card - Subtitle Description',
      description: 'Subtitle inside the floating brochure card (Default: "Comprehensive technical reference for engineers & buyers").',
      type: 'string',
      group: 'content',
      initialValue: 'Comprehensive technical reference for engineers & buyers',
    }),
    defineField({
      name: 'brochureButtonText',
      title: '32. Brochure Banner - Download Button Text',
      description: 'Primary button text (Default: "Download PDF Brochure").',
      type: 'string',
      group: 'content',
      initialValue: 'Download PDF Brochure',
    }),
    defineField({
      name: 'brochureSecondaryButtonText',
      title: '33. Brochure Banner - Secondary Button Text',
      description: 'Secondary button text (Default: "View All Technical Datasheets").',
      type: 'string',
      group: 'content',
      initialValue: 'View All Technical Datasheets',
    }),
    defineField({
      name: 'brochureCardCertText',
      title: '34. Brochure Card - Bottom Certification Tag',
      description: 'Certification label at the bottom of the card (Default: "ISO 9001:2015 Certified Documentation").',
      type: 'string',
      group: 'content',
      initialValue: 'ISO 9001:2015 Certified Documentation',
    }),

    // ==========================================
    // ⑦ SEO & SOCIAL SHARING (Dedicated Tab)
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
