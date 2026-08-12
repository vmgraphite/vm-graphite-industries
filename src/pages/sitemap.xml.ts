import type { APIRoute } from 'astro';
import { getAllProducts, getCategories } from '../lib/data';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://vmgraphiteindustries.com';
  const products = await getAllProducts();
  const categories = await getCategories();

  const staticPages = ['', '/about', '/products', '/downloads', '/contact'];

  const productUrls = products.map((p) => `/products/${p.slug}`);
  const categoryUrls = categories.map((c) => `/products?category=${c.slug}`);

  const allUrls = [...staticPages, ...productUrls, ...categoryUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/products/') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
