export interface SpecRow {
  name: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  gallery?: string[];
  specifications: SpecRow[];
  hideSpecifications?: boolean;
  productPdfUrl?: string;
  isFeatured?: boolean;
  displayOrder: number;
  relatedProducts?: {
    name: string;
    slug: string;
    mainImage: string;
    categoryName: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
}

export interface ResourceItem {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  category: "brochure" | "catalog" | "datasheet" | "certification";
  isFeatured?: boolean;
  displayOrder: number;
}

export interface LocationItem {
  title: string;
  badge?: string;
  address: string;
  phone?: string;
  email?: string;
  googleMapsUrl?: string;
}

export interface ContactChannelItem {
  title: string;
  type: 'phone' | 'email' | 'whatsapp' | 'custom' | string;
  value: string;
  subtext?: string;
  customUrl?: string;
}

export interface SiteSettings {
  contactTitle?: string;
  contactSubtitle?: string;
  companyName: string;
  tagline: string;
  primaryPhone: string;
  secondaryPhone?: string;
  whatsappNumber: string;
  email: string;
  officeAddress: string;
  plantAddress: string;
  googleMapsUrl?: string;
  workingHours?: string;
  logoUrl?: string;
  companyBrochureUrl?: string;
  headerTickerText?: string;
  headerWhatsappText?: string;
  headerQuoteButtonText?: string;
  headerNavItems?: Array<{
    name: string;
    href: string;
    hasDropdown?: boolean;
    hide?: boolean;
  }>;
  footerTagline?: string;
  footerDownloadButtonText?: string;
  footerLocationHeading?: string;
  footerLocations?: LocationItem[];
  corporateOfficeTitle?: string;
  footerPhone?: string;
  plantTitle?: string;
  footerCopyrightText?: string;
  footerBadgeText?: string;
  hideAllSpecifications?: boolean;
}

export const MOCK_SITE_SETTINGS: SiteSettings = {
  companyName: "VM Graphite Industries LLP",
  tagline:
    "Delivering Premium Graphite Solutions with Unmatched Quality and Speed",
  primaryPhone: "+91 94221 02425",
  secondaryPhone: "+91 11 2345 6789",
  whatsappNumber: "919422102425",
  email: "info@vmgraphiteindustries.com",
  officeAddress:
    "Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India",
  plantAddress:
    "Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India",
  googleMapsUrl: "https://maps.google.com/?q=Industrial+Area+Phase+2+New+Delhi",
  workingHours: "Mon - Sat: 9:00 AM - 6:30 PM IST",
  logoUrl: "/images/logo.png",
  companyBrochureUrl: "/docs/VM_Graphite_Corporate_Brochure.pdf",
  headerTickerText: "ISO 9001:2015 Certified High-Purity Graphite Manufacturer",
  headerWhatsappText: "WhatsApp",
  headerQuoteButtonText: "Request Quote",
  headerNavItems: [
    { name: 'Home', href: '/', hasDropdown: false, hide: false },
    { name: 'About', href: '/about', hasDropdown: false, hide: false },
    { name: 'Products', href: '/products', hasDropdown: true, hide: false },
    { name: 'Downloads', href: '/downloads', hasDropdown: false, hide: false },
    { name: 'Contact', href: '/contact', hasDropdown: false, hide: false },
  ],
  footerTagline: "Premier manufacturer and exporter of high-density graphite solutions for metallurgical, coating, and severe-duty manufacturing processes.",
  footerDownloadButtonText: "Download Brochure",
  footerLocationHeading: "Factory & Corporate Locations",
  footerLocations: [
    {
      title: "Corporate Office",
      badge: "Corporate HQ",
      address: "Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India",
      phone: "+91 94221 02425",
      email: "info@vmgraphiteindustries.com",
    },
    {
      title: "Manufacturing Plant",
      badge: "Manufacturing Unit",
      address: "Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India",
      phone: "+91 94221 02425",
      email: "info@vmgraphiteindustries.com",
    },
  ],
  corporateOfficeTitle: "Corporate Office",
  footerPhone: "+91 94221 02425",
  plantTitle: "Manufacturing Plant",
  footerCopyrightText: "© {year} VM Graphite Industries LLP. All rights reserved.",
  footerBadgeText: "A Complete Solution For Coating & Metalizer",
};

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: "cat-1",
    name: "Graphite & Carbon Products",
    slug: "graphite-carbon-products",
    description:
      "High-purity synthetic & natural graphite crucibles, machined rods, colloidal suspensions, packing, and high-temp components for metallurgical and chemical applications.",
    image: "/images/categories/graphite-carbon.jpg",
    displayOrder: 1,
  },
  {
    _id: "cat-2",
    name: "Tapes & Sealing Solutions",
    slug: "tapes-sealing-solutions",
    description:
      "High-performance flexible graphite foil tapes, cork tapes, holographic doctor blade tapes, and specialized end seal gaskets engineered for severe industrial environments.",
    image: "/images/categories/tapes-sealing.jpg",
    displayOrder: 2,
  },
  {
    _id: "cat-3",
    name: "Industrial Blades & Materials",
    slug: "industrial-blades-materials",
    description:
      "Precision carbon steel & polymer doctor blades, heat-resistant fiberglass cloth laminates, and high-purity boron suspension lubricants for flexographic & gravure printing lines.",
    image: "/images/categories/blades-materials.jpg",
    displayOrder: 3,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "prod-1",
    name: "Graphite Suspension",
    slug: "graphite-suspension",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Colloidal aqueous and solvent-based graphite dispersion engineered for high-temperature forging die lubrication and conductive metal coating applications.",
    fullDescription:
      "VM Graphite Suspension is a stable, ultra-fine micro-crystalline graphite formulation suspended in specialized fluid carriers. It forms a uniform, tenacious dry lubricant film on die cavities and metallic substrates operating at extreme thermal stress. Designed to minimize die wear, eliminate thermo-cracking, and ensure clean casting release.",
    mainImage: "/images/products/colloidal-graphite-dispersion.jpg",
    gallery: [
      "/images/products/graphite-suspension-swirl.jpg",
      "/images/products/graphite-dispersion-pour.jpg",
      "/images/products/graphite-dispersion-splash.jpg",
      "/images/products/graphite-suspension-thick.jpg"
    ],
    specifications: [
      { name: "Graphite Purity", value: "≥ 99.5% Carbon" },
      { name: "Particle Size (D90)", value: "< 5.0 µm" },
      { name: "Carrier Base", value: "Aqueous / Synthetic Oil Option" },
      { name: "Max Operating Temp", value: "1100°C (Inert) / 450°C (Air)" },
      { name: "Specific Gravity", value: "1.12 - 1.18 g/cm³" },
      { name: "Viscosity (Ford Cup #4)", value: "22 - 30 seconds" },
    ],
    productPdfUrl: "/docs/Graphite_Suspension_Datasheet.pdf",
    isFeatured: true,
    displayOrder: 1,
    seoTitle: "Graphite Suspension Manufacturer | VM Graphite Industries",
    seoDescription:
      "High-purity colloidal graphite suspension for die forging lubricants and thermal conductive coatings. Custom formulation available.",
  },
  {
    _id: "prod-2",
    name: "Graphite Crucibles",
    slug: "graphite-crucibles",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Isostatically pressed silicon-carbide bonded graphite crucibles crafted for melting non-ferrous alloys, copper, brass, aluminum, and precious metals.",
    fullDescription:
      "Engineered using high-density isostatic pressing, VM Graphite Crucibles deliver exceptional thermal conductivity, outstanding mechanical strength, and superior resistance to chemical oxidation and flux erosion. Ideal for induction and fuel-fired tilting furnaces across foundry operations.",
    mainImage: "/images/products/graphite-crucibles-cups.jpg",
    gallery: [
      "/images/products/graphite-crucibles.jpg"
    ],
    specifications: [
      { name: "Material Grade", value: "Iso-Pressed Clay / SiC-Graphite" },
      { name: "Bulk Density", value: "1.85 - 1.95 g/cm³" },
      { name: "Thermal Conductivity", value: "140 W/m·K" },
      { name: "Refractoriness / Max Temp", value: "1650°C" },
      {
        name: "Melting Applications",
        value: "Copper, Brass, Bronze, Aluminum, Gold",
      },
      {
        name: "Standard Capacity Range",
        value: "1 kg to 1000 kg Liquid Metal",
      },
    ],
    productPdfUrl: "/docs/Graphite_Crucibles_Specs.pdf",
    isFeatured: true,
    displayOrder: 2,
    seoTitle: "Isostatic Graphite Crucibles | VM Graphite Industries",
    seoDescription:
      "High-density SiC graphite crucibles for non-ferrous foundry melting. High thermal shock resistance and long service life.",
  },
  {
    _id: "prod-3",
    name: "Graphite Sheet",
    slug: "graphite-sheets-rods",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Flexible expanded graphite sheets and rolls for high-temperature sealing gaskets, thermal heat spreaders, and furnace linings.",
    fullDescription:
      "High-purity expanded flexible graphite sheets and rolls precision calendered from natural crystalline flake graphite. Offering exceptional compressibility, superior recovery, low creep relaxation, and total chemical inertness against aggressive industrial media.",
    mainImage: "/images/products/graphite-sheet-roll.jpg",
    gallery: [
      "/images/products/graphite-sheets-plates.jpg",
      "/images/products/graphite-sheets-rods.jpg"
    ],
    specifications: [
      { name: "Carbon Content", value: "≥ 99.0% - 99.9%" },
      { name: "Sheet Density", value: "1.0 - 1.1 g/cm³" },
      { name: "Compressibility", value: "40% - 50%" },
      { name: "Recovery", value: "≥ 10%" },
      { name: "Tensile Strength", value: "≥ 5.0 MPa" },
      { name: "Ash Content", value: "< 0.5%" },
    ],
    productPdfUrl: "/docs/Graphite_Sheets_Rods_Catalog.pdf",
    isFeatured: true,
    displayOrder: 3,
    seoTitle: "High-Purity Flexible Graphite Sheet & Roll | VM Graphite",
    seoDescription:
      "Flexible expanded graphite sheet and roll for thermal insulation, heat spreaders, and high-temp industrial gaskets.",
  },
  {
    _id: "prod-4",
    name: "Graphite Sleeves",
    slug: "graphite-sleeves",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Custom machined graphite cylindrical sleeves and bushings designed for high-temperature pumps, continuous casting dies, and thermal barriers.",
    fullDescription:
      "Self-lubricating graphite sleeves precision turned to tight dimensional tolerances. Resistant to molten metal wetting and chemical corrosion, offering reliable performance under dry-running or boundary lubrication conditions.",
    mainImage: "/images/products/graphite-sleeves-machined.jpg",
    gallery: [
      "/images/products/graphite-sleeves-machined-2.jpg",
      "/images/products/graphite-sleeves-tubes.jpg",
      "/images/products/graphite-tubes-long.jpg"
    ],
    specifications: [
      { name: "Material Base", value: "Synthetic Machined Graphite" },
      { name: "Flexural Strength", value: "35 - 48 MPa" },
      { name: "Thermal Expansion Coeff", value: "4.2 × 10⁻⁶ / K" },
      { name: "Max Operating Temp", value: "2800°C (Vacuum / Inert Gas)" },
      { name: "Machining Tolerance", value: "± 0.02 mm" },
    ],
    productPdfUrl: "/docs/Graphite_Sleeves_Technical.pdf",
    isFeatured: true,
    displayOrder: 4,
    seoTitle: "Machined Graphite Sleeves & Bushings | VM Graphite",
    seoDescription:
      "Self-lubricating synthetic graphite sleeves for high-temp industrial pumps and continuous casting machines.",
  },
  {
    _id: "prod-5",
    name: "Graphite Gland Rope / Packing",
    slug: "graphite-gland-rope",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Braided expanded flexible graphite gland packing reinforced with Inconel or nickel wire for valve stems and high-pressure steam pumps.",
    fullDescription:
      "VM Flexible Graphite Gland Rope is inter-braided from high-purity expanded graphite yarn. It features exceptionally low friction, self-lubricating properties, and superior thermal conductivity. Corrosion inhibitors integrated into the packing protect valve stems from pitting.",
    mainImage: "/images/products/graphite-gland-packing-ring.jpg",
    gallery: [
      "/images/products/white-gland-packing.jpg",
      "/images/products/graphite-gland-rope.jpg"
    ],
    specifications: [
      {
        name: "Reinforcement Wire",
        value: "Inconel 600 / Stainless Steel / Cotton",
      },
      { name: "Pressure Rating (Valves)", value: "Up to 300 Bar" },
      { name: "Pressure Rating (Pumps)", value: "Up to 30 Bar" },
      { name: "pH Range", value: "0 - 14 (Except Strong Oxidizers)" },
      { name: "Shaft Speed", value: "20 m/s" },
      { name: "Temperature Limits", value: "-200°C to +650°C (Steam)" },
    ],
    productPdfUrl: "/docs/Graphite_Gland_Packing_Datasheet.pdf",
    isFeatured: false,
    displayOrder: 5,
    seoTitle: "Expanded Graphite Gland Rope & Packing | High Pressure",
    seoDescription:
      "Inconel wire reinforced flexible graphite gland rope packing for high-pressure valves, boilers, and high-temp pumps.",
  },

  // 2. Tapes & Sealing Solutions
  {
    _id: "prod-6",
    name: "Graphite Foil Tape",
    slug: "graphite-foil-tape",
    categorySlug: "tapes-sealing-solutions",
    categoryName: "Tapes & Sealing Solutions",
    shortDescription:
      "Self-adhesive corrugated flexible expanded graphite foil tape designed for instant valve stem packing and spiral wound gasket manufacturing.",
    fullDescription:
      "VM Graphite Foil Tape is manufactured from 99% pure flexible graphite sheet with a pressure-sensitive adhesive backing. Featuring crinkled/corrugated pattern options, it allows easy wrapping around small and large valve stems, creating an immediate seal under compression.",
    mainImage: "/images/products/graphite-foil-tape-pallet.jpg",
    gallery: [
      "/images/products/graphite-strip-spools.jpg",
      "/images/products/graphite-foil-tape.jpg"
    ],
    specifications: [
      { name: "Carbon Content", value: "≥ 99.0%" },
      { name: "Standard Thickness", value: "0.38 mm, 0.50 mm" },
      { name: "Standard Widths", value: "10 mm, 12 mm, 15 mm, 20 mm, 25 mm" },
      { name: "Adhesive Type", value: "Self-Adhesive Synthetic Backing" },
      { name: "Operating Temp (Air)", value: "-200°C to +450°C" },
      { name: "Sulfur Content", value: "< 1000 ppm" },
    ],
    productPdfUrl: "/docs/Graphite_Foil_Tape_Data.pdf",
    isFeatured: true,
    displayOrder: 6,
    seoTitle: "Adhesive Flexible Graphite Foil Tape | Industrial Sealing",
    seoDescription:
      "Self-adhesive expanded graphite foil tape for valve stem packing and spiral wound gaskets. High thermal stability.",
  },
  {
    _id: "prod-7",
    name: "Cork Tape",
    slug: "cork-tape",
    categorySlug: "tapes-sealing-solutions",
    categoryName: "Tapes & Sealing Solutions",
    shortDescription:
      "Rubber-bonded cork sealing tape providing anti-vibration damping, insulation, and moisture sealing for HVAC and industrial piping.",
    fullDescription:
      "Made from high-grade natural cork granules combined with elastomer binders. VM Cork Tape forms an effective thermal barrier, prevents condensation sweating on chilled liquid pipes, and delivers durable anti-vibration sealing across refrigeration systems.",
    mainImage: "/images/products/cork-tape.jpg",
    specifications: [
      {
        name: "Material Formulation",
        value: "Natural Granulated Cork + NBR Rubber",
      },
      { name: "Density", value: "0.55 - 0.65 g/cm³" },
      { name: "Thermal Conductivity", value: "0.07 W/m·K" },
      {
        name: "Standard Roll Dimensions",
        value: "50 mm Wide × 3 mm Thick × 10 m Long",
      },
      { name: "Operating Temperature", value: "-30°C to +110°C" },
    ],
    productPdfUrl: "/docs/Cork_Tape_Datasheet.pdf",
    isFeatured: false,
    displayOrder: 7,
    seoTitle: "Rubber Bonded Cork Sealing Tape | HVAC Insulation",
    seoDescription:
      "Anti-vibration rubber bonded cork tape for pipe insulation, HVAC anti-sweat wrapping, and industrial gasket sealing.",
  },
  {
    _id: "prod-8",
    name: "Holography Tape",
    slug: "holography-tape",
    categorySlug: "tapes-sealing-solutions",
    categoryName: "Tapes & Sealing Solutions",
    shortDescription:
      "Precision polyester holographic sealing & mounting tape tailored for gravure cylinder prep, flexographic plate mounting, and security packaging.",
    fullDescription:
      "High-tack acrylic adhesive coated holographic film designed for rigid holding without residue upon removal. Engineered for exact registration in web printing, holographic foil stamping, and packaging roll sealing.",
    mainImage: "/images/products/holography-tape.jpg",
    specifications: [
      { name: "Carrier Film", value: "Metallized PET Holographic Film" },
      { name: "Total Thickness", value: "45 µm - 75 µm" },
      { name: "Adhesive System", value: "Solvent Acrylic High-Tack" },
      { name: "Adhesion to Steel", value: "≥ 12 N/25mm" },
      { name: "Peel Residue", value: "Zero Clean Removal" },
    ],
    productPdfUrl: "/docs/Holography_Tape_Specs.pdf",
    isFeatured: false,
    displayOrder: 8,
    seoTitle: "Industrial Holography & Mounting Tape | Printing Solutions",
    seoDescription:
      "Precision holographic mounting tape for flexo plate positioning, gravure cylinder preparation, and secure foil stamping.",
  },
  {
    _id: "prod-9",
    name: "End Seals",
    slug: "end-seals",
    categorySlug: "tapes-sealing-solutions",
    categoryName: "Tapes & Sealing Solutions",
    shortDescription:
      "Molded felt, rubber, and felt-graphite hybrid end seal gaskets engineered for flexographic ink chambers and gravure doctor blade assemblies.",
    fullDescription:
      "VM End Seals are CNC-cut to exact OEM chamber profiles. Fabricated from lubricated wool felt, EPDM, polyurethane, and micro-graphite soaked felt to ensure leak-free ink containment at high web speeds while prolonging anilox roll longevity.",
    mainImage: "/images/products/custom-end-seals.jpg",
    gallery: [
      "/images/products/end-seals.jpg"
    ],
    specifications: [
      {
        name: "Material Options",
        value: "Graphite-Impregnated Felt / Polyurethane / EPDM",
      },
      { name: "Hardness (Rubber)", value: "65 - 80 Shore A" },
      {
        name: "Chemical Resistance",
        value: "Water-based, Solvent, & UV Flexo Inks",
      },
      { name: "OEM Fitment", value: "Custom Machined to Chamber Drawings" },
      { name: "Friction Coefficient", value: "< 0.15 (Graphite Coated)" },
    ],
    productPdfUrl: "/docs/End_Seals_Catalog.pdf",
    isFeatured: true,
    displayOrder: 9,
    seoTitle: "Flexographic Chamber End Seals | VM Graphite",
    seoDescription:
      "Precision graphite-impregnated felt and rubber end seal gaskets for flexo ink chamber systems. OEM custom profiles available.",
  },

  // 3. Industrial Blades & Materials
  {
    _id: "prod-10",
    name: "Carbon Steel Doctor Blades",
    slug: "carbon-steel-doctor-blades",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Refined Swedish carbon steel doctor blades with bevel and lamella edge profiles for crisp ink metering in flexo and gravure printing presses.",
    fullDescription:
      "Manufactured from high-purity European carbon strip steel with micro-homogenous carbide microstructure. Delivers consistent blade-to-anilox contact, eliminates hazing, and minimizes wear on chrome and ceramic anilox rollers.",
    mainImage: "/images/products/carbon-steel-doctor-blades.jpg",
    specifications: [
      {
        name: "Steel Grade",
        value: "High Carbon European Strip Steel (C1095)",
      },
      { name: "Tensile Strength", value: "1950 - 2100 N/mm²" },
      { name: "Vickers Hardness", value: "580 - 620 HV" },
      {
        name: "Edge Profiles",
        value: "Lamella (0.07mm - 0.10mm tip) / Bevel (15° - 30°)",
      },
      {
        name: "Standard Thicknesses",
        value: "0.15 mm, 0.20 mm, 0.25 mm, 0.30 mm",
      },
      { name: "Straightness Tolerance", value: "0.6 mm per 3000 mm" },
    ],
    productPdfUrl: "/docs/Carbon_Steel_Doctor_Blades.pdf",
    isFeatured: true,
    displayOrder: 10,
    seoTitle: "Carbon Steel Doctor Blades | Flexo & Gravure Metering",
    seoDescription:
      "High-tensile carbon steel doctor blades with precision lamella and bevel edges for printing press ink metering.",
  },
  {
    _id: "prod-11",
    name: "Polymer Doctor Blades",
    slug: "polymer-doctor-blades",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Heavy-duty UHMW-PE and composite polyester doctor blades engineered for containment in flexo chambers and corrugated board printing.",
    fullDescription:
      "Corrosion-proof synthetic polymer doctor blades designed as durable containment blades. Engineered to prevent operator knife injuries, avoid anilox scoring, and outlast traditional steel blades by 3x to 5x in abrasive ink environments.",
    mainImage: "/images/products/orange-polymer-doctor-blade.jpg",
    gallery: [
      "/images/products/polymer-doctor-blades.jpg"
    ],
    specifications: [
      {
        name: "Material Formulation",
        value: "Virgin UHMW-PE / Reinforced Polyester Composite",
      },
      { name: "Standard Thickness", value: "1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm" },
      { name: "Edge Geometry", value: "30° Bevel / Step Lamella" },
      {
        name: "Chemical Inertness",
        value: "100% Resistant to Solvent & Water Inks",
      },
      { name: "Anilox Wear Index", value: "Zero Scoring" },
    ],
    productPdfUrl: "/docs/Polymer_Doctor_Blades_Specs.pdf",
    isFeatured: false,
    displayOrder: 11,
    seoTitle: "UHMW Polymer Doctor Blades | Corrugated & Flexo Printing",
    seoDescription:
      "Durable UHMW polymer containment blades for corrugated printing & flexographic ink chambers. Safe & long lasting.",
  },
  {
    _id: "prod-12",
    name: "Fiber Glass Cloth",
    slug: "fiber-glass-cloth",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Woven E-glass fiberglass fabric impregnated with PTFE or silicone resin for high-temperature conveyor belts and thermal insulation jackets.",
    fullDescription:
      "High-tensile woven fiberglass cloth featuring exceptional thermal resistance up to 550°C. Non-combustible, chemically resistant, and widely utilized for expansion joints, welding blankets, pipe insulation wraps, and composite reinforcements.",
    mainImage: "/images/products/fiber-glass-cloth.jpg",
    specifications: [
      { name: "Glass Type", value: "E-Glass Continuous Filament" },
      { name: "Weave Pattern", value: "Plain / Twill / Satin Weave" },
      { name: "Weight Range", value: "200 g/m² to 1000 g/m²" },
      { name: "Operating Temp", value: "-70°C to +550°C" },
      {
        name: "Coating Options",
        value: "Uncoated / PTFE / Vermiculite / Silicone",
      },
      { name: "Standard Widths", value: "1000 mm, 1200 mm, 1500 mm" },
    ],
    productPdfUrl: "/docs/Fiber_Glass_Cloth_Data.pdf",
    isFeatured: false,
    displayOrder: 12,
    seoTitle: "Woven Fiber Glass Cloth & PTFE Fabric | Heat Shielding",
    seoDescription:
      "High-temperature E-glass fiberglass cloth for thermal insulation jackets, expansion joints, and welding protection.",
  },
  {
    _id: "prod-13",
    name: "Boron Suspension",
    slug: "boron-suspension",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Hexagonal Boron Nitride (h-BN) high-purity liquid suspension coating for aluminum extrusion dies, glass molding, and metal non-wetting release.",
    fullDescription:
      'VM Boron Suspension (often termed "White Graphite") is a premium inorganic formulation containing micronized hexagonal boron nitride particles. It forms an inert release layer that prevents molten aluminum, glass, and titanium from adhering to molds and extrusion tooling at temperatures exceeding 900°C in air.',
    mainImage: "/images/products/boron-suspension.jpg",
    specifications: [
      { name: "Active Chemical", value: "Hexagonal Boron Nitride (h-BN)" },
      { name: "h-BN Purity", value: "≥ 99.2%" },
      { name: "Particle Size", value: "1.5 - 3.0 µm" },
      { name: "Max Operating Temp (Air)", value: "900°C" },
      { name: "Max Operating Temp (Vacuum)", value: "2000°C" },
      {
        name: "Non-Wetting Behavior",
        value: "Complete Inertness to Molten Al & Mg",
      },
    ],
    productPdfUrl: "/docs/Boron_Suspension_Datasheet.pdf",
    isFeatured: true,
    displayOrder: 13,
    seoTitle:
      "Boron Nitride Liquid Suspension (White Graphite) | Release Coating",
    seoDescription:
      "Hexagonal Boron Nitride (h-BN) liquid release coating for aluminum extrusions, glass molding, and high-temp lubricants.",
  },
  {
    _id: "prod-14",
    name: "SS Doctor Blades",
    slug: "ss-doctor-blades",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "High-corrosion-resistant Stainless Steel (SS) doctor blades engineered for water-based flexographic printing inks and corrosive fluid metering.",
    fullDescription:
      "VM Stainless Steel (SS) Doctor Blades are precision manufactured from premium surgical-grade stainless steel. Specially engineered to combat blade oxidation, pitting, and acid corrosion when operating with water-based flexo inks, aggressive coatings, and high-pH fluid solutions.",
    mainImage: "/images/products/ss-doctor-blade-strip.jpg",
    gallery: [
      "/images/products/ss-doctor-blades.jpg"
    ],
    specifications: [
      {
        name: "Material Grade",
        value: "Martensitic Stainless Steel (AISI 420)",
      },
      { name: "Tensile Strength", value: "1800 - 1980 N/mm²" },
      { name: "Vickers Hardness", value: "570 - 600 HV" },
      { name: "Edge Geometry", value: "Lamella Tip (0.07mm - 0.10mm) / Bevel" },
      {
        name: "Corrosion Resistance",
        value: "100% Resistant to Acid & Water Inks",
      },
      { name: "Standard Thicknesses", value: "0.15 mm, 0.20 mm, 0.25 mm" },
    ],
    productPdfUrl: "/docs/Carbon_Steel_Doctor_Blades.pdf",
    isFeatured: true,
    displayOrder: 14,
    seoTitle: "Stainless Steel Doctor Blades | Corrosion Resistant Metering",
    seoDescription:
      "Premium stainless steel doctor blades designed for water-based flexo inks, preventing corrosion and anilox scoring.",
  },
  {
    _id: "prod-15",
    name: "Magnetic Ink Mixing Roller",
    slug: "magnetic-ink-mixing-roller",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Heavy-duty magnetic core ink fountain mixing rollers designed for continuous ink agitation in gravure and flexographic press ink pans.",
    fullDescription:
      "VM Magnetic Ink Mixing Rollers utilize high-coercivity rare earth magnetic cores enclosed within chemical-resistant metallic tubing. They automatically travel back and forth inside printing press ink trays to prevent pigment settlement, ink skinning, and temperature stratification.",
    mainImage: "/images/products/magnetic-ink-mixing-roller.jpg",
    specifications: [
      { name: "Core Type", value: "Neodymium Permanent Magnet Core" },
      { name: "Outer Sheath", value: "Stainless Steel 316 / PTFE Coated" },
      { name: "Standard Diameters", value: "25 mm, 32 mm, 40 mm" },
      { name: "Length Range", value: "300 mm to 1800 mm (Custom Cut)" },
      {
        name: "Chemical Compatibility",
        value: "Solvent, Water & UV Curable Inks",
      },
    ],
    productPdfUrl: "/docs/VM_Graphite_Corporate_Catalog_2026.pdf",
    isFeatured: true,
    displayOrder: 15,
    seoTitle: "Magnetic Ink Mixing Roller | Printing Fountain Agitators",
    seoDescription:
      "High-power magnetic ink mixing rollers for uniform printing ink agitation, eliminating pigment settling in flexo and gravure pans.",
  },
  {
    _id: "prod-16",
    name: "Rope Ink Mixing Roller",
    slug: "rope-ink-mixing-roller",
    categorySlug: "industrial-blades-materials",
    categoryName: "Industrial Blades & Materials",
    shortDescription:
      "Spiral rope-wound ink mixing rollers engineered for uniform ink distribution and anti-skinning fluid flow across printing press fountains.",
    fullDescription:
      "VM Rope Ink Mixing Rollers feature a continuous spiral rope winding over an aluminum/steel core. As the roller rotates, the spiraled rope surface continuously moves ink across the length of the fountain pan, preventing localized drying, color variation, and viscosity spikes.",
    mainImage: "/images/products/rope-mixing-rollers.jpg",
    gallery: [
      "/images/products/rope-ink-mixing-roller.jpg"
    ],
    specifications: [
      { name: "Winding Material", value: "Solvent-Resistant Synthetic Rope" },
      {
        name: "Core Construction",
        value: "Extruded Aluminum / Stainless Steel",
      },
      { name: "Standard Diameters", value: "30 mm, 38 mm, 50 mm" },
      { name: "Max Operating Temp", value: "120°C" },
      { name: "Fountain Width Compatibility", value: "Up to 2200 mm" },
    ],
    productPdfUrl: "/docs/VM_Graphite_Corporate_Catalog_2026.pdf",
    isFeatured: true,
    displayOrder: 16,
    seoTitle: "Rope Ink Mixing Roller | Printing Press Fountain Rollers",
    seoDescription:
      "Spiral rope-wound ink mixing rollers for printing press ink pans. Ensures uniform ink circulation and prevents skinning.",
  },
  {
    _id: "prod-17",
    name: "Graphite Rod",
    slug: "graphite-rod",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Extruded & fine-grain molded high-purity graphite rods for EDM electrodes, metallurgical degassing, and high-temp furnace elements.",
    fullDescription:
      "VM Graphite Rods are precision manufactured from high-density, fine-grain synthetic graphite. Providing exceptional thermal conductivity, low electrical resistivity, and high thermal shock resistance under extreme furnace atmospheres up to 3000°C.",
    mainImage: "/images/products/graphite-rods-clean.jpg",
    gallery: [
      "/images/products/graphite-rods-clean-2.jpg",
      "/images/products/graphite-sheets-rods.jpg"
    ],
    specifications: [
      { name: "Carbon Purity", value: "99.9% High Density" },
      { name: "Bulk Density", value: "1.75 - 1.88 g/cm³" },
      { name: "Specific Resistance", value: "8.5 - 11.5 µΩ·m" },
      { name: "Flexural Strength", value: "≥ 32 MPa" },
      { name: "Max Service Temp", value: "3000°C (Inert Atmospheres)" },
      { name: "Standard Diameters", value: "10mm to 300mm (Custom Cut)" },
    ],
    productPdfUrl: "/docs/Graphite_Sheets_Rods_Catalog.pdf",
    isFeatured: true,
    displayOrder: 17,
    seoTitle: "High-Purity Graphite Rods & Electrodes | VM Graphite",
    seoDescription:
      "Extruded fine-grain synthetic graphite rods for EDM machining, degassing tubes, and high-temperature furnace heating elements.",
  },
  {
    _id: "prod-18",
    name: "Graphite Powder",
    slug: "graphite-powder",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Ultra-fine micronized synthetic and natural flake graphite powder for conductive coatings, metallurgy, friction materials, and lubricant blending.",
    fullDescription:
      "VM High-Purity Graphite Powder is processed via ultra-fine mechanical and air jet milling. Characterized by high lubricity, thermal stability up to 3000°C, and exceptional electrical conductivity. Tailored for battery anodes, conductive polymers, dry lubricants, and sintering metallurgy.",
    mainImage: "/images/products/graphite-powder.jpg",
    specifications: [
      { name: "Carbon Content", value: "≥ 99.9% Purity" },
      { name: "Particle Size (D50)", value: "< 10 µm (Micronized)" },
      { name: "Ash Content", value: "≤ 0.05%" },
      { name: "Moisture Content", value: "≤ 0.2%" },
      { name: "Electrical Conductivity", value: "High Conductive Grade" },
      { name: "Mesh Size", value: "325 Mesh / 1000 Mesh / Sub-Micron" },
    ],
    productPdfUrl: "/docs/VM_Graphite_Corporate_Catalog_2026.pdf",
    isFeatured: true,
    displayOrder: 18,
    seoTitle: "High Purity Graphite Powder | Synthetic & Natural Flake",
    seoDescription:
      "Micronized high-purity graphite powder for metallurgical additives, conductive inks, dry lubricants, and friction components.",
  },
  {
    _id: "prod-19",
    name: "X-Ray Grade Selenium Granules",
    slug: "x-ray-grade-selenium-granules",
    categorySlug: "graphite-carbon-products",
    categoryName: "Graphite & Carbon Products",
    shortDescription:
      "Ultra-pure 99.999% (5N) spherical selenium granules and vitreous beads engineered for X-ray photoreceptors, radiation detectors, and glass color neutralization.",
    fullDescription:
      "VM Advanced Materials offers certified 99.999% (5N) X-Ray Grade Selenium Granules. Meticulously refined to eliminate trace heavy metals and impurities. Uniform spherical bead geometry ensures exceptional vapor deposition rates for digital X-ray flat panel detectors, selenium drums, and optical specialty glass alloys.",
    mainImage: "/images/products/selenium-granules.jpg",
    specifications: [
      { name: "Selenium Purity (Se)", value: "≥ 99.999% (5N Grade)" },
      { name: "Physical Form", value: "Vitreous Spherical Granules / Beads" },
      { name: "Granule Diameter", value: "1.0 mm - 3.5 mm" },
      { name: "Total Heavy Metal Impurities", value: "< 5 ppm (ICP-MS Tested)" },
      { name: "Melting Point", value: "221°C" },
      { name: "Boiling Point", value: "685°C" },
    ],
    productPdfUrl: "/docs/VM_Graphite_Corporate_Catalog_2026.pdf",
    isFeatured: true,
    displayOrder: 19,
    seoTitle: "X-Ray Grade Selenium Granules (5N 99.999%) | VM Graphite",
    seoDescription:
      "Certified 99.999% 5N ultra-pure X-ray grade selenium granules and vitreous beads for digital radiography detectors and optical glass.",
  },
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    _id: "res-1",
    title: "VM Graphite Corporate Product Catalog 2026",
    description:
      "Comprehensive 32-page industrial product catalog featuring technical specifications, application guides, and material selection charts.",
    fileUrl: "/docs/VM_Graphite_Corporate_Catalog_2026.pdf",
    category: "catalog",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    _id: "res-2",
    title: "VM Graphite Company Overview & Infrastructure Brochure",
    description:
      "Official corporate presentation detailing manufacturing facilities, quality testing lab, and global export capabilities.",
    fileUrl: "/docs/VM_Graphite_Company_Brochure.pdf",
    category: "brochure",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    _id: "res-3",
    title: "Graphite Crucibles Technical Operating Guidelines",
    description:
      "Best practice guide for furnace pre-heating, flux handling, and thermal shock prevention to maximize crucible service life.",
    fileUrl: "/docs/Crucibles_Operating_Guide.pdf",
    category: "datasheet",
    isFeatured: false,
    displayOrder: 3,
  },
  {
    _id: "res-4",
    title: "Flexible Graphite Sealing Materials Technical Datasheet",
    description:
      "Engineering reference table covering pressure limits, chemical compatibility, and bolt torque calculations for graphite gaskets.",
    fileUrl: "/docs/Graphite_Sealing_Technical_Datasheet.pdf",
    category: "datasheet",
    isFeatured: false,
    displayOrder: 4,
  },
  {
    _id: "res-5",
    title: "ISO 9001:2015 Quality Management Certification",
    description:
      "Official quality standard certification document for VM Graphite manufacturing process and customer delivery systems.",
    fileUrl: "/docs/VM_Graphite_ISO_Certificate.pdf",
    category: "certification",
    isFeatured: false,
    displayOrder: 5,
  },
];
