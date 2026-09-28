import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const rawProjectId = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) || (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_PROJECT_ID) || '';
const rawDataset = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) || (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_DATASET) || '';
const rawApiVersion = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_API_VERSION) || (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_API_VERSION) || '2024-08-01';

const projectId = String(rawProjectId).trim().replace(/['"]/g, '');
const dataset = String(rawDataset).trim().toLowerCase().replace(/['"]/g, '');
const apiVersion = String(rawApiVersion).trim().replace(/['"]/g, '');

export const isSanityConfigured = Boolean(projectId && projectId !== 'your_sanity_project_id_here' && projectId !== 'demo_project_id');

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).auto('format').fit('max').url();
}
