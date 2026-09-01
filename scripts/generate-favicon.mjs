/**
 * Script to generate favicon.ico from the existing logo
 * Run with: node scripts/generate-favicon.mjs
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const logoPath = join(projectRoot, 'public', 'images', 'fixbike-logo.png');
const faviconPath = join(projectRoot, 'public', 'favicon.ico');

async function generateFavicon() {
  try {
    console.log('🔨 Generating favicon.ico from logo...');
    
    // Generate 32x32 favicon
    const faviconBuffer = await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toBuffer();
    
    // For ICO format, we'll use PNG as fallback
    // True ICO format requires additional libraries
    writeFileSync(faviconPath, faviconBuffer);
    
    console.log('✅ favicon.ico generated successfully!');
    console.log(`   Location: ${faviconPath}`);
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error.message);
    process.exit(1);
  }
}

generateFavicon();
