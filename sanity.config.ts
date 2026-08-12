import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'demo_project_id';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

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
          .title('Content Management')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings & Contact Info')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            // Singleton: Home Page
            S.listItem()
              .title('Home Page Content')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            // Singleton: About Page
            S.listItem()
              .title('About Us Content')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

            S.divider(),

            // Collections
            S.documentTypeListItem('category').title('Product Categories'),
            S.documentTypeListItem('product').title('Products Catalog'),
            S.documentTypeListItem('resource').title('Downloads & Brochures'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
