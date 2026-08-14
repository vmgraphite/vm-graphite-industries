import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'twycammz',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-08-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN,
});

async function uploadImage(filePath) {
  const fullPath = path.resolve(projectRoot, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }
  const stream = fs.createReadStream(fullPath);
  const basename = path.basename(filePath);
  try {
    const asset = await client.assets.upload('image', stream, {
      filename: basename,
    });
    console.log(`Uploaded image: ${basename} -> ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`Failed to upload ${basename}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log('--- Starting Sanity Database Seeding ---');

  // 1. Site Settings Singleton
  console.log('Seeding siteSettings...');
  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'VM Graphite Industries LLP',
    tagline: 'Delivering Premium Graphite Solutions with Unmatched Quality and Speed',
    primaryPhone: '+91 98765 43210',
    secondaryPhone: '+91 11 2345 6789',
    whatsappNumber: '919876543210',
    email: 'kanikaagrawal1997@gmail.com',
    officeAddress: 'Corporate Office: Plot No. 42, Industrial Area, Phase II, New Delhi - 110020, India',
    plantAddress: 'Manufacturing Unit: Survey No. 108/2, GIDC Industrial Estate, Sector 3, Gujarat - 392130, India',
    googleMapsUrl: 'https://maps.google.com/?q=Industrial+Area+Phase+2+New+Delhi',
    workingHours: 'Monday - Saturday: 9:00 AM - 6:30 PM (IST)',
    seo: {
      _type: 'seo',
      metaTitle: 'VM Graphite Industries LLP | Industrial Graphite & Sealing Materials',
      metaDescription: 'Striving to become India\'s leading supplier of unmatched quality graphite suspension, foil tape, and industrial materials.',
    },
  };
  await client.createOrReplace(siteSettingsDoc);

  // 2. Home Page Singleton
  console.log('Seeding homePage...');
  const heroImageAsset = await uploadImage('public/images/hero-industrial.jpg');
  const homePageDoc = {
    _id: 'homePage',
    _type: 'homePage',
    heroHeadline: 'Advanced Graphite & Industrial Material Solutions',
    heroSubheadline: 'Engineered high-temperature graphite products, coating, metalizing solutions, and industrial sealing materials designed for rigorous manufacturing operations.',
    heroImage: heroImageAsset,
    primaryCtaText: 'Explore Products',
    secondaryCtaText: 'Get a Quote',
    strengthsHeadline: 'Pioneering Excellence in Industrial Graphite Manufacturing',
    capabilitiesHeadline: 'State-of-the-Art Precision Manufacturing Capabilities',
    capabilitiesDescription: 'We pride ourselves on our exceptional production capacity and commitment to timely delivery, ensuring that your orders are fulfilled on schedule with the highest standards of quality. Discover how our solutions can meet your industrial needs with speed and excellence.',
    whyChooseUsHeadline: 'Why Industry Leaders Trust VM Graphite',
    seo: {
      _type: 'seo',
      metaTitle: 'VM Graphite Industries LLP | High Performance Industrial Materials',
      metaDescription: 'Premium supplier of engineered industrial graphite products, flexible foil tapes, doctor blades, and sealing components.',
    },
  };
  await client.createOrReplace(homePageDoc);

  // 3. About Page Singleton
  console.log('Seeding aboutPage...');
  const aboutPageDoc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About VM Graphite Industries LLP',
    subtitle: 'Striving to Become India\'s Leading Supplier of Unmatched Quality Graphite Suspension and Foil Tape.',
    companyIntroduction: [
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'VM Graphite Industries LLP was established in 2021 by partners Ayush Patel and Himanshu Bisth. The company specializes in manufacturing high-quality graphite suspension and foil tape & other industrial materials. Leveraging extensive research and development along with advanced Alubonding technology, VM Graphite Industries LLP delivers graphite solutions that stand out for their unmatched quality. Their foil tape is available in various sizes to meet diverse needs.',
          },
        ],
      },
    ],
    manufacturingHeading: 'Advanced Precision Infrastructure',
    manufacturingContent: [
      {
        _type: 'block',
        _key: 'mfg1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Our modern manufacturing plant in Gujarat features state-of-the-art CNC turning centers, high-temperature sintering furnaces, automated foil slitting lines, and micro-particle dispersion units. Every product undergoes strict quality control to guarantee tight mechanical tolerances and thermal stability.',
          },
        ],
      },
    ],
    qualityHeading: 'Rigorous Quality Assurance Standards',
    qualityContent: [
      {
        _type: 'block',
        _key: 'qual1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's3',
            text: 'Certified under ISO 9001:2015 quality management protocols, our testing facility verifies carbon purity, density, tensile strength, and thermal resistance before dispatch. We ensure 100% material traceability and compliance with international standards.',
          },
        ],
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'About Us | VM Graphite Industries LLP',
      metaDescription: 'Learn about VM Graphite Industries LLP - our manufacturing facilities, ISO certified quality control, and industrial product leadership.',
    },
  };
  await client.createOrReplace(aboutPageDoc);

  // 4. Categories
  console.log('Seeding Categories...');
  const categoryDefs = [
    {
      _id: 'cat-1',
      name: 'Graphite & Carbon Products',
      slug: 'graphite-carbon-products',
      description: 'High-purity synthetic & natural graphite crucibles, machined rods, colloidal suspensions, packing, and high-temp components for metallurgical and chemical applications.',
      imagePath: 'public/images/categories/graphite-carbon.jpg',
      displayOrder: 1,
    },
    {
      _id: 'cat-2',
      name: 'Tapes & Sealing Solutions',
      slug: 'tapes-sealing-solutions',
      description: 'High-performance flexible graphite foil tapes, cork tapes, holographic doctor blade tapes, and specialized end seal gaskets engineered for severe industrial environments.',
      imagePath: 'public/images/categories/tapes-sealing.jpg',
      displayOrder: 2,
    },
    {
      _id: 'cat-3',
      name: 'Industrial Blades & Materials',
      slug: 'industrial-blades-materials',
      description: 'Precision carbon steel & polymer doctor blades, heat-resistant fiberglass cloth laminates, and high-purity boron suspension lubricants for flexographic & gravure printing lines.',
      imagePath: 'public/images/categories/blades-materials.jpg',
      displayOrder: 3,
    },
  ];

  const categoryMap = {};
  for (const catDef of categoryDefs) {
    const imageObject = await uploadImage(catDef.imagePath);
    const catDoc = {
      _id: catDef._id,
      _type: 'category',
      name: catDef.name,
      slug: { _type: 'slug', current: catDef.slug },
      description: catDef.description,
      displayOrder: catDef.displayOrder,
      ...(imageObject ? { image: imageObject } : {}),
      seo: {
        _type: 'seo',
        metaTitle: `${catDef.name} | VM Graphite Industries`,
        metaDescription: catDef.description,
      },
    };
    await client.createOrReplace(catDoc);
    categoryMap[catDef.slug] = catDef._id;
    console.log(`Created category: ${catDef.name} (${catDef._id})`);
  }

  // 5. Products
  console.log('Seeding Products...');
  const productDefs = [
    {
      _id: 'prod-1',
      name: 'Graphite Suspension',
      slug: 'graphite-suspension',
      categorySlug: 'graphite-carbon-products',
      shortDescription: 'Colloidal aqueous and solvent-based graphite dispersion engineered for high-temperature forging die lubrication and conductive metal coating applications.',
      fullDescription: 'VM Graphite Suspension is a stable, ultra-fine micro-crystalline graphite formulation suspended in specialized fluid carriers. It forms a uniform, tenacious dry lubricant film on die cavities and metallic substrates operating at extreme thermal stress.',
      mainImagePath: 'public/images/products/graphite-suspension.jpg',
      specifications: [
        { name: 'Graphite Purity', value: '≥ 99.5% Carbon' },
        { name: 'Particle Size (D90)', value: '< 5.0 µm' },
        { name: 'Carrier Base', value: 'Aqueous / Synthetic Oil Option' },
        { name: 'Max Operating Temp', value: '1100°C (Inert) / 450°C (Air)' },
        { name: 'Specific Gravity', value: '1.12 - 1.18 g/cm³' },
        { name: 'Viscosity (Ford Cup #4)', value: '22 - 30 seconds' },
      ],
      isFeatured: true,
      displayOrder: 1,
    },
    {
      _id: 'prod-2',
      name: 'Graphite Crucibles',
      slug: 'graphite-crucibles',
      categorySlug: 'graphite-carbon-products',
      shortDescription: 'Isostatically pressed silicon-carbide bonded graphite crucibles crafted for melting non-ferrous alloys, copper, brass, aluminum, and precious metals.',
      fullDescription: 'Engineered using high-density isostatic pressing, VM Graphite Crucibles deliver exceptional thermal conductivity, outstanding mechanical strength, and superior resistance to chemical oxidation.',
      mainImagePath: 'public/images/products/graphite-crucibles.jpg',
      specifications: [
        { name: 'Material Grade', value: 'Iso-Pressed Clay / SiC-Graphite' },
        { name: 'Bulk Density', value: '1.85 - 1.95 g/cm³' },
        { name: 'Thermal Conductivity', value: '140 W/m·K' },
        { name: 'Refractoriness / Max Temp', value: '1650°C' },
        { name: 'Melting Applications', value: 'Copper, Brass, Bronze, Aluminum, Gold' },
        { name: 'Standard Capacity Range', value: '1 kg to 1000 kg Liquid Metal' },
      ],
      isFeatured: true,
      displayOrder: 2,
    },
    {
      _id: 'prod-3',
      name: 'Graphite Sheets & Rods',
      slug: 'graphite-sheets-rods',
      categorySlug: 'graphite-carbon-products',
      shortDescription: 'Extruded & fine-grain molded graphite rods and flexible graphite foil sheets for chemical gaskets, EDM electrodes, and thermal insulation.',
      fullDescription: 'High-purity graphite rods and expanded graphite foil sheets manufactured to exact mechanical tolerances. Our sheets provide low friction, zero creep relaxation, and excellent chemical inertness.',
      mainImagePath: 'public/images/products/graphite-sheets-rods.jpg',
      specifications: [
        { name: 'Carbon Content', value: '99.0% - 99.9%' },
        { name: 'Density (Rods)', value: '1.75 - 1.88 g/cm³' },
        { name: 'Density (Sheets)', value: '1.0 - 1.1 g/cm³' },
        { name: 'Compressibility', value: '40% - 50%' },
        { name: 'Tensile Strength', value: '≥ 5.0 MPa' },
        { name: 'Ash Content', value: '< 0.1%' },
      ],
      isFeatured: true,
      displayOrder: 3,
    },
    {
      _id: 'prod-4',
      name: 'Graphite Sleeves',
      slug: 'graphite-sleeves',
      categorySlug: 'graphite-carbon-products',
      shortDescription: 'Custom machined graphite cylindrical sleeves and bushings designed for high-temperature pumps, continuous casting dies, and thermal barriers.',
      fullDescription: 'Self-lubricating graphite sleeves precision turned to tight dimensional tolerances. Resistant to molten metal wetting and chemical corrosion.',
      mainImagePath: 'public/images/products/graphite-sleeves.jpg',
      specifications: [
        { name: 'Material Base', value: 'Synthetic Machined Graphite' },
        { name: 'Flexural Strength', value: '35 - 48 MPa' },
        { name: 'Thermal Expansion Coeff', value: '4.2 × 10⁻⁶ / K' },
        { name: 'Max Operating Temp', value: '2800°C (Vacuum / Inert Gas)' },
        { name: 'Machining Tolerance', value: '± 0.02 mm' },
      ],
      isFeatured: false,
      displayOrder: 4,
    },
    {
      _id: 'prod-5',
      name: 'Graphite Gland Rope / Packing',
      slug: 'graphite-gland-rope',
      categorySlug: 'graphite-carbon-products',
      shortDescription: 'Braided expanded flexible graphite gland packing reinforced with Inconel or nickel wire for valve stems and high-pressure steam pumps.',
      fullDescription: 'VM Flexible Graphite Gland Rope is inter-braided from high-purity expanded graphite yarn. It features exceptionally low friction and self-lubricating properties.',
      mainImagePath: 'public/images/products/graphite-gland-rope.jpg',
      specifications: [
        { name: 'Reinforcement Wire', value: 'Inconel 600 / Stainless Steel / Cotton' },
        { name: 'Pressure Rating (Valves)', value: 'Up to 300 Bar' },
        { name: 'Pressure Rating (Pumps)', value: 'Up to 30 Bar' },
        { name: 'pH Range', value: '0 - 14 (Except Strong Oxidizers)' },
        { name: 'Shaft Speed', value: '20 m/s' },
        { name: 'Temperature Limits', value: '-200°C to +650°C (Steam)' },
      ],
      isFeatured: false,
      displayOrder: 5,
    },
    {
      _id: 'prod-6',
      name: 'Graphite Foil Tape',
      slug: 'graphite-foil-tape',
      categorySlug: 'tapes-sealing-solutions',
      shortDescription: 'Self-adhesive corrugated flexible expanded graphite foil tape designed for instant valve stem packing and spiral wound gasket manufacturing.',
      fullDescription: 'VM Graphite Foil Tape is manufactured from 99% pure flexible graphite sheet with a pressure-sensitive adhesive backing.',
      mainImagePath: 'public/images/products/graphite-foil-tape.jpg',
      specifications: [
        { name: 'Carbon Content', value: '≥ 99.0%' },
        { name: 'Standard Thickness', value: '0.38 mm, 0.50 mm' },
        { name: 'Standard Widths', value: '10 mm, 12 mm, 15 mm, 20 mm, 25 mm' },
        { name: 'Adhesive Type', value: 'Self-Adhesive Synthetic Backing' },
        { name: 'Operating Temp (Air)', value: '-200°C to +450°C' },
        { name: 'Sulfur Content', value: '< 1000 ppm' },
      ],
      isFeatured: true,
      displayOrder: 6,
    },
    {
      _id: 'prod-7',
      name: 'Cork Tape',
      slug: 'cork-tape',
      categorySlug: 'tapes-sealing-solutions',
      shortDescription: 'Rubber-bonded cork sealing tape providing anti-vibration damping, insulation, and moisture sealing for HVAC and industrial piping.',
      fullDescription: 'Made from high-grade natural cork granules combined with elastomer binders. VM Cork Tape forms an effective thermal barrier and condensation moisture seal.',
      mainImagePath: 'public/images/products/cork-tape.jpg',
      specifications: [
        { name: 'Material Formulation', value: 'Natural Granulated Cork + NBR Rubber' },
        { name: 'Density', value: '0.55 - 0.65 g/cm³' },
        { name: 'Thermal Conductivity', value: '0.07 W/m·K' },
        { name: 'Standard Roll Dimensions', value: '50 mm Wide × 3 mm Thick × 10 m Long' },
        { name: 'Operating Temperature', value: '-30°C to +110°C' },
      ],
      isFeatured: false,
      displayOrder: 7,
    },
    {
      _id: 'prod-8',
      name: 'Holography Tape',
      slug: 'holography-tape',
      categorySlug: 'tapes-sealing-solutions',
      shortDescription: 'Precision polyester holographic sealing & mounting tape tailored for gravure cylinder prep, flexographic plate mounting, and security packaging.',
      fullDescription: 'High-tack acrylic adhesive coated holographic film designed for rigid holding without residue upon removal.',
      mainImagePath: 'public/images/products/holography-tape.jpg',
      specifications: [
        { name: 'Carrier Film', value: 'Metallized PET Holographic Film' },
        { name: 'Total Thickness', value: '45 µm - 75 µm' },
        { name: 'Adhesive System', value: 'Solvent Acrylic High-Tack' },
        { name: 'Adhesion to Steel', value: '≥ 12 N/25mm' },
        { name: 'Peel Residue', value: 'Zero Clean Removal' },
      ],
      isFeatured: false,
      displayOrder: 8,
    },
    {
      _id: 'prod-9',
      name: 'End Seals',
      slug: 'end-seals',
      categorySlug: 'tapes-sealing-solutions',
      shortDescription: 'Molded felt, rubber, and felt-graphite hybrid end seal gaskets engineered for flexographic ink chambers and gravure doctor blade assemblies.',
      fullDescription: 'VM End Seals are CNC-cut to exact OEM chamber profiles. Fabricated from lubricated wool felt, EPDM, polyurethane, and micro-graphite soaked felt.',
      mainImagePath: 'public/images/products/end-seals.jpg',
      specifications: [
        { name: 'Material Options', value: 'Graphite-Impregnated Felt / Polyurethane / EPDM' },
        { name: 'Hardness (Rubber)', value: '65 - 80 Shore A' },
        { name: 'Chemical Resistance', value: 'Water-based, Solvent, & UV Flexo Inks' },
        { name: 'OEM Fitment', value: 'Custom Machined to Chamber Drawings' },
        { name: 'Friction Coefficient', value: '< 0.15 (Graphite Coated)' },
      ],
      isFeatured: true,
      displayOrder: 9,
    },
    {
      _id: 'prod-10',
      name: 'Carbon Steel Doctor Blades',
      slug: 'carbon-steel-doctor-blades',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Refined Swedish carbon steel doctor blades with bevel and lamella edge profiles for crisp ink metering in flexo and gravure printing presses.',
      fullDescription: 'Manufactured from high-purity European carbon strip steel with micro-homogenous carbide microstructure. Delivers consistent blade-to-anilox contact.',
      mainImagePath: 'public/images/products/carbon-steel-doctor-blades.jpg',
      specifications: [
        { name: 'Steel Grade', value: 'High Carbon European Strip Steel (C1095)' },
        { name: 'Tensile Strength', value: '1950 - 2100 N/mm²' },
        { name: 'Vickers Hardness', value: '580 - 620 HV' },
        { name: 'Edge Profiles', value: 'Lamella (0.07mm - 0.10mm tip) / Bevel (15° - 30°)' },
        { name: 'Standard Thicknesses', value: '0.15 mm, 0.20 mm, 0.25 mm, 0.30 mm' },
        { name: 'Straightness Tolerance', value: '0.6 mm per 3000 mm' },
      ],
      isFeatured: true,
      displayOrder: 10,
    },
    {
      _id: 'prod-11',
      name: 'Polymer Doctor Blades',
      slug: 'polymer-doctor-blades',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Heavy-duty UHMW-PE and composite polyester doctor blades engineered for containment in flexo chambers and corrugated board printing.',
      fullDescription: 'Corrosion-proof synthetic polymer doctor blades designed as durable containment blades. Engineered to prevent operator knife injuries.',
      mainImagePath: 'public/images/products/polymer-doctor-blades.jpg',
      specifications: [
        { name: 'Material Formulation', value: 'Virgin UHMW-PE / Reinforced Polyester Composite' },
        { name: 'Standard Thickness', value: '1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm' },
        { name: 'Edge Geometry', value: '30° Bevel / Step Lamella' },
        { name: 'Chemical Inertness', value: '100% Resistant to Solvent & Water Inks' },
        { name: 'Anilox Wear Index', value: 'Zero Scoring' },
      ],
      isFeatured: false,
      displayOrder: 11,
    },
    {
      _id: 'prod-12',
      name: 'Fiber Glass Cloth',
      slug: 'fiber-glass-cloth',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Woven E-glass fiberglass fabric impregnated with PTFE or silicone resin for high-temperature conveyor belts and thermal insulation jackets.',
      fullDescription: 'High-tensile woven fiberglass cloth featuring exceptional thermal resistance up to 550°C. Non-combustible, chemically resistant.',
      mainImagePath: 'public/images/products/fiber-glass-cloth.jpg',
      specifications: [
        { name: 'Glass Type', value: 'E-Glass Continuous Filament' },
        { name: 'Weave Pattern', value: 'Plain / Twill / Satin Weave' },
        { name: 'Weight Range', value: '200 g/m² to 1000 g/m²' },
        { name: 'Operating Temp', value: '-70°C to +550°C' },
        { name: 'Coating Options', value: 'Uncoated / PTFE / Vermiculite / Silicone' },
        { name: 'Standard Widths', value: '1000 mm, 1200 mm, 1500 mm' },
      ],
      isFeatured: false,
      displayOrder: 12,
    },
    {
      _id: 'prod-13',
      name: 'Boron Suspension',
      slug: 'boron-suspension',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Hexagonal Boron Nitride (h-BN) high-purity liquid suspension coating for aluminum extrusion dies, glass molding, and metal non-wetting release.',
      fullDescription: 'VM Boron Suspension (often termed "White Graphite") is a premium inorganic formulation containing micronized hexagonal boron nitride particles.',
      mainImagePath: 'public/images/products/boron-suspension.jpg',
      specifications: [
        { name: 'Active Chemical', value: 'Hexagonal Boron Nitride (h-BN)' },
        { name: 'h-BN Purity', value: '≥ 99.2%' },
        { name: 'Particle Size', value: '1.5 - 3.0 µm' },
        { name: 'Max Operating Temp (Air)', value: '900°C' },
        { name: 'Max Operating Temp (Vacuum)', value: '2000°C' },
        { name: 'Non-Wetting Behavior', value: 'Complete Inertness to Molten Al & Mg' },
      ],
      isFeatured: true,
      displayOrder: 13,
    },
    {
      _id: 'prod-14',
      name: 'SS Doctor Blades',
      slug: 'ss-doctor-blades',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'High-corrosion-resistant Stainless Steel (SS) doctor blades engineered for water-based flexographic printing inks and corrosive fluid metering.',
      fullDescription: 'VM Stainless Steel (SS) Doctor Blades are precision manufactured from premium surgical-grade stainless steel.',
      mainImagePath: 'public/images/products/ss-doctor-blades.jpg',
      specifications: [
        { name: 'Material Grade', value: 'Martensitic Stainless Steel (AISI 420)' },
        { name: 'Tensile Strength', value: '1800 - 1980 N/mm²' },
        { name: 'Vickers Hardness', value: '570 - 600 HV' },
        { name: 'Edge Geometry', value: 'Lamella Tip (0.07mm - 0.10mm) / Bevel' },
        { name: 'Corrosion Resistance', value: '100% Resistant to Acid & Water Inks' },
        { name: 'Standard Thicknesses', value: '0.15 mm, 0.20 mm, 0.25 mm' },
      ],
      isFeatured: true,
      displayOrder: 14,
    },
    {
      _id: 'prod-15',
      name: 'Magnetic Ink Mixing Roller',
      slug: 'magnetic-ink-mixing-roller',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Heavy-duty magnetic core ink fountain mixing rollers designed for continuous ink agitation in gravure and flexographic press ink pans.',
      fullDescription: 'VM Magnetic Ink Mixing Rollers utilize high-coercivity rare earth magnetic cores enclosed within chemical-resistant metallic tubing.',
      mainImagePath: 'public/images/products/magnetic-ink-mixing-roller.jpg',
      specifications: [
        { name: 'Core Type', value: 'Neodymium Permanent Magnet Core' },
        { name: 'Outer Sheath', value: 'Stainless Steel 316 / PTFE Coated' },
        { name: 'Standard Diameters', value: '25 mm, 32 mm, 40 mm' },
        { name: 'Length Range', value: '300 mm to 1800 mm (Custom Cut)' },
        { name: 'Chemical Compatibility', value: 'Solvent, Water & UV Curable Inks' },
      ],
      isFeatured: true,
      displayOrder: 15,
    },
    {
      _id: 'prod-16',
      name: 'Rope Ink Mixing Roller',
      slug: 'rope-ink-mixing-roller',
      categorySlug: 'industrial-blades-materials',
      shortDescription: 'Spiral rope-wound ink mixing rollers engineered for uniform ink distribution and anti-skinning fluid flow across printing press fountains.',
      fullDescription: 'VM Rope Ink Mixing Rollers feature a continuous spiral rope winding over an aluminum/steel core.',
      mainImagePath: 'public/images/products/rope-ink-mixing-roller.jpg',
      specifications: [
        { name: 'Winding Material', value: 'Solvent-Resistant Synthetic Rope' },
        { name: 'Core Construction', value: 'Extruded Aluminum / Stainless Steel' },
        { name: 'Standard Diameters', value: '30 mm, 38 mm, 50 mm' },
        { name: 'Max Operating Temp', value: '120°C' },
        { name: 'Fountain Width Compatibility', value: 'Up to 2200 mm' },
      ],
      isFeatured: true,
      displayOrder: 16,
    },
  ];

  for (const prodDef of productDefs) {
    const categoryId = categoryMap[prodDef.categorySlug];
    const imageObject = await uploadImage(prodDef.mainImagePath);

    const prodDoc = {
      _id: prodDef._id,
      _type: 'product',
      name: prodDef.name,
      slug: { _type: 'slug', current: prodDef.slug },
      category: { _type: 'reference', _ref: categoryId },
      shortDescription: prodDef.shortDescription,
      fullDescription: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: prodDef.fullDescription }],
        },
      ],
      ...(imageObject ? { mainImage: imageObject } : {}),
      specifications: prodDef.specifications.map((spec, idx) => ({
        _type: 'specRow',
        _key: `spec-${idx + 1}`,
        name: spec.name,
        value: spec.value,
      })),
      isFeatured: prodDef.isFeatured,
      displayOrder: prodDef.displayOrder,
      seo: {
        _type: 'seo',
        metaTitle: `${prodDef.name} | VM Graphite Industries`,
        metaDescription: prodDef.shortDescription,
      },
    };

    await client.createOrReplace(prodDoc);
    console.log(`Created product: ${prodDef.name} (${prodDef._id})`);
  }

  // 6. Resources
  console.log('Seeding Resources...');
  const resourceDefs = [
    {
      _id: 'res-1',
      title: 'VM Graphite Corporate Product Catalog 2026',
      description: 'Comprehensive 32-page industrial product catalog featuring technical specifications, application guides, and material selection charts.',
      category: 'catalog',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      _id: 'res-2',
      title: 'VM Graphite Company Overview & Infrastructure Brochure',
      description: 'Official corporate presentation detailing manufacturing facilities, quality testing lab, and global export capabilities.',
      category: 'brochure',
      isFeatured: true,
      displayOrder: 2,
    },
    {
      _id: 'res-3',
      title: 'Graphite Crucibles Technical Operating Guidelines',
      description: 'Best practice guide for furnace pre-heating, flux handling, and thermal shock prevention to maximize crucible service life.',
      category: 'datasheet',
      isFeatured: false,
      displayOrder: 3,
    },
    {
      _id: 'res-4',
      title: 'Flexible Graphite Sealing Materials Technical Datasheet',
      description: 'Engineering reference table covering pressure limits, chemical compatibility, and bolt torque calculations for graphite gaskets.',
      category: 'datasheet',
      isFeatured: false,
      displayOrder: 4,
    },
    {
      _id: 'res-5',
      title: 'ISO 9001:2015 Quality Management Certification',
      description: 'Official quality standard certification document for VM Graphite manufacturing process and customer delivery systems.',
      category: 'certification',
      isFeatured: false,
      displayOrder: 5,
    },
  ];

  for (const resDef of resourceDefs) {
    const resDoc = {
      _id: resDef._id,
      _type: 'resource',
      title: resDef.title,
      description: resDef.description,
      category: resDef.category,
      isFeatured: resDef.isFeatured,
      displayOrder: resDef.displayOrder,
    };
    await client.createOrReplace(resDoc);
    console.log(`Created resource: ${resDef.title} (${resDef._id})`);
  }

  console.log('--- Sanity Seeding Completed Successfully ---');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
