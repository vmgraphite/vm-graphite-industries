import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = '/Users/kanukabhagat/.gemini/antigravity-ide/brain/2f6d552d-8189-4e96-b4c3-29dfdd867adc';
const publicDir = path.resolve('public/images');

fs.mkdirSync(path.join(publicDir, 'categories'), { recursive: true });
fs.mkdirSync(path.join(publicDir, 'products'), { recursive: true });

async function processImages() {
  console.log('--- Processing generated images ---');

  // 1. Hero & Facility
  await sharp(path.join(brainDir, 'hero_industrial_1786534356808.png'))
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'hero-industrial.jpg'));

  await sharp(path.join(brainDir, 'category_graphite_carbon_1786534378819.png'))
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'facility-plant.jpg'));

  // 2. Categories
  await sharp(path.join(brainDir, 'category_graphite_carbon_1786534378819.png'))
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'categories/graphite-carbon.jpg'));

  await sharp(path.join(brainDir, 'category_tapes_sealing_1786534404244.png'))
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'categories/tapes-sealing.jpg'));

  await sharp(path.join(brainDir, 'category_blades_materials_1786534419050.png'))
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'categories/blades-materials.jpg'));

  // 3. Products direct mapping
  const productMappings = [
    ['prod_graphite_suspension_1786534557500.png', 'products/graphite-suspension.jpg'],
    ['prod_graphite_crucibles_1786534578518.png', 'products/graphite-crucibles.jpg'],
    ['prod_graphite_sheets_rods_1786534793177.png', 'products/graphite-sheets-rods.jpg'],
    ['prod_graphite_sleeves_1786535029664.png', 'products/graphite-sleeves.jpg'],
    ['prod_graphite_gland_rope_1786535050184.png', 'products/graphite-gland-rope.jpg'],
    ['prod_graphite_foil_tape_1786535069525.png', 'products/graphite-foil-tape.jpg'],
    ['prod_cork_tape_1786535089501.png', 'products/cork-tape.jpg'],
    ['prod_holography_tape_1786535111433.png', 'products/holography-tape.jpg'],
    ['prod_end_seals_1786535204086.png', 'products/end-seals.jpg'],
  ];

  for (const [src, dest] of productMappings) {
    await sharp(path.join(brainDir, src))
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, dest));
    console.log(`Saved ${dest}`);
  }

  // 4. Extract dedicated product photos from category_blades_materials (1024x1024 base image)
  const bladesImg = sharp(path.join(brainDir, 'category_blades_materials_1786534419050.png'));
  const bladesMetadata = await bladesImg.metadata();
  const width = bladesMetadata.width || 1024;
  const height = bladesMetadata.height || 1024;

  // Fiber Glass Cloth (Top center woven roll)
  await sharp(path.join(brainDir, 'category_blades_materials_1786534419050.png'))
    .extract({
      left: Math.floor(width * 0.1),
      top: Math.floor(height * 0.2),
      width: Math.floor(width * 0.8),
      height: Math.floor(height * 0.45),
    })
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'products/fiber-glass-cloth.jpg'));
  console.log('Saved products/fiber-glass-cloth.jpg');

  // Carbon Steel Doctor Blade (Middle diagonal metal blade)
  await sharp(path.join(brainDir, 'category_blades_materials_1786534419050.png'))
    .extract({
      left: Math.floor(width * 0.2),
      top: Math.floor(height * 0.4),
      width: Math.floor(width * 0.75),
      height: Math.floor(height * 0.35),
    })
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'products/carbon-steel-doctor-blades.jpg'));
  console.log('Saved products/carbon-steel-doctor-blades.jpg');

  // Polymer Doctor Blade (Bottom blue polymer blade)
  await sharp(path.join(brainDir, 'category_blades_materials_1786534419050.png'))
    .extract({
      left: Math.floor(width * 0.5),
      top: Math.floor(height * 0.45),
      width: Math.floor(width * 0.5),
      height: Math.floor(height * 0.35),
    })
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'products/polymer-doctor-blades.jpg'));
  console.log('Saved products/polymer-doctor-blades.jpg');

  // Boron Suspension (White liquid formulation based on lab container photo)
  await sharp(path.join(brainDir, 'prod_graphite_suspension_1786534557500.png'))
    .modulate({ brightness: 1.45, saturation: 0.2 })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'products/boron-suspension.jpg'));
  console.log('Saved products/boron-suspension.jpg');

  console.log('--- Finished processing images successfully ---');
}

processImages().catch(console.error);
