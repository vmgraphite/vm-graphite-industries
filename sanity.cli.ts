import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: String(process.env.PUBLIC_SANITY_PROJECT_ID || '').trim().replace(/['"]/g, ''),
    dataset: String(process.env.PUBLIC_SANITY_DATASET || '').trim().toLowerCase().replace(/['"]/g, ''),
  },
});
