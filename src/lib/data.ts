import { sanityClient, isSanityConfigured } from './sanity.client';
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  DOWNLOADS_PAGE_QUERY,
  ALL_CATEGORIES_QUERY,
  ALL_PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  ALL_RESOURCES_QUERY,
} from './sanity.queries';
import {
  MOCK_SITE_SETTINGS,
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_RESOURCES,
  type Product,
  type Category,
  type ResourceItem,
  type SiteSettings,
} from './mockData';

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured || !sanityClient) {
    return MOCK_SITE_SETTINGS;
  }
  try {
    const data = await sanityClient.fetch(SITE_SETTINGS_QUERY);
    return data ? { ...MOCK_SITE_SETTINGS, ...data } : MOCK_SITE_SETTINGS;
  } catch (error) {
    console.warn('Error fetching site settings from Sanity, using fallback data:', error);
    return MOCK_SITE_SETTINGS;
  }
}

export async function getHomePageContent() {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }
  try {
    return await sanityClient.fetch(HOME_PAGE_QUERY);
  } catch (error) {
    return null;
  }
}

export async function getAboutPageContent() {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }
  try {
    return await sanityClient.fetch(ABOUT_PAGE_QUERY);
  } catch (error) {
    return null;
  }
}

export async function getContactPageContent() {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }
  try {
    return await sanityClient.fetch(CONTACT_PAGE_QUERY);
  } catch (error) {
    return null;
  }
}

export async function getDownloadsPageContent() {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }
  try {
    return await sanityClient.fetch(DOWNLOADS_PAGE_QUERY);
  } catch (error) {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured || !sanityClient) {
    return MOCK_CATEGORIES;
  }
  try {
    const data = await sanityClient.fetch(ALL_CATEGORIES_QUERY);
    return data && data.length > 0 ? data : MOCK_CATEGORIES;
  } catch (error) {
    console.warn('Error fetching categories from Sanity, using fallback data:', error);
    return MOCK_CATEGORIES;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured || !sanityClient) {
    return MOCK_PRODUCTS;
  }
  try {
    const data: Product[] = await sanityClient.fetch(ALL_PRODUCTS_QUERY);
    if (!data || data.length === 0) return MOCK_PRODUCTS;
    // Merge any products from MOCK_PRODUCTS that aren't yet in Sanity (e.g. newly added products)
    const existingSlugs = new Set(data.map((p) => p.slug));
    const extraMockProducts = MOCK_PRODUCTS.filter((p) => !existingSlugs.has(p.slug));
    return [...data, ...extraMockProducts];
  } catch (error) {
    console.warn('Error fetching products from Sanity, using fallback data:', error);
    return MOCK_PRODUCTS;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!found) return undefined;
    const related = MOCK_PRODUCTS.filter((p) => p.categorySlug === found.categorySlug && p.slug !== found.slug).slice(0, 3);
    return {
      ...found,
      relatedProducts: related.map((r) => ({
        name: r.name,
        slug: r.slug,
        mainImage: r.mainImage,
        categoryName: r.categoryName,
      })),
    };
  }
  try {
    const data = await sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    if (data) return data;
    // fallback if not found in Sanity
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  } catch (error) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  }
}

export async function getResources(): Promise<ResourceItem[]> {
  if (!isSanityConfigured || !sanityClient) {
    return MOCK_RESOURCES;
  }
  try {
    const data = await sanityClient.fetch(ALL_RESOURCES_QUERY);
    return data && data.length > 0 ? data : MOCK_RESOURCES;
  } catch (error) {
    return MOCK_RESOURCES;
  }
}
