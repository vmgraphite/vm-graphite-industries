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
      name: 'form',
      title: '📝 Contact Form',
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
    // ② MULTIPLE LOCATIONS & ADDRESSES (Add as many as needed)
    // ==========================================
    defineField({
      name: 'locations',
      title: '4. Office & Factory Locations (Add As Many As You Want)',
      description: 'Add, edit, or reorder company physical addresses (e.g. Corporate Office, Manufacturing Plants, Branch Units, Warehouses, R&D Labs).',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          title: 'Location / Address Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Location Title',
              type: 'string',
              description: 'e.g. "Corporate & Sales Office", "Manufacturing Plant Unit", "Gujarat R&D Facility"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badge',
              title: 'Location Tag / Badge',
              type: 'string',
              description: 'e.g. "Corporate HQ", "Manufacturing Unit", "Branch Office", "R&D Lab"',
            }),
            defineField({
              name: 'address',
              title: 'Full Address',
              type: 'text',
              rows: 3,
              description: 'Complete physical street address with city, state, pin code, country.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Direct Phone for this Location (Optional)',
              type: 'string',
              description: 'e.g. "+91 94221 02425"',
            }),
            defineField({
              name: 'email',
              title: 'Direct Email for this Location (Optional)',
              type: 'string',
              description: 'e.g. "plant@vmgraphiteindustries.com"',
            }),
            defineField({
              name: 'googleMapsUrl',
              title: 'Google Maps Link (Optional)',
              type: 'url',
              description: 'URL to Google Maps location',
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
                title: `${badge ? `[${badge}] ` : ''}${title || 'Untitled Location'}`,
                subtitle: subtitle || 'No address specified',
              };
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Corporate & Sales Office',
          badge: 'Corporate HQ',
          address: 'Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
          phone: '+91 94221 02425',
          email: 'info@vmgraphiteindustries.com',
        },
        {
          title: 'Manufacturing Plant Unit',
          badge: 'Manufacturing Unit',
          address: 'Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
          phone: '+91 94221 02425',
          email: 'info@vmgraphiteindustries.com',
        },
      ],
    }),

    // ==========================================
    // ③ DIRECT COMMUNICATION CHANNELS (Add as many as needed)
    // ==========================================
    defineField({
      name: 'directCommHeading',
      title: '5. Direct Communication Section Title',
      description: 'Title above phone, email and WhatsApp box (Default: "Direct Communication").',
      type: 'string',
      group: 'content',
      initialValue: 'Direct Communication',
    }),
    defineField({
      name: 'contactChannels',
      title: '6. Direct Contact Channels (Add As Many As You Want)',
      description: 'Add phone numbers, emails, WhatsApp desks, sales hotlines, or custom contact options.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          title: 'Contact Channel Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Contact Label / Title',
              type: 'string',
              description: 'e.g. "Primary Phone", "Official Inquiry Email", "WhatsApp Sales Desk", "Export Support"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Channel Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Phone (click-to-call)', value: 'phone' },
                  { title: 'Email (click-to-email)', value: 'email' },
                  { title: 'WhatsApp (instant chat)', value: 'whatsapp' },
                  { title: 'Custom Link / Action', value: 'custom' },
                ],
              },
              initialValue: 'phone',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Contact Value',
              type: 'string',
              description: 'e.g. "+91 94221 02425", "info@vmgraphiteindustries.com", "919422102425"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtext',
              title: 'Subtext / Timing (Optional)',
              type: 'string',
              description: 'e.g. "Mon - Sat: 9:00 AM - 6:30 PM IST", "Direct commercial desk"',
            }),
            defineField({
              name: 'customUrl',
              title: 'Custom Action URL (Optional)',
              type: 'string',
              description: 'Override destination URL (otherwise auto-generated based on channel type).',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'value',
              type: 'type',
            },
            prepare({ title, subtitle, type }) {
              const iconMap: Record<string, string> = {
                phone: '📞',
                email: '✉️',
                whatsapp: '💬',
                custom: '🔗',
              };
              return {
                title: `${iconMap[type] || '📌'} ${title || 'Untitled Channel'}`,
                subtitle: subtitle || '',
              };
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Primary Phone',
          type: 'phone',
          value: '+91 94221 02425',
          subtext: 'Mon - Sat: 9:00 AM - 6:30 PM IST',
        },
        {
          title: 'Official Email',
          type: 'email',
          value: 'info@vmgraphiteindustries.com',
          subtext: 'Commercial Inquiry Desk',
        },
        {
          title: 'WhatsApp Sales Desk',
          type: 'whatsapp',
          value: '919422102425',
          subtext: 'Instant technical sales response',
        },
      ],
    }),

    // Legacy Fallback Fields
    defineField({
      name: 'corporateOfficeHeading',
      title: 'Legacy: Corporate Office Heading',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: 'Corporate & Sales Office',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Legacy: Corporate Office Address',
      type: 'text',
      group: 'content',
      hidden: true,
      initialValue: 'Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
    }),
    defineField({
      name: 'manufacturingPlantHeading',
      title: 'Legacy: Plant Heading',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: 'Manufacturing Plant Unit',
    }),
    defineField({
      name: 'plantAddress',
      title: 'Legacy: Plant Address',
      type: 'text',
      group: 'content',
      hidden: true,
      initialValue: 'Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
    }),
    defineField({
      name: 'primaryPhone',
      title: 'Legacy: Primary Phone',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: '+91 94221 02425',
    }),
    defineField({
      name: 'email',
      title: 'Legacy: Email',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: 'info@vmgraphiteindustries.com',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Legacy: WhatsApp Number',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: '919422102425',
    }),
    defineField({
      name: 'whatsappButtonText',
      title: 'Legacy: WhatsApp Button Text',
      type: 'string',
      group: 'content',
      hidden: true,
      initialValue: 'WhatsApp Sales Desk',
    }),

    // ==========================================
    // ④ INQUIRY CONTACT FORM SETTINGS (Tab 2: Form)
    // ==========================================
    defineField({
      name: 'formBadge',
      title: '7. Form Pill Badge',
      description: 'Small badge above the form heading (Default: "Inquiry Desk").',
      type: 'string',
      group: 'form',
      initialValue: 'Inquiry Desk',
    }),
    defineField({
      name: 'formHeading',
      title: '8. Form Main Heading',
      description: 'Main heading above the interactive contact form (Default: "Send an Official Commercial Inquiry").',
      type: 'string',
      group: 'form',
      initialValue: 'Send an Official Commercial Inquiry',
    }),
    defineField({
      name: 'formSubtitle',
      title: '9. Form Subtitle Description',
      description: 'Subtitle description above the form fields.',
      type: 'string',
      group: 'form',
      initialValue: 'Fill out the details below. Our technical sales engineers respond within 2-4 business hours.',
    }),
    defineField({
      name: 'nameLabel',
      title: '10. Name Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Full Name',
    }),
    defineField({
      name: 'namePlaceholder',
      title: '11. Name Field Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'John Doe',
    }),
    defineField({
      name: 'companyLabel',
      title: '12. Company Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Company / Business Name',
    }),
    defineField({
      name: 'companyPlaceholder',
      title: '13. Company Field Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'Acme Manufacturing Ltd',
    }),
    defineField({
      name: 'emailLabel',
      title: '14. Email Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Official Email',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: '15. Email Field Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'john@acme.com',
    }),
    defineField({
      name: 'phoneLabel',
      title: '16. Phone Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Phone / Mobile Number',
    }),
    defineField({
      name: 'phonePlaceholder',
      title: '17. Phone Field Placeholder',
      type: 'string',
      group: 'form',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'subjectLabel',
      title: '18. Subject / Product Category Selector Label',
      type: 'string',
      group: 'form',
      initialValue: 'Subject / Area of Inquiry',
    }),
    defineField({
      name: 'subjectPlaceholder',
      title: '19. Selector Default Placeholder',
      type: 'string',
      group: 'form',
      initialValue: '-- Select Product Category / Inquiry Type --',
    }),
    defineField({
      name: 'subjectOptions',
      title: '20. Dropdown Selector Options (Add / Reorder As Desired)',
      description: 'Dropdown options for the visitor to select in the contact form.',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      initialValue: [
        'Graphite & Carbon Products',
        'Tapes & Sealing Solutions',
        'Industrial Blades & Materials',
        'Custom Material Synthesis / R&D Trial',
        'Bulk Commercial Export Inquiry',
        'Technical Datasheet / Sample Request',
        'Other Commercial Inquiry',
      ],
    }),
    defineField({
      name: 'messageLabel',
      title: '20. Message Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Detailed Message',
    }),
    defineField({
      name: 'messagePlaceholder',
      title: '21. Message Field Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'Please detail your industrial requirements, material grades, or annual volume estimates...',
    }),
    defineField({
      name: 'submitButtonText',
      title: '22. Submit Button Text',
      type: 'string',
      group: 'form',
      initialValue: 'Send Direct Message',
    }),
    defineField({
      name: 'submittingButtonText',
      title: '23. Submitting State Button Text',
      type: 'string',
      group: 'form',
      initialValue: 'Transmitting to info@vmgraphiteindustries.com...',
    }),
    defineField({
      name: 'formDisclaimerText',
      title: '24. Form Bottom Disclaimer Text',
      type: 'string',
      group: 'form',
      initialValue: 'All messages are dispatched to info@vmgraphiteindustries.com.',
    }),
    defineField({
      name: 'successHeading',
      title: '25. Success Message Heading',
      type: 'string',
      group: 'form',
      initialValue: 'Message Delivered!',
    }),
    defineField({
      name: 'successMessage',
      title: '26. Success Message Body',
      type: 'text',
      rows: 2,
      group: 'form',
      initialValue: 'Thank you for contacting VM Graphite Industries LLP. Your message has been routed to our corporate sales team.',
    }),
    defineField({
      name: 'whatsappFollowupButtonText',
      title: '27. WhatsApp Follow-up Button Text on Success',
      type: 'string',
      group: 'form',
      initialValue: 'WhatsApp Follow-up',
    }),
    defineField({
      name: 'resetButtonText',
      title: '28. Reset / New Message Button Text on Success',
      type: 'string',
      group: 'form',
      initialValue: 'Send Another Message',
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
