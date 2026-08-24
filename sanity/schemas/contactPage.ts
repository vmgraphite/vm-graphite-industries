import { defineType, defineField } from 'sanity';

export const contactPageSchema = defineType({
  name: 'contactPage',
  title: 'Contact Us Page Content',
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
    // ① TOP BANNER (Header of Contact Page)
    // ==========================================
    defineField({
      name: 'badge',
      title: '1. Top Pill Badge',
      description: 'Small badge above main heading (Default: "Direct Channels").',
      type: 'string',
      group: 'content',
      initialValue: 'Direct Channels',
    }),
    defineField({
      name: 'title',
      title: '2. Contact Page Main Title',
      description: 'Heading on the top banner of the Contact Us page (Default: "Contact & Factory Locations").',
      type: 'string',
      group: 'content',
      initialValue: 'Contact & Factory Locations',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '3. Contact Page Subtitle',
      description: 'Supporting text below the heading on the Contact Us page.',
      type: 'string',
      group: 'content',
      initialValue: 'Reach out to our technical sales team, request custom sample trials, or schedule a facility visit.',
    }),

    // ==========================================
    // ② LOCATION CARDS (Left Column)
    // ==========================================
    defineField({
      name: 'corporateOfficeHeading',
      title: '4. Corporate Office Card Title',
      description: 'Title for the top office card (Default: "Corporate & Sales Office").',
      type: 'string',
      group: 'content',
      initialValue: 'Corporate & Sales Office',
    }),
    defineField({
      name: 'officeAddress',
      title: '5. Corporate Office Full Address',
      description: 'Full address displayed inside the corporate office card.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: 'Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'manufacturingPlantHeading',
      title: '6. Manufacturing Plant Card Title',
      description: 'Title for the plant card (Default: "Manufacturing Plant Unit").',
      type: 'string',
      group: 'content',
      initialValue: 'Manufacturing Plant Unit',
    }),
    defineField({
      name: 'plantAddress',
      title: '7. Manufacturing Plant Full Address',
      description: 'Full address displayed inside the manufacturing plant card.',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue: 'Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
    }),

    // ==========================================
    // ③ DIRECT COMMUNICATION CHANNELS
    // ==========================================
    defineField({
      name: 'directCommHeading',
      title: '8. Direct Communication Section Title',
      description: 'Title above phone, email and WhatsApp box (Default: "Direct Communication").',
      type: 'string',
      group: 'content',
      initialValue: 'Direct Communication',
    }),
    defineField({
      name: 'primaryPhone',
      title: '9. Official Phone Number',
      description: 'Displayed on contact page with click-to-call link (e.g. "+91 94221 02425").',
      type: 'string',
      group: 'content',
      initialValue: '+91 94221 02425',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: '10. Official Inquiry Email Address',
      description: 'Displayed on contact page with click-to-email link (e.g. "info@vmgraphiteindustries.com").',
      type: 'string',
      group: 'content',
      initialValue: 'info@vmgraphiteindustries.com',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: '11. Sales WhatsApp Number (Digits with country code)',
      description: 'Used by the instant WhatsApp sales desk button (e.g. "919422102425").',
      type: 'string',
      group: 'content',
      initialValue: '919422102425',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappButtonText',
      title: '12. WhatsApp Button Text',
      description: 'Button text for the WhatsApp button on contact page (Default: "Instant WhatsApp Sales Desk").',
      type: 'string',
      group: 'content',
      initialValue: 'Instant WhatsApp Sales Desk',
    }),

    // ==========================================
    // ④ INQUIRY FORM (Right Column)
    // ==========================================
    defineField({
      name: 'formHeading',
      title: '13. Inquiry Form Card Title',
      description: 'Main heading above the interactive contact form (Default: "Send an Official Commercial Inquiry").',
      type: 'string',
      group: 'content',
      initialValue: 'Send an Official Commercial Inquiry',
    }),
    defineField({
      name: 'formSubtitle',
      title: '14. Inquiry Form Card Subtitle',
      description: 'Subtitle description above the form fields.',
      type: 'string',
      group: 'content',
      initialValue: 'Fill out the details below. Our technical sales engineers respond within 2-4 business hours.',
    }),

    // ==========================================
    // ⑤ SEO & SOCIAL SHARING (Dedicated Tab)
    // ==========================================
    defineField({
      name: 'seo',
      title: 'Contact Page Search Engine (SEO) Settings',
      description: 'Google search title, description, and social media preview card for Contact Us.',
      type: 'seo',
      group: 'seo',
    }),
  ],
});
