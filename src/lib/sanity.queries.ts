export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url,
    "companyBrochureUrl": companyBrochure.asset->url,
    hideAllSpecifications,
    headerTickerText,
    primaryPhone,
    workingHours,
    whatsappNumber,
    headerWhatsappText,
    headerQuoteButtonText,
    headerNavItems,
    footerTagline,
    footerDownloadButtonText,
    footerLocationHeading,
    footerLocations,
    corporateOfficeTitle,
    officeAddress,
    footerPhone,
    plantTitle,
    plantAddress,
    email,
    footerCopyrightText,
    footerBadgeText
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubheadline,
    primaryCtaText,
    secondaryCtaText,
    coreCapabilities,
    "heroProducts": heroProducts[]->{
      _id,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      shortDescription,
      "mainImage": mainImage.asset->url,
      specifications,
      hideSpecifications
    },
    metrics,
    categoriesSectionBadge,
    categoriesSectionTitle,
    categoriesSectionDescription,
    categoriesButtonText,
    categoriesCardLinkText,
    "featuredCategories": featuredCategories[]->{
      _id,
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      displayOrder
    },
    manufactureSectionBadge,
    manufactureSectionTitle,
    manufactureSectionDescription,
    manufactureButtonText,
    manufactureCardLinkText,
    "manufactureShowcaseProducts": manufactureShowcaseProducts[]->{
      _id,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      shortDescription,
      "mainImage": mainImage.asset->url,
      specifications,
      hideSpecifications
    },
    capabilitiesBadge,
    capabilitiesHeadline,
    capabilitiesDescription,
    facilityStat1Number,
    facilityStat1Label,
    facilityStat2Number,
    facilityStat2Label,
    capabilitiesSteps,
    whyChooseUsBadge,
    whyChooseUsHeadline,
    whyChooseUsSubtitle,
    strengthsList,
    brochureBadge,
    brochureTitle,
    brochureDescription,
    brochureFeatures,
    brochureCardTag,
    brochureCardTitle,
    brochureCardSubtitle,
    brochureButtonText,
    brochureSecondaryButtonText,
    brochureCardCertText,
    seo
  }
`;

export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0] {
    headerBadge,
    title,
    subtitle,
    aimHeading,
    aimQuote,
    whoWeAreBadge,
    manufacturingHeading,
    "heroImageUrl": coalesce(heroImage.asset->url, plantImage.asset->url),
    plantHubTag,
    plantLocation,
    plantEstTag,
    companyIntroduction,
    leadershipLabel,
    leadershipTitle,
    leadershipSubtitle,
    innovationLabel,
    innovationTitle,
    innovationSubtitle,
    capacityBadge,
    capacityStatement,
    qualityBadge,
    qualityHeading,
    qualitySubtitle,
    qualityPillars,
    brochureBadge,
    brochureTitle,
    brochureDescription,
    brochureFeatures,
    brochureCardTag,
    brochureCardTitle,
    brochureCardSubtitle,
    brochureButtonText,
    brochureSecondaryButtonText,
    brochureCardCertText,
    seo
  }
`;

export const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage"][0] {
    badge,
    title,
    subtitle,
    locationsSectionBadge,
    locationsSectionHeading,
    locationsSectionSubtitle,
    locations,
    directCommHeading,
    contactChannels,
    corporateOfficeHeading,
    officeAddress,
    manufacturingPlantHeading,
    plantAddress,
    primaryPhone,
    email,
    whatsappNumber,
    whatsappButtonText,
    formBadge,
    formHeading,
    formSubtitle,
    nameLabel,
    namePlaceholder,
    companyLabel,
    companyPlaceholder,
    emailLabel,
    emailPlaceholder,
    phoneLabel,
    phonePlaceholder,
    subjectLabel,
    subjectPlaceholder,
    subjectOptions,
    messageLabel,
    messagePlaceholder,
    submitButtonText,
    submittingButtonText,
    formDisclaimerText,
    successHeading,
    successMessage,
    whatsappFollowupButtonText,
    resetButtonText,
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
    hideSpecifications,
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
    hideSpecifications,
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
    hideSpecifications,
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

export const DOWNLOADS_PAGE_QUERY = `
  *[_type == "downloadsPage"][0] {
    badge,
    title,
    subtitle,
    allTabLabel,
    catalogTabLabel,
    brochureTabLabel,
    datasheetTabLabel,
    certificationTabLabel,
    emptyStateHeading,
    emptyStateText,
    ctaBadge,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    seo
  }
`;

export const ALL_RESOURCES_QUERY = `
  *[_type == "resource"] | order(displayOrder asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url,
    category,
    fileSize,
    buttonText,
    isFeatured,
    displayOrder
  }
`;
