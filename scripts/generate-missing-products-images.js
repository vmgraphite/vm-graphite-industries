import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public/images/products');

async function generateMissingImages() {
  console.log('--- Generating High-Res Images for Missing Products ---');

  // 1. SS Doctor Blades (Stainless Steel Doctor Blades - bright silver metallic sheen)
  if (fs.existsSync(path.join(publicDir, 'carbon-steel-doctor-blades.jpg'))) {
    await sharp(path.join(publicDir, 'carbon-steel-doctor-blades.jpg'))
      .modulate({ brightness: 1.3, saturation: 0.4 })
      .linear(1.1, -10)
      .jpeg({ quality: 92 })
      .toFile(path.join(publicDir, 'ss-doctor-blades.jpg'));
    console.log('Created ss-doctor-blades.jpg');
  }

  // 2. Magnetic Ink Mixing Roller (Sleek metallic cylinder rollers)
  if (fs.existsSync(path.join(publicDir, 'graphite-sleeves.jpg'))) {
    await sharp(path.join(publicDir, 'graphite-sleeves.jpg'))
      .modulate({ brightness: 1.2, saturation: 0.5 })
      .linear(1.15, -5)
      .jpeg({ quality: 92 })
      .toFile(path.join(publicDir, 'magnetic-ink-mixing-roller.jpg'));
    console.log('Created magnetic-ink-mixing-roller.jpg');
  }

  // 3. Rope Ink Mixing Roller (Textured wound mixing roller bar)
  if (fs.existsSync(path.join(publicDir, 'graphite-gland-rope.jpg'))) {
    await sharp(path.join(publicDir, 'graphite-gland-rope.jpg'))
      .modulate({ brightness: 1.15, saturation: 0.7 })
      .linear(1.1, 0)
      .jpeg({ quality: 92 })
      .toFile(path.join(publicDir, 'rope-ink-mixing-roller.jpg'));
    console.log('Created rope-ink-mixing-roller.jpg');
  }

  console.log('--- Missing Product Images Successfully Generated ---');
}

generateMissingImages().catch(console.error);
