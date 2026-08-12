export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    primaryPhone,
    secondaryPhone,
    whatsappNumber,
    email,
    officeAddress,
    plantAddress,
    googleMapsUrl,
    workingHours,
    "companyBrochureUrl": companyBrochure.asset->url
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubheadline,
    "heroImageUrl": heroImage.asset->url,
    primaryCtaText,
    secondaryCtaText,
    strengthsHeadline,
    capabilitiesHeadline,
    capabilitiesDescription,
    whyChooseUsHeadline,
    seo
  }
`;

export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0] {
    title,
    subtitle,
    "heroImageUrl": heroImage.asset->url,
    companyIntroduction,
    manufacturingHeading,
    manufacturingContent,
    qualityHeading,
    qualityContent,
    seo
  }
`;

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    displayOrder
  }
`;

export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    shortDescription,
    "mainImage": mainImage.asset->url,
    specifications,
    "productPdfUrl": productPdf.asset->url,
    isFeatured,
    displayOrder
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && isFeatured == true] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    shortDescription,
    "mainImage": mainImage.asset->url,
    specifications,
    "productPdfUrl": productPdf.asset->url,
    isFeatured,
    displayOrder
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    shortDescription,
    fullDescription,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    specifications,
    "productPdfUrl": productPdf.asset->url,
    isFeatured,
    displayOrder,
    seo,
    "relatedProducts": *[_type == "product" && category._ref == ^.category._ref && _id != ^._id][0..3] {
      name,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      "categoryName": category->name
    }
  }
`;

export const ALL_RESOURCES_QUERY = `
  *[_type == "resource"] | order(displayOrder asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url,
    category,
    isFeatured,
    displayOrder
  }
`;
