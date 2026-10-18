const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp locally if not already installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp dependency for image processing (WebP support)...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const projectRoot = __dirname;
const artifactDir = 'C:/Users/kh/.gemini/antigravity-ide/brain/09757aa0-318c-4c99-8ef1-075b4346dfb4';

// Map of generated card images in the artifacts directory to their project destination (converting to WebP)
const cardImages = [
  { src: 'card_callcenter_1783360867502.png', dest: 'src/assets/courses/card_callcenter.webp' },
  { src: 'card_english_1783360891594.png', dest: 'src/assets/courses/card_english.webp' },
  { src: 'card_computer_1783360919948.png', dest: 'src/assets/courses/card_computer.webp' },
  { src: 'card_programming_1783360941565.png', dest: 'src/assets/courses/card_programming.webp' },
  { src: 'card_behavior_1783360960455.png', dest: 'src/assets/courses/card_behavior.webp' },
  { src: 'card_speech_1783360979174.png', dest: 'src/assets/courses/card_speech.webp' },
  { src: 'card_learning_1783361006392.png', dest: 'src/assets/courses/card_learning.webp' },
  { src: 'card_skills_1783361030265.png', dest: 'src/assets/courses/card_skills.webp' },
  { src: 'card_freelancing_1783361054094.png', dest: 'src/assets/courses/card_freelancing.webp' },
  { src: 'card_child_1783361075269.png', dest: 'src/assets/courses/card_child.webp' }
];

// Map of original detail images to move from src/assets/ into src/assets/courses/
const detailImages = [
  { src: 'src/assets/programming.webp', dest: 'src/assets/courses/programming.webp' },
  { src: 'src/assets/تخاطب.webp', dest: 'src/assets/courses/speech.webp' },
  { src: 'src/assets/سلوك.webp', dest: 'src/assets/courses/behavior.webp' },
  { src: 'src/assets/صعوبات.webp', dest: 'src/assets/courses/learning_difficulties.webp' },
  { src: 'src/assets/مهارات.webp', dest: 'src/assets/courses/skills_development.webp' }
];

async function run() {
  console.log('Starting image conversion (PNG to WebP) and consolidated copy operations...');

  // Ensure destination directory exists
  const destDir = path.join(projectRoot, 'src/assets/courses');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  // 1. Process and convert generated card images to WebP
  for (const item of cardImages) {
    const srcPath = path.join(artifactDir, item.src);
    const destPath = path.join(projectRoot, item.dest);

    if (fs.existsSync(srcPath)) {
      try {
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath); // Remove placeholder
        }
        await sharp(srcPath)
          .webp({ quality: 85 })
          .toFile(destPath);
        console.log(`Successfully converted & copied: ${item.src} -> ${item.dest}`);
      } catch (err) {
        console.error(`Error converting card image ${item.src}:`, err);
      }
    } else {
      console.error(`Source card image not found: ${srcPath}`);
    }
  }

  // 2. Move original detail images to courses folder
  for (const item of detailImages) {
    const srcPath = path.join(projectRoot, item.src);
    const destPath = path.join(projectRoot, item.dest);

    if (fs.existsSync(srcPath)) {
      try {
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
        console.log(`Moved detail image: ${item.src} -> ${item.dest}`);
      } catch (err) {
        console.error(`Error moving detail image ${item.src}:`, err);
      }
    } else {
      if (fs.existsSync(destPath)) {
        console.log(`Detail image already in destination: ${item.dest}`);
      } else {
        console.error(`Source detail image not found: ${srcPath}`);
      }
    }
  }

  // 3. Clean up the old placeholder PNG files if they exist
  const pngPlaceholders = [
    'src/assets/courses/card_callcenter.png',
    'src/assets/courses/card_english.png',
    'src/assets/courses/card_computer.png',
    'src/assets/courses/card_programming.png',
    'src/assets/courses/card_behavior.png',
    'src/assets/courses/card_speech.png',
    'src/assets/courses/card_learning.png',
    'src/assets/courses/card_skills.png',
    'src/assets/courses/card_freelancing.png',
    'src/assets/courses/card_child.png'
  ];

  for (const file of pngPlaceholders) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Cleaned up old PNG placeholder: ${file}`);
    }
  }

  console.log('All image operations completed successfully! Files are converted to .webp.');
}

run();
