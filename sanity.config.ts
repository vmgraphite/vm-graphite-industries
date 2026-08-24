import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) || process.env.PUBLIC_SANITY_PROJECT_ID || 'twycammz';
const dataset = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) || process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'vm-graphite-studio',
  title: 'VM Graphite Industries Studio',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content Manager')
          .items([
            // 1. Home Page
            S.listItem()
              .title('1. Home Page Content')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            // 2. About Us Page
            S.listItem()
              .title('2. About Us Page Content')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

            // 3. Contact Us Page
            S.listItem()
              .title('3. Contact Us Page Content')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),

            // 4. Header & Footer Settings
            S.listItem()
              .title('4. Header & Footer Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            // Collections
            S.documentTypeListItem('product').title('5. Products Catalog'),
            S.documentTypeListItem('category').title('6. Product Categories'),
            S.documentTypeListItem('resource').title('7. Downloads & Brochures'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
