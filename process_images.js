const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install jimp locally if not already installed
try {
  require.resolve('jimp');
} catch (e) {
  console.log('Installing jimp dependency for image processing...');
  execSync('npm install jimp@0.16.13', { stdio: 'inherit' });
}

const Jimp = require('jimp');

const projectRoot = __dirname;

const mapping = [
  { input: 'src/assets/programming.webp', output: 'src/assets/courses/programming.webp' },
  { input: 'src/assets/تخاطب.webp', output: 'src/assets/courses/speech.webp' },
  { input: 'src/assets/سلوك.webp', output: 'src/assets/courses/behavior.webp' },
  { input: 'src/assets/صعوبات.webp', output: 'src/assets/courses/learning_difficulties.webp' },
  { input: 'src/assets/مهارات.webp', output: 'src/assets/courses/skills_development.webp' },
  { input: 'src/assets/courses/callcenter.webp', output: 'src/assets/courses/callcenter_temp.webp' },
  { input: 'src/assets/courses/english.webp', output: 'src/assets/courses/english_temp.webp' },
  { input: 'src/assets/courses/computer.webp', output: 'src/assets/courses/computer_temp.webp' },
  { input: 'src/assets/courses/freelancer.webp', output: 'src/assets/courses/freelancer_temp.webp' },
  { input: 'src/assets/courses/child.webp', output: 'src/assets/courses/child_temp.webp' }
];

async function processImage({ input, output }) {
  const inputPath = path.join(projectRoot, input);
  const outputPath = path.join(projectRoot, output);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    return;
  }

  try {
    const image = await Jimp.read(inputPath);
    const w = image.bitmap.width;
    const h = image.bitmap.height;

    // Calculate crop dimensions for 16:9 aspect ratio
    let targetW, targetH;
    if (w / h > 16 / 9) {
      targetW = Math.round(h * (16 / 9));
      targetH = h;
    } else {
      targetW = w;
      targetH = Math.round(w * (9 / 16));
    }

    const x = Math.round((w - targetW) / 2);
    const y = Math.round((h - targetH) / 2);

    await image
      .crop(x, y, targetW, targetH)
      .resize(800, 450)
      .writeAsync(outputPath);

    console.log(`Successfully processed ${input} -> ${output}`);
  } catch (err) {
    console.error(`Error processing ${input}:`, err);
  }
}

async function run() {
  // Process all images
  for (const item of mapping) {
    await processImage(item);
  }

  // Replace original files with temp processed files
  const tempReplacements = [
    { temp: 'src/assets/courses/callcenter_temp.webp', orig: 'src/assets/courses/callcenter.webp' },
    { temp: 'src/assets/courses/english_temp.webp', orig: 'src/assets/courses/english.webp' },
    { temp: 'src/assets/courses/computer_temp.webp', orig: 'src/assets/courses/computer.webp' },
    { temp: 'src/assets/courses/freelancer_temp.webp', orig: 'src/assets/courses/freelancer.webp' },
    { temp: 'src/assets/courses/child_temp.webp', orig: 'src/assets/courses/child.webp' }
  ];

  for (const item of tempReplacements) {
    const tempPath = path.join(projectRoot, item.temp);
    const origPath = path.join(projectRoot, item.orig);
    if (fs.existsSync(tempPath)) {
      if (fs.existsSync(origPath)) {
        fs.unlinkSync(origPath);
      }
      fs.renameSync(tempPath, origPath);
      console.log(`Updated: ${item.orig}`);
    }
  }

  // Clean up old files from src/assets/
  const oldFiles = [
    'src/assets/programming.webp',
    'src/assets/تخاطب.webp',
    'src/assets/سلوك.webp',
    'src/assets/صعوبات.webp',
    'src/assets/مهارات.webp'
  ];

  for (const file of oldFiles) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old file: ${file}`);
    }
  }

  console.log('All images have been adjusted to 16:9 and moved to src/assets/courses/!');
}

run();
