const fs = require('fs');
const path = require('path');

// Ensure sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  const { execSync } = require('child_process');
  console.log('Installing sharp dependency...');
  execSync('npm install sharp', { stdio: 'inherit' });
  sharp = require('sharp');
}

const projectRoot = __dirname;
const artifactDir = 'C:/Users/kh/.gemini/antigravity-ide/brain/09757aa0-318c-4c99-8ef1-075b4346dfb4';

// Map of partner logos to process
const logos = [
  { src: 'logo_alx_1783363938593.png', dest: 'src/assets/partners/logo_alx.webp' },
  { src: 'logo_isf_1783363959144.png', dest: 'src/assets/partners/logo_isf.webp' },
  { src: 'logo_mohe_1783363978783.png', dest: 'src/assets/partners/logo_mohe.webp' },
  { src: 'logo_innovation_univ_1783363995526.png', dest: 'src/assets/partners/logo_innovation_univ.webp' }
];

async function run() {
  console.log('Starting logo transparency processing (White to Transparent WebP)...');

  // Ensure output directory exists
  const destDir = path.join(projectRoot, 'src/assets/partners');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  for (const item of logos) {
    const srcPath = path.join(artifactDir, item.src);
    const destPath = path.join(projectRoot, item.dest);

    if (fs.existsSync(srcPath)) {
      try {
        console.log(`Processing logo: ${item.src} -> ${item.dest}`);
        
        // 1. Load image, ensure alpha channel (RGBA)
        const image = sharp(srcPath).ensureAlpha();
        
        // 2. Extract raw buffer
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
        
        // 3. Loop through pixels and make near-white background transparent
        // data contains pixel channels in sequence: [R, G, B, A, R, G, B, A, ...]
        const threshold = 240; // Pixels brighter than 240 in all RGB channels are considered background
        for (let i = 0; i < data.length; i += info.channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // Set Alpha to 0 (completely transparent)
          }
        }
        
        // 4. Save raw buffer back as WebP
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        await sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: info.channels
          }
        })
        .webp({ quality: 90 })
        .toFile(destPath);
        
        console.log(`Successfully processed and saved transparent logo to: ${item.dest}`);
      } catch (err) {
        console.error(`Error processing logo ${item.src}:`, err);
      }
    } else {
      console.error(`Source logo file not found in artifacts: ${srcPath}`);
    }
  }

  console.log('Logo processing completed successfully!');
}

run();
