import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Header & Footer Settings',
  type: 'document',
  groups: [
    {
      name: 'header',
      title: '🔝 Header Settings',
      default: true,
    },
    {
      name: 'footer',
      title: '🔻 Footer Settings',
    },
    {
      name: 'catalog',
      title: '📦 Product & Catalog Settings',
    },
  ],
  fields: [
    // ==========================================
    // ⓪ GLOBAL CATALOG SETTINGS (Tab 3: Catalog)
    // ==========================================
    defineField({
      name: 'hideAllSpecifications',
      title: 'Hide Technical Specifications Across All Products',
      description: 'When enabled, technical specifications matrices and badges will be hidden globally across the entire website for all products.',
      type: 'boolean',
      group: 'catalog',
      initialValue: false,
    }),

    // ==========================================
    // ① HEADER SETTINGS (Tab 1: Header - Default)
    // ==========================================
    defineField({
      name: 'logo',
      title: '1. Website Brand Logo',
      description: 'Upload your company logo. Automatically displays in the navigation header and website footer.',
      type: 'image',
      group: 'header',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headerTickerText',
      title: '2. Header Top Ticker Text',
      description: 'Text displayed on the top notification bar in the header.',
      type: 'string',
      group: 'header',
      initialValue: 'ISO 9001:2015 Certified High-Purity Graphite Manufacturer',
    }),
    defineField({
      name: 'primaryPhone',
      title: '3. Header Primary Phone Number',
      description: 'Official phone number displayed in header top strip, contact page, and footer (e.g. "+91 94221 02425").',
      type: 'string',
      group: 'header',
      initialValue: '+91 94221 02425',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workingHours',
      title: '4. Working Hours / Timing',
      description: 'Hours displayed in the top header ticker (e.g. "Mon - Sat: 9:00 AM - 6:30 PM IST").',
      type: 'string',
      group: 'header',
      initialValue: 'Mon - Sat: 9:00 AM - 6:30 PM IST',
    }),
    defineField({
      name: 'whatsappNumber',
      title: '5. Sales WhatsApp Number (Digits with country code)',
      description: 'Used by the header WhatsApp link and floating button (e.g. "919422102425").',
      type: 'string',
      group: 'header',
      initialValue: '919422102425',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerWhatsappText',
      title: '6. Header WhatsApp Link Title',
      description: 'Link text displayed next to WhatsApp icon in top header bar (Default: "WhatsApp").',
      type: 'string',
      group: 'header',
      initialValue: 'WhatsApp',
    }),
    defineField({
      name: 'headerQuoteButtonText',
      title: '7. Header Quote Button Text',
      description: 'Text for the main button in the top right of the navigation header (Default: "Request Quote").',
      type: 'string',
      group: 'header',
      initialValue: 'Request Quote',
    }),
    defineField({
      name: 'headerNavItems',
      title: '8. Navigation Menu Links (Top Tab Options)',
      description: 'Customize top navigation links. You can add, rename, reorder, or toggle "Hide Link" on any option.',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Link Title',
              type: 'string',
              description: 'e.g. "Home", "About", "Products", "Downloads", "Contact"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Target URL Path',
              type: 'string',
              description: 'e.g. "/", "/about", "/products", "/downloads", "/contact"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Show Categories Dropdown Menu?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'hide',
              title: 'Hide this link from navigation bar?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
              hide: 'hide',
            },
            prepare({ title, subtitle, hide }) {
              return {
                title: `${hide ? '🚫 (Hidden) ' : '✓ '}${title || 'Untitled Link'}`,
                subtitle: subtitle || '/',
              };
            },
          },
        },
      ],
      initialValue: [
        { name: 'Home', href: '/', hasDropdown: false, hide: false },
        { name: 'About', href: '/about', hasDropdown: false, hide: false },
        { name: 'Products', href: '/products', hasDropdown: true, hide: false },
        { name: 'Downloads', href: '/downloads', hasDropdown: false, hide: false },
        { name: 'Contact', href: '/contact', hasDropdown: false, hide: false },
      ],
    }),

    // ==========================================
    // ② FOOTER SETTINGS (Tab 2: Footer)
    // ==========================================
    defineField({
      name: 'footerTagline',
      title: '9. Footer Company Description Paragraph',
      description: 'Paragraph text shown under the logo in the website footer.',
      type: 'text',
      group: 'footer',
      rows: 3,
      initialValue: 'Premier manufacturer and exporter of high-density graphite solutions for metallurgical, coating, and severe-duty manufacturing processes.',
    }),
    defineField({
      name: 'companyBrochure',
      title: '10. Official Company Brochure PDF',
      description: 'Upload your company PDF brochure. Downloaded automatically when visitors click "Download Brochure" buttons site-wide.',
      type: 'file',
      group: 'footer',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'footerDownloadButtonText',
      title: '11. Footer Brochure Download Button Text',
      description: 'Button text below the company description in the footer (Default: "Download Brochure").',
      type: 'string',
      group: 'footer',
      initialValue: 'Download Brochure',
    }),
    defineField({
      name: 'footerLocationHeading',
      title: '12. Footer Location Section Title',
      description: 'Heading above the address cards in the footer (Default: "Factory & Corporate Locations").',
      type: 'string',
      group: 'footer',
      initialValue: 'Factory & Corporate Locations',
    }),

    // Dynamic Multiple Locations in Footer
    defineField({
      name: 'footerLocations',
      title: '13. Footer Locations / Addresses (Add As Many As You Want)',
      description: 'Add and manage all company addresses displayed in the website footer.',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          title: 'Footer Location Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Location Title',
              type: 'string',
              description: 'e.g. "Corporate Office", "Manufacturing Plant", "Regional Unit"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badge',
              title: 'Tag / Badge (Optional)',
              type: 'string',
              description: 'e.g. "Corporate HQ", "Manufacturing Unit"',
            }),
            defineField({
              name: 'address',
              title: 'Full Address',
              type: 'text',
              rows: 3,
              description: 'Street, Industrial Area, City, State, Country',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Direct Phone (Optional)',
              type: 'string',
              description: 'e.g. "+91 94221 02425"',
            }),
            defineField({
              name: 'email',
              title: 'Direct Email (Optional)',
              type: 'string',
              description: 'e.g. "info@vmgraphiteindustries.com"',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'address',
              badge: 'badge',
            },
            prepare({ title, subtitle, badge }) {
              return {
                title: `${badge ? `[${badge}] ` : ''}${title || 'Untitled Address'}`,
                subtitle: subtitle || '',
              };
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Corporate Office',
          badge: 'Corporate HQ',
          address: 'Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
          phone: '+91 94221 02425',
          email: 'info@vmgraphiteindustries.com',
        },
        {
          title: 'Manufacturing Plant',
          badge: 'Manufacturing Unit',
          address: 'Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
          phone: '+91 94221 02425',
          email: 'info@vmgraphiteindustries.com',
        },
      ],
    }),

    // Legacy Fallback Single Fields for Footer
    defineField({
      name: 'corporateOfficeTitle',
      title: 'Legacy: Corporate Office Card Title',
      type: 'string',
      group: 'footer',
      hidden: true,
      initialValue: 'Corporate Office',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Legacy: Corporate Office Address',
      type: 'text',
      group: 'footer',
      hidden: true,
      initialValue: 'Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
    }),
    defineField({
      name: 'footerPhone',
      title: 'Legacy: Corporate Office Phone',
      type: 'string',
      group: 'footer',
      hidden: true,
      initialValue: '+91 94221 02425',
    }),
    defineField({
      name: 'plantTitle',
      title: 'Legacy: Plant Card Title',
      type: 'string',
      group: 'footer',
      hidden: true,
      initialValue: 'Manufacturing Plant',
    }),
    defineField({
      name: 'plantAddress',
      title: 'Legacy: Plant Address',
      type: 'text',
      group: 'footer',
      hidden: true,
      initialValue: 'Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
    }),

    defineField({
      name: 'email',
      title: '14. Official Inquiry Email Address',
      description: 'Destination email displayed with click-to-email link in the footer and header (e.g. "info@vmgraphiteindustries.com").',
      type: 'string',
      group: 'footer',
      initialValue: 'info@vmgraphiteindustries.com',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'footerCopyrightText',
      title: '15. Footer Copyright Text',
      description: 'Copyright statement shown at the bottom left of the footer (Use {year} to insert current year dynamically, e.g. "© {year} VM Graphite Industries LLP. All rights reserved.").',
      type: 'string',
      group: 'footer',
      initialValue: '© {year} VM Graphite Industries LLP. All rights reserved.',
    }),
    defineField({
      name: 'footerBadgeText',
      title: '16. Footer Bottom Right Badge Text',
      description: 'Text in the bottom copyright bar (Default: "A Complete Solution For Coating & Metalizer").',
      type: 'string',
      group: 'footer',
      initialValue: 'A Complete Solution For Coating & Metalizer',
    }),
  ],
});
