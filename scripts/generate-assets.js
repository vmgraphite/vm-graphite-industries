import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/images');
const docsDir = path.resolve('public/docs');

// Create directories
fs.mkdirSync(path.join(baseDir, 'categories'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'products'), { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });

function createSvgImage(title, category, filename, accent = '#D97706') {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#090D16"/>
    </linearGradient>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#334155" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#64748B" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#334155" stop-opacity="0.6"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.75" stroke-opacity="0.4"/>
    </pattern>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="${accent}" fill-opacity="0.2"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#grid)"/>

  <!-- Technical Overlay Elements -->
  <g opacity="0.8">
    <!-- Corner brackets -->
    <path d="M 40 70 L 40 40 L 70 40" stroke="${accent}" stroke-width="3" fill="none"/>
    <path d="M 760 70 L 760 40 L 730 40" stroke="${accent}" stroke-width="3" fill="none"/>
    <path d="M 40 530 L 40 560 L 70 560" stroke="${accent}" stroke-width="3" fill="none"/>
    <path d="M 760 530 L 760 560 L 730 560" stroke="${accent}" stroke-width="3" fill="none"/>
    
    <!-- Central Technical Frame -->
    <rect x="120" y="100" width="560" height="400" rx="16" fill="url(#metal)" stroke="#475569" stroke-width="1.5"/>
    <rect x="140" y="120" width="520" height="360" rx="8" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="8 4" opacity="0.6"/>
  </g>

  <!-- Industrial Icon & Graphics -->
  <g transform="translate(400, 260)" text-anchor="middle">
    <!-- Hexagonal Core -->
    <polygon points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35" fill="#0F172A" stroke="${accent}" stroke-width="3"/>
    <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 2"/>
    <circle cx="0" cy="0" r="18" fill="${accent}"/>
  </g>

  <!-- Category Badge -->
  <rect x="160" y="145" width="220" height="32" rx="6" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="1"/>
  <text x="175" y="166" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="${accent}" letter-spacing="1.5">${category.toUpperCase()}</text>

  <!-- Product Title Text -->
  <text x="400" y="420" font-family="Inter, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC" text-anchor="middle" letter-spacing="0.5">${title}</text>
  <text x="400" y="450" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="middle">VM GRAPHITE INDUSTRIAL GRADE</text>

  <!-- Technical Spec Watermark -->
  <text x="640" y="470" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B" text-anchor="end">SPEC: ISO-9001 METALLURGICAL CERTIFIED</text>
</svg>`;

  fs.writeFileSync(filename, svgContent);
}

// Categories
createSvgImage('GRAPHITE & CARBON', 'CATEGORY 01', path.join(baseDir, 'categories/graphite-carbon.jpg'), '#D97706');
createSvgImage('TAPES & SEALING', 'CATEGORY 02', path.join(baseDir, 'categories/tapes-sealing.jpg'), '#0284C7');
createSvgImage('BLADES & MATERIALS', 'CATEGORY 03', path.join(baseDir, 'categories/blades-materials.jpg'), '#10B981');

// Products
const products = [
  ['Graphite Suspension', 'Graphite & Carbon', 'graphite-suspension.jpg'],
  ['Graphite Crucibles', 'Graphite & Carbon', 'graphite-crucibles.jpg'],
  ['Graphite Sheets & Rods', 'Graphite & Carbon', 'graphite-sheets-rods.jpg'],
  ['Graphite Sleeves', 'Graphite & Carbon', 'graphite-sleeves.jpg'],
  ['Graphite Gland Rope', 'Graphite & Carbon', 'graphite-gland-rope.jpg'],
  ['Graphite Foil Tape', 'Tapes & Sealing', 'graphite-foil-tape.jpg'],
  ['Cork Tape', 'Tapes & Sealing', 'cork-tape.jpg'],
  ['Holography Tape', 'Tapes & Sealing', 'holography-tape.jpg'],
  ['End Seals', 'Tapes & Sealing', 'end-seals.jpg'],
  ['Carbon Steel Blades', 'Blades & Materials', 'carbon-steel-doctor-blades.jpg'],
  ['Polymer Doctor Blades', 'Blades & Materials', 'polymer-doctor-blades.jpg'],
  ['Fiber Glass Cloth', 'Blades & Materials', 'fiber-glass-cloth.jpg'],
  ['Boron Suspension', 'Blades & Materials', 'boron-suspension.jpg'],
];

products.forEach(([title, cat, fname]) => {
  createSvgImage(title, cat, path.join(baseDir, 'products', fname));
});

// Create dummy PDF files
const pdfNames = [
  'VM_Graphite_Corporate_Brochure.pdf',
  'VM_Graphite_Corporate_Catalog_2026.pdf',
  'Graphite_Suspension_Datasheet.pdf',
  'Graphite_Crucibles_Specs.pdf',
  'Graphite_Sheets_Rods_Catalog.pdf',
  'Graphite_Sleeves_Technical.pdf',
  'Graphite_Gland_Packing_Datasheet.pdf',
  'Graphite_Foil_Tape_Data.pdf',
  'Cork_Tape_Datasheet.pdf',
  'Holography_Tape_Specs.pdf',
  'End_Seals_Catalog.pdf',
  'Carbon_Steel_Doctor_Blades.pdf',
  'Polymer_Doctor_Blades_Specs.pdf',
  'Fiber_Glass_Cloth_Data.pdf',
  'Boron_Suspension_Datasheet.pdf',
  'Crucibles_Operating_Guide.pdf',
  'Graphite_Sealing_Technical_Datasheet.pdf',
  'VM_Graphite_ISO_Certificate.pdf',
];

const samplePdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kinds [ /Page ] /Count 1 /Kids [ 3 0 R ] >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [ 0 0 612 792 ] /Contents 4 0 R >> endobj
4 0 obj << /Length 55 >> stream
BT /F1 24 Tf 100 700 TD (VM Graphite Industries LLP Specification Sheet) Tj ET
endstream endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000133 00000 n
0000000224 00000 n
trailer << /Size 5 /Root 1 0 R >>
startxref
330
%%EOF`;

pdfNames.forEach((pdf) => {
  fs.writeFileSync(path.join(docsDir, pdf), samplePdfContent);
});

console.log('Successfully generated industrial visual assets and sample PDF files.');
